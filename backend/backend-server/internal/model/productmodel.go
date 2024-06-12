package model

import (
	"context"
	"fmt"

	"github.com/zeromicro/go-zero/core/stores/sqlx"
	"ludwig.com/onlineshopping/internal/types"
)

var _ ProductModel = (*customProductModel)(nil)

func (m *customProductModel) RandomFindAllAvailable(ctx context.Context, limit int64) ([]Product, error) {
	avaliable := fmt.Sprint(types.AVAILABLE)

	// SELECT %s FROM %s ORDER BY RAND() LIMIT %s;
	// select %s from %s as t1 join (select round(RAND()*(SELECT MAX(Id) FROM %s)) as randId ) AS t2 WHERE `State`=%s and t1.Id>=t2.randId ORDER BY t1.Id LIMIT %s
	query := fmt.Sprintf("SELECT %s FROM %s  WHERE `State`=%s ORDER BY RAND() LIMIT %s ", productRows, m.table, avaliable, fmt.Sprint(limit))
	var resp []Product
	err := m.conn.QueryRowsCtx(ctx, &resp, query)
	switch err {
	case nil:
		return resp, nil
	case sqlx.ErrNotFound:
		return nil, ErrNotFound
	default:
		return nil, err
	}
}

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
		RandomFindAllAvailable(ctx context.Context, limit int64) ([]Product, error)
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
