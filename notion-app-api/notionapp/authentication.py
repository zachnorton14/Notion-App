from flask import ( Blueprint, request, redirect, session)
from . import models

bp = Blueprint('authentication', __name__, url_prefix="/authentication")
