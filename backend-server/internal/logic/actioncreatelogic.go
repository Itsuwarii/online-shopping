package logic

import (
	"context"

	"ludwig.com/onlineshopping/internal/svc"
	"ludwig.com/onlineshopping/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type ActionCreateLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewActionCreateLogic(ctx context.Context, svcCtx *svc.ServiceContext) *ActionCreateLogic {
	return &ActionCreateLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *ActionCreateLogic) ActionCreate(req *types.NewActionReq) (resp *types.NewActionResp, err error) {
	// todo: add your logic here and delete this line

	return
}
