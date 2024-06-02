package logic

import (
	"context"

	"ludwig.com/onlineshopping/internal/svc"
	"ludwig.com/onlineshopping/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type ActionContentLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewActionContentLogic(ctx context.Context, svcCtx *svc.ServiceContext) *ActionContentLogic {
	return &ActionContentLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *ActionContentLogic) ActionContent(req *types.ActionContentReq) (resp *types.ActionContentResp, err error) {
	// todo: add your logic here and delete this line

	return
}
