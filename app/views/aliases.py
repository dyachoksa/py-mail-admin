from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required

from app.ext import db
from app.models import Alias
from app.schemas import AliasSchema

schema = AliasSchema()

aliases = Blueprint("aliases", __name__)


@aliases.get("", endpoint="list")
@jwt_required()
def get_list():
    domain_id = request.args.get("domainId")

    qs = Alias.query.order_by(Alias.created_at.desc())
    if domain_id:
        qs = qs.filter_by(domain_id=domain_id)

    objects = qs.all()

    return jsonify(
        {
            "success": True,
            "total": len(objects),
            "count": len(objects),
            "result": schema.dump(objects, many=True),
        }
    )


@aliases.get("/<int:alias_id>", endpoint="detail")
@jwt_required()
def get_one(alias_id):
    alias = Alias.query.filter_by(id=alias_id).first_or_404(description="Not found")

    return jsonify({"success": True, "result": schema.dump(alias)})


@aliases.post("")
@jwt_required()
def create():
    alias = schema.load(request.get_json())

    db.session.add(alias)
    db.session.commit()

    return jsonify({"success": True, "result": schema.dump(alias)}), 201


@aliases.put("/<int:alias_id>")
@jwt_required()
def update(alias_id):
    alias = Alias.query.filter_by(id=alias_id).first_or_404(description="Not found")

    alias = schema.load(request.get_json(), instance=alias)

    db.session.commit()

    return jsonify({"success": True, "result": schema.dump(alias)})


@aliases.delete("/<int:alias_id>")
@jwt_required()
def remove(alias_id):
    alias = Alias.query.filter_by(id=alias_id).first_or_404(description="Not found")

    db.session.delete(alias)
    db.session.commit()

    return "", 204
