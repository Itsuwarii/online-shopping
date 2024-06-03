create table order(
    Id integer NOT NULL AUTO_INCREMENT,
    UserId integer not null,
    MerchantId integer not null,
    Date timestamp not null,
    State integer not null,
    Remark varchar(255) not null,
    PRIMARY KEY(Id)
) ENGINE = InnoDB CHARSET = utf8;

create table order_content(
    Id integer NOT null AUTO_INCREMENT,
    OrderId integer not null,
    ProductId integer not null,
    Number integer not null,
    Logistics varchar(50) not null,
    State integer not null,
    PRIMARY KEY(Id)
) ENGINE = InnoDB CHARSET = utf8;