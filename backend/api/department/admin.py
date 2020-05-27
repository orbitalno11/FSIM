from flask import Blueprint, request
from flask_cors import CORS


# import api helper
import backend.helpers.api_response_helper as api_helper
from backend.helpers.database_helper import DatabaseHelper


# import authen
import backend.modules.AuthenticationModule as auth

admin_department = Blueprint('admin_department', __name__)
CORS(admin_department)


# get all department data
@admin_department.route('/', methods=['GET'])
@auth.token_required
def get_all_department_data(current_user):
    dept_id = request.args.get('dept_id')

    db = DatabaseHelper()
    result = db.get_department_detail(dept_id)

    return api_helper.return_response(result)
