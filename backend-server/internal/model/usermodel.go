package model

import (
	"context"
	"fmt"

	"github.com/zeromicro/go-zero/core/stores/sqlx"
)

var _ UserModel = (*customUserModel)(nil)

func (m *customUserModel) CheckUserName(ctx context.Context, username string) (existed bool, err error) {
	var resp User
	query := fmt.Sprintf("select %s from %s where `Username` = ? limit 1", userRows, m.tableName())
	err = m.conn.QueryRowCtx(ctx, &resp, query, username)
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
	// UserModel is an interface to be customized, add more methods here,
	// and implement the added methods in customUserModel.
	UserModel interface {
		userModel
		withSession(session sqlx.Session) UserModel
		CheckUserName(ctx context.Context, name string) (existed bool, err error)
	}

	customUserModel struct {
		*defaultUserModel
	}
)

// NewUserModel returns a model for the database table.
func NewUserModel(conn sqlx.SqlConn) UserModel {
	return &customUserModel{
		defaultUserModel: newUserModel(conn),
	}
}

func (m *customUserModel) withSession(session sqlx.Session) UserModel {
	return NewUserModel(sqlx.NewSqlConnFromSession(session))
}
