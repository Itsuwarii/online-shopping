package logic

import (
	"context"
	"encoding/json"
	"errors"

	"ludwig.com/onlineshopping/internal/svc"
	"ludwig.com/onlineshopping/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type OrderGetForMerchantLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewOrderGetForMerchantLogic(ctx context.Context, svcCtx *svc.ServiceContext) *OrderGetForMerchantLogic {
	return &OrderGetForMerchantLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *OrderGetForMerchantLogic) OrderGetForMerchant() (resp *types.OrderList, err error) {
	merchantId, err := l.ctx.Value("merchantid").(json.Number).Int64()
	if err != nil {
		l.Logger.Error("parse marchant id failed ", err)
		return nil, errors.New("authorization failed")
	}

	result, err := l.svcCtx.Model.OrderModel.FindWithMerchant(l.ctx, merchantId)
	if err != nil {
		return nil, errors.New("failed")
	}

	var orderList []types.Order
	for _, v := range result {
		orderList = append(orderList, types.Order{
			UserId:     v.UserId,
			MerchantId: v.MerchantId,
			Date:       v.Date.Unix(),
			Remark:     v.Remark,
			ProductId:  v.ProductId,
			Number:     v.Number,
		})
	}

	return &types.OrderList{
		OrdersList: orderList,
	}, nil
}
