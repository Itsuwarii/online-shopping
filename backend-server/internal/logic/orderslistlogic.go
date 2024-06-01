package logic

import (
	"context"

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

func (l *OrdersListLogic) OrdersList(req *types.DateScope) (resp *types.OrderIdList, err error) {
	// todo: add your logic here and delete this line

	return
}
