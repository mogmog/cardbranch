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

< might need to start the server - sudo service postgresql start >

sudo -u postgres psql

sql > ALTER USER postgres PASSWORD 'postgres'; 
sql > CREATE DATABASE thing;




ctl D to get out of psql

cd api

python manage.py db init
python manage.py db migrate
python manage.py db upgrade


see the README in thwe sql direction for populating cards etc


cd ..

#need node 7 

curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -
sudo apt-get install -y nodejs


npm install

./start.sh to run the app

this uses tmux - useful commands include tmux kill-server to kill everything
when in tmux press control-b and then hit d to detach from the screen (everythnig will be still running)

````



if you have anyt login ussues try going to the app via 

http://localhost:3000?redirect=%2Fdashboard%2Fhome#/user/login


failing that, navigate to http://localhost:3000/#/user/logout followed by http://localhost:3000





