package model

import (
	"context"
	"fmt"

	"github.com/zeromicro/go-zero/core/stores/sqlx"
)

var _ ActionModel = (*customActionModel)(nil)

func (m *defaultActionModel) FindAllForUser(ctx context.Context, id int64) ([]Action, error) {
	// Id         int64 `db:"Id"`
	// UserId     int64 `db:"UserId"`
	// MerchantId int64 `db:"MerchantId"`
	query := fmt.Sprintf("select %s from %s where `UserId` = ? ", actionRows, m.table)
	var resp []Action
	err := m.conn.QueryRowsCtx(ctx, &resp, query, id)
	switch err {
	case nil:
		return resp, nil
	case sqlx.ErrNotFound:
		return nil, ErrNotFound
	default:
		return nil, err
	}
}

func (m *defaultActionModel) FindAllForMerchant(ctx context.Context, id int64) ([]Action, error) {
	// Id         int64 `db:"Id"`
	// UserId     int64 `db:"UserId"`
	// MerchantId int64 `db:"MerchantId"`
	query := fmt.Sprintf("select %s from %s where `MerchantId` = ? ", actionRows, m.table)
	var resp []Action
	err := m.conn.QueryRowsCtx(ctx, &resp, query, id)
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
	// ActionModel is an interface to be customized, add more methods here,
	// and implement the added methods in customActionModel.
	ActionModel interface {
		actionModel
		withSession(session sqlx.Session) ActionModel
		FindAllForUser(ctx context.Context, id int64) ([]Action, error)
		FindAllForMerchant(ctx context.Context, id int64) ([]Action, error)
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
