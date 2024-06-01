create table action(
    Id integer PRIMARY KEY NOT NULL AUTO_INCREMENT,
    UserId integer index NOT NULL,
    MerchantId integer index NOT NULL,
    ContentId integer NOT NULL,
);

create table action_content(
    Id integer PRIMARY KEY NOT NULL AUTO_INCREMENT,
    ContentId integer index NOT NULL,
    OwnerId integer NOT NULL,
    Date timestamp NOT NULL,
    Text varcahr(255) NOT NULL
);
