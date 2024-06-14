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

type UserInfoLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewUserInfoLogic(ctx context.Context, svcCtx *svc.ServiceContext) *UserInfoLogic {
	return &UserInfoLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *UserInfoLogic) UserInfo() (resp *types.UserInfoResp, err error) {
	id, err := l.ctx.Value("id").(json.Number).Int64()
	if err != nil {
		l.Logger.Error("parse id failed ", err)
		return nil, errors.New("authorization failed")
	}
	l.Logger.Info("to get user:", fmt.Sprint(id))

	user, err := l.svcCtx.Model.UserModel.FindOne(l.ctx, id)
	if err != nil {
		l.Logger.Error("get user failed:", err)
		return nil, errors.New("find failed for " + fmt.Sprint(id))
	}

	return &types.UserInfoResp{
		Name:          user.Username,
		AvatarLocator: user.AvatarLocator,
		Sex:           user.Sex,
		TelePhone:     user.TelePhone,
		Intro:         user.Intro,
	}, nil
	// {
	// 	"name": "wtf",
	// 	"image_id": "",
	// 	"sex": 0,
	// 	"telephone": 0,
	// 	"desc": ""
	// }
}
