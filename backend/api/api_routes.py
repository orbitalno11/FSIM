from flask import Blueprint, jsonify, request, make_response, current_app as app

# import api helper
import backend.helpers.api_response_helper as api_helper
from backend.helpers.database_helper import DatabaseHelper



# import modules
from backend.modules.SummarizeData import SummarizeData as sum
from backend.modules.AnalyzeStudent import AnalyzeStudent
from backend.modules.AnalyzeAlumni import AnalyzeAlumni
from backend.modules.AnalyzeAdmission import AnalyzeAdmission


api_bp = Blueprint('api_bp', __name__, url_prefix='/api/v1')


# # # # # get general data part
# get general department data such as name , id
@api_bp.route('/department', methods=['GET'])
def get_department_data():
    dept_id = request.args.get('dept_id')

    db = DatabaseHelper.get_instance()
    data = db.get_department(dept_id)

    return api_helper.return_response(data)


# get general branch data
@api_bp.route('/branch', methods=['GET'])
def get_branch_data():
    branch_id = request.args.get('branch_id')

    db = DatabaseHelper.get_instance()
    data = db.get_branch(branch_id)

    return api_helper.return_response(data)



@api_bp.route('/admission/channel', methods=['GET'])
def get_admission_channel():

    db = DatabaseHelper.get_instance()
    data = db.get_admission_channel()

    return api_helper.return_response(data)



# # # # # get department student data
# show department data page (vut)
@api_bp.route('/department/student', methods=['GET'])
def get_department_student_data():
    # this api need department id
    department = request.args.get('dept_id')

    db = AnalyzeStudent.get_instance()
    data = db.analyze_by_dept(department)

    # summarize = sum.get_instance()
    # data = summarize.summarize_overview_dept_home(department)

    return api_helper.return_response(data)


#get analyze admission student
@api_bp.route('/admission/analyze', methods=['GET'])
def get_admission_admission():
    year = request.args.get('year')
    branch = request.args.get('branch_id')

    db = AnalyzeAdmission.get_instance()
    data = db.analyze_admission(branch,year)

    return api_helper.return_response(data)


#get analyze analyze survey
@api_bp.route('/alumni/analyze/survey', methods=['GET'])
def get_analyze_alumni_survey():
    sheet_url = request.args.get('sheet_url')
    column = request.args.get('column')

    db = AnalyzeAlumni.get_instance()
    data = db.analyze_survey(sheet_url,column)

    return api_helper.return_response(data)



#get analyze analyze work
@api_bp.route('/alumni/analyze/work', methods=['GET'])
def get_analyze_alumni_work():
    year = request.args.get('year')

    db = AnalyzeAlumni.get_instance()
    data = db.analyze_alumni_work(year)

    return api_helper.return_response(data)


#get analyze analyze salary
@api_bp.route('/alumni/analyze/salary', methods=['GET'])
def get_analyze_alumni_salary():
    year = request.args.get('year')
    branch_id = request.args.get('branch_id')

    db = AnalyzeAlumni.get_instance()
    data = db.analyze_alumni_salary(year,branch_id)

    return api_helper.return_response(data)


# # # # # get admission data
# get admission data by department and year
@api_bp.route('/admission/department', defaults={'department': None, 'year': None}, methods=['GET'])
@api_bp.route('/admission/department/<department>', defaults={'year': None}, methods=['GET'])
@api_bp.route('/admission/department/<department>/<int:year>', methods=['GET'])
def get_admission_by_dept_year(department, year):
    # this api required department id and year
    db = DatabaseHelper.get_instance()
    data = db.get_admission_data_by_dept(department, year)

    return api_helper.return_response(data)


