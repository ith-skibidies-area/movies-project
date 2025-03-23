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
        return {"msg": "invalid input"}, 400

    if GenreModel.find_one(name=name):
        return {"msg": "genre already exist"}

    genre = GenreModel(name=name)
    genre.save()
    return {"msg": "genre created"}, 200


@genre_bp.route("/genre/<int:id>", methods=["GET", "PUT", "DELETE"])
# Create/Edit genre only after login Only Admin Deletes
@jwt_required(optional=True)
def show_edit_delete_genre(id):
    genre = GenreModel.find_one(id=id)

    if not GenreModel.find_one(id=id):
        return {"msg": "genre doesn't exist"}, 400

    if request.method == "GET":
        return genre.json(), 200
    else:

        if not get_jwt_identity():
            return {"msg": "not logged in"}, 400
        else:

            if request.method == "PUT":
                payload = request.get_json()
                name = payload.get("name")
                if GenreModel.find_one(name=name):
                    return {"msg": "genre name already exist"}, 200
                genre.name = name
                genre.save()
                return genre.json(), 200

            elif request.method == "DELETE":
                if get_jwt().get("role", "NA") != "admin":
                    return {"msg": "you are not authorized to perform this operation"}
                genre.delete()
                return {"msg": "genre deleted"}, 200
