from flask import Flask, request, session, jsonify
from flask_cors import CORS
from config import ApplicationConfig
from models import User, Folder, Note
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

@app.route('/users', methods=['POST','PUT'])
def user():
    user_id = session.get("user_id")
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
    if request.method == 'PUT':
        edited_username = request.json['username']
        edited_bio = request.json['bio']
        edited_profile_picture = request.json['profile_picture']

        if not edited_username or not edited_bio or not edited_profile_picture :
            return jsonify({"message":"Edit fields cannot be blank"})

        updated_user = User.objects(pk=user_id).modify(
            set__username=edited_username,
            set__bio=edited_bio,
            set__profile_picture=edited_profile_picture
        )

        if updated_user is True:
            return jsonify({"message":"Could not edit user with specified values"})

        return {"message": "Successful edit"}


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
def all_folders():
    if request.method == 'POST':
        username = request.json['username']
        new_folder = Folder(creator=username).save()

        if new_folder is None:
            return jsonify({"error":"Could not create new folder with given credentials"})

        folder = json.loads(new_folder.to_json())
        print(folder)

        return {
            "message": "Successfully created new folder",
            "folder": folder
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
            "message": "Successfully deleted folder",
            "folders": folders
        }, 200
    
@app.route('/folder/<folder_id>', methods=['PUT', 'DELETE'])
def folder(folder_id):
    if request.method == 'DELETE':
        deleted_folder = Folder.objects(pk=folder_id).delete()

        print(deleted_folder)

        if deleted_folder is False:
            return jsonify({"message":"Could not delete folder with given id"})

        deleted_notes = Note.objects(folder_id=folder_id).delete()

        print(deleted_notes)

        if deleted_notes is False:
            return jsonify({"message":"Could not delete given folders notes"})

        return { "message": "Successfully found folders" }, 200

    if request.method == 'PUT':
        pass
        # edited_username = request.json['username']
        # edited_password = request.json['password']
        # edited_profile_picture = request.json['profile_picture']

        # if edited_username or edited_password or edited_profile_picture is None:
        #     return jsonify({"message":"Edit fields cannot be blank"})

        # user = User.objects(pk=user_id)
        # print(user)
        

@app.route('/folder/<folder_id>/note', methods=['GET', 'POST'])
def all_notes(folder_id):
    if request.method == 'GET':
        user_id = session.get("user_id")

        if not user_id:
            return jsonify({'error':'Unauthorized'}), 401

        user = json.loads(User.objects(pk=user_id).first().to_json())
        username = user['username']

        notes = []

        for note in json.loads(Note.objects(creator=username, folder_id=folder_id).all().to_json()):
            notes.append(note)

        if notes is None:
            return jsonify({"message":"Current folder has no notes"})

        return {
            "message": "Successfully found notes",
            "notes": notes
        }, 200

    if request.method == 'POST':
        username = request.json['username']
        new_note = Note(creator=username, folder_id=folder_id).save()

        if new_note is None:
            return jsonify({"error":"Could not create new note with given credentials"})

        id = str(new_note.id)

        return {
            "message": "Successfully created new note",
            "id": id
        }, 200
    
