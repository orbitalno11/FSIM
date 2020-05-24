from flask import Blueprint, jsonify, request, make_response, current_app as app
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
import datetime

# import api helper
import backend.helpers.api_response_helper as api_helper
from backend.helpers.database_helper import DatabaseHelper

api_bp = Blueprint('api_bp', __name__)


# authentication route
@api_bp.route('/signup', methods=['POST'])
def create_staff():
    if request.method == 'POST':
        data = request.get_json()

        staff_id = data['staff_id']
        first_name = data['firstname']
        last_name = data['lastname']
        hashed_pass = generate_password_hash(data['password'], method='sha256')

        connect = DatabaseHelper()
        result = connect.create_user(staff_id, first_name, last_name, hashed_pass)

        return api_helper.return_response(result)


@api_bp.route('/signin', methods=['POST'])
def sign_in():
    auth_data = request.get_json()
    if not auth_data or not auth_data['username'] or not auth_data['password']:
        return api_helper.create_error_exception(message="Credentials data not found.", response_code=401,
                                                 value="Credentials data not found.")

    connect = DatabaseHelper()
    result = connect.get_user_for_auth(auth_data['username'])

    if not result['response']:
        return api_helper.create_error_exception(message="Cloud not verify.", response_code=401,
                                                 value="Cloud not verify.")

    user = result['value']
    user = list(user[0])
    user_type = "user" if user[1] == -1 else "admin"

    userData = {
        'name': user[2],
        'type': user_type
    }
    if check_password_hash(user[4], auth_data['password']):
        token = jwt.encode({'staff_id': user[0], 'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60)},
                           app.config['SECRET_KEY'])
        return api_helper.create_response(message="Signin successful",
                                          data={'token': token.decode('UTF-8'), 'userData': userData},
                                          response_code=200, response=True)

    return api_helper.create_error_exception(message="Cloud not verify.", response_code=401, value="Cloud not verify.")
