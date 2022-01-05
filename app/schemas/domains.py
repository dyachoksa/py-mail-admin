from app.ext import ma
from app.models import Domain


class DomainSchema(ma.SQLAlchemyAutoSchema):
    fqdn = ma.auto_field(required=True)
    created_at = ma.auto_field(dump_only=True)
    updated_at = ma.auto_field(dump_only=True)

    class Meta:
        model = Domain
        load_instance = True
