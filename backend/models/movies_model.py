from db import db


class MoviesModel(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    ott = db.Column(db.String, nullable=False)
    releasedate = db.Column(db.Date, nullable=False)
