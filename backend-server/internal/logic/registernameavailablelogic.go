package logic

import (
	"context"
	"errors"

	"ludwig.com/onlineshopping/internal/svc"
	"ludwig.com/onlineshopping/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type RegisterNameAvailableLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewRegisterNameAvailableLogic(ctx context.Context, svcCtx *svc.ServiceContext) *RegisterNameAvailableLogic {
	return &RegisterNameAvailableLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *RegisterNameAvailableLogic) RegisterNameAvailable(req *types.NameAvailableReq) (resp *types.NameAvailableResp, err error) {
	Name := req.Name
	l.Logger.Info("into check", Name, " username available")

	UserModel := l.svcCtx.Model.UserModel
	user, err := UserModel.FindOneByUsername(l.ctx, Name)
	if err != nil {
		l.Logger.Error("query failed ", err)
		return nil, errors.New("check failed")
	}

	if user != nil {
		return &types.NameAvailableResp{
			State: types.FAILED,
		}, errors.New("username existed")
	}

	return &types.NameAvailableResp{
		State: types.SUCCESS,
	}, nil
}
