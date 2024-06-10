package logic

import (
	"context"
	"encoding/json"
	"errors"

	"ludwig.com/onlineshopping/internal/svc"
	"ludwig.com/onlineshopping/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type CartLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewCartLogic(ctx context.Context, svcCtx *svc.ServiceContext) *CartLogic {
	return &CartLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *CartLogic) Cart() (resp *types.Cart, err error) {
	id, err := l.ctx.Value("id").(json.Number).Int64()
	if err != nil {
		l.Logger.Error("parse id failed ", err)
		return nil, errors.New("authorization failed")
	}

	result, err := l.svcCtx.Model.CartModel.FindAll(l.ctx, id)
	if err != nil {
		return nil, errors.New("cart error")
	}

	// ProductId int64   `json:"id"`
	// Number    int64   `json:"number"`
	// Date      int64   `json:"date`
	var carList []types.CartProduct

	for _, v := range result {
		carList = append(carList, types.CartProduct{
			ProductId: v.ProductId,
			Number:    v.Number,
			Date:      v.Data.Unix(),
		})
	}

	// CartProductList []CartProduct `json:"cart_product_list"`

	return &types.Cart{
		CartProductList: carList,
	}, nil
}
