from flask import Blueprint, request, jsonify
from flask_jwt_extended import (
    create_access_token,
    jwt_required,
    current_user,
    set_access_cookies,
)

from app.models import User
from app.schemas.users import LoginSchema, UserSchema

auth = Blueprint("auth", __name__)


@auth.post("/token", endpoint="get-token")
def get_token():
    data = LoginSchema().load(request.get_json())

    user = User.query.filter_by(email=data["email"], is_active=True).first()
    if user is None or not user.check_password(data["password"]):
        return jsonify({"success": False, "error": "Unknown username or password"}), 401

    token = create_access_token(identity=user)

    response = jsonify(
        {"success": True, "token": token, "result": UserSchema().dump(user)}
    )

    set_access_cookies(response, token)

    return response


@auth.get("/me", endpoint="current-user")
@jwt_required()
def get_current_user():
    return jsonify({"success": True, "result": UserSchema().dump(current_user)})
