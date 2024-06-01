package logic

import (
	"context"

	"seig.com/onlineshoppingbackend/internal/svc"
	"seig.com/onlineshoppingbackend/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type ProductUpdateLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewProductUpdateLogic(ctx context.Context, svcCtx *svc.ServiceContext) *ProductUpdateLogic {
	return &ProductUpdateLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *ProductUpdateLogic) ProductUpdate(req *types.UpdateProductReq) error {
	// todo: add your logic here and delete this line

	return nil
}
