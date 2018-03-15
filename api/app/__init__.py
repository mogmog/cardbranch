# app/__init__.py
import json
import jsonschema
from flask_api import FlaskAPI, status
import graphene
from graphene import relay
from graphene_sqlalchemy import SQLAlchemyConnectionField, SQLAlchemyObjectType
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import func
from flask import request, jsonify, abort, make_response

from flask_graphql import GraphQLView

from shapely.geometry import shape, Point

# local import

from instance.config import app_config

# For password hashing
from flask_bcrypt import Bcrypt

# initialize db
db = SQLAlchemy()

from app.ng_event_models import Card, CardTemplate
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

        user = Card.get_all().filter(User.userName == userName).first()

        print (user)

        response = jsonify({'status' : 'ok', 'type' : 'account', 'currentAuthority': 'admin'})

        return make_response(response), 200


    @app.route('/api/currentUser', methods=['GET'])
    def currentUser():
        response = jsonify({'name': 'Daniel Garcia', 'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png', 'userid': '00000001', 'notifyCount': 3,})
        return make_response(response), 200


    @app.route('/api/cards/create', methods=['POST'])
    def create_card():
        #template_id, wrapper, key, data

        template_id = request.data.get('template_id', '')
        wrapper     = request.data.get('wrapper', '')
        key         = request.data.get('key')
        data        = request.data.get('data', {})

        card = Card(template_id =template_id, wrapper=wrapper, key=key, data=data )
        card.save()

        response = jsonify({})

        return make_response(response), 201

    @app.route('/api/mycards/<context>/<key>', methods=['GET'])
    def list_mycards(context, key):

      cards   = Card.get_all()
      results = []
      for card in cards:
        if (card.key == key and card.template.context == context):
          results.append(card.serialise())

      return make_response(jsonify({ 'list' : results })), 200

    @app.route('/api/cards/alerts', methods=['GET'])
    def list_alerts():

      cards   = Card.get_all()#.filter(Card.wrapper == 'Alert')

      results = []
      for card in cards:
          results.append(card.serialise())

      return make_response(jsonify({ 'list' : results })), 200



    @app.route('/api/cardtemplates/create', methods=['POST'])
    def create_cardtemplate():

        wrapper_component = request.data.get('wrapper_component', '')
        form    = request.data.get('form', '')
        context   = request.data.get('context')

        cardtemplate = CardTemplate(wrapper_component=wrapper_component, form=form, context=context)
        cardtemplate.save()
        response = jsonify({
            'wrapper_component':  cardtemplate.wrapper_component,
            'form' : cardtemplate.form,
            'context' : cardtemplate.context,
            'id' : cardtemplate.id,
        })

        return make_response(response), 201


    @app.route('/api/cardtemplates/list', methods=['GET'])
    def list_cardtemplate():

      templates   = CardTemplate.get_all()
      results = []
      for cardtemplate in templates:
        results.append(cardtemplate.serialise())

      return make_response(jsonify({ 'list' : results })), 200

    return app
