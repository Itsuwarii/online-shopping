package logic

import (
	"context"
	"errors"
	"fmt"

	"ludwig.com/onlineshopping/internal/svc"
	"ludwig.com/onlineshopping/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type MerchantInfoForUserLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewMerchantInfoForUserLogic(ctx context.Context, svcCtx *svc.ServiceContext) *MerchantInfoForUserLogic {
	return &MerchantInfoForUserLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *MerchantInfoForUserLogic) MerchantInfoForUser(req *types.MerchantId) (resp *types.MerchantInfoResp, err error) {

	marchant, err := l.svcCtx.Model.MarchantModel.FindOne(l.ctx, req.Id)
	if err != nil {
		l.Logger.Error("select merchant failed:", err)
		return nil, errors.New("select failed for " + fmt.Sprint(req.Id))
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
