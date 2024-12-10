from supervive.shortcut import get_env
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'HOST': get_env('POSTGRES_HOST', '127.0.0.1'),
        'PORT': get_env('POSTGRES_PORT', '5432'),
        'NAME': get_env('POSTGRES_DB', 'supervive'),
        'USER': get_env('POSTGRES_USER', 'supervive'),
        'PASSWORD': get_env('POSTGRES_PASSWORD', 'supervive')
    }
}

DEBUG = True