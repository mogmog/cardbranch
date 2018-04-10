# app/__init__.py
import json
import jsonschema
import random
from flask_api import FlaskAPI, status
import graphene
from graphene import relay
from graphene_sqlalchemy import SQLAlchemyConnectionField, SQLAlchemyObjectType
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import func, Text, Integer
from flask import request, jsonify, abort, make_response
from shapely.geometry import shape, Point

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

    @app.route('/api/real/login/account', methods=['POST'])
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

      if type == 'store':
        store_id    = request.data.get('store_id', '')
        cards   = Card.get_all().filter(Card.key["type"].astext == "store").filter(Card.key["store_id"].astext == str(store_id)).order_by(Card.order)

      if type == 'district':
              district_name = request.data.get('district_name', '')
              cards   = Card.get_all().filter(Card.key["type"].astext == "district").filter(Card.key["district_name"].astext == str(district_name)).order_by(Card.order)

      results = []
      for card in cards:
          results.append(card.serialise())

      return make_response(jsonify({ 'list' : results })), 200


    @app.route('/api/real/heatmap', methods=['POST'])

    def get_heatmap():


      def generate_random_data(lat, lon, num_rows):
              llist = []
              for _ in range(num_rows):
                  dec_lat = random.random()/1
                  dec_lon = random.random()/1
                  llist.append((lon-dec_lon, lat+dec_lat))

              return llist

      district = request.data.get('district', {})
      #print (district)

      area_polygon = shape(district['geometry'])

      latitude = 51.507879
      longitude = 0

      random_latlongs_male    = (generate_random_data(latitude, longitude, 1500))
      random_latlongs_female  = (generate_random_data(latitude, longitude, 1500))

      features_male = []
      features_female = []

      for _ in random_latlongs_male:
        if (area_polygon.contains(Point(_[0], _[1]))):
          features_male.append({'type' : 'Feature', 'geometry' : {'type' : 'Point', 'coordinates' : [_[0], _[1]]}, 'properties' : {'mag' : random.randint(1,100) }})

      for _ in random_latlongs_female:
        if (area_polygon.contains(Point(_[0], _[1]))):
          features_female.append({'type' : 'Feature', 'geometry' : {'type' : 'Point', 'coordinates' : [_[0], _[1]]}, 'properties' : {'mag' : random.randint(1,100) }})

      return make_response(jsonify({'male' : { 'type' : 'FeatureCollection', 'features' : features_male }, 'female' : { 'type' : 'FeatureCollection', 'features' : features_female }})), 200

    return app


