package logic

import (
	"context"
	"encoding/json"
	"errors"

	"ludwig.com/onlineshopping/internal/svc"
	"ludwig.com/onlineshopping/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type ActionListLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewActionListLogic(ctx context.Context, svcCtx *svc.ServiceContext) *ActionListLogic {
	return &ActionListLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *ActionListLogic) ActionList() (resp *types.ActionListResp, err error) {
	id, err := l.ctx.Value("id").(json.Number).Int64()
	if err != nil {
		l.Logger.Error("parse id failed ", err)
		return nil, errors.New("authorization failed")
	}

	actions, err := l.svcCtx.Model.ActionModel.FindAllForUser(l.ctx, id)
	if err != nil {
		return nil, errors.New(" find action failed")
	}

	// ActionIdList []int64 `json:"action_id_list"`

	var acitonIdList []int64
	for _, v := range actions {
		acitonIdList = append(acitonIdList, v.Id)
	}

	return &types.ActionListResp{ActionIdList: acitonIdList}, nil
}
