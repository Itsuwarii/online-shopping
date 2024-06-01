package logic

import (
	"context"

	"ludwig.com/onlineshopping/internal/svc"
	"ludwig.com/onlineshopping/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type ActionDeleteLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewActionDeleteLogic(ctx context.Context, svcCtx *svc.ServiceContext) *ActionDeleteLogic {
	return &ActionDeleteLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *ActionDeleteLogic) ActionDelete(req *types.DeleteActionReq) error {
	// todo: add your logic here and delete this line

	return nil
}
