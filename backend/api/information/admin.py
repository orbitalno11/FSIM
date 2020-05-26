from flask import Blueprint, request
from flask_cors import CORS

# import api helper
import backend.helpers.api_response_helper as api_helper
from backend.helpers.database_helper import DatabaseHelper

# import authen
import backend.modules.AuthenticationModule as auth

admin_information = Blueprint('admin_information', __name__)
CORS(admin_information)


# get all information data
@admin_information.route('', methods=['GET'])
@auth.token_required
def get_dept_information(current_user):
    dept_id = request.args.get('dept_id')

    db = DatabaseHelper()
    result = db.get_department_detail(dept_id)

    return api_helper.return_response(result)


@admin_information.route('/course', methods=['GET'])
@auth.token_required
def get_course(current_user):
    course_id = request.args.get('course_id')
    db = DatabaseHelper()
    result = db.get_course(course_id)

    return api_helper.return_response(result)


@admin_information.route('/course/list', methods=['GET'])
@auth.token_required
def get_course_list(current_user):
    db = DatabaseHelper()
    result = db.get_course_list()

    return api_helper.return_response(result)
