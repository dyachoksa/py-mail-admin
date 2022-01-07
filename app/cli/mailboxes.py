import datetime as dt

import click
from flask.cli import AppGroup
from sqlalchemy import select

from app.ext import db
from app.models import Mailbox, Domain

mailboxes = AppGroup(
    "mailboxes",
    short_help="Manage mailboxes",
    help="Mailboxes management commands and utilities",
)


@mailboxes.command("set-last-login")
@click.argument("email")
@click.argument("ip")
def last_login(email: str, ip: str):
    username, domain = email.split("@", 1)

    query = (
        select(Mailbox)
        .join(Domain)
        .where(Domain.fqdn == domain)
        .where(Mailbox.name == username)
    )

    mailbox: Mailbox = db.session.execute(query).scalars().first()

    if mailbox is None:
        return 1

    mailbox.last_login_at = dt.datetime.utcnow()
    mailbox.last_login_ip = ip

    db.session.commit()

    return 0
