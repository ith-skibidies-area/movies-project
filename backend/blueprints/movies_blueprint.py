from flask import Blueprint, request
from models.movies_model import MoviesModel
from flask_jwt_extended import jwt_required, get_jwt, get_jwt_identity
from datetime import date

movies_bp = Blueprint("movies_bp", __name__)


@movies_bp.route("/movies", methods=["GET", "POST"])
@jwt_required(optional=True)
def show_create_movies():
    if request.method == "GET":
        return [movies.json() for movies in MoviesModel.find_all()]
    if request.method == "POST":
        if not get_jwt_identity():
            return {"msg": "not logged in"}, 400
        else:
            payload = request.get_json()
            name = payload.get("name")
            genre_id = payload.get("genre_id")
            ott = payload.get("ott")
            release_date = payload.get("release_date")
            updated_date = date(release_date["year"], release_date["month"], release_date["date"])

            if not name or not genre_id or not ott or not release_date:
                return {"msg": "invalid inputs"}, 400

            if MoviesModel.find_one(name=name):
                return {"msg": "move name already taken"}, 400

            movie = MoviesModel(name=name, genre_id=genre_id, ott=ott, releasedate=updated_date)
            movie.save()
            return {"msg": "movie created"}, 200


@movies_bp.route("/movie/<int:id>", methods=["GET", "PUT", "DELETE"])
@jwt_required(optional=True)
def show_all_movies(id):
    movie = MoviesModel.find_one(id=id)
    if not movie:
        return {"msg": "movie not found"}, 400

    if request.method == "GET":
        return movie.json()

    elif request.method == "PUT":
        if not get_jwt_identity():
            return {"msg": "not logged in"}, 400

        payload = request.get_json()
        name = payload.get("name")
        genre_id = payload.get("genre_id")
        ott = payload.get("ott")
        payloaddate = payload.get("release_date")
        release_date = date(payloaddate["year"], payloaddate["month"], payloaddate["date"])

        if MoviesModel.find_one(name=name):
            return {"msg": "movie name already taken"}, 200

        movie_obj = MoviesModel.find_one(id=id)
        movie_obj.name = name
        movie_obj.genre_id = genre_id
        movie_obj.ott = ott
        movie_obj.releasedate = release_date

        movie_obj.save()

        return {"msg": "movie edited"}, 200

    elif request.method == "DELETE":

        if get_jwt().get("role", "NA") != "admin":
            return {"msg": "you are not authorized to perform this operation"}, 400

        movie.delete()
        return {"msg": "movie deleted"}, 200
