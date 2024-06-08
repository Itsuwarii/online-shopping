package logic

import (
	"context"
	"encoding/json"
	"errors"

	"ludwig.com/onlineshopping/internal/svc"
	"ludwig.com/onlineshopping/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type ProductRandomIdListLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewProductRandomIdListLogic(ctx context.Context, svcCtx *svc.ServiceContext) *ProductRandomIdListLogic {
	return &ProductRandomIdListLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

// product/random
func (l *ProductRandomIdListLogic) ProductRandomIdList() (resp *types.RandomProductListResp, err error) {
	_, err = l.ctx.Value("id").(json.Number).Int64()
	if err != nil {
		l.Logger.Error("parse id failed ", err)
		return nil, errors.New("authorization failed")
	}

	var limit int64 = 20
	productList, err := l.svcCtx.Model.ProductModel.RandomFindAllAvailable(l.ctx, limit)
	if err != nil {
		l.Logger.Error("find product for marchant with error", err)
		return nil, errors.New("find failed")
	}

	var responeList []types.Product

	for _, pro := range productList {
		responeList = append(responeList, types.Product{
			ID:            pro.Id,
			Name:          pro.Name,
			MerchantId:    pro.MerchantId,
			AvatarLocator: pro.AvatarLocator,
			ImagesLocator: pro.ImagesLocator,
			Intro:         pro.Intro,
			Price:         pro.Price,
			Amount:        pro.Amount,
			State:         pro.State,
		})
	}

	return &types.RandomProductListResp{
		ProductList: responeList,
	}, nil
}
