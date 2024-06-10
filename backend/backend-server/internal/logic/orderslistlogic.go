package logic

import (
	"context"
	"encoding/json"
	"errors"

	"ludwig.com/onlineshopping/internal/svc"
	"ludwig.com/onlineshopping/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type OrdersListLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewOrdersListLogic(ctx context.Context, svcCtx *svc.ServiceContext) *OrdersListLogic {
	return &OrdersListLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *OrdersListLogic) OrdersList(req *types.DateScope) (resp *types.OrderList, err error) {
	id, err := l.ctx.Value("id").(json.Number).Int64()
	if err != nil {
		l.Logger.Error("parse id failed ", err)
		return nil, errors.New("authorization failed")
	}

	result, err := l.svcCtx.Model.OrderModel.FindWithUser(l.ctx, id)
	if err != nil {
		return nil, errors.New("failed")
	}

	// UserId           int64            `json:"user_id"`
	// MerchantId       int64            `json:"merchant_id"`
	// Date             int64            `json:"date"`
	// State            int64            `json:"state"`
	// Remark           string           `json:"remark"`
	// ProductId        int64		      `json:"product_id"`
	// Number 			 int64  		  `json:"number"`
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
