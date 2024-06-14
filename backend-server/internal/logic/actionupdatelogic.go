package logic

import (
	"context"
	"errors"
	"time"

	"ludwig.com/onlineshopping/internal/model"
	"ludwig.com/onlineshopping/internal/svc"
	"ludwig.com/onlineshopping/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type ActionUpdateLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewActionUpdateLogic(ctx context.Context, svcCtx *svc.ServiceContext) *ActionUpdateLogic {
	return &ActionUpdateLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *ActionUpdateLogic) ActionUpdate(req *types.ActionUpdateReq) error {
	// type ActionUpdateReq struct {
	// 	ActionID int64     `json:"action_id"`
	// 	Content  Content `json:"content"`
	// }

	// id, err := l.ctx.Value("id").(json.Number).Int64()
	// if err != nil {
	// 	l.Logger.Error("parse id failed ", err)
	// 	return errors.New("authorization failed")
	// }

	// Id        int64     `db:"Id"`
	// ActionId int64      `db:"ActionId"`
	// OwnerId   int64     `db:"OwnerId"`
	// Date      time.Time `db:"Date"`
	// Text      string    `db:"Text"`
	_, err := l.svcCtx.Model.ActionContentModel.Insert(l.ctx, &model.ActionContent{
		ActionId: req.ActionID,
		OwnerId:  req.Content.OwnerId,
		Date:     time.Now(),
		Text:     req.Content.Text,
	})

	if err != nil {
		return errors.New("insert failed")
	}

	return nil
}
