package logic

import (
	"context"

	"ludwig.com/onlineshopping/internal/svc"
	"ludwig.com/onlineshopping/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type RegisterNameAvailableLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewRegisterNameAvailableLogic(ctx context.Context, svcCtx *svc.ServiceContext) *RegisterNameAvailableLogic {
	return &RegisterNameAvailableLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *RegisterNameAvailableLogic) RegisterNameAvailable(req *types.NameAvailableReq) (resp *types.NameAvailableResp, err error) {
	// todo: add your logic here and delete this line

	return
}
