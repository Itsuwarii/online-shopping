package logic

import (
	"context"

	"seig.com/onlineshoppingbackend/internal/svc"
	"seig.com/onlineshoppingbackend/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type CreateActionLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewCreateActionLogic(ctx context.Context, svcCtx *svc.ServiceContext) *CreateActionLogic {
	return &CreateActionLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *CreateActionLogic) CreateAction(req *types.NewActionReq) (resp *types.NewActionResp, err error) {
	// todo: add your logic here and delete this line

	return
}
