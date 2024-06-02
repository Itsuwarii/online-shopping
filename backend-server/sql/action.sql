create table action(
    Id integer NOT NULL AUTO_INCREMENT,
    UserId integer NOT NULL,
    MerchantId integer NOT NULL,
    ContentId integer NOT NULL,
    PRIMARY KEY(Id)
) ENGINE = InnoDB CHARSET = utf8;

create table action_content(
    Id integer NOT NULL AUTO_INCREMENT,
    ContentId integer NOT NULL,
    OwnerId integer NOT NULL,
    Date timestamp NOT NULL,
    Text varchar(255) NOT NULL,
    PRIMARY KEY(Id)
) ENGINE = InnoDB CHARSET = utf8;