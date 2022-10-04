from mongoengine import *
connect('thecabinet')

class User(Document):
    username = StringField(required=True, unique=True)
    password_hash = StringField()
    email = StringField(required=True, unique=True)
    bio = StringField(max_length=100, default='This user has not submitted a bio')
    profile_picture = StringField(default='../assets/blank-profile-picture.png')

class Note(Document):
    name = StringField(max_length=144, default='New note')
    creator = StringField(required=True)
    content = StringField()

class Folder(Document):
    name = StringField(max_length=120, default='New folder')
    creator = StringField(required=True)
    tags = ListField(StringField(max_length=30))
    is_published = BooleanField(default=False)

# folder = Folder(name="notion notes", creator="zachnorton14").save()

# zach = User(email='znortyy@gmail.com', username='zachnorton14', first_name='Zach', last_name='Norton').save()
# ross = User(email='ross@example.com', username='rossboss123', first_name='Ross', last_name='Lawley').save()

# # from pymongo import MongoClient
# client = MongoClient()
# db = client.thecabinet
# users = db.users


# # user_id = users.insert_one(user).inserted_id

# print(users.find_one({"user":"zach"}))