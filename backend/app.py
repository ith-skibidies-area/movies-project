from flask import Flask, render_template
from flask_jwt_extended import JWTManager
from blueprints.user_blueprint import user_bp
from blueprints.genre_blueprint import genre_bp
from blueprints.movies_blueprint import movies_bp
from blueprints.auth import auth_bp
from blueprints.ott_blueprint import ott_bp
from db import db

app = Flask(__name__)

app.secret_key = "key"
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///data.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

app.register_blueprint(user_bp)
app.register_blueprint(auth_bp)
app.register_blueprint(genre_bp)
app.register_blueprint(movies_bp)
app.register_blueprint(ott_bp)

db.init_app(app)

JWTManager(app)


@app.route("/")
def index():
    return render_template("index.html")


if __name__ == "__main__":
    with app.app_context():
        from models.genre_model import GenreModel
        from models.movies_model import MoviesModel

        db.create_all()
    app.run(debug=True)
