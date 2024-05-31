package logic

import (
	"context"
	"fmt"

	"seig.com/onlineshoppingbackend/internal/svc"
	"seig.com/onlineshoppingbackend/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type GetCartLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewGetCartLogic(ctx context.Context, svcCtx *svc.ServiceContext) *GetCartLogic {
	return &GetCartLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *GetCartLogic) GetCart() (resp *types.GetCartReply, err error) {
	// todo: add your logic here and delete this line
	fmt.Println("-----------------------", l.ctx.Value("id"))

	return &types.GetCartReply{
		ProductsList: []string{"Iron Man", "Thor", "Hulk", "Dr Strange", "Spiderman"},
	}, nil
}
