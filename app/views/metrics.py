from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required
from sqlalchemy import Integer
from sqlalchemy.sql import text

from app.ext import db

metrics = Blueprint("metrics", __name__)


@metrics.get("/totals")
@jwt_required()
def totals():
    query_base = """
    SELECT
        count(id) FILTER ( WHERE is_active IS TRUE ) AS "active",
        count(id) FILTER ( WHERE is_active IS FALSE ) AS "disabled"
    FROM {table}
    """

    results = {}

    for table in ["domains", "mailboxes", "aliases"]:
        query = text(query_base.format(table=table)).columns(
            active=Integer, disabled=Integer
        )
        res = db.session.execute(query).fetchone()
        results[table] = {"active": res[0], "disabled": res[1]}

    return jsonify({"success": True, "result": results})
