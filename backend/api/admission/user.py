from flask import Blueprint, request
from flask_cors import CORS


# import api helper
import backend.helpers.api_response_helper as api_helper
from backend.helpers.database_helper import DatabaseHelper

# import module
from backend.modules.AnalyzeAdmission import AnalyzeAdmission

user_admission = Blueprint('user_admission', __name__)
CORS(user_admission)


# get analyze admission student
@user_admission.route('/analyze', methods=['GET'])
def get_admission_admission():
    year = request.args.get('year')

    db = AnalyzeAdmission()
    data = db.analyze_admission(year)

    return api_helper.return_response(data)


@user_admission.route('/channel', methods=['GET'])
def get_admission_channel():
    db = DatabaseHelper()
    data = db.get_admission_channel()

    return api_helper.return_response(data)


@user_admission.route('/year/list', methods=['GET'])
def get_admission_year_list():
    db = DatabaseHelper()
    data = db.get_admission_year_list()

    return api_helper.return_response(data)


@user_admission.route('/round/list', methods=['GET'])
def get_round_admission_admin_list():
    db = DatabaseHelper()
    data = db.get_list_round_admission_admin()

    return api_helper.return_response(data)



# # # # # get admission data TODO wait for decision
# get admission data by department and year
# @user_admission.route('/department', defaults={'department': None, 'year': None}, methods=['GET'])
# @user_admission.route('/department/<department>', defaults={'year': None}, methods=['GET'])
# @user_admission.route('/department/<department>/<int:year>', methods=['GET'])
# def get_admission_by_dept_year(department, year):
#     # this api required department id and year
#     db = DatabaseHelper()
#     data = db.get_admission_data_by_dept(department, year)
#
#     return api_helper.return_response(data)
