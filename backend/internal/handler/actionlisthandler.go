package handler

import (
	"net/http"

	"github.com/zeromicro/go-zero/rest/httpx"
	"seig.com/onlineshoppingbackend/internal/logic"
	"seig.com/onlineshoppingbackend/internal/svc"
)

func ActionListHandler(svcCtx *svc.ServiceContext) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		l := logic.NewActionListLogic(r.Context(), svcCtx)
		resp, err := l.ActionList()
		if err != nil {
			httpx.ErrorCtx(r.Context(), w, err)
		} else {
			httpx.OkJsonCtx(r.Context(), w, resp)
		}
	}
}
