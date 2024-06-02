package logic

import (
	"context"
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

func (l *LoginLogic) getJwtToken(secret string, id int64, cartId int64) (jwtToken string, err error) {
	claims := make(jwt.MapClaims)
	claims["id"] = id
	claims["cart_id"] = cartId

	token := jwt.New(jwt.SigningMethodHS256)
	token.Claims = claims
	return token.SignedString([]byte(secret))
}

func (l *LoginLogic) Login(req *types.LoginReq) (resp *types.LoginResp, err error) {
	username := req.Username
	// password := req.Password
	l.Logger.Info(username, " into login")

	var id int64 = 123
	var cartId int64 = 123

	l.Logger.Info(id, " logged success")
	now := time.Now().Unix()
	accessExpire := l.svcCtx.Config.Auth.AccessExpire
	accessSecret := l.svcCtx.Config.Auth.AccessSecret
	jwtToken, err := l.getJwtToken(accessSecret, id, cartId)
	if err != nil {
		return nil, err
	}

	return &types.LoginResp{
		Id:      123,
		Name:    "wtf",
		State:   1,
		Message: "ok",
		Auth: types.Auth{
			Token:        jwtToken,
			Expire:       now + accessExpire,
			RefreshAfter: now + accessExpire/2,
		},
	}, nil
}
