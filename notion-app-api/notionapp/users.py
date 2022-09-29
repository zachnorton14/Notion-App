from flask import ( Blueprint, request, redirect, session)
from . import models

bp = Blueprint('users', __name__, url_prefix="/users")

@bp.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        print(request)    
    return 'test'


# redirect('http://localhost:5000/dashboard/', code=302)
