-- 购物车
create table cart(
    UserId integer not null,
    ProductId integer not null,
    Number integer not null,
    Data timestamp not null,
    PRIMARY KEY(UserId)
) ENGINE = InnoDB CHARSET = utf8;

