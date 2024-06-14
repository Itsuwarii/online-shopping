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
	// UserId           int64            `json:"user_id"`
	// Remark           string           `json:"remark"`
	// OrderProductList []OrderProduct   `json:"order_product_list"`

	id, err := l.ctx.Value("id").(json.Number).Int64()
	if err != nil {
		l.Logger.Error("parse id failed ", err)
		return nil, errors.New("authorization failed")
	}

	// Id         int64          `db:"Id"`
	// UserId     int64          `db:"UserId"`
	// MerchantId int64          `db:"MerchantId"`
	// Date       time.Time      `db:"Date"`
	// State      int64          `db:"State"`
	// Remark     sql.NullString `db:"Remark"`
	_, err = l.svcCtx.Model.OrderModel.Insert(l.ctx, &model.Order{
		UserId:     id,
		MerchantId: 0,
		Date:       time.Now(),
		ProductId:  req.Number,
		Number:     req.Number,
		State:      types.AVAILABLE,
		Remark:     req.Remark,
	})

	if err != nil {
		return nil, errors.New("create order failed")
	}

	// UserId           int64            `json:"user_id"`
	// MerchantId       int64            `json:"merchant_id"`
	// Date             int64            `json:"date"`
	// State            int64            `json:"state"`
	// Remark           string           `json:"remark"`
	// ProductId        int64		      `json:"product_id"`
	// Number 			 int64  		  `json:"number"`
	return &types.Order{
		UserId:     id,
		MerchantId: 0,
		Date:       time.Now().Unix(),
		ProductId:  req.Number,
		Number:     req.Number,
		State:      types.AVAILABLE,
		Remark:     req.Remark,
	}, nil
}
