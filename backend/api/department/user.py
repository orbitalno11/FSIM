from flask import Blueprint, request
from flask_cors import CORS

# import api helper
import backend.helpers.api_response_helper as api_helper
from backend.helpers.database_helper import DatabaseHelper

# import module
from backend.modules.AnalyzeStudent import AnalyzeStudent

user_department = Blueprint('user_department', __name__)
CORS(user_department)


# get general department data such as name , id
@user_department.route('/', methods=['GET'])
def get_department_data():
    dept_id = request.args.get('dept_id')

    db = DatabaseHelper()
    data = db.get_department(dept_id)

    return api_helper.return_response(data)


# get general branch data
@user_department.route('/branch', methods=['GET'])
def get_branch_data():
    branch_id = request.args.get('branch_id')

    db = DatabaseHelper()
    data = db.get_branch(branch_id)

    return api_helper.return_response(data)


# get analyze student by course (subject)
@user_department.route('/analyze/subject', methods=['GET'])
def get_analyze_subject():
    # this api need department id
    department = request.args.get('dept_id')
    year = request.args.get('year')

    analyze = AnalyzeStudent()
    result = analyze.analyze_by_subject_dept(department, year)

    return api_helper.return_response(result)