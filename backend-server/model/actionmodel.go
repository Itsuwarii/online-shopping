package model

import "github.com/zeromicro/go-zero/core/stores/sqlx"

var _ ActionModel = (*customActionModel)(nil)

type (
	// ActionModel is an interface to be customized, add more methods here,
	// and implement the added methods in customActionModel.
	ActionModel interface {
		actionModel
		withSession(session sqlx.Session) ActionModel
	}

	customActionModel struct {
		*defaultActionModel
	}
)

// NewActionModel returns a model for the database table.
func NewActionModel(conn sqlx.SqlConn) ActionModel {
	return &customActionModel{
		defaultActionModel: newActionModel(conn),
	}
}

func (m *customActionModel) withSession(session sqlx.Session) ActionModel {
	return NewActionModel(sqlx.NewSqlConnFromSession(session))
}
