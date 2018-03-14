from app import db

class CardTemplate(db.Model):
    __tablename__ = 'cardtemplate'

    id = db.Column(db.Integer, primary_key = True, autoincrement=True)
    wrapper_component = db.Column(db.String(255))
    form = db.Column(db.JSON)
    context = db.Column(db.String(255))

    def __init__(self, wrapper_component, form, context):
        self.wrapper_component = wrapper_component
        self.form = form
        self.context= context

    def save(self):
        db.session.add(self)
        db.session.commit()

    @staticmethod
    def get_all():
        return CardTemplate.query

    @staticmethod
    def delete_all():
        db.session.query(CardTemplate).delete()
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def __repr__(self):
        return "<CardTemplate: {}>".format(self.id)

    def serialise(self):

          return  {
                     'id': self.id,
                     'wrapper_component' : self.wrapper_component,
                     'form' : self.form,
                     'context' : self.context
                  }



class Card(db.Model):
    __tablename__ = 'cards'

    id = db.Column(db.Integer, primary_key=True)
    template_id = db.Column(db.Integer, db.ForeignKey('cardtemplate.id'))
    template    = db.relationship(CardTemplate)

    wrapper = db.Column(db.String(255))
    key = db.Column(db.String(255))
    data = db.Column(db.JSON)

    def __init__(self, template_id, wrapper, key, data):
        self.template_id = template_id
        self.wrapper = wrapper
        self.key= key
        self.data= data

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

        print (self.template.form['schema'])

        form = {}
        form['schema'] = self.template.form['schema']
        form['uiSchema'] = self.template.form['uiSchema']
        form['data'] = self.data

        print(form)


        return  {
                   'id': self.id,
                   'wrapper' : self.wrapper,
                   'key' : self.key,
                   'form' : form
                }

