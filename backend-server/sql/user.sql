create table user(
    Id integer NOT NULL AUTO_INCREMENT,
    Username varchar(32) not null unique,
    Password varchar(32) not null,
    ImageId varchar(32),
    Sex integer,
    TelePhone integer,
    Intro varchar(255),
    Data timestamp not null,
    State integer not null,
    PRIMARY KEY(Id)
) ENGINE = InnoDB CHARSET = utf8;