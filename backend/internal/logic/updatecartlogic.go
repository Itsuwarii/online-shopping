package logic

import (
	"context"

	"seig.com/onlineshoppingbackend/internal/svc"
	"seig.com/onlineshoppingbackend/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type UpdateCartLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewUpdateCartLogic(ctx context.Context, svcCtx *svc.ServiceContext) *UpdateCartLogic {
	return &UpdateCartLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *UpdateCartLogic) UpdateCart(req *types.Cart) error {
	// todo: add your logic here and delete this line

	return nil
}
