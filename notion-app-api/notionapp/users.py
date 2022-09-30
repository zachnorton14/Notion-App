import ast
from flask import ( Blueprint, request, redirect, session)
from flask_cors import CORS, cross_origin
from pymongo import MongoClient
client = MongoClient()
db = client.thecabinet
users = db.users

bp = Blueprint('users', __name__, url_prefix="/users")
CORS(bp)

@bp.route('/', methods=['POST'])
@cross_origin(origin='localhost:3000',headers=['Content-Type','Authorization'])
def index():
    credentials = request.get_data()
    credentials_dict = ast.literal_eval(credentials.decode('utf-8'))
    print(users.find_one({"user":credentials_dict['username']}))
    return {"test":"message"}

