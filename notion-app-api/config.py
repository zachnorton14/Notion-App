from dotenv import load_dotenv
import os
import redis

load_dotenv()

class ApplicationConfig:
    SECRET_KEY= os.environ["SECRET_KEY"]
    
    CORS_HEADERS = 'Content-Type'
    SECRET_KEY = 'asdasdjkasdbkja'
    # SESSION_COOKIE_PATH = '/'

    SESSION_TYPE = 'redis'
    SESSION_PERMANENT = False
    SESSION_USE_SIGNER = True
    SESSION_REDIS = redis.from_url('redis://127.0.0.1:6379')

