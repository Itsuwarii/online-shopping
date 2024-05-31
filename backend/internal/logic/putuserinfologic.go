package logic

import (
	"context"

	"seig.com/onlineshoppingbackend/internal/svc"
	"seig.com/onlineshoppingbackend/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type PutUserInfoLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewPutUserInfoLogic(ctx context.Context, svcCtx *svc.ServiceContext) *PutUserInfoLogic {
	return &PutUserInfoLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *PutUserInfoLogic) PutUserInfo(req *types.PutUserInfoRequest) error {
	// todo: add your logic here and delete this line

	return nil
}
