#! /bin/bash

if [[ ! -f manage.py ]]; then
    echo "No manage.py, wrong location"
    exit 1
fi

sleep 1

docker rm -f supervive-postgres-dev
docker run -it -d -e POSTGRES_DB=supervive -e POSTGRES_USER=supervive -e POSTGRES_PASSWORD=supervive -p 127.0.0.1:5432:5432 --name supervive-postgres-dev postgres:13