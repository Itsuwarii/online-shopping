package logic

import (
	"context"
	"errors"

	"ludwig.com/onlineshopping/internal/svc"
	"ludwig.com/onlineshopping/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type OrderDeleteLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewOrderDeleteLogic(ctx context.Context, svcCtx *svc.ServiceContext) *OrderDeleteLogic {
	return &OrderDeleteLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *OrderDeleteLogic) OrderDelete(req *types.OrderId) error {
	// id, err := l.ctx.Value("id").(json.Number).Int64()
	// if err != nil {
	// 	l.Logger.Error("parse id failed ", err)
	// 	return errors.New("authorization failed")
	// }

	err := l.svcCtx.Model.OrderModel.Delete(l.ctx, req.Id)
	if err != nil {
		return errors.New("order delete failed")
	}

	return nil
}
