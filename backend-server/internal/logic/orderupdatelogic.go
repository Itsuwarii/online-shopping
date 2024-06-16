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

type OrderUpdateLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewOrderUpdateLogic(ctx context.Context, svcCtx *svc.ServiceContext) *OrderUpdateLogic {
	return &OrderUpdateLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *OrderUpdateLogic) OrderUpdate(req *types.Order) (err error) {
	merchantId, err := l.ctx.Value("merchantid").(json.Number).Int64()
	if err != nil {
		l.Logger.Error("parse marchant id failed ", err)
		return errors.New("authorization failed")
	}

	if req.MerchantId != merchantId {
		return errors.New("merchant authorization failed")
	}

	err = l.svcCtx.Model.OrderModel.Update(l.ctx, &model.Order{
		Id:         req.Id,
		UserId:     req.UserId,
		MerchantId: req.MerchantId,
		Date:       time.Unix(req.Date, 0),
		OState:     req.State,
		ProductId:  req.ProductId,
		Price:      req.Price,
		Number:     req.Number,
		Remark:     req.Remark,
	})

	if err != nil {
		l.Logger.Error(err)
		return errors.New("update order failed")
	}

	return nil
}
