package logic

import (
	"context"

	"seig.com/onlineshoppingbackend/internal/svc"
	"seig.com/onlineshoppingbackend/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type DeleteActionLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewDeleteActionLogic(ctx context.Context, svcCtx *svc.ServiceContext) *DeleteActionLogic {
	return &DeleteActionLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *DeleteActionLogic) DeleteAction(req *types.DeleteActionReq) error {
	// todo: add your logic here and delete this line

	return nil
}
