from flask import Flask, request, session, jsonify
from flask_cors import CORS
from config import ApplicationConfig
from models import User
from flask_session import Session
from passlib.hash import pbkdf2_sha256
import json

app = Flask(__name__)  
CORS(app, supports_credentials=True)

app.config.from_object(ApplicationConfig)

server_session = Session(app)

@app.route('/')
def index(): 
    return 'home page test!'

@app.route('/@me')
def find_current_user():
    user_id = session.get("user_id")
    print(user_id)
    if not user_id:
        return jsonify({'error':'Unauthorized'}), 401

    user = json.loads(User.objects(pk=user_id).to_json())
    return {
        "user_id": user_id,
        "user": user
    }

@app.route('/users', methods=['POST'])
def create_user():
    if request.method == 'POST':
        newusername = request.json['username']
        newpassword = request.json['password']
        newemail = request.json['email']

        hashPass = pbkdf2_sha256.hash(str(newpassword))
        existing_username = User.objects(username=newusername).first()
        existing_email = User.objects(email=newemail).first()

        if existing_email is not None:
            print('test')
            return jsonify({'error':f'email "{newemail}" is already in use'}), 409
        
        if existing_username is not None:
            print('test2')
            return jsonify({'error':f'username "{newusername}" is already in use'}), 409

        User(username=str(newusername), password_hash=str(hashPass), email=str(newemail)).save()
        return jsonify({"message":"Successfully added new user"}), 200

@app.route('/authentication', methods=['POST'])
def login_authentication():
    if request.method == 'POST':
        email = request.json['email']
        password = request.json['password']

        existing_user = User.objects(email=email).first()
        if existing_user is None:
            return jsonify({'error':'Invalid username or password'}), 401
        
        hashed_password = existing_user['password_hash']
        
        if not pbkdf2_sha256.verify(str(password), hashed_password):
            return jsonify({'error':'Invalid username or password'}), 401
        
        user = json.loads(existing_user.to_json())
        session["user_id"] = user['_id']['$oid']
        print(session.get("user_id"))

        return {
            "message":"Login was successful",
            "user": user
        }, 200, {'ContentType':'application/json'}
        
    return {"message":"temporary"}
    
