from flask import Blueprint, request
from models.movies_model import MoviesModel
from flask_jwt_extended import jwt_required, get_jwt

movies_bp = Blueprint("movies_bp", __name__)


@movies_bp.route("/movies", methods=["GET", "POST"])
# Create movies only if logged in
@jwt_required(optional=True)
def show_create_movies():
    pass


@movies_bp.route("/movies/<int:id>", methods=["GET", "PUT", "DELETE"])
@jwt_required(optional=True)
# Create/Edit movies only after login Only Admin Deletes
def show_all_movies(id):
    pass
