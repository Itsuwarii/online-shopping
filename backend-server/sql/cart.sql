-- 购物车
create table cart(
    UserId integer primary key not null unique,
    CartProductList json,
) ENGINE = InnoDB CHARSET = utf8;