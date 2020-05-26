from flask import Blueprint, request
from flask_cors import CORS


user_information = Blueprint('user_information', __name__)
CORS(user_information)
