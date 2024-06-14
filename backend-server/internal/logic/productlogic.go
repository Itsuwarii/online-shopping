package logic

import (
	"context"
	"errors"

	"ludwig.com/onlineshopping/internal/svc"
	"ludwig.com/onlineshopping/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type ProductLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewProductLogic(ctx context.Context, svcCtx *svc.ServiceContext) *ProductLogic {
	return &ProductLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

// product/
// {"id":2}
func (l *ProductLogic) Product(req *types.ProductId) (resp *types.Product, err error) {
	// merchantId, err := l.ctx.Value("merchantid").(json.Number).Int64()
	// if err != nil {
	// 	l.Logger.Error("parse id failed ", err)
	// 	return nil, errors.New("authorization failed")
	// }

	product, err := l.svcCtx.Model.ProductModel.FindOne(l.ctx, req.Id)
	if err != nil {
		return nil, errors.New("find failed")
	}

	if product.State != types.AVAILABLE {
		return nil, errors.New("unavailable")
	}

	return &types.Product{
		ID:            product.Id,
		Name:          product.Name,
		MerchantId:    product.MerchantId,
		AvatarLocator: product.AvatarLocator,
		ImagesLocator: product.ImagesLocator,
		Intro:         product.Intro,
		Price:         product.Price,
		Amount:        product.Amount,
		State:         product.State,
	}, nil
}
