import datetime as dt

import sqlalchemy as sa

from app.ext import db


class Domain(db.Model):
    """The mail domain model"""

    __tablename__ = "domains"

    id = db.Column(db.Integer, primary_key=True)
    fqdn = db.Column(
        db.String(150),
        unique=True,
        nullable=False,
        info={"label": "Domain name"},
    )
    is_active = db.Column(
        db.Boolean,
        default=True,
        nullable=False,
        server_default=sa.true(),
        info={"label": "Is active?"},
    )
    created_at = db.Column(db.DateTime, default=dt.datetime.utcnow)
    updated_at = db.Column(
        db.DateTime, default=dt.datetime.utcnow, onupdate=dt.datetime.utcnow
    )

    mailboxes = db.relationship(
        "Mailbox", backref=db.backref("domain", lazy="joined"), lazy=True
    )
    aliases = db.relationship(
        "Alias", backref=db.backref("domain", lazy="joined"), lazy=True
    )

    def __str__(self):
        return self.fqdn

    def __repr__(self):
        return f"<Domain id={self.id} fqdn={self.fqdn}>"

    def __hash__(self):
        return hash((self.id, self.fqdn))
