package logic

import (
	"context"

	"seig.com/onlineshoppingbackend/internal/svc"
	"seig.com/onlineshoppingbackend/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type GetImageLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewGetImageLogic(ctx context.Context, svcCtx *svc.ServiceContext) *GetImageLogic {
	return &GetImageLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *GetImageLogic) GetImage(req *types.GetImageRequest) (resp *types.GetImageReply, err error) {
	// todo: add your logic here and delete this line

	return
}
