from backend.supervive.shortcut import get_env

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'HOST': get_env('POSTGRES_HOST', '127.0.0.1'),
        'PORT': get_env('POSTGRES_PORT', '5435'),
        'NAME': get_env('POSTGRES_DB', 'supervive'),
        'USER': get_env('POSTGRES_USER', 'supervive'),
        'PASSWORD': get_env('POSTGRES_PASSWORD', 'supervive')
    }
}