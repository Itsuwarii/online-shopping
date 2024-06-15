package logic

import (
	"context"
	"encoding/json"
	"errors"

	"ludwig.com/onlineshopping/internal/svc"
	"ludwig.com/onlineshopping/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type ProductForMerchantLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewProductForMerchantLogic(ctx context.Context, svcCtx *svc.ServiceContext) *ProductForMerchantLogic {
	return &ProductForMerchantLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

// /product/all
func (l *ProductForMerchantLogic) ProductForMerchant(req *types.ProductListReq) (resp *types.ProductListResp, err error) {
	// var merchantId int64 = 1
	merchantId, err := l.ctx.Value("merchantid").(json.Number).Int64()
	if err != nil {
		l.Logger.Error("parse marchant id failed ", err)
		return nil, errors.New("authorization failed")
	}

	offset := req.Index
	limit := req.Size

	productList, err := l.svcCtx.Model.ProductModel.FindProductForMerchant(l.ctx, merchantId, offset, limit)
	if err != nil {
		l.Logger.Error("find product for marchant with error", err)
		return &types.ProductListResp{
			ProductList: nil,
		}, errors.New("find error")
	}

	var responeList []types.Product

	for _, pro := range productList {
		if pro.State == types.AVAILABLE {
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
	}

	return &types.ProductListResp{
		ProductList: responeList,
	}, nil
}
