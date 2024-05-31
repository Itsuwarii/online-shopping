package logic

import (
	"context"

	"seig.com/onlineshoppingbackend/internal/svc"
	"seig.com/onlineshoppingbackend/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type UserCartLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewUserCartLogic(ctx context.Context, svcCtx *svc.ServiceContext) *UserCartLogic {
	return &UserCartLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *UserCartLogic) UserCart(req *types.UserCartRequest) (resp *types.UserCartReply, err error) {
	// todo: add your logic here and delete this line

	return
}
