# app/__init__.py
import json
import jsonschema
from flask_api import FlaskAPI, status
import graphene
from graphene import relay
from graphene_sqlalchemy import SQLAlchemyConnectionField, SQLAlchemyObjectType
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import func, Text, Integer
from flask import request, jsonify, abort, make_response

from flask_graphql import GraphQLView

from shapely.geometry import shape, Point

# local import

from instance.config import app_config

# For password hashing
from flask_bcrypt import Bcrypt

# initialize db
db = SQLAlchemy()

from app.ng_event_models import Card
from app.user_models import User

def create_app(config_name):

    app = FlaskAPI(__name__, instance_relative_config=True)
    # overriding Werkzeugs built-in password hashing utilities using Bcrypt.
    bcrypt = Bcrypt(app)

    app.config.from_object(app_config[config_name])
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db.init_app(app)

    @app.route('/api/login/account', methods=['POST'])
    def login():

        password = request.data.get('password', '')
        userName    = request.data.get('userName', '')

        user = User.get_all().filter(User.userName == userName).first()

        if user is not None:
          response = jsonify({'status' : 'ok', 'type' : 'account', 'currentAuthority': 'admin'})
          return make_response(response), 200

        return make_response(jsonify({'status': 'error', 'type' : 'account', 'currentAuthority': 'guest'})), 200


    @app.route('/api/real/currentUser', methods=['GET'])
    def currentUser():
        response = jsonify({'name': 'Daniel Garcia', 'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png', 'userid': 1, 'notifyCount': 3,})
        return make_response(response), 200

    @app.route('/api/real/cards', methods=['POST'])
    def list_cards():

      type = request.data.get('type', '')
      store_id    = request.data.get('store_id', '')

      cards   = Card.get_all().filter(Card.key["type"].astext == "store").filter(Card.key["store_id"].astext == str(store_id))

      results = []
      for card in cards:
          results.append(card.serialise())

      return make_response(jsonify({ 'list' : results })), 200

    return app
