package logic

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"

	"ludwig.com/onlineshopping/internal/svc"
	"ludwig.com/onlineshopping/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type UserDeleteLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewDeleteUserLogic(ctx context.Context, svcCtx *svc.ServiceContext) *UserDeleteLogic {
	return &UserDeleteLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *UserDeleteLogic) DeleteUser(req *types.UserDeleteReq) (resp *types.UserDeleteResp, err error) {
	id, err := l.ctx.Value("id").(json.Number).Int64()
	if err != nil {
		l.Logger.Error("parse id failed ", err)
		return nil, errors.New("authorization failed")
	}
	l.Logger.Info("to delete user:", fmt.Sprint(id))

	err = l.svcCtx.Model.UserModel.Delete(l.ctx, id)
	if err != nil {
		l.Logger.Error("delete user failed:", err)
		return nil, errors.New("delete failed for " + fmt.Sprint(id))
	}

	return
}
