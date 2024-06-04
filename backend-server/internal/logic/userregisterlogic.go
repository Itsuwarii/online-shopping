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

type RegisterLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewRegisterLogic(ctx context.Context, svcCtx *svc.ServiceContext) *RegisterLogic {
	return &RegisterLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *RegisterLogic) Register(req *types.RegisterReq) (resp *types.RegisterResp, err error) {
	l.Logger.Info("into register")

	Name := req.Name
	UserModel := l.svcCtx.Model.UserModel
	user, err := UserModel.FindOneByUsername(l.ctx, Name)
	if err != nil {
		l.Logger.Error("check user failed ", err)
		return nil, errors.New("check failed")
	}

	if user != nil {
		l.Logger.Info("register ", Name, " but user existed ", err)
		return nil, errors.New("existed")
	}

	result, err := UserModel.Insert(l.ctx, &model.User{
		Username:      req.Name,
		Password:      req.Password,
		AvatarLocator: "",
		Sex:           req.Sex,
		TelePhone:     req.TelePhone,
		Intro:         req.Intro,
		Date:          time.Now(),
		State:         types.SUCCESS,
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
	jwtToken, err := GetJwtToken(accessSecret, id)
	if err != nil {
		return nil, err
	}

	return &types.RegisterResp{
		State:   types.SUCCESS,
		Message: fmt.Sprint(id) + " registed",
		Auth: types.Auth{
			Token:        jwtToken,
			Expire:       now + accessExpire,
			RefreshAfter: now + accessExpire/2,
		},
	}, nil
}
