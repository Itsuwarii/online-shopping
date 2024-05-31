package logic

import (
	"context"

	"github.com/zeromicro/go-zero/core/logx"
	"seig.com/onlineshoppingbackend/internal/svc"
)

type ClearCartLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewClearCartLogic(ctx context.Context, svcCtx *svc.ServiceContext) *ClearCartLogic {
	return &ClearCartLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *ClearCartLogic) ClearCart() error {
	// todo: add your logic here and delete this line

	return nil
}
