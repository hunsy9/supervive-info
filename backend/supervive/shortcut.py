import os


def get_env(env_name, default=""):
    return os.environ.get(env_name, default)
