from flask import request
from backend.helpers.api_response_helper import create_error_exception

import jwt
from functools import wraps

# def token_required(f):
#     @wraps(f)
#     def decorated(*args, **kwargs):
#         token = None
#
#         if 'x-access-token' in request.headers:
#             token = request.headers['x-access-token']
#
#         if not token:
#             return create_error_exception(message="Token is missing", response_code=401, value="Token is missing")
#
#         try:
#             data = jwt.decode(token, )