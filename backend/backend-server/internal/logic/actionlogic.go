package logic

import (
	"context"
	"errors"

	"ludwig.com/onlineshopping/internal/svc"
	"ludwig.com/onlineshopping/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type ActionLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewActionLogic(ctx context.Context, svcCtx *svc.ServiceContext) *ActionLogic {
	return &ActionLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *ActionLogic) Action(req *types.ActionReq) (resp *types.ActionResp, err error) {

	// id, err := l.ctx.Value("id").(json.Number).Int64()
	// if err != nil {
	// 	id, err = l.ctx.Value("merchantid").(json.Number).Int64()
	// 	if err != nil {
	// 		l.Logger.Error("parse marchant id failed ", err)
	// 		return nil, errors.New("authorization failed")
	// 	}
	// }

	// id, err := l.ctx.Value("id").(json.Number).Int64()
	// if err != nil {
	// 	l.Logger.Error("parse id failed ", err)
	// 	return nil, errors.New("authorization failed")
	// }

	action, err := l.svcCtx.Model.ActionModel.FindOne(l.ctx, req.ActionID)
	if err != nil {
		return nil, errors.New("find action failed")
	}

	// ActionID   int64 `json:"action_id"`
	// UserId     int64 `json:"user_id"`
	// MerchantId int64 `json:"merchant_id"`
	return &types.ActionResp{
		ActionID:   action.Id,
		MerchantId: action.MerchantId,
		UserId:     action.UserId,
	}, nil

}
