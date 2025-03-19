from flask import Blueprint, request
from models.user_model import UserModel
from flask_jwt_extended import jwt_required, get_jwt

user_bp = Blueprint("user_bp", __name__)


@user_bp.route("/register", methods=["POST"])
def register_user():
    payload = request.get_json()
    username = payload.get("username")
    password = payload.get("password")
    role = payload.get("role")

    if not username or not password:
        return {"msg": "Failed"}, 400

    if UserModel.find_one(username=username):
        return {"msg": "Failed"}, 400

    user = UserModel(username=username, password=password, role=role)
    user.save()

    return {"msg": "Success"}, 200


@user_bp.route("/users")
def show_all_users():
    return [user.json() for user in UserModel.find_all()]


@user_bp.route("/users/<string:username>", methods=["PUT", "DELETE"])
@jwt_required(optional=True)
def edit_delete_users(username):
    jwt = get_jwt()
    if jwt.get("role", "NA") != "admin":
        return {"msg": "not authorized"}, 400
    else:
        user = UserModel.find_one(username=username)

        if not user:
            return {"msg": "Failed"}, 400
        # Only the role is being updated here. Can be modified as required.
        if request.method == "PUT":
            payload = request.get_json()
            role = payload.get("role")
            user.role = role
            user.save()
            return {"msg": "success"}, 200
        # Since only the admin has the access to delete the user, username/password validation
        # is not checked here
        if request.method == "DELETE":
            user.delete()
            return {"msg": "success"}, 200
