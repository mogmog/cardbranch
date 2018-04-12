from app import db

class User(db.Model):
    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True)
    userName = db.Column(db.String(255))

    def __init__(self, userName):
        self.userName = userName

    def save(self):
        db.session.add(self)
        db.session.commit()

    @staticmethod
    def get_all():
        return User.query

    @staticmethod
    def delete_all():
        db.session.query(User).delete()
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def __repr__(self):
        return "<User: {}>".format(self.id)

    def serialise(self):

        return  {
                   'userid': self.id,
                   'notifyCount': 3,
                   'isAdmin' : True,
                   'name' : self.userName,
                   'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
                }
