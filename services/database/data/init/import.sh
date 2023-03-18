#! /bin/bash

mongoimport --db=userDB --collection=users --jsonArray --file=docker-entrypoint-initdb.d/users.json
