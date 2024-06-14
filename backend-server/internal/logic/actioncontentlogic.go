package logic

import (
	"context"
	"errors"

	"ludwig.com/onlineshopping/internal/svc"
	"ludwig.com/onlineshopping/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type ActionContentLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewActionContentLogic(ctx context.Context, svcCtx *svc.ServiceContext) *ActionContentLogic {
	return &ActionContentLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *ActionContentLogic) ActionContent(req *types.ActionContentReq) (resp *types.ActionContentResp, err error) {
	// id, err := l.ctx.Value("id").(json.Number).Int64()
	// if err != nil {
	// 	// l.Logger.Error("parse id failed ", err)
	// 	id, err := l.ctx.Value("merchantid").(json.Number).Int64()
	// 	if err != nil {
	// 		l.Logger.Error("parse marchant id failed ", err)
	// 		return nil, errors.New("authorization failed")
	// 	}
	// }

	// ActionID  int64   `json:"Action_id"`
	// StartTime int64 `json:"start_time"`
	// EndTime   int64 `json:"end_time"`
	result, err := l.svcCtx.Model.ActionContentModel.FindForDate(l.ctx, req.ActionID, req.StartTime, req.EndTime)
	if err != nil {
		return nil, errors.New("find failed")
	}

	// OwnerId int64  `json:"owner"`
	// Date    int64  `json:"date"`
	// Text    string `json:"text"`
	var resultList []types.Content

	for _, content := range result {
		resultList = append(resultList, types.Content{
			OwnerId: content.OwnerId,
			Date:    content.Date.Unix(),
			Text:    content.Text,
		})
	}

	return &types.ActionContentResp{
		ActionID:     req.ActionID,
		Content_List: resultList,
	}, nil
}
