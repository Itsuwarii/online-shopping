package logic

import (
	"context"
	"errors"

	"ludwig.com/onlineshopping/internal/svc"
	"ludwig.com/onlineshopping/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type ProductSearchLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewProductSearchLogic(ctx context.Context, svcCtx *svc.ServiceContext) *ProductSearchLogic {
	return &ProductSearchLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

// product/search
func (l *ProductSearchLogic) ProductSearch(req *types.SearchProductReq) (resp *types.ProductListResp, err error) {
	// _, err = l.ctx.Value("id").(json.Number).Int64()
	// if err != nil {
	// 	l.Logger.Error("parse id failed ", err)
	// 	return nil, errors.New("authorization failed")
	// }

	productList, err := l.svcCtx.Model.ProductModel.SearchProduct(l.ctx, req.Keyword)
	if err != nil {
		return nil, errors.New("search failed")
	}

	var responeList []types.Product

	for _, pro := range productList {
		responeList = append(responeList, types.Product{
			ID:            pro.Id,
			Name:          pro.Name,
			MerchantId:    pro.MerchantId,
			AvatarLocator: pro.AvatarLocator,
			ImagesLocator: pro.ImagesLocator,
			Intro:         pro.Intro,
			Price:         pro.Price,
			Amount:        pro.Amount,
			State:         pro.State,
		})
	}

	return &types.ProductListResp{
		ProductList: responeList,
	}, nil
}
