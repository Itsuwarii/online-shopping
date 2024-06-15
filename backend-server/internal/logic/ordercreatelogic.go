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

type OrderCreateLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewOrderCreateLogic(ctx context.Context, svcCtx *svc.ServiceContext) *OrderCreateLogic {
	return &OrderCreateLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *OrderCreateLogic) OrderCreate(req *types.NewOrder) (resp *types.Order, err error) {
	// 	Remark           string           `json:"remark"`
	// Product       Product		  `json:"product"`
	id, err := l.ctx.Value("id").(json.Number).Int64()
	if err != nil {
		l.Logger.Error("parse id failed ", err)
		return nil, errors.New("authorization failed")
	}

	d := time.Now()
	_, err = l.svcCtx.Model.OrderModel.Insert(l.ctx, &model.Order{
		UserId:     id,
		MerchantId: req.Product.MerchantId,
		Date:       d,
		ProductId:  req.Product.ID,
		Price:      req.Product.Price * float64(req.Product.Amount),
		Number:     req.Product.Amount,
		State:      types.AVAILABLE,
		Remark:     req.Remark,
	})

	if err != nil {
		l.Logger.Error(err)
		return nil, errors.New("create order failed")
	}

	return &types.Order{
		UserId:     id,
		MerchantId: req.Product.MerchantId,
		Date:       d.Unix(),
		ProductId:  req.Product.ID,
		Price:      req.Product.Price * float64(req.Product.Amount),
		Number:     req.Product.Amount,
		State:      types.AVAILABLE,
		Remark:     req.Remark,
	}, nil
}
