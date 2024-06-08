package logic

import (
	"context"
	"encoding/json"
	"errors"
	"time"

	"ludwig.com/onlineshopping/internal/model"
	"ludwig.com/onlineshopping/internal/svc"
	"ludwig.com/onlineshopping/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type ProductUpdateLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewProductUpdateLogic(ctx context.Context, svcCtx *svc.ServiceContext) *ProductUpdateLogic {
	return &ProductUpdateLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *ProductUpdateLogic) ProductUpdate(req *types.UpdateProductReq) error {
	merchantId, err := l.ctx.Value("merchantid").(json.Number).Int64()
	if err != nil {
		l.Logger.Error("parse merchant id failed ", err)
		return errors.New("authorization failed")
	}

	old, err := l.svcCtx.Model.ProductModel.FindOne(l.ctx, req.ID)
	if err != nil {
		return errors.New("find old failed")
	}

	if old.MerchantId != merchantId {
		return errors.New("auth failed")
	}

	err = l.svcCtx.Model.ProductModel.Update(l.ctx, &model.Product{
		Id:            req.ID,
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
		l.Logger.Error("update failed", err)
		return errors.New("update failed")
	}

	return nil
}
