create table merchant(
    Id integer NOT NULL AUTO_INCREMENT,
    Name varchar(32) not null unique,
    Password varchar(32) not null,
    AvatarLocator varchar(32) not null,
    Licence varchar(18) not null,
    TelePhone varchar(18) not null,
    Intro varchar(255) not null,
    Date timestamp not null,
    State integer not null,
    PRIMARY KEY(Id)
) ENGINE = InnoDB CHARSET = utf8;