package logic

import (
	"context"

	"ludwig.com/onlineshopping/internal/svc"
	"ludwig.com/onlineshopping/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type MerchantRefreshLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewMerchantRefreshLogic(ctx context.Context, svcCtx *svc.ServiceContext) *MerchantRefreshLogic {
	return &MerchantRefreshLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *MerchantRefreshLogic) MerchantRefresh() (resp *types.MerchantAuth, err error) {
	// todo: add your logic here and delete this line

	return
}
