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
	merchantId, err := l.ctx.Value("merchantid").(json.Number).Int64()
	if err != nil {
		l.Logger.Error("parse merchant id failed ", err)
		return nil, errors.New("authorization failed")
	}
	l.Logger.Info("get info for merchant:", fmt.Sprint(merchantId))

	marchant, err := l.svcCtx.Model.MarchantModel.FindOne(l.ctx, merchantId)
	if err != nil {
		l.Logger.Error("select merchant failed:", err)
		return nil, errors.New("select failed for " + fmt.Sprint(merchantId))
	}

	return &types.MerchantInfoResp{
		Id:            marchant.Id,
		Name:          marchant.Name,
		AvatarLocator: marchant.AvatarLocator,
		Licence:       marchant.Licence,
		TelePhone:     marchant.TelePhone,
		Intro:         marchant.Intro,
	}, nil
}
