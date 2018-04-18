

to restore 
````
psql -U postgres -d thing -a -f thing.sql -h localhost
````

--to do the dump I ran
pg_dump -d thing -U postgres -h localhost -t user -t page -t card -t pagecard -t store  -f thing.sql


