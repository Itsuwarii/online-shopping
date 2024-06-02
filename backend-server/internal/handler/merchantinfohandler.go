package handler

import (
	"net/http"

	"github.com/zeromicro/go-zero/rest/httpx"
	"ludwig.com/onlineshopping/internal/logic"
	"ludwig.com/onlineshopping/internal/svc"
)

func MerchantInfoHandler(svcCtx *svc.ServiceContext) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		l := logic.NewMerchantInfoLogic(r.Context(), svcCtx)
		resp, err := l.MerchantInfo()
		if err != nil {
			httpx.ErrorCtx(r.Context(), w, err)
		} else {
			httpx.OkJsonCtx(r.Context(), w, resp)
		}
	}
}
