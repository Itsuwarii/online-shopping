package logic

import (
	"context"

	"ludwig.com/onlineshopping/internal/svc"
	"ludwig.com/onlineshopping/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type MerchantUpdateInfoLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewMerchantUpdateInfoLogic(ctx context.Context, svcCtx *svc.ServiceContext) *MerchantUpdateInfoLogic {
	return &MerchantUpdateInfoLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *MerchantUpdateInfoLogic) MerchantUpdateInfo(req *types.MerchantUpdateInfoReq) (resp *types.MerchantUpdateInfoResp, err error) {
	// todo: add your logic here and delete this line

	return
}
