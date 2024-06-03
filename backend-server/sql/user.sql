create table user(
    Id integer NOT NULL AUTO_INCREMENT,
    Username varchar(32) not null unique,
    Password varchar(32) not null,
    ImageId varchar(32) not null,
    Sex integer not null,
    TelePhone varchar(15) not null,
    Intro varchar(255) not null,
    Data timestamp not null,
    State integer not null,
    PRIMARY KEY(Id)
) ENGINE = InnoDB CHARSET = utf8;