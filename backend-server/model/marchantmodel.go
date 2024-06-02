package model

import "github.com/zeromicro/go-zero/core/stores/sqlx"

var _ MarchantModel = (*customMarchantModel)(nil)

type (
	// MarchantModel is an interface to be customized, add more methods here,
	// and implement the added methods in customMarchantModel.
	MarchantModel interface {
		marchantModel
		withSession(session sqlx.Session) MarchantModel
	}

	customMarchantModel struct {
		*defaultMarchantModel
	}
)

// NewMarchantModel returns a model for the database table.
func NewMarchantModel(conn sqlx.SqlConn) MarchantModel {
	return &customMarchantModel{
		defaultMarchantModel: newMarchantModel(conn),
	}
}

func (m *customMarchantModel) withSession(session sqlx.Session) MarchantModel {
	return NewMarchantModel(sqlx.NewSqlConnFromSession(session))
}
