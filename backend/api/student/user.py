from flask import Blueprint, request
from flask_cors import CORS

# import api helper
import backend.helpers.api_response_helper as api_helper

# import module
from backend.modules.AnalyzeStudent import AnalyzeStudent

user_student = Blueprint('user_student', __name__)
CORS(user_student)


# show department data page (vut)
@user_student.route('/department', methods=['GET'])
def get_department_student_data():
    # this api need department id
    department = request.args.get('dept_id')

    db = AnalyzeStudent()
    data = db.analyze_by_dept(department)

    return api_helper.return_response(data)