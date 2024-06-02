package logic

import (
	"context"

	"ludwig.com/onlineshopping/internal/svc"
	"ludwig.com/onlineshopping/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type MerchantDeleteLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewMerchantDeleteLogic(ctx context.Context, svcCtx *svc.ServiceContext) *MerchantDeleteLogic {
	return &MerchantDeleteLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *MerchantDeleteLogic) MerchantDelete(req *types.MerchantDeleteReq) (resp *types.MerchantDeleteResp, err error) {
	// todo: add your logic here and delete this line

	return
}
