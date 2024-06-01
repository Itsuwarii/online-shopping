package logic

import (
	"context"

	"seig.com/onlineshoppingbackend/internal/svc"
	"seig.com/onlineshoppingbackend/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type RandomProductIdListLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewRandomProductIdListLogic(ctx context.Context, svcCtx *svc.ServiceContext) *RandomProductIdListLogic {
	return &RandomProductIdListLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *RandomProductIdListLogic) RandomProductIdList() (resp *types.RandomProductIdListResp, err error) {
	// todo: add your logic here and delete this line

	return
}
