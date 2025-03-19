from flask_jwt_extended import create_access_token
from models.user_model import UserModel
from flask import Blueprint, request

auth_bp = Blueprint("auth_bp", __name__)


@auth_bp.route("/login", methods=["POST"])
def user_login():
    payload = request.get_json()
    username = payload.get("username")
    password = payload.get("password")

    if not username or not password:
        return {"msg": "Failed"}, 400

    user = UserModel.find_one(username=username, password=password)
    if not user:
        return {"msg": "Failed"}, 400

    if user.password != password:
        return {"msg": "Failed"}, 400

    claims = {"role": user.role}
    access_token = create_access_token(identity=username, additional_claims=claims)

    return {"access_token": access_token, "msg": "Success"}, 200
