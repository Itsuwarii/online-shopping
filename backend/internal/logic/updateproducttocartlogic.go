package logic

import (
	"context"

	"seig.com/onlineshoppingbackend/internal/svc"
	"seig.com/onlineshoppingbackend/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type UpdateProductToCartLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewUpdateProductToCartLogic(ctx context.Context, svcCtx *svc.ServiceContext) *UpdateProductToCartLogic {
	return &UpdateProductToCartLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *UpdateProductToCartLogic) UpdateProductToCart(req *types.UpdateProductToCartRequest) error {
	// todo: add your logic here and delete this line

	return nil
}
