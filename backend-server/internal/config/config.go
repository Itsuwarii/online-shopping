package config

import "github.com/zeromicro/go-zero/rest"

type Config struct {
	rest.RestConf
	ImageDir string
	Auth struct {
		AccessSecret string
		AccessExpire int64
	}
	DataSource string
}
