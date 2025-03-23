from flask import Blueprint

ott_bp = Blueprint("ott_bp", __name__)


@ott_bp.route("/ott")
def show_all_otts():
    ott_list = ["Netflix", "Hulu", "Amazon", "Sony", "Hotstar"]
    return ott_list, 200
