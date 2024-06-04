create table product(
    Id integer NOT NULL AUTO_INCREMENT,
    Name varchar(32) not null,
    MerchantId integer(32) not null,
    Price Float(10) not null,
    AvatarLocator varchar(32) not null,
    ImagesLocator varchar(255) not null,
    Descript varchar(255) not null,
    Amount integer(10) not null,
    State integer(10) not null,
    Date timestamp not null,
    PRIMARY KEY(Id)
) ENGINE = InnoDB CHARSET = utf8;
