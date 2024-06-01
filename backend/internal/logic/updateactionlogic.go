package logic

import (
	"context"

	"seig.com/onlineshoppingbackend/internal/svc"
	"seig.com/onlineshoppingbackend/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type UpdateActionLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewUpdateActionLogic(ctx context.Context, svcCtx *svc.ServiceContext) *UpdateActionLogic {
	return &UpdateActionLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *UpdateActionLogic) UpdateAction(req *types.UpdateActionReq) error {
	// todo: add your logic here and delete this line

	return nil
}
