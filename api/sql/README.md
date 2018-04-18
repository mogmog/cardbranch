"C:/Program Files/PostgreSQL/10/bin/pg_dump.exe" --create --dbname=thing --file=C:\Users\graha\thingout.sql --column-inserts --username=postgres --host=localhost --port=5432


````
psql -U postgres -d thing -a -f thing_public_cards.sql -h localhost
````

