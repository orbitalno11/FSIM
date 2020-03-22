from flask import Blueprint, jsonify, request, make_response, current_app as app

# import api helper
import backend.helpers.api_response_helper as api_helper
from backend.helpers.database_helper import DatabaseHelper

api_bp = Blueprint('api_bp', __name__, url_prefix='/api/v1')


# # # # # get department student data
# show department data page (vut)
@api_bp.route('/department/student', methods=['GET'])
def get_department_data():
    # this api need department id
    department = request.args.get('dept_id')

    db = DatabaseHelper.get_instance()
    data = db.get_department_student_data(department)

    return api_helper.return_response(data)


# get student in department by status
@api_bp.route('/department/student/status', methods=['GET'])
def get_probation_student():
    # this api need department id and status id
    department = request.args.get('dept_id')
    status = request.args.get('status_id')

    db = DatabaseHelper.get_instance()
    data = db.get_student_status(department, status)

    return api_helper.return_response(data)
