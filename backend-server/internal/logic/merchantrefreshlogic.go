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

type MerchantRefreshLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewMerchantRefreshLogic(ctx context.Context, svcCtx *svc.ServiceContext) *MerchantRefreshLogic {
	return &MerchantRefreshLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *MerchantRefreshLogic) MerchantRefresh() (resp *types.MerchantAuth, err error) {
	merchantId, err := l.ctx.Value("merchantid").(json.Number).Int64()
	if err != nil {
		l.Logger.Error("parse marchant id failed ", err)
		return nil, errors.New("authorization failed")
	}
	l.Logger.Info("to refresh auth:", fmt.Sprint(merchantId))

	now := time.Now().Unix()
	accessExpire := l.svcCtx.Config.Auth.AccessExpire
	accessSecret := l.svcCtx.Config.Auth.AccessSecret
	jwtToken, err := MerchantGetJwtToken(accessSecret, merchantId)
	if err != nil {
		return nil, err
	}

	return &types.MerchantAuth{
		Token:        jwtToken,
		Expire:       now + accessExpire,
		RefreshAfter: now + accessExpire/2,
	}, nil
}
