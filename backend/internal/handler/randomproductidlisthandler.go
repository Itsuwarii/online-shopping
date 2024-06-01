package handler

import (
	"net/http"

	"github.com/zeromicro/go-zero/rest/httpx"
	"seig.com/onlineshoppingbackend/internal/logic"
	"seig.com/onlineshoppingbackend/internal/svc"
)

func RandomProductIdListHandler(svcCtx *svc.ServiceContext) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		l := logic.NewRandomProductIdListLogic(r.Context(), svcCtx)
		resp, err := l.RandomProductIdList()
		if err != nil {
			httpx.ErrorCtx(r.Context(), w, err)
		} else {
			httpx.OkJsonCtx(r.Context(), w, resp)
		}
	}
}
