from db import db


class GenreModel(db.Model):
    __table_name__ = "genre"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)

    movies = db.relationship("MoviesModel", backref="genre", lazy="joined")

    def json(self):
        return {"id": self.id, "name": self.name}

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
