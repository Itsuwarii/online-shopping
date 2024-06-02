package logic

import (
	"context"

	"ludwig.com/onlineshopping/internal/svc"
	"ludwig.com/onlineshopping/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type MerchantRegisterNameAvailableLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewMerchantRegisterNameAvailableLogic(ctx context.Context, svcCtx *svc.ServiceContext) *MerchantRegisterNameAvailableLogic {
	return &MerchantRegisterNameAvailableLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *MerchantRegisterNameAvailableLogic) MerchantRegisterNameAvailable(req *types.MerchantNameAvailableReq) (resp *types.MerchantNameAvailableResp, err error) {
	// todo: add your logic here and delete this line

	return
}
