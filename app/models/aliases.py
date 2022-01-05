import datetime as dt

import sqlalchemy as sa

from app.ext import db


class Alias(db.Model):
    """Email forwarding alias"""

    __tablename__ = "aliases"

    id = db.Column(db.Integer, primary_key=True)
    domain_id = db.Column(
        db.Integer, db.ForeignKey("domains.id", ondelete="CASCADE"), nullable=False
    )
    source = db.Column(db.String(150), nullable=False)
    destination = db.Column(db.String(150), nullable=False)
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
        return self.source

    def __repr__(self):
        return f"<Alias id={self.id} domain_id={self.domain_id} source={self.source}> destination={self.destination}"

    def __hash__(self):
        return hash((self.id, self.domain_id, self.source, self.destination))

    @property
    def email(self):
        return f"{self.source}@{self.domain_name}"

    @property
    def domain_name(self):
        return self.domain.fqdn
