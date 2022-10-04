from flask import Flask, request, session, jsonify
from flask_cors import CORS
from config import ApplicationConfig
from models import User, Folder
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
            return jsonify({'error':f'email "{newemail}" is already in use'}), 409
        
        if existing_username is not None:
            return jsonify({'error':f'username "{newusername}" is already in use'}), 409

        User(username=str(newusername), password_hash=str(hashPass), email=str(newemail)).save()
        return jsonify({"message":"Successfully added new user"}), 200

@app.route('/authentication', methods=['POST'])
def login_authentication():
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

    return {
    "message":"Login was successful",
    "user": user
    }, 200, {'ContentType':'application/json'}

@app.route('/users/logout', methods=['POST'])
def delete_user():
    if request.method == 'POST':
        session["user_id"] = None

        return jsonify({"message": "Successfully logged user out"}), 200

@app.route('/folder', methods=['GET', 'POST'])
def folder():
    if request.method == 'POST':
        username = request.json['username']
        new_folder = Folder(creator=username).save()
        if new_folder is None:
            return jsonify({"error":"Could not create new folder with given credentials"})
        id = str(new_folder.id)

        return {
            "message": "Successfully created new folder",
            "id": id
        }, 200
    
    if request.method == 'GET':
        user_id = session.get("user_id")

        if not user_id:
            return jsonify({'error':'Unauthorized'}), 401

        user = json.loads(User.objects(pk=user_id).first().to_json())
        username = user['username']

        folders = []

        for folder in json.loads(Folder.objects(creator=username).all().to_json()):
            folders.append(folder)

        if folders is None:
            return jsonify({"message":"Current user hasn't created any folders"})

        return {
            "message": "Successfully found folder",
            "folders": folders
        }, 200
