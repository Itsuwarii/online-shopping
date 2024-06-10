package model

import (
	"context"
	"fmt"

	"github.com/zeromicro/go-zero/core/stores/sqlx"
)

var _ ActionContentModel = (*customActionContentModel)(nil)

func (m *defaultActionContentModel) FindForDate(ctx context.Context, id int64, start_time int64, end_time int64) ([]ActionContent, error) {
	// Id        int64     `db:"Id"`
	// ActionId int64      `db:"ActionId"`
	// OwnerId   int64     `db:"OwnerId"`
	// Date      time.Time `db:"Date"`
	// Text      string    `db:"Text"`

	query := fmt.Sprintf("select %s from %s where `ActionId` = ? and `Date` between ? and ? ", actionContentRows, m.table)
	var resp []ActionContent
	err := m.conn.QueryRowsCtx(ctx, &resp, query, id, start_time, end_time)
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
	// ActionContentModel is an interface to be customized, add more methods here,
	// and implement the added methods in customActionContentModel.
	ActionContentModel interface {
		actionContentModel
		withSession(session sqlx.Session) ActionContentModel
		FindForDate(ctx context.Context, id int64, start_time int64, end_time int64) ([]ActionContent, error)
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
