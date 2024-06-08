// Code generated by goctl. DO NOT EDIT.

package model

import (
	"context"
	"database/sql"
	"fmt"
	"strings"
	"time"

	"github.com/zeromicro/go-zero/core/stores/builder"
	"github.com/zeromicro/go-zero/core/stores/sqlx"
	"github.com/zeromicro/go-zero/core/stringx"
)

var (
	userFieldNames          = builder.RawFieldNames(&User{})
	userRows                = strings.Join(userFieldNames, ",")
	userRowsExpectAutoSet   = strings.Join(stringx.Remove(userFieldNames, "`Id`", "`create_at`", "`create_time`", "`created_at`", "`update_at`", "`update_time`", "`updated_at`"), ",")
	userRowsWithPlaceHolder = strings.Join(stringx.Remove(userFieldNames, "`Id`", "`create_at`", "`create_time`", "`created_at`", "`update_at`", "`update_time`", "`updated_at`"), "=?,") + "=?"
)

type (
	userModel interface {
		Insert(ctx context.Context, data *User) (sql.Result, error)
		FindOne(ctx context.Context, id int64) (*User, error)
		FindOneByUsername(ctx context.Context, username string) (*User, error)
		Update(ctx context.Context, data *User) error
		Delete(ctx context.Context, id int64) error
	}

	defaultUserModel struct {
		conn  sqlx.SqlConn
		table string
	}

	User struct {
		Id        int64          `db:"Id"`
		Username  string         `db:"Username"`
		Password  string         `db:"Password"`
		AvatarLocator string     `db:"AvatarLocator"`
		Sex       int64          `db:"Sex"`
		TelePhone string         `db:"TelePhone"`
		Intro     string         `db:"Intro"`
		Date      time.Time      `db:"Date"`
		State     int64          `db:"State"`
	}
)

func newUserModel(conn sqlx.SqlConn) *defaultUserModel {
	return &defaultUserModel{
		conn:  conn,
		table: "`user`",
	}
}

func (m *defaultUserModel) Delete(ctx context.Context, id int64) error {
	query := fmt.Sprintf("delete from %s where `Id` = ?", m.table)
	_, err := m.conn.ExecCtx(ctx, query, id)
	return err
}

func (m *defaultUserModel) FindOne(ctx context.Context, id int64) (*User, error) {
	query := fmt.Sprintf("select %s from %s where `Id` = ? limit 1", userRows, m.table)
	var resp User
	err := m.conn.QueryRowCtx(ctx, &resp, query, id)
	switch err {
	case nil:
		return &resp, nil
	case sqlx.ErrNotFound:
		return nil, ErrNotFound
	default:
		return nil, err
	}
}

func (m *defaultUserModel) FindOneByUsername(ctx context.Context, username string) (*User, error) {
	var resp User
	query := fmt.Sprintf("select %s from %s where `Username` = ? limit 1", userRows, m.table)
	err := m.conn.QueryRowCtx(ctx, &resp, query, username)
	switch err {
	case nil:
		return &resp, nil
	case sqlx.ErrNotFound:
		return nil, ErrNotFound
	default:
		return nil, err
	}
}

func (m *defaultUserModel) Insert(ctx context.Context, data *User) (sql.Result, error) {
	query := fmt.Sprintf("insert into %s (%s) values (?, ?, ?, ?, ?, ?, ?, ?)", m.table, userRowsExpectAutoSet)
	ret, err := m.conn.ExecCtx(ctx, query, data.Username, data.Password, data.AvatarLocator, data.Sex, data.TelePhone, data.Intro, data.Date, data.State)
	return ret, err
}

func (m *defaultUserModel) Update(ctx context.Context, newData *User) error {
	query := fmt.Sprintf("update %s set %s where `Id` = ?", m.table, userRowsWithPlaceHolder)
	_, err := m.conn.ExecCtx(ctx, query, newData.Username, newData.Password, newData.AvatarLocator, newData.Sex, newData.TelePhone, newData.Intro, newData.Date, newData.State, newData.Id)
	return err
}

func (m *defaultUserModel) tableName() string {
	return m.table
}