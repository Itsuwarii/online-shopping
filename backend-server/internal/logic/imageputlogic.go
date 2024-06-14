package logic

import (
	"context"
	"crypto/sha256"
	"encoding/hex"
	"os"

	"ludwig.com/onlineshopping/internal/svc"
	"ludwig.com/onlineshopping/internal/types"

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

func Exists(path string) bool {
	_, err := os.Stat(path) //os.Stat获取文件信息
	if err != nil {
		return os.IsExist(err)
	}
	return true
}

func (l *ImagePutLogic) ImagePut(req *types.ImageReq) (resp *types.ImageIndex, err error) {
	imageBase64Byte := []byte(req.ImageBase64)

	hashByte := sha256.Sum256(imageBase64Byte)
	hash := hex.EncodeToString(hashByte[:])

	// Write to local path
	dir := l.svcCtx.Config.ImageDir
	fileName := dir + hash

	l.Logger.Info(fileName + " to write")
	if Exists(hash) {
		return &types.ImageIndex{
			ImageHash: hash,
			Message:   "File existed",
		}, nil
	}

	err = os.WriteFile(fileName, imageBase64Byte, 0666)
	if err != nil {
		l.Logger.Error(err)
		return nil, err
	}

	return &types.ImageIndex{
		ImageHash: hash,
		Message:   "Writed success",
	}, nil
}
