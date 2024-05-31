package logic

import (
	"context"

	"seig.com/onlineshoppingbackend/internal/svc"
	"seig.com/onlineshoppingbackend/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type GetAllProductLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewGetAllProductLogic(ctx context.Context, svcCtx *svc.ServiceContext) *GetAllProductLogic {
	return &GetAllProductLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *GetAllProductLogic) GetAllProduct() (resp *types.GetAllProductReply, err error) {
	// todo: add your logic here and delete this line

	return
}
