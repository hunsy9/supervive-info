FROM python:3.11-alpine
ENV SPV_ENV production

WORKDIR /app

COPY ./ /app

RUN apk add gcc libc-dev python3-dev libpq-dev

RUN pip install -r /app/deploy/requirements.txt

RUN chmod +x /app/deploy/entrypoint.sh

EXPOSE 8000
ENTRYPOINT ["/app/deploy/entrypoint.sh"]