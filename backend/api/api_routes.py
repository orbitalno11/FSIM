from flask import Blueprint, jsonify, request, make_response, current_app as app
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
import datetime

# import api helper
import backend.helpers.api_response_helper as api_helper
from backend.helpers.database_helper import DatabaseHelper

# import modules
from backend.modules.SummarizeData import SummarizeData as sum
from backend.modules.AnalyzeStudent import AnalyzeStudent
from backend.modules.AnalyzeAlumni import AnalyzeAlumni
from backend.modules.AnalyzeAdmission import AnalyzeAdmission
from backend.modules.AnalyzeActivity import AnalyzeActivity
from backend.modules.FirebaseModule import FirebaseModule

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


# get analyze student by course (subject)
@api_bp.route('/department/analyze/course', methods=['GET'])
def get_analyze_subject():
    # this api need department id
    department = request.args.get('dept_id')
    year = request.args.get('year')

    analyze = AnalyzeStudent.get_instance()
    result = analyze.analyze_by_subject_dept(department,year)

    return api_helper.return_response(result)


# get analyze admission student
@api_bp.route('/admission/analyze', methods=['GET'])
def get_admission_admission():
    year = request.args.get('year')
    branch = request.args.get('branch_id')

    db = AnalyzeAdmission.get_instance()
    data = db.analyze_admission(branch,year)

    return api_helper.return_response(data)


# get analyze analyze survey
@api_bp.route('/alumni/analyze/survey', methods=['GET'])
def get_analyze_alumni_survey():
    sheet_url = request.args.get('sheet_url')
    column = request.args.get('column')

    db = AnalyzeAlumni.get_instance()
    data = db.analyze_survey(sheet_url,column)

    return api_helper.return_response(data)


# get analyze analyze work
@api_bp.route('/alumni/analyze/work', methods=['GET'])
def get_analyze_alumni_work():
    year = request.args.get('year')

    db = AnalyzeAlumni.get_instance()
    data = db.analyze_alumni_work(year)

    return api_helper.return_response(data)

   
@api_bp.route('/analyze/activity/notar', methods=['GET'])
def get_analyze_activity_noar():
    year = request.args.get('year')

    db = AnalyzeActivity.get_instance()
    data = db.analyze_publicize(year)

    return api_helper.return_response(data)

   
@api_bp.route('/analyze/activity/ar', methods=['GET'])
def get_analyze_activity_ar():
    year = request.args.get('year')

    db = AnalyzeActivity.get_instance()
    data = db.analyze_ar(year)

    return api_helper.return_response(data)


@api_bp.route('/firebase/survey', methods=['GET'])
def get_alumni_survey():

    db = FirebaseModule.get_instance()
    data = db.alumni_get_survey()

    return api_helper.return_response(data)


@api_bp.route('/firebase/survey/year', methods=['GET'])
def get_survey_year():
    year = request.args.get('year')

    db = FirebaseModule.get_instance()
    data = db.alumni_get_survey_by_year(year)

    return api_helper.return_response(data)


@api_bp.route('/firebase/add/survey', methods=['POST'])
def add_survey_year():
    year = request.args.get('year')
    url  = request.args.get('url')
    table_header = request.args.get('header')

    db = FirebaseModule.get_instance()
    data = db.alumni_add_survey(year,url,table_header)

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


# authentication route
@api_bp.route('/signup', methods=['POST'])
def create_staff():
    if request.method == 'POST':
        data = request.get_json()

        staff_id = data['staff_id']
        first_name = data['firstname']
        last_name = data['lastname']
        hashed_pass = generate_password_hash(data['password'], method='sha256')

        connect = DatabaseHelper.get_instance()
        result = connect.create_user(staff_id, first_name, last_name, hashed_pass)

        return api_helper.return_response(result)


@api_bp.route('/signin', methods=['POST'])
def sign_in():
    auth_data = request.get_json()
    if not auth_data or not auth_data['username'] or not auth_data['password']:
        return api_helper.create_error_exception(message="Credentials data not found.", response_code=401, value="Credentials data not found.")

    connect = DatabaseHelper.get_instance()
    result = connect.get_user_for_auth(auth_data['username'])

    if not result['response']:
        return api_helper.create_error_exception(message="Cloud not verify.", response_code=401, value="Cloud not verify.")

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
        return api_helper.create_response(message="Signin successful", data={'token': token.decode('UTF-8'), 'userData': userData}, response_code=200, response=True)

    return api_helper.create_error_exception(message="Cloud not verify.", response_code=401, value="Cloud not verify.")
