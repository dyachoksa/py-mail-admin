from app.ext import ma
from app.models import Alias


class AliasSchema(ma.SQLAlchemyAutoSchema):
    domain_name = ma.String(dump_only=True, attribute="domain_name")
    created_at = ma.auto_field(dump_only=True)
    updated_at = ma.auto_field(dump_only=True)

    class Meta:
        model = Alias
        load_instance = True
        include_fk = True
