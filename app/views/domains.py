from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required

from app.services import domains_service

domains = Blueprint("domains", __name__)


@domains.get("", endpoint="list")
@jwt_required()
def get_domains():
    objects = domains_service.find_all()

    return jsonify(
        {
            "success": True,
            "total": len(objects),
            "count": len(objects),
            "result": domains_service.get_schema().dump(objects, many=True),
        }
    )


@domains.post("")
@jwt_required()
def create():
    domain = domains_service.create_domain(request.get_json())

    return (
        jsonify({"success": True, "result": domains_service.get_schema().dump(domain)}),
        201,
    )


@domains.get("/<int:domain_id>", endpoint="detail")
@jwt_required()
def get_one(domain_id):
    domain = domains_service.find_one(domain_id)

    return jsonify(
        {"success": True, "result": domains_service.get_schema().dump(domain)}
    )


@domains.put("/<int:domain_id>")
@jwt_required()
def update(domain_id):
    domain = domains_service.update_domain(domain_id, request.get_json())

    return jsonify(
        {"success": True, "result": domains_service.get_schema().dump(domain)}
    )


@domains.delete("/<int:domain_id>")
@jwt_required()
def remove(domain_id):
    domains_service.remove_domain(domain_id)

    return "", 204
