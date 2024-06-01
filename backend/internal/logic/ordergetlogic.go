package logic

import (
	"context"

	"seig.com/onlineshoppingbackend/internal/svc"
	"seig.com/onlineshoppingbackend/internal/types"

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
	// todo: add your logic here and delete this line

	return
}
