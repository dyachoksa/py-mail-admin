import os

from fabric import task
from patchwork.transfers import rsync

app_dir = "/home/apps/mail-admin"


@task
def sync_files(ctx):
    print("Syncing files...")
    rsync(
        ctx,
        source=f"{os.getcwd()}/",
        target=app_dir,
        exclude=(
            ".git/",
            ".venv",
            ".vscode/",
            ".idea/",
            ".env",
            "__pycache__",
            "webapp/",
            "vetur.config.js",
        ),
    )


@task
def deploy(ctx):
    sync_files(ctx)
