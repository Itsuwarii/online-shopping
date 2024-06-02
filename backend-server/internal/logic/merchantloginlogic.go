package logic

import (
	"context"

	"ludwig.com/onlineshopping/internal/svc"
	"ludwig.com/onlineshopping/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type MerchantLoginLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewMerchantLoginLogic(ctx context.Context, svcCtx *svc.ServiceContext) *MerchantLoginLogic {
	return &MerchantLoginLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *MerchantLoginLogic) MerchantLogin(req *types.MerchantLoginReq) (resp *types.MerchantLoginResp, err error) {
	// todo: add your logic here and delete this line

	return
}
