package logic

import (
	"context"

	"seig.com/onlineshoppingbackend/internal/svc"
	"seig.com/onlineshoppingbackend/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type PutImageLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewPutImageLogic(ctx context.Context, svcCtx *svc.ServiceContext) *PutImageLogic {
	return &PutImageLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *PutImageLogic) PutImage(req *types.NewImage) (resp *types.ImageId, err error) {
	// todo: add your logic here and delete this line

	return
}
