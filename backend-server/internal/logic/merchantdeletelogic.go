package logic

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"

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
	merchantId, err := l.ctx.Value("merchantid").(json.Number).Int64()
	if err != nil {
		l.Logger.Error("parse merchant id failed ", err)
		return nil, errors.New("authorization failed")
	}
	l.Logger.Info("to delete merchant:", fmt.Sprint(merchantId))

	err = l.svcCtx.Model.MarchantModel.Delete(l.ctx, merchantId)
	if err != nil {
		l.Logger.Error("delete merchant failed:", err)
		return nil, errors.New("delete failed for " + fmt.Sprint(merchantId))
	}

	return
}
