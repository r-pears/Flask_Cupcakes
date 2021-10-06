"""Models for Cupcake app."""
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

DEFAULT_IMAGE = 'https://image.shutterstock.com/image-vector/cupcake-vector-illustration-isolated-on-600w-1499172332.jpg'


def connect_db(app):
    """Connect app to the database."""
    db.app = app
    db.init_app(app)


class Cupcake (db.Model):
    """Model for the cupcake."""
    __tablename__ = 'cupcakes'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    flavor = db.Column(db.Text, nullable=False)
    size = db.Column(db.Text, nullable=False)
    rating = db.Column(db.Float, nullable=False)
    image = db.Column(db.Text, nullable=False, default=DEFAULT_IMAGE)

    def to_dict(self):
        """Serialize cupcake to a dict of cupcake information."""

        return {
            'id': self.id,
            'flavor': self.flavor,
            'rating': self.rating,
            'size': self.size,
            'image': self.image
        }
