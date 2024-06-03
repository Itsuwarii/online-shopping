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

type UserInfoUpdateLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewUpdateUserInfoLogic(ctx context.Context, svcCtx *svc.ServiceContext) *UserInfoUpdateLogic {
	return &UserInfoUpdateLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *UserInfoUpdateLogic) UpdateUserInfo(req *types.UserInfoUpdateReq) (resp *types.UserInfoUpdateResp, err error) {
	id, err := l.ctx.Value("id").(json.Number).Int64()
	if err != nil {
		l.Logger.Error("parse id failed ", err)
		return nil, errors.New("authorization failed")
	}
	l.Logger.Info("to update user:", fmt.Sprint(id))

	if req.Name == "" {
		return nil, errors.New("username cannot use null")
	}

	old, err := l.svcCtx.Model.UserModel.FindOne(l.ctx, id)
	if err != nil {
		l.Logger.Error("get user failed:", err)
		return nil, errors.New("find failed for " + fmt.Sprint(id) + " failed")
	}

	err = l.svcCtx.Model.UserModel.Update(l.ctx, &model.User{
		Id:        id,
		Username:  req.Name,
		Password:  old.Password,
		ImageId:   req.ImageId,
		Sex:       req.Sex,
		TelePhone: req.TelePhone,
		Intro:     req.Intro,
		Data:      old.Data,
		State:     old.State,
	})
	if err != nil {
		l.Logger.Error("update user failed:", err)
		return nil, errors.New("update failed for " + fmt.Sprint(id))
	}

	return
}
