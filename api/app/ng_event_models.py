from app import db
from app.user_models import User

from sqlalchemy import Text

from sqlalchemy.dialects.postgresql import JSON, JSONB



class PageCard(db.Model):
    __tablename__ = 'pagecard'
    id =  db.Column('id', db.Integer, primary_key=True)
    pageId = db.Column('pageId', db.Integer, db.ForeignKey('page.id'))
    component = db.Column('component', db.String)
    enabled = db.Column('enabled', db.String)

    def save(self):
      db.session.add(self)
      db.session.commit()

    @staticmethod
    def get_all():
        return PageCard.query

    def serialise(self):
        return  { 'id': self.id, 'component': self.component, 'enabled' : self.enabled }

class Page(db.Model):
    __tablename__ = 'page'
    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String(255))

    def save(self):
      db.session.add(self)
      db.session.commit()

    @staticmethod
    def get_all():
        return Page.query

    def serialise(self):

        cards_json = []
        cards = self.cards

        for _ in cards:
                cards_json.append(_.serialise())

        return  {
                   'id': self.id,
                   'url' : self.url,
                   'cards' : cards_json
                }


class Card(db.Model):
    __tablename__ = 'cards'

    id = db.Column(db.Integer, primary_key=True)
    order = db.Column(db.Integer)

    component = db.Column(db.String(255))

    key = db.Column(JSONB(astext_type=Text()))
    data = db.Column(db.JSON)

    def __init__(self, component, key, data):
        self.component = component
        self.key = key
        self.data = data

    def save(self):
        db.session.add(self)
        db.session.commit()

    @staticmethod
    def get_all():
        return Card.query

    @staticmethod
    def delete_all():
        db.session.query(Card).delete()
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def __repr__(self):
        return "<Card: {}>".format(self.id)

    def serialise(self):

        return  {
                   'id': self.id,
                   'component' : self.component,
                   'key' : self.key,
                   'data' : self.data,
                   'order' : self.order
                }

