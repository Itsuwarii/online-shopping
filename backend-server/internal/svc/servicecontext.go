package svc

import (
	"ludwig.com/onlineshopping/internal/config"
	"ludwig.com/onlineshopping/internal/model"
)

type ServiceContext struct {
	Config config.Config
	Model  *model.Model
}

func NewServiceContext(c config.Config) *ServiceContext {
	return &ServiceContext{
		Config: c,
		Model:  model.GetInstanceModel(c),
	}
}
