package logic

import (
	"context"

	"seig.com/onlineshoppingbackend/internal/svc"
	"seig.com/onlineshoppingbackend/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type ProductRandomIdListLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewProductRandomIdListLogic(ctx context.Context, svcCtx *svc.ServiceContext) *ProductRandomIdListLogic {
	return &ProductRandomIdListLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *ProductRandomIdListLogic) ProductRandomIdList() (resp *types.RandomProductIdListResp, err error) {
	// todo: add your logic here and delete this line

	return
}
