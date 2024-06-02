package model

import "github.com/zeromicro/go-zero/core/stores/sqlx"

var _ CartModel = (*customCartModel)(nil)

type (
	// CartModel is an interface to be customized, add more methods here,
	// and implement the added methods in customCartModel.
	CartModel interface {
		cartModel
		withSession(session sqlx.Session) CartModel
	}

	customCartModel struct {
		*defaultCartModel
	}
)

// NewCartModel returns a model for the database table.
func NewCartModel(conn sqlx.SqlConn) CartModel {
	return &customCartModel{
		defaultCartModel: newCartModel(conn),
	}
}

func (m *customCartModel) withSession(session sqlx.Session) CartModel {
	return NewCartModel(sqlx.NewSqlConnFromSession(session))
}
