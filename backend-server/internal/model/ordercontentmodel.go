package model

import "github.com/zeromicro/go-zero/core/stores/sqlx"

var _ OrderContentModel = (*customOrderContentModel)(nil)

type (
	// OrderContentModel is an interface to be customized, add more methods here,
	// and implement the added methods in customOrderContentModel.
	OrderContentModel interface {
		orderContentModel
		withSession(session sqlx.Session) OrderContentModel
	}

	customOrderContentModel struct {
		*defaultOrderContentModel
	}
)

// NewOrderContentModel returns a model for the database table.
func NewOrderContentModel(conn sqlx.SqlConn) OrderContentModel {
	return &customOrderContentModel{
		defaultOrderContentModel: newOrderContentModel(conn),
	}
}

func (m *customOrderContentModel) withSession(session sqlx.Session) OrderContentModel {
	return NewOrderContentModel(sqlx.NewSqlConnFromSession(session))
}
