from flask import Blueprint, request
from models.genre_model import GenreModel
from flask_jwt_extended import jwt_required, get_jwt, get_jwt_identity

genre_bp = Blueprint("genre_bp", __name__)


@genre_bp.route("/genres")
def show_genres():
    return [genre.json() for genre in GenreModel.find_all()], 200


@genre_bp.route("/genres", methods=["POST"])
@jwt_required()
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


@genre_bp.route("/genre/<int:id>", methods=["GET", "PUT", "DELETE"])
# Create/Edit genre only after login Only Admin Deletes
@jwt_required(optional=True)
def show_edit_delete_genre(id):
    genre = GenreModel.find_one(id=id)
    if request.method == "GET":
        return {"id": genre.id, "name": genre.name}, 200
    else:

        if not GenreModel.find_one(id=id):
            return {"msg": "does not exist"}, 400

        if not get_jwt_identity():
            return {"msg": "not logged in"}, 400
        else:

            if request.method == "PUT":
                payload = request.get_json()
                name = payload.get("name")
                genre.name = name
                genre.save()
                return {"msg": "success"}, 200

            elif request.method == "DELETE":
                if get_jwt().get("role", "NA") != "admin":
                    return {"msg": "not admin"}
                genre.delete()
                return {"msg": "success"}, 200
