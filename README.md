on a brand new server, these linux commands got the app running. ymmv

````
sudo apt-get install python-pip

pip install virtualenv

virtualenv -p python3 venv

pip install autoenv


cd <where ever your dev environment is>

git clone https://github.com/jameswykes/luca-card-demo.git

cd luca-card-demo

cd api

pip install -r requirements.txt

#<hack to get db init to work>
export APP_SETTINGS="development"
export DATABASE_URL="postgresql://postgres:postgres@localhost/thing"



#install postgres 9.5

sudo apt-get install postgresql postgresql-contrib


sudo -u postgres psql

sql > ALTER USER postgres PASSWORD 'postgres'; 
sql > CREATE DATABASE thing;




ctl D to get out of psql




python manage.py db migrate



psql -U postgres -d thing -a -f thing.sql -h localhost




cd ..

#need node 7 

curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -
sudo apt-get install -y nodejs


npm install

./start.sh to run the app



````

