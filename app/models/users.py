import datetime as dt

from passlib.hash import bcrypt
import sqlalchemy as sa

from app.ext import db, jwt


class User(db.Model):
    """The internal account to access admin panel"""

    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(150), unique=True, nullable=False)
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
        return self.email

    def __repr__(self):
        return f"<User id={self.id} email={self.email}>"

    def __hash__(self):
        return hash((self.id, self.email))

    def get_id(self):
        return str(self.id)

    @property
    def is_authenticated(self):
        return True

    @property
    def is_anonymous(self):
        return False

    def set_password(self, password):
        self.password = bcrypt.hash(password)

    def check_password(self, password):
        return bcrypt.verify(password, self.password)


@jwt.user_identity_loader
def user_identity_lookup(user: User) -> str:
    return str(user.id)


@jwt.user_lookup_loader
def user_lookup_callback(jwt_header, jwt_data) -> User:
    user_id = int(jwt_data["sub"])

    return User.query.filter_by(id=user_id, is_active=True).first()
