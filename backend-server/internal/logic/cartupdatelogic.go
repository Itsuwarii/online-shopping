package logic

import (
	"context"
	"encoding/json"
	"errors"
	"time"

	"ludwig.com/onlineshopping/internal/model"
	"ludwig.com/onlineshopping/internal/svc"
	"ludwig.com/onlineshopping/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type CartUpdateLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewCartUpdateLogic(ctx context.Context, svcCtx *svc.ServiceContext) *CartUpdateLogic {
	return &CartUpdateLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *CartUpdateLogic) CartUpdate(req *types.Cart) error {
	id, err := l.ctx.Value("id").(json.Number).Int64()
	if err != nil {
		l.Logger.Error("parse id failed ", err)
		return errors.New("authorization failed")
	}

	l.svcCtx.Model.CartModel.DeleteAll(l.ctx, id)

	time := time.Now()

	// UserId    int64     `db:"UserId"`
	// ProductId int64     `db:"ProductId"`
	// Number    int64     `db:"Number"`
	// Data      time.Time `db:"Data"`
	for _, v := range req.CartProductList {
		_, err := l.svcCtx.Model.CartModel.Insert(l.ctx, &model.Cart{
			UserId:    id,
			ProductId: v.ProductId,
			Number:    v.Number,
			Data:      time,
		})

		if err != nil {
			return errors.New("failed")
		}
	}

	return nil
}
