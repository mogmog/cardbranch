delete from pagecard;

insert into pagecard ("pageId", "component", "enabled", "userId")
SELECT distinct page.id as pageId, component, 'Y'as enabled, PUBLIC.user.id as userId
FROM cards, page, PUBLIC."user";
