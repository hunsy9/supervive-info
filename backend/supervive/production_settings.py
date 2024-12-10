from backend.supervive.shortcut import get_env

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'HOST': get_env("POSTGRES_HOST"),
        'PORT': get_env("POSTGRES_PORT"),
        'NAME': get_env("POSTGRES_DB"),
        'USER': get_env("POSTGRES_USER"),
        'PASSWORD': get_env("POSTGRES_PASSWORD")
    }
}
