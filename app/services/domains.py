import random
import string
import typing

from app.ext import db
from app.models import Domain, Mailbox, Alias
from app.schemas import DomainSchema

STANDARD_MAILBOXES = ["abuse", "hostmaster", "postmaster", "webmaster"]


class DomainsService:
    def __init__(self):
        self.schema = DomainSchema()

    def get_schema(self):
        return self.schema

    def find_all(self):
        return Domain.query.order_by(Domain.created_at.desc()).all()

    def find_one(self, domain_id):
        return Domain.query.filter_by(id=domain_id).first_or_404(
            description="Domain not found"
        )

    def create_domain(self, data: typing.Dict) -> Domain:
        domain = self.schema.load(data, unknown="EXCLUDE")

        domain.mailboxes = []

        if data.get("add_standard_mailboxes", False):
            redirect_to = data.get("redirect_to")
            if redirect_to:
                self._add_standard_aliases(domain, redirect_to)
            else:
                self._add_standard_mailboxes(domain)

        if data.get("add_admin_mailbox", False):
            mailbox = Mailbox(name="admin", is_active=True)
            mailbox.hash_password(self._generate_random_password())
            domain.mailboxes.append(mailbox)

        db.session.add(domain)
        db.session.commit()

        return domain

    def update_domain(self, domain_id, data) -> Domain:
        domain = self.find_one(domain_id)
        domain = self.schema.load(data, instance=domain)

        db.session.commit()

        return domain

    def remove_domain(self, domain_id):
        domain = self.find_one(domain_id)

        db.session.delete(domain)
        db.session.commit()

    def _add_standard_mailboxes(self, domain):
        mailboxes = []

        for mailbox_name in STANDARD_MAILBOXES:
            mailbox = Mailbox(name=mailbox_name, is_active=True)
            mailbox.hash_password(self._generate_random_password())

            mailboxes.append(mailbox)

        domain.mailboxes = mailboxes

    def _add_standard_aliases(self, domain: Domain, destination: str):
        aliases = []

        for source in STANDARD_MAILBOXES:
            alias = Alias(source=source, destination=destination, is_active=True)
            aliases.append(alias)

        domain.aliases = aliases

    def _generate_random_password(self) -> str:
        return "".join(random.choices(string.digits + string.ascii_letters))
