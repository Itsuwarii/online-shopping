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
	marchantId, err := l.ctx.Value("marchantid").(json.Number).Int64()
	if err != nil {
		l.Logger.Error("parse marchant id failed ", err)
		return nil, errors.New("authorization failed")
	}
	l.Logger.Info("get info for marchant:", fmt.Sprint(marchantId))

	marchant, err := l.svcCtx.Model.MarchantModel.FindOne(l.ctx, marchantId)
	if err != nil {
		l.Logger.Error("select marchant failed:", err)
		return nil, errors.New("select failed for " + fmt.Sprint(marchantId))
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
