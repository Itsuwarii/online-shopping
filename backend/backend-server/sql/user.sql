create table user(
    Id integer NOT NULL AUTO_INCREMENT,
    Username varchar(32) not null unique,
    Password varchar(32) not null,
    AvatarLocator varchar(32) not null,
    Sex varchar(10) not null,
    TelePhone varchar(15) not null,
    Intro varchar(255) not null,
    Date timestamp not null,
    State integer not null,
    PRIMARY KEY(Id)
) ENGINE = InnoDB CHARSET = utf8;