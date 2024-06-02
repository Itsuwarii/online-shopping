create table product(
    Id integer NOT NULL AUTO_INCREMENT,
    Name varchar(32) not null,
    MerchantId integer(32) not null,
    Price Float(10) not null,
    AvatarId varchar(32) not null,
    ImageIdList varchar(255),
    Descript varchar(255),
    Amount integer(10),
    State integer(10) not null,
    Data timestamp not null,
    PRIMARY KEY(Id)
) ENGINE = InnoDB CHARSET = utf8;

