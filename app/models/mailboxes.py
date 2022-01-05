import datetime as dt

import sqlalchemy as sa
from passlib.hash import bcrypt

from app.ext import db


class Mailbox(db.Model):
    """The mail domain model"""

    __tablename__ = "mailboxes"
    __table_args__ = (
        db.UniqueConstraint("domain_id", "name", name="ix_mailboxes_email"),
    )

    id = db.Column(db.Integer, primary_key=True)
    domain_id = db.Column(
        db.Integer, db.ForeignKey("domains.id", ondelete="CASCADE"), nullable=False
    )
    name = db.Column(db.String(150), nullable=False)
    password = db.Column(db.String(150), nullable=False)
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

    def __str__(self):
        return self.name

    def __repr__(self):
        return f"<Mailbox id={self.id} domain_id={self.domain_id} name={self.name}>"

    def __hash__(self):
        return hash((self.id, self.domain_id, self.name))

    @property
    def email(self):
        return f"{self.name}@{self.domain.fqdn}"

    @property
    def domain_name(self):
        return self.domain.fqdn

    def hash_password(self, password):
        self.password = bcrypt.hash(password)
