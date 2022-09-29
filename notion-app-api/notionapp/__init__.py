# config                    
from flask import Flask, session
from flask_cors import CORS

# factory 
def create_app(): 
    app = Flask(__name__)  
    CORS(app)

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