package model

import (
	"context"
	"fmt"

	"github.com/zeromicro/go-zero/core/stores/sqlx"
)

var _ CartModel = (*customCartModel)(nil)

func (m *defaultCartModel) FindAll(ctx context.Context, userId int64) ([]Cart, error) {
	// UserId    int64     `db:"UserId"`
	// ProductId int64     `db:"ProductId"`
	// Number    int64     `db:"Number"`
	// Data      time.Time `db:"Data"`
	query := fmt.Sprintf("select %s from %s where `UserId` = ? ", cartRows, m.table)
	var resp []Cart
	err := m.conn.QueryRowsCtx(ctx, &resp, query, userId)
	switch err {
	case nil:
		return resp, nil
	case sqlx.ErrNotFound:
		return nil, ErrNotFound
	default:
		return nil, err
	}
}

func (m *defaultCartModel) DeleteAll(ctx context.Context, userId int64) error {
	query := fmt.Sprintf("delete from %s where `UserId` = ?", m.table)
	_, err := m.conn.ExecCtx(ctx, query, userId)
	return err
}

type (
	// CartModel is an interface to be customized, add more methods here,
	// and implement the added methods in customCartModel.
	CartModel interface {
		cartModel
		withSession(session sqlx.Session) CartModel
		FindAll(ctx context.Context, userId int64) ([]Cart, error)
		DeleteAll(ctx context.Context, userId int64) error
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
