import email
from flask import Flask, request, session, jsonify
from flask_cors import cross_origin
from config import ApplicationConfig
from models import User
from flask_session import Session
from passlib.hash import pbkdf2_sha256
from dotenv import load_dotenv 
import json

app = Flask(__name__)  
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

    user = User.objects(ObjectId=user_id)
    return jsonify({
        "user": json.loads(user)
    })

@app.route('/users', methods=['POST'])
@cross_origin(origin='localhost:3000',headers=['Content-Type','Authorization'])
def create_user():
    if request.method == 'POST':
        newusername = request.json['username']
        newpassword = request.json['password']
        newemail = request.json['email']

        hashPass = pbkdf2_sha256.hash(str(newpassword))
        username_exists = User.objects.get(username=newusername) is not None
        email_exists = User.objects.get(email=newemail) is not None

        if email_exists:
            return jsonify({'error':f'email "{newusername}" is already in use'}), 409
        
        if username_exists:
            return jsonify({'error':f'username "{newusername}" is already in use'}), 409

        User(username=str(newusername), password_hash=str(hashPass), email=str(newemail)).save()
        return jsonify({"message":"Successfully added new user"}), 200

@app.route('/authentication', methods=['POST'])
@cross_origin(origin='localhost:3000',headers=['Content-Type','Authorization'])
def login_authentication():
    if request.method == 'POST':
        email = request.json['email']
        password = request.json['password']

        user = User.objects.get(email=email)
        if user is None:
            return jsonify({'error':'Invalid username or password'}), 401
        
        hashed_password = user['password_hash']
        
        if not pbkdf2_sha256.verify(str(password), hashed_password):
            return jsonify({'message':'Invalid username or password'}), 401
        
        current_user = json.loads(user.to_json())
        print(current_user)
        session["user_id"] = current_user['_id']['$oid']
        
        return {
            "message":"Login was successful",
            "user": (current_user)
        }, 200, {'ContentType':'application/json'}
        
    return {"message":"temporary"}
    
