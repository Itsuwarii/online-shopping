package logic

import (
	"context"
	"encoding/json"
	"errors"

	"ludwig.com/onlineshopping/internal/svc"
	"ludwig.com/onlineshopping/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type ActionDeleteLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewActionDeleteLogic(ctx context.Context, svcCtx *svc.ServiceContext) *ActionDeleteLogic {
	return &ActionDeleteLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *ActionDeleteLogic) ActionDelete(req *types.ActionDeleteReq) error {
	id, err := l.ctx.Value("id").(json.Number).Int64()
	if err != nil {
		l.Logger.Error("parse id failed ", err)
		return errors.New("authorization failed")
	}

	actionId := req.ActionID

	action, err := l.svcCtx.Model.ActionModel.FindOne(l.ctx, actionId)
	if err != nil {
		return errors.New("delete action failed")
	}

	if action.UserId != id {
		return errors.New("owner authorization failed")
	}

	err = l.svcCtx.Model.ActionModel.Delete(l.ctx, actionId)
	if err != nil {
		return errors.New("delete action failed")
	}

	return nil
}
