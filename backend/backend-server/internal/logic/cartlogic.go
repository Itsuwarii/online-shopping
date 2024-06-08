package logic

import (
	"context"

	"ludwig.com/onlineshopping/internal/svc"
	"ludwig.com/onlineshopping/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type CartLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewCartLogic(ctx context.Context, svcCtx *svc.ServiceContext) *CartLogic {
	return &CartLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *CartLogic) Cart() (resp *types.Cart, err error) {
	// todo: add your logic here and delete this line

	return
}
