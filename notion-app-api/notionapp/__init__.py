# config                    
from flask import Flask, session
from flask_cors import CORS, cross_origin

# factory 
def create_app(): 
    app = Flask(__name__)  
    CORS(app)

    app.config['SECRET_KEY'] = 'the quick brown fox jumps over the lazy   dog'
    app.config['CORS_HEADERS'] = 'Content-Type' 

    # index route
    @app.route('/')
    def index(): 
        session['key'] = 'value'
        return 'home page test!'

    # register pet blueprint 
    from . import notes 
    app.register_blueprint(notes.bp)

    # register fact blueprint 
    from . import users
    app.register_blueprint(users.bp)

    from . import authentication
    app.register_blueprint(authentication.bp)

    # return the app 
    return app