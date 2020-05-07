from flask import Blueprint, request, current_app as app

# import constant
import backend.Constant as Constant

# import api helper
import backend.helpers.api_response_helper as api_helper
import backend.helpers.upload_helper as upload_helper
from backend.helpers.database_helper import DatabaseHelper
from backend.helpers.data_helper import DataHelper

# import module
from backend.modules.AnalyzeAdmission import AnalyzeAdmission

user_admission = Blueprint('user_admission', __name__)


# get analyze admission student
@user_admission.route('/analyze', methods=['GET'])
def get_admission_admission():
    year = request.args.get('year')
    branch = request.args.get('branch_id')

    db = AnalyzeAdmission()
    data = db.analyze_admission(branch, year)

    return api_helper.return_response(data)


@user_admission.route('/channel', methods=['GET'])
def get_admission_channel():
    db = DatabaseHelper()
    data = db.get_admission_channel()

    return api_helper.return_response(data)


# # # # # get admission data
# get admission data by department and year
@user_admission.route('/department', defaults={'department': None, 'year': None}, methods=['GET'])
@user_admission.route('/department/<department>', defaults={'year': None}, methods=['GET'])
@user_admission.route('/department/<department>/<int:year>', methods=['GET'])
def get_admission_by_dept_year(department, year):
    # this api required department id and year
    db = DatabaseHelper()
    data = db.get_admission_data_by_dept(department, year)

    return api_helper.return_response(data)