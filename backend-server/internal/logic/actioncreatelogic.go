package logic

import (
	"context"
	"encoding/json"
	"errors"

	"ludwig.com/onlineshopping/internal/model"
	"ludwig.com/onlineshopping/internal/svc"
	"ludwig.com/onlineshopping/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type ActionCreateLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewActionCreateLogic(ctx context.Context, svcCtx *svc.ServiceContext) *ActionCreateLogic {
	return &ActionCreateLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *ActionCreateLogic) ActionCreate(req *types.ActionCreateReq) (resp *types.ActionCreateResp, err error) {
	id, err := l.ctx.Value("id").(json.Number).Int64()
	if err != nil {
		l.Logger.Error("parse id failed ", err)
		return nil, errors.New("authorization failed")
	}

	// MerchantId int64 `json:"merchant_id"`

	// Id         int64 `db:"Id"`
	// UserId     int64 `db:"UserId"`
	// MerchantId int64 `db:"MerchantId"`
	result, err := l.svcCtx.Model.ActionModel.Insert(l.ctx, &model.Action{
		UserId:     id,
		MerchantId: req.MerchantId,
	})
	if err != nil {
		return nil, errors.New("create action failed")
	}

	actionId, err := result.LastInsertId()
	if err != nil {
		return nil, errors.New("create action failed")
	}

	// // Id        int64     `db:"Id"`
	// // ContentId int64     `db:"ContentId"`
	// // OwnerId   int64     `db:"OwnerId"`
	// // Date      time.Time `db:"Date"`
	// // Text      string    `db:"Text"`
	// l.svcCtx.Model.ActionContentModel.Insert(l.ctx, &model.ActionContent{
	// 	ActionId: actionId,
	// 	OwnerId:  id,
	// })

	return &types.ActionCreateResp{
		ActionID: actionId,
	}, nil
}
