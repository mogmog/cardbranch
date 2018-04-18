

to restore 
````
psql -U postgres -d thing -a -f thingout.sql -h localhost
````

--to do the dump I ran

````
% pg_dump --create --dbname=thing --file=thingout.sql --column-inserts --schema='public' --table=public.cards --table=public.favourite --table=public.page --table=public.pagecard --table=public.session --table=public.
store --table=public.user -U postgres -h localhost
````


--to give all users all accecess to all cards

`````


delete from pagecard;

insert into pagecard ("pageId", "component", "enabled", "userId")
SELECT distinct page.id as pageId, component, 'Y'as enabled, PUBLIC.user.id as userId
FROM cards, page, PUBLIC."user";

````

