package logic

import (
	"context"
	"encoding/json"
	"errors"

	"github.com/zeromicro/go-zero/core/logx"
	"ludwig.com/onlineshopping/internal/svc"
)

type CartClearLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewCartClearLogic(ctx context.Context, svcCtx *svc.ServiceContext) *CartClearLogic {
	return &CartClearLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *CartClearLogic) CartClear() error {
	id, err := l.ctx.Value("id").(json.Number).Int64()
	if err != nil {
		l.Logger.Error("parse id failed ", err)
		return errors.New("authorization failed")
	}

	err = l.svcCtx.Model.CartModel.DeleteAll(l.ctx, id)
	if err != nil {
		return errors.New("delete failed")
	}

	return nil
}
