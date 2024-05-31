package logic

import (
	"context"

	"seig.com/onlineshoppingbackend/internal/svc"
	"seig.com/onlineshoppingbackend/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type GetActionRequestLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewGetActionRequestLogic(ctx context.Context, svcCtx *svc.ServiceContext) *GetActionRequestLogic {
	return &GetActionRequestLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *GetActionRequestLogic) GetActionRequest(req *types.GetActionRequest) (resp *types.GetActionReply, err error) {
	// todo: add your logic here and delete this line

	return
}
