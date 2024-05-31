package logic

import (
	"context"

	"seig.com/onlineshoppingbackend/internal/svc"
	"seig.com/onlineshoppingbackend/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type AddActionContentLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewAddActionContentLogic(ctx context.Context, svcCtx *svc.ServiceContext) *AddActionContentLogic {
	return &AddActionContentLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *AddActionContentLogic) AddActionContent(req *types.AddActionContentRequest) error {
	// todo: add your logic here and delete this line

	return nil
}
