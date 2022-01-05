from marshmallow import fields

from app.ext import ma
from app.models import User


class LoginSchema(ma.Schema):
    email = fields.Email(required=True)
    password = fields.String(required=True)


class UserSchema(ma.SQLAlchemyAutoSchema):
    password = ma.auto_field(load_only=True)

    class Meta:
        model = User
