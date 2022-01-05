from app.ext import ma
from app.models import Mailbox


class MailboxSchema(ma.SQLAlchemyAutoSchema):
    name = ma.auto_field(required=True)
    password = ma.auto_field(load_only=True)
    domain_name = ma.String(dump_only=True, attribute="domain_name")
    created_at = ma.auto_field(dump_only=True)
    updated_at = ma.auto_field(dump_only=True)

    class Meta:
        model = Mailbox
        load_instance = True
        include_fk = True
