package logic

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"

	"ludwig.com/onlineshopping/internal/svc"
	"ludwig.com/onlineshopping/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type ProductDeleteLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewProductDeleteLogic(ctx context.Context, svcCtx *svc.ServiceContext) *ProductDeleteLogic {
	return &ProductDeleteLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *ProductDeleteLogic) ProductDelete(req *types.DeleteProductReq) (err error) {
	merchantId, err := l.ctx.Value("merchantid").(json.Number).Int64()
	if err != nil {
		l.Logger.Error("parse id failed ", err)
		return errors.New("authorization failed")
	}
	l.Logger.Info("marchant delete product", fmt.Sprint(merchantId))

	product, err := l.svcCtx.Model.ProductModel.FindOne(l.ctx, req.ID)
	if err != nil {
		l.Logger.Error("find product failed ", err)
		return errors.New("find product failed")
	}

	if product.MerchantId != merchantId {
		l.Logger.Error("product id check failed ", err)
		return errors.New("product authorization failed")
	}

	err = l.svcCtx.Model.ProductModel.Delete(l.ctx, product.Id)
	if err != nil {
		l.Logger.Error("delete product failed", err)
		return errors.New("delete product failed")
	}

	return
}
