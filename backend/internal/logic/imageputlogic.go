package logic

import (
	"context"

	"seig.com/onlineshoppingbackend/internal/svc"
	"seig.com/onlineshoppingbackend/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type ImagePutLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewImagePutLogic(ctx context.Context, svcCtx *svc.ServiceContext) *ImagePutLogic {
	return &ImagePutLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *ImagePutLogic) ImagePut(req *types.NewImage) (resp *types.ImageId, err error) {
	// todo: add your logic here and delete this line

	return
}
