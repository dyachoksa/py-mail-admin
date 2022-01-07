from flask import Flask

from .mailboxes import mailboxes


def register_commands(app: Flask):
    app.cli.add_command(mailboxes)
