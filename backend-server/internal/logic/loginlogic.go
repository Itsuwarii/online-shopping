package logic

import (
	"context"
	"errors"
	"time"

	"ludwig.com/onlineshopping/internal/svc"
	"ludwig.com/onlineshopping/internal/types"

	"github.com/golang-jwt/jwt/v4"
	"github.com/zeromicro/go-zero/core/logx"
)

type LoginLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewLoginLogic(ctx context.Context, svcCtx *svc.ServiceContext) *LoginLogic {
	return &LoginLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func GetJwtToken(secret string, id int64) (jwtToken string, err error) {
	claims := make(jwt.MapClaims)
	claims["id"] = id

	token := jwt.New(jwt.SigningMethodHS256)
	token.Claims = claims
	return token.SignedString([]byte(secret))
}

func (l *LoginLogic) Login(req *types.LoginReq) (resp *types.LoginResp, err error) {
	username := req.Username
	password := req.Password
	l.Logger.Info("username=", username, ",password=", password, " into login")

	userModel := l.svcCtx.Model.UserModel
	user, err := userModel.FindOneByUsername(l.ctx, username)
	if err != nil || user.Password != password {
		l.Logger.Error(err)
		return nil, errors.New("password check failed")
	}

	id := user.Id
	l.Logger.Info(id, " logged success")
	now := time.Now().Unix()
	accessExpire := l.svcCtx.Config.Auth.AccessExpire
	accessSecret := l.svcCtx.Config.Auth.AccessSecret
	jwtToken, err := GetJwtToken(accessSecret, id)
	if err != nil {
		return nil, err
	}

	return &types.LoginResp{
		Id:      user.Id,
		Name:    user.Username,
		State:   types.SUCCESS,
		Message: "logined",
		Auth: types.Auth{
			Token:        jwtToken,
			Expire:       now + accessExpire,
			RefreshAfter: now + accessExpire/2,
		},
	}, nil
}
