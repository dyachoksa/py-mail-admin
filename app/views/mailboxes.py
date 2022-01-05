from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required

from app.ext import db
from app.models import Mailbox
from app.schemas import MailboxSchema

mailboxes = Blueprint("mailboxes", __name__)


@mailboxes.get("", endpoint="list")
@jwt_required()
def get_list():
    domain_id = request.args.get("domainId")

    qs = Mailbox.query.order_by(Mailbox.created_at.desc())
    if domain_id:
        qs = qs.filter_by(domain_id=domain_id)

    objects = qs.all()

    return jsonify(
        {
            "success": True,
            "result": MailboxSchema(many=True).dump(objects),
            "total": len(objects),
            "count": len(objects),
        }
    )


@mailboxes.get("/<int:mailbox_id>")
@jwt_required()
def get_one(mailbox_id):
    schema = MailboxSchema()

    mailbox = Mailbox.query.filter_by(id=mailbox_id).first_or_404(
        description="Not found"
    )

    return jsonify({"success": True, "result": schema.dump(mailbox)})


@mailboxes.post("")
@jwt_required()
def create():
    schema = MailboxSchema()

    mailbox = schema.load(request.get_json())
    mailbox.hash_password(mailbox.password)

    db.session.add(mailbox)
    db.session.commit()

    return jsonify({"success": True, "result": schema.dump(mailbox)}), 201


@mailboxes.put("/<int:mailbox_id>")
@jwt_required()
def update(mailbox_id):
    schema = MailboxSchema()

    mailbox = Mailbox.query.filter_by(id=mailbox_id).first_or_404(
        description="Not found"
    )

    data = request.get_json()
    mailbox = schema.load(data, instance=mailbox, partial=["password"])
    if data.get("password"):
        mailbox.hash_password(mailbox.password)

    db.session.commit()

    return jsonify({"success": True, "result": schema.dump(mailbox)})


@mailboxes.delete("/<int:mailbox_id>")
@jwt_required()
def remove(mailbox_id):
    mailbox = Mailbox.query.filter_by(id=mailbox_id).first_or_404(
        description="Not found"
    )

    db.session.delete(mailbox)
    db.session.commit()

    return "", 204
