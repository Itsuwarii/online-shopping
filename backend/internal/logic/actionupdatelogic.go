package logic

import (
	"context"

	"seig.com/onlineshoppingbackend/internal/svc"
	"seig.com/onlineshoppingbackend/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type ActionUpdateLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewActionUpdateLogic(ctx context.Context, svcCtx *svc.ServiceContext) *ActionUpdateLogic {
	return &ActionUpdateLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *ActionUpdateLogic) ActionUpdate(req *types.UpdateActionReq) error {
	// todo: add your logic here and delete this line

	return nil
}
