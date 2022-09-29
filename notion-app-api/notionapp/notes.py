from flask import ( Blueprint, request, redirect, session)
from . import models

bp = Blueprint('/notes', __name__, url_prefix="/notes")
