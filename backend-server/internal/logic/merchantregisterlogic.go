package logic

import (
	"context"

	"ludwig.com/onlineshopping/internal/svc"
	"ludwig.com/onlineshopping/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type MerchantRegisterLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewMerchantRegisterLogic(ctx context.Context, svcCtx *svc.ServiceContext) *MerchantRegisterLogic {
	return &MerchantRegisterLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *MerchantRegisterLogic) MerchantRegister(req *types.MerchantRegisterReq) (resp *types.MerchantRegisterResp, err error) {
	

	return
}
