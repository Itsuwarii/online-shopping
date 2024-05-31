package logic

import (
	"context"

	"seig.com/onlineshoppingbackend/internal/svc"
	"seig.com/onlineshoppingbackend/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type GetActionListLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewGetActionListLogic(ctx context.Context, svcCtx *svc.ServiceContext) *GetActionListLogic {
	return &GetActionListLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *GetActionListLogic) GetActionList() (resp *types.GetActionListReply, err error) {
	// todo: add your logic here and delete this line

	return
}
