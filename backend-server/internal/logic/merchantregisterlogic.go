package logic

import (
	"context"
	"errors"
	"fmt"
	"time"

	"ludwig.com/onlineshopping/internal/model"
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
	l.Logger.Info("into register")

	Name := req.Name
	marchantModel := l.svcCtx.Model.MarchantModel

	result, err := marchantModel.Insert(l.ctx, &model.Marchant{
		Name:          req.Name,
		Password:      req.Password,
		AvatarLocator: "",
		Licence:       req.Licence,
		TelePhone:     req.TelePhone,
		Intro:         req.Intro,
		Date:          time.Now(),
		State:         types.AVAILABLE,
	})
	if err != nil {
		l.Logger.Info("register ", Name, " but insert failed ", err)
		return nil, errors.New("register failed")
	}

	id, err := result.LastInsertId()
	if err != nil {
		return nil, errors.New("register failed")
	}

	now := time.Now().Unix()
	accessExpire := l.svcCtx.Config.Auth.AccessExpire
	accessSecret := l.svcCtx.Config.Auth.AccessSecret
	jwtToken, err := MerchantGetJwtToken(accessSecret, id)
	if err != nil {
		return nil, err
	}

	return &types.MerchantRegisterResp{
		State:   types.SUCCESS,
		Message: fmt.Sprint(id) + " registed",
		Auth: types.MerchantAuth{
			Token:        jwtToken,
			Expire:       now + accessExpire,
			RefreshAfter: now + accessExpire/2,
		},
	}, nil
}
