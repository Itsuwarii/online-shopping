package handler

import (
	"net/http"

	"github.com/zeromicro/go-zero/rest/httpx"
	"seig.com/onlineshoppingbackend/internal/logic"
	"seig.com/onlineshoppingbackend/internal/svc"
	"seig.com/onlineshoppingbackend/internal/types"
)

func ProductHandler(svcCtx *svc.ServiceContext) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req types.ProductId
		if err := httpx.Parse(r, &req); err != nil {
			httpx.ErrorCtx(r.Context(), w, err)
			return
		}

		l := logic.NewProductLogic(r.Context(), svcCtx)
		resp, err := l.Product(&req)
		if err != nil {
			httpx.ErrorCtx(r.Context(), w, err)
		} else {
			httpx.OkJsonCtx(r.Context(), w, resp)
		}
	}
}
