from enum import StrEnum, auto
from django.db import models


class GameType(StrEnum):
    SQUAD = auto()
    DUO = auto()


class HunterStatistics(models.Model):
    hunter_avatar = models.TextField()
    hunter_name = models.CharField(max_length=50)
    win_rate = models.FloatField()
    # top_five_ratio = models.FloatField()
    pick_rate = models.FloatField()
    average_rank = models.IntegerField()
    # total_pick_number = models.IntegerField()
    # total_match = models.IntegerField()
    average_kd_rate = models.FloatField()
    # average_kill_rate = models.FloatField()
    # average_death_rate = models.FloatField()
    meta_tag = models.TextField()

    class Meta:
        db_table = "hunter_statistics"



