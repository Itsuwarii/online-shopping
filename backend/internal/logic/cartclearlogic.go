package logic

import (
	"context"

	"github.com/zeromicro/go-zero/core/logx"
	"seig.com/onlineshoppingbackend/internal/svc"
)

type CartClearLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewCartClearLogic(ctx context.Context, svcCtx *svc.ServiceContext) *CartClearLogic {
	return &CartClearLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *CartClearLogic) CartClear() error {
	// todo: add your logic here and delete this line

	return nil
}
