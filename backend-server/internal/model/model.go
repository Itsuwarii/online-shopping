package model

import (
	"github.com/zeromicro/go-zero/core/stores/sqlx"
	"ludwig.com/onlineshopping/internal/config"
)

var model *Model

type Model struct {
	ActionModel
	ActionContentModel
	CartModel
	MarchantModel
	OrderContentModel
	OrderModel
	ProductModel
	UserModel
}

func GetInstanceModel(c config.Config) (m *Model) {
	if model == nil {
		conn := sqlx.NewSqlConn("mysql", c.DataSource)
		model = &Model{
			ActionModel:        NewActionModel(conn),
			ActionContentModel: NewActionContentModel(conn),
			CartModel:          NewCartModel(conn),
			MarchantModel:      NewMarchantModel(conn),
			OrderContentModel:  NewOrderContentModel(conn),
			OrderModel:         NewOrderModel(conn),
			ProductModel:       NewProductModel(conn),
			UserModel:          NewUserModel(conn),
		}
	}

	return model
}
