package logic

import (
	"context"

	"seig.com/onlineshoppingbackend/internal/svc"
	"seig.com/onlineshoppingbackend/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type ProductLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewProductLogic(ctx context.Context, svcCtx *svc.ServiceContext) *ProductLogic {
	return &ProductLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *ProductLogic) Product(req *types.ProductId) (resp *types.Product, err error) {
	// todo: add your logic here and delete this line

	return
}
