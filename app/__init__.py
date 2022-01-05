import os

from flask import Flask

from .ext import db, ma, jwt
from .views.aliases import aliases
from .views.auth import auth
from .views.domains import domains
from .views.mailboxes import mailboxes
from .views.metrics import metrics


def create_app():
    app = Flask(__name__)

    environment = os.getenv("FLASK_ENV", "production")

    app.config.from_object(f"app.config.{environment.title()}Config")

    db.init_app(app)
    ma.init_app(app)
    jwt.init_app(app)

    app.register_blueprint(auth, url_prefix="/api/auth")
    app.register_blueprint(domains, url_prefix="/api/domains")
    app.register_blueprint(mailboxes, url_prefix="/api/mailboxes")
    app.register_blueprint(aliases, url_prefix="/api/aliases")
    app.register_blueprint(metrics, url_prefix="/api/metrics")

    return app
