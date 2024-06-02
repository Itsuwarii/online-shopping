package logic

import (
	"context"
	"errors"
	"time"

	"ludwig.com/onlineshopping/internal/model"
	"ludwig.com/onlineshopping/internal/svc"
	"ludwig.com/onlineshopping/internal/types"

	"github.com/golang-jwt/jwt/v4"
	"github.com/zeromicro/go-zero/core/logx"
	"github.com/zeromicro/go-zero/core/stores/sqlx"
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

func (l *LoginLogic) getJwtToken(secret string, id int) (jwtToken string, err error) {
	claims := make(jwt.MapClaims)
	claims["id"] = id

	token := jwt.New(jwt.SigningMethodHS256)
	token.Claims = claims
	return token.SignedString([]byte(secret))
}

func (l *LoginLogic) Login(req *types.LoginReq) (resp *types.LoginResp, err error) {
	username := req.Username
	password := req.Password
	l.Logger.Error("username=", username, ",password=", password, " into login")

	conn := sqlx.NewSqlConn("mysql", l.svcCtx.Config.DataSource)
	userModel := model.NewUserModel(conn)
	user, err := userModel.FindOneByUsername(l.ctx, username)
	if err != nil || user.Password != password {
		l.Logger.Error(err)
		return nil, errors.New("password check failed")
	}

	var id int = int(user.Id)
	l.Logger.Error(id, " logged success")
	now := time.Now().Unix()
	accessExpire := l.svcCtx.Config.Auth.AccessExpire
	accessSecret := l.svcCtx.Config.Auth.AccessSecret
	jwtToken, err := l.getJwtToken(accessSecret, id)
	if err != nil {
		return nil, err
	}

	return &types.LoginResp{
		Id:      int(user.Id),
		Name:    user.Username,
		State:   1,
		Message: "logined",
		Auth: types.Auth{
			Token:        jwtToken,
			Expire:       now + accessExpire,
			RefreshAfter: now + accessExpire/2,
		},
	}, nil
}
