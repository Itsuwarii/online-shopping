package logic

import (
	"context"

	"ludwig.com/onlineshopping/internal/svc"
	"ludwig.com/onlineshopping/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type MerchantInfoLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewMerchantInfoLogic(ctx context.Context, svcCtx *svc.ServiceContext) *MerchantInfoLogic {
	return &MerchantInfoLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *MerchantInfoLogic) MerchantInfo() (resp *types.MerchantInfoResp, err error) {
	// todo: add your logic here and delete this line

	return
}
