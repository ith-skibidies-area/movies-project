from flask import Blueprint, request
from models.genre_model import GenreModel
from flask_jwt_extended import jwt_required, get_jwt

genre_bp = Blueprint("genre_bp", __name__)


@genre_bp.route("/genres")
def show_genres():
    return [genre for genre in GenreModel.find_all()], 200


@genre_bp.route("/create_genre", methods=["POST"])
def create_genre():
    payload = request.get_json()
    name = payload.get("name")

    if not name:
        return {"msg": "failed"}, 400

    if GenreModel.find_one(name=name):
        return {"msg": "failed"}

    genre = GenreModel(name=name)
    genre.save()
    return {"msg": "success"}, 200


@genre_bp.route("/genre/<int:id>", methods=["GET", "POST", "PUT", "DELETE"])
@jwt_required(optional=True)
def show_edit_delete_genre(id):
    genre = GenreModel.find_one(id=id)
    if request.method == "GET":
        return {"id": genre.id, "name": genre.name}, 200
    elif request.method == "PUT":
        payload = request.get_json()
        name = payload.get("name")
        genre.name = name
        genre.save()
        return {"msg": "success"}, 200

    elif request.method == "DELETE":
        if get_jwt().get("role", "NA") != "admin":
            return {"msg": "failed"}
        genre.delete()
        return {"msg": "success"}, 200
