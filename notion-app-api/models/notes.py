from pymongo import MongoClient
client = MongoClient()
db = client.thecabinet
notes = db.notes