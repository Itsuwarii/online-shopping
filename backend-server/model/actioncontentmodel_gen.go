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
	actionContentFieldNames          = builder.RawFieldNames(&ActionContent{})
	actionContentRows                = strings.Join(actionContentFieldNames, ",")
	actionContentRowsExpectAutoSet   = strings.Join(stringx.Remove(actionContentFieldNames, "`Id`", "`create_at`", "`create_time`", "`created_at`", "`update_at`", "`update_time`", "`updated_at`"), ",")
	actionContentRowsWithPlaceHolder = strings.Join(stringx.Remove(actionContentFieldNames, "`Id`", "`create_at`", "`create_time`", "`created_at`", "`update_at`", "`update_time`", "`updated_at`"), "=?,") + "=?"
)

type (
	actionContentModel interface {
		Insert(ctx context.Context, data *ActionContent) (sql.Result, error)
		FindOne(ctx context.Context, id int64) (*ActionContent, error)
		Update(ctx context.Context, data *ActionContent) error
		Delete(ctx context.Context, id int64) error
	}

	defaultActionContentModel struct {
		conn  sqlx.SqlConn
		table string
	}

	ActionContent struct {
		Id        int64     `db:"Id"`
		ContentId int64     `db:"ContentId"`
		OwnerId   int64     `db:"OwnerId"`
		Date      time.Time `db:"Date"`
		Text      string    `db:"Text"`
	}
)

func newActionContentModel(conn sqlx.SqlConn) *defaultActionContentModel {
	return &defaultActionContentModel{
		conn:  conn,
		table: "`action_content`",
	}
}

func (m *defaultActionContentModel) Delete(ctx context.Context, id int64) error {
	query := fmt.Sprintf("delete from %s where `Id` = ?", m.table)
	_, err := m.conn.ExecCtx(ctx, query, id)
	return err
}

func (m *defaultActionContentModel) FindOne(ctx context.Context, id int64) (*ActionContent, error) {
	query := fmt.Sprintf("select %s from %s where `Id` = ? limit 1", actionContentRows, m.table)
	var resp ActionContent
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

func (m *defaultActionContentModel) Insert(ctx context.Context, data *ActionContent) (sql.Result, error) {
	query := fmt.Sprintf("insert into %s (%s) values (?, ?, ?, ?)", m.table, actionContentRowsExpectAutoSet)
	ret, err := m.conn.ExecCtx(ctx, query, data.ContentId, data.OwnerId, data.Date, data.Text)
	return ret, err
}

func (m *defaultActionContentModel) Update(ctx context.Context, data *ActionContent) error {
	query := fmt.Sprintf("update %s set %s where `Id` = ?", m.table, actionContentRowsWithPlaceHolder)
	_, err := m.conn.ExecCtx(ctx, query, data.ContentId, data.OwnerId, data.Date, data.Text, data.Id)
	return err
}

func (m *defaultActionContentModel) tableName() string {
	return m.table
}
