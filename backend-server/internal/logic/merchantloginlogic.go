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

type MerchantLoginLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewMerchantLoginLogic(ctx context.Context, svcCtx *svc.ServiceContext) *MerchantLoginLogic {
	return &MerchantLoginLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func MerchantGetJwtToken(secret string, id int64) (jwtToken string, err error) {
	claims := make(jwt.MapClaims)
	claims["merchantid"] = id

	token := jwt.New(jwt.SigningMethodHS256)
	token.Claims = claims
	return token.SignedString([]byte(secret))
}

func (l *MerchantLoginLogic) MerchantLogin(req *types.MerchantLoginReq) (resp *types.MerchantLoginResp, err error) {
	name := req.MarchantName
	password := req.Password
	l.Logger.Info("merchant name=", name, ",password=", password, " into login")

	marchant, err := l.svcCtx.Model.MarchantModel.FindOneByName(l.ctx, name)
	if err != nil || marchant.Password != password {
		l.Logger.Error(err)
		return nil, errors.New("password check failed")
	}

	id := marchant.Id
	l.Logger.Info(id, " logged success")
	now := time.Now().Unix()
	accessExpire := l.svcCtx.Config.Auth.AccessExpire
	accessSecret := l.svcCtx.Config.Auth.AccessSecret
	jwtToken, err := MerchantGetJwtToken(accessSecret, id)
	if err != nil {
		return nil, err
	}

	return &types.MerchantLoginResp{
		Id:      marchant.Id,
		Name:    marchant.Name,
		State:   types.SUCCESS,
		Message: "logined",
		Auth: types.MerchantAuth{
			Token:        jwtToken,
			Expire:       now + accessExpire,
			RefreshAfter: now + accessExpire/2,
		},
	}, nil
}
