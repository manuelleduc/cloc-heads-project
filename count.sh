#!/bin/bash
MYSQL_USER=root
MYSQL_PWD=cloc
MYSQL_HOST=127.0.0.1
MYSQL_PORT=3307
DOCKER_CONTAINER_NAME=mysql_cloc
MYSQL_DB_NAME=cloc
PROJECTS_DIRECTORY=projects

# init the mysql instance
docker run -e MYSQL_ROOT_PASSWORD="$MYSQL_PWD" --name $DOCKER_CONTAINER_NAME -p $MYSQL_PORT:3306 -d mysql:5.7 || docker start $DOCKER_CONTAINER_NAME

# init the projects directory
mkdir -p PROJECTS_DIRECTORY

# reset the content of the database
mysql -u $MYSQL_USER --password=$MYSQL_PWD -h $MYSQL_HOST -P $MYSQL_PORT -e "DROP DATABASE IF EXISTS $MYSQL_DB_NAME; CREATE DATABASE $MYSQL_DB_NAME"

# install the LoC stats tool
npm install -g cloc

# let count !
cloc $(ls -d $PROJECTS_DIRECTORY/*) --sql=/tmp/cloc_clean.sql
