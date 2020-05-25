from flask import Blueprint, request, current_app as app

# import constant
import backend.Constant as Constant

# import api helper
import backend.helpers.api_response_helper as api_helper
from backend.helpers.database_helper import DatabaseHelper
from backend.helpers.data_helper import DataHelper
import backend.helpers.upload_helper as upload_helper

# import module
from backend.modules.AnalyzeStudent import AnalyzeStudent

# import authen
import backend.modules.AuthenticationModule as auth

admin_information = Blueprint('admin_information', __name__)


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
