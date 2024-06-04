package model

import (
	"context"
	"fmt"

	"github.com/zeromicro/go-zero/core/stores/sqlx"
)

var _ MarchantModel = (*customMarchantModel)(nil)

func (m *customMarchantModel) CheckMarchantName(ctx context.Context, name string) (existed bool, err error) {
	var resp User
	query := fmt.Sprintf("select %s from %s where `Name` = ? limit 1", userRows, m.tableName())
	err = m.conn.QueryRowCtx(ctx, &resp, query, name)
	switch err {
	case nil:
		return true, nil
	case sqlx.ErrNotFound:
		return false, nil
	default:
		return false, err
	}
}

type (
	// MarchantModel is an interface to be customized, add more methods here,
	// and implement the added methods in customMarchantModel.
	MarchantModel interface {
		marchantModel
		withSession(session sqlx.Session) MarchantModel
		CheckMarchantName(ctx context.Context, username string) (existed bool, err error)
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
