package model

import "github.com/zeromicro/go-zero/core/stores/sqlx"

var _ ActionContentModel = (*customActionContentModel)(nil)

type (
	// ActionContentModel is an interface to be customized, add more methods here,
	// and implement the added methods in customActionContentModel.
	ActionContentModel interface {
		actionContentModel
		withSession(session sqlx.Session) ActionContentModel
	}

	customActionContentModel struct {
		*defaultActionContentModel
	}
)

// NewActionContentModel returns a model for the database table.
func NewActionContentModel(conn sqlx.SqlConn) ActionContentModel {
	return &customActionContentModel{
		defaultActionContentModel: newActionContentModel(conn),
	}
}

func (m *customActionContentModel) withSession(session sqlx.Session) ActionContentModel {
	return NewActionContentModel(sqlx.NewSqlConnFromSession(session))
}
