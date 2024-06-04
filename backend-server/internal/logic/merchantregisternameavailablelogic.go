package logic

import (
	"context"
	"errors"

	"ludwig.com/onlineshopping/internal/svc"
	"ludwig.com/onlineshopping/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type MerchantRegisterNameAvailableLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewMerchantRegisterNameAvailableLogic(ctx context.Context, svcCtx *svc.ServiceContext) *MerchantRegisterNameAvailableLogic {
	return &MerchantRegisterNameAvailableLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *MerchantRegisterNameAvailableLogic) MerchantRegisterNameAvailable(req *types.MerchantNameAvailableReq) (resp *types.MerchantNameAvailableResp, err error) {
	Name := req.Name
	l.Logger.Info("into check", Name, " merchant available")

	MarchantModel := l.svcCtx.Model.MarchantModel
	existed, err := MarchantModel.CheckMarchantName(l.ctx, Name)
	if err != nil {
		return nil, errors.New("query failed")
	}

	if existed {
		return &types.MerchantNameAvailableResp{
			State: types.FAILED,
		}, errors.New("merchant existed")
	}

	return &types.MerchantNameAvailableResp{
		State: types.SUCCESS,
	}, nil
}
