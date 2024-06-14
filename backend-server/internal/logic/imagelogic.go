package logic

import (
	"context"
	"os"

	"ludwig.com/onlineshopping/internal/svc"
	"ludwig.com/onlineshopping/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type ImageLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewImageLogic(ctx context.Context, svcCtx *svc.ServiceContext) *ImageLogic {
	return &ImageLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *ImageLogic) Image(req *types.ImageIndex) (resp *types.ImageResp, err error) {
	hash := req.ImageHash

	dir := l.svcCtx.Config.ImageDir
	filePath := dir + hash

	imageByte, err := os.ReadFile(filePath)
	if err != nil {
		l.Logger.Error("File ", filePath, " open failed")
		return nil, err
	}

	return &types.ImageResp{
		ImageHash:   hash,
		ImageBase64: string(imageByte),
	}, nil
}
