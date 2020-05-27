from flask import request, current_app as app

# import helper
from backend.helpers.api_response_helper import create_error_exception
from backend.helpers.database_helper import DatabaseHelper

import jwt
from functools import wraps


# ATM1
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None

        if 'x-access-token' in request.headers:
            token = request.headers['x-access-token']

        if not token:
            return create_error_exception(message="Token is missing", response_code=401, value="Token is missing")

        try:
            data = jwt.decode(token, app.config['SECRET_KEY'])
            db = DatabaseHelper()
            result = db.get_user(data['staff_id'])

            if not result['response']:
                return create_error_exception(message="User not found", response_code=401, value="User not found")

            current_user = result['value']

        except Exception as e:
            print("Error %d: %s" % (e.args[0], e.args[1]))
            return create_error_exception(message="Token is missing", response_code=401, value="Token is missing")

        return f(current_user, *args, **kwargs)

    return decorated
