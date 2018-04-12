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
from sqlalchemy import text

from flask_graphql import GraphQLView

from shapely.geometry import shape, Point

# local import

from instance.config import app_config

# For password hashing
from flask_bcrypt import Bcrypt

# initialize db
db = SQLAlchemy()

from app.ng_event_models import Card, Page, PageCard, Store
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
          response = jsonify({'status' : 'ok', 'type' : 'account', 'userId' : user.id, 'currentAuthority': 'admin'})
          return make_response(response), 200

        return make_response(jsonify({'status': 'error', 'type' : 'account', 'currentAuthority': 'guest'})), 200


    @app.route('/api/real/currentUser/<userId>', methods=['GET'])
    def currentUser(userId):

        user = User.get_all().filter(User.id == userId).one()
        response = jsonify(user.serialise())
        return make_response(response), 200

    @app.route('/api/real/stores', methods=['POST'])
    def getStores():

      type = request.data.get('type', '')

      if len(type) :
        stores = Store.query.filter(Store.type == type).all()
      else :
        stores = Store.query.all()

      results = []
      for store in stores:
        results.append(store.serialise())

      return make_response(jsonify({ 'list' : results })), 200


    @app.route('/api/real/pages', methods=['GET'])
    def getPages():

      pages = Page.query.filter(Page.url == "dashboard/crossfiltermap")

      results = []
      for page in pages:
        results.append(page.serialise())

      return make_response(jsonify({ 'list' : results })), 200

    @app.route('/api/real/admin/cardmappings', methods=['POST'])
    def list_cardmappings():

      url = request.data.get('url', '')
      userId = request.data.get('userId', 0)
      page = Page.get_all().filter(Page.url == url).one()

      mappings = PageCard.get_all().filter(PageCard.pageId == page.id).filter(PageCard.userId == userId).order_by(PageCard.id).all()

      results = []
      for mapping in mappings:
       results.append(mapping.serialise())

      return make_response(jsonify({ 'list' : results })), 200

    @app.route('/api/real/admin/cardmappings/<id>', methods=['POST'])
    def update_cardmapping(id):

      enabled = request.data.get('enabled', 'N')
      url = request.data.get('url', '')
      userId = request.data.get('userId', 0)

      mapping = PageCard.get_all().filter(PageCard.id == id).one()
      mapping.enabled = enabled
      mapping.save();

      page = Page.get_all().filter(Page.url == url).one()
      mappings = PageCard.get_all().filter(PageCard.userId == userId).filter(PageCard.pageId == page.id).order_by(PageCard.id).all()

      results = []
      for mapping in mappings:
       results.append(mapping.serialise())

      return make_response(jsonify({ 'list' : results })), 200

    @app.route('/api/real/cards', methods=['POST'])
    def list_cards():

      userid = request.data.get('userid', '0')
      url = request.data.get('url', '')
      type = request.data.get('type', '')
      id   = str(request.data.get('id', ''))

      sql = text('select id from cards where component IN ( SELECT component FROM pagecard JOIN page ON (pagecard.\"pageId\" = page.id AND pagecard.\"userId\" = ' + str(userid) + ' AND pagecard.enabled = \'Y\') WHERE url = \'' + url + '\') and key->> \'type\' = \'' + type + '\' and key->>\'id\' = \'' + id + '\'')
      print (sql)
      result = db.engine.execute(sql)

      cardids = []
      for row in result:
          cardids.append(row[0])

      cards = Card.get_all().filter(Card.id.in_(cardids)).order_by(Card.order).all()

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

      random_latlongs_male    = (generate_random_data(latitude, longitude, 15000))
      random_latlongs_female  = (generate_random_data(latitude, longitude, 15000))

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


