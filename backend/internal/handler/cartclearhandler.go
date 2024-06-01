package handler

import (
	"net/http"

	"github.com/zeromicro/go-zero/rest/httpx"
	"seig.com/onlineshoppingbackend/internal/logic"
	"seig.com/onlineshoppingbackend/internal/svc"
)

func CartClearHandler(svcCtx *svc.ServiceContext) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		l := logic.NewCartClearLogic(r.Context(), svcCtx)
		err := l.CartClear()
		if err != nil {
			httpx.ErrorCtx(r.Context(), w, err)
		} else {
			httpx.Ok(w)
		}
	}
}
