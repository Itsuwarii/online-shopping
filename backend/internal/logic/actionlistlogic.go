package logic

import (
	"context"

	"seig.com/onlineshoppingbackend/internal/svc"
	"seig.com/onlineshoppingbackend/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type ActionListLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewActionListLogic(ctx context.Context, svcCtx *svc.ServiceContext) *ActionListLogic {
	return &ActionListLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *ActionListLogic) ActionList() (resp *types.ActionListResp, err error) {
	// todo: add your logic here and delete this line

	return
}
