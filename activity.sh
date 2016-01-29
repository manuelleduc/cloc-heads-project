#!/bin/bash
source ./env.sh
PWD=$(pwd)

cd $PROJECTS_DIRECTORY
for projectname in $(ls -d  *)
do
  for reponame in $(ls -d $projectname/*)
  do
    realname=$(basename $reponame)
    echo "$projectname $realname"
    node ../project_activity/dist/index.js $projectname $realname
    #sleep 1
  done
done
