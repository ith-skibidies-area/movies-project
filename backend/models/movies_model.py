from db import db


class MoviesModel(db.Model):
    __table_name__ = "movies"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    ott = db.Column(db.String, nullable=False)
    releasedate = db.Column(db.Date, nullable=False)

    genre_id = db.Column(db.Integer, db.ForeignKey("genre_model.id"))
    # genre = db.relationship("GenreModel", back_populates="genre")

    def json(self):

        return {
            "id": self.id,
            "name": self.name,
            "ott": self.ott,
            "genre": self.genre.json() if self.genre else {"id": "NA", "name": "NA"},
            "release_date": str(self.releasedate.strftime("%d-%m-%Y")),
        }

    def save(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    @classmethod
    def find_one(cls, **kwargs):
        return cls.query.filter_by(**kwargs).first()

    @classmethod
    def find_all(cls, **kwargs):
        return cls.query.filter_by(**kwargs).all()
