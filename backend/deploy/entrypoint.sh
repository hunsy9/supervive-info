#!/bin/sh

APP=/app

n=0
while [ $n -lt 5 ]
do
    python3 manage.py migrate --no-input
    break
    n=$(($n+1))
    echo "Failed to migrate, going to retry..."
    sleep 8
done

echo "migrate success, exec gunicorn"

LOG_PATH=${LOG_PATH:-/app/deploy/log/gunicorn.log}

mkdir -p $(dirname $LOG_PATH)

exec gunicorn supervive.wsgi \
    --bind 0.0.0.0:8000 \
    --workers 1 \
    --log-file "$LOG_PATH" \
    --capture-output