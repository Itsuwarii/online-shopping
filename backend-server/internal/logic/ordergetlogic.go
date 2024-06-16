package logic

import (
	"context"
	"errors"

	"ludwig.com/onlineshopping/internal/svc"
	"ludwig.com/onlineshopping/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type OrderGetLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewOrderGetLogic(ctx context.Context, svcCtx *svc.ServiceContext) *OrderGetLogic {
	return &OrderGetLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *OrderGetLogic) OrderGet(req *types.OrderId) (resp *types.Order, err error) {
	// id, err := l.ctx.Value("id").(json.Number).Int64()
	// if err != nil {
	// 	l.Logger.Error("parse id failed ", err)
	// 	return nil, errors.New("authorization failed")
	// }

	result, err := l.svcCtx.Model.OrderModel.FindOne(l.ctx, req.Id)
	if err != nil {
		return nil, errors.New("find order failed")
	}

	// UserId           int64            `json:"user_id"`
	// MerchantId       int64            `json:"merchant_id"`
	// Date             int64            `json:"date"`
	// State            int64            `json:"state"`
	// Remark           string           `json:"remark"`
	// ProductId        int64		      `json:"product_id"`
	// Number 			 int64  		  `json:"number"`
	return &types.Order{
		Id:         result.Id,
		UserId:     result.UserId,
		MerchantId: result.MerchantId,
		Date:       result.Date.Unix(),
		State:      result.OState,
		Price:      result.Price,
		Remark:     result.Remark,
		ProductId:  result.ProductId,
		Number:     result.Number,
	}, nil
}
