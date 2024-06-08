package logic

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"

	"ludwig.com/onlineshopping/internal/model"
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
	id, err := l.ctx.Value("merchantid").(json.Number).Int64()
	if err != nil {
		l.Logger.Error("parse id failed ", err)
		return nil, errors.New("authorization failed")
	}
	l.Logger.Info("to update merchant:", fmt.Sprint(id))

	if req.Name == "" {
		return nil, errors.New("marchant cannot empty")
	}

	old, err := l.svcCtx.Model.MarchantModel.FindOne(l.ctx, id)
	if err != nil {
		l.Logger.Error("get marchant failed:", err)
		return nil, errors.New("find failed for " + fmt.Sprint(id) + " failed")
	}

	err = l.svcCtx.Model.MarchantModel.Update(l.ctx, &model.Marchant{
		Id:            id,
		Name:          req.Name,
		Password:      old.Password,
		AvatarLocator: req.AvatarLocator,
		Licence:       req.Licence,
		TelePhone:     req.TelePhone,
		Intro:         req.Intro,
		Date:          old.Date,
		State:         old.State,
	})
	if err != nil {
		l.Logger.Error("update marchant failed:", err)
		return nil, errors.New("update failed for " + fmt.Sprint(id))
	}

	return &types.MerchantUpdateInfoResp{}, nil
}
