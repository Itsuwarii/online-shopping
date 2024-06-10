package model

import (
	"database/sql"
	"strconv"

	"github.com/zeromicro/go-zero/core/stores/sqlx"
	"ludwig.com/onlineshopping/internal/config"
)

var model *Model

type Model struct {
	ActionModel
	ActionContentModel
	CartModel
	MarchantModel
	OrderModel
	ProductModel
	UserModel
}

func StringToNullString(s string) sql.NullString {
	return sql.NullString{String: s, Valid: s != ""}
}

func StringToNullInt64(s string) sql.NullInt64 {
	i, err := strconv.Atoi(s)
	return sql.NullInt64{Int64: int64(i), Valid: err == nil}
}

func IntToNullInt64(i int) sql.NullInt64 {
	return sql.NullInt64{Int64: int64(i), Valid: i != 0}
}

func GetInstanceModel(c config.Config) (m *Model) {
	if model == nil {
		conn := sqlx.NewSqlConn("mysql", c.DataSource)
		model = &Model{
			ActionModel:        NewActionModel(conn),
			ActionContentModel: NewActionContentModel(conn),
			CartModel:          NewCartModel(conn),
			MarchantModel:      NewMarchantModel(conn),
			OrderModel:         NewOrderModel(conn),
			ProductModel:       NewProductModel(conn),
			UserModel:          NewUserModel(conn),
		}
	}

	return model
}
