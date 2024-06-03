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

type MerchantDeleteLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewMerchantDeleteLogic(ctx context.Context, svcCtx *svc.ServiceContext) *MerchantDeleteLogic {
	return &MerchantDeleteLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *MerchantDeleteLogic) MerchantDelete(req *types.MerchantDeleteReq) (resp *types.MerchantDeleteResp, err error) {
	marchantId, err := l.ctx.Value("marchantid").(json.Number).Int64()
	if err != nil {
		l.Logger.Error("parse marchant id failed ", err)
		return nil, errors.New("authorization failed")
	}
	l.Logger.Info("to delete marchant:", fmt.Sprint(marchantId))

	err = l.svcCtx.Model.MarchantModel.Delete(l.ctx, marchantId)
	if err != nil {
		l.Logger.Error("delete marchant failed:", err)
		return nil, errors.New("delete failed for " + fmt.Sprint(marchantId))
	}

	return
}
