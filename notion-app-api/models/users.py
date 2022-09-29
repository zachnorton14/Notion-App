from pymongo import MongoClient
client = MongoClient()
db = client.thecabinet
users = db.users

# from mongoengine import *
# connect('thecabinet')

# class User(Document):
#     email = StringField(required=True)
#     first_name = StringField(max_length=50)
#     last_name = StringField(max_length=50)



# user = {"user": "zach",
#         "password": "password123"
# }

# # user_id = users.insert_one(user).inserted_id

# print(users.find_one({"user":"zach"}))