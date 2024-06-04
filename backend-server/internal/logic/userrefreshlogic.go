package logic

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"time"

	"ludwig.com/onlineshopping/internal/svc"
	"ludwig.com/onlineshopping/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type RefreshLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewRefreshLogic(ctx context.Context, svcCtx *svc.ServiceContext) *RefreshLogic {
	return &RefreshLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *RefreshLogic) Refresh() (resp *types.Auth, err error) {
	id, err := l.ctx.Value("id").(json.Number).Int64()
	if err != nil {
		l.Logger.Error("parse id failed ", err)
		return nil, errors.New("authorization failed")
	}
	l.Logger.Info("to refresh auth:", fmt.Sprint(id))

	now := time.Now().Unix()
	accessExpire := l.svcCtx.Config.Auth.AccessExpire
	accessSecret := l.svcCtx.Config.Auth.AccessSecret
	jwtToken, err := GetJwtToken(accessSecret, id)
	if err != nil {
		return nil, err
	}

	return &types.Auth{
		Token:        jwtToken,
		Expire:       now + accessExpire,
		RefreshAfter: now + accessExpire/2,
	}, nil
}
