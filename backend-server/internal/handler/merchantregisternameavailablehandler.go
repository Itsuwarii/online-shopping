package handler

import (
	"net/http"

	"github.com/zeromicro/go-zero/rest/httpx"
	"ludwig.com/onlineshopping/internal/logic"
	"ludwig.com/onlineshopping/internal/svc"
	"ludwig.com/onlineshopping/internal/types"
)

func MerchantRegisterNameAvailableHandler(svcCtx *svc.ServiceContext) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req types.MerchantNameAvailableReq
		if err := httpx.Parse(r, &req); err != nil {
			httpx.ErrorCtx(r.Context(), w, err)
			return
		}

		l := logic.NewMerchantRegisterNameAvailableLogic(r.Context(), svcCtx)
		resp, err := l.MerchantRegisterNameAvailable(&req)
		if err != nil {
			httpx.ErrorCtx(r.Context(), w, err)
		} else {
			httpx.OkJsonCtx(r.Context(), w, resp)
		}
	}
}
