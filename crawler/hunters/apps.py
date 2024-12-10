# hunters/apps.py
from django.apps import AppConfig
from .tasks import start_scheduler

class HuntersConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'hunters'

    def ready(self):
        start_scheduler()
