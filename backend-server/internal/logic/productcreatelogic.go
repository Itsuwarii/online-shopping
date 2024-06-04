package logic

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"time"

	"ludwig.com/onlineshopping/internal/model"
	"ludwig.com/onlineshopping/internal/svc"
	"ludwig.com/onlineshopping/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type ProductCreateLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewProductCreateLogic(ctx context.Context, svcCtx *svc.ServiceContext) *ProductCreateLogic {
	return &ProductCreateLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *ProductCreateLogic) ProductCreate(req *types.NewProduct) (resp *types.ProductId, err error) {
	merchantId, err := l.ctx.Value("merchantid").(json.Number).Int64()
	if err != nil {
		l.Logger.Error("parse id failed ", err)
		return nil, errors.New("authorization failed")
	}
	l.Logger.Info("merchant create product", fmt.Sprint(merchantId))

	result, err := l.svcCtx.Model.ProductModel.Insert(l.ctx, &model.Product{
		Name:          req.Name,
		MerchantId:    merchantId,
		Price:         req.Price,
		AvatarLocator: req.AvatarLocator,
		ImagesLocator: req.ImagesLocator,
		Intro:         req.Intro,
		Amount:        req.Amount,
		State:         req.State,
		Date:          time.Now(),
	})
	if err != nil {
		return nil, errors.New("insert failed")
	}

	id, err := result.LastInsertId()
	if err != nil {
		return nil, errors.New("get id failed")
	}

	return &types.ProductId{
		Id: id,
	}, nil
}
