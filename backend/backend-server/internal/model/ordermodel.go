package model

import (
	"context"
	"fmt"

	"github.com/zeromicro/go-zero/core/stores/sqlx"
)

var _ OrderModel = (*customOrderModel)(nil)

func (m *defaultOrderModel) FindWithUser(ctx context.Context, id int64) ([]Order, error) {
	query := fmt.Sprintf("select %s from %s where `UserId` = ? ", orderRows, m.table)
	var resp []Order
	err := m.conn.QueryRowsCtx(ctx, &resp, query, id)
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
	// OrderModel is an interface to be customized, add more methods here,
	// and implement the added methods in customOrderModel.
	OrderModel interface {
		orderModel
		withSession(session sqlx.Session) OrderModel
		FindWithUser(ctx context.Context, id int64) ([]Order, error)
	}

	customOrderModel struct {
		*defaultOrderModel
	}
)

// NewOrderModel returns a model for the database table.
func NewOrderModel(conn sqlx.SqlConn) OrderModel {
	return &customOrderModel{
		defaultOrderModel: newOrderModel(conn),
	}
}

func (m *customOrderModel) withSession(session sqlx.Session) OrderModel {
	return NewOrderModel(sqlx.NewSqlConnFromSession(session))
}
