package handler

import (
	"net/http"

	"github.com/zeromicro/go-zero/rest/httpx"
	"seig.com/onlineshoppingbackend/internal/logic"
	"seig.com/onlineshoppingbackend/internal/svc"
)

func CartHandler(svcCtx *svc.ServiceContext) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		l := logic.NewCartLogic(r.Context(), svcCtx)
		resp, err := l.Cart()
		if err != nil {
			httpx.ErrorCtx(r.Context(), w, err)
		} else {
			httpx.OkJsonCtx(r.Context(), w, resp)
		}
	}
}
