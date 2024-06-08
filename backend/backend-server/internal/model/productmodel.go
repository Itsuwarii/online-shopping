package model

import (
	"context"
	"fmt"

	"github.com/zeromicro/go-zero/core/stores/sqlx"
)

var _ ProductModel = (*customProductModel)(nil)

func (m *customProductModel) FindProductForMerchant(ctx context.Context, merchantId int64, offset int64, limit int64) ([]Product, error) {
	query := fmt.Sprintf("select %s from %s where `MerchantId` = ? limit ? offset ?", productRows, m.table)
	var resp []Product
	err := m.conn.QueryRowsCtx(ctx, &resp, query, merchantId, limit, offset)
	switch err {
	case nil:
		return resp, nil
	case sqlx.ErrNotFound:
		return nil, ErrNotFound
	default:
		return nil, err
	}
}

type (
	// ProductModel is an interface to be customized, add more methods here,
	// and implement the added methods in customProductModel.
	ProductModel interface {
		productModel
		withSession(session sqlx.Session) ProductModel
		FindProductForMerchant(ctx context.Context, merchantId int64, offset int64, limit int64) ([]Product, error)
	}

	customProductModel struct {
		*defaultProductModel
	}
)

// NewProductModel returns a model for the database table.
func NewProductModel(conn sqlx.SqlConn) ProductModel {
	return &customProductModel{
		defaultProductModel: newProductModel(conn),
	}
}

func (m *customProductModel) withSession(session sqlx.Session) ProductModel {
	return NewProductModel(sqlx.NewSqlConnFromSession(session))
}
