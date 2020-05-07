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

admin_department = Blueprint('admin_department', __name__)


# get all department data
@admin_department.route('/', methods=['GET'])
def get_all_department_data():
    dept_id = request.args.get('dept_id')

    db = DatabaseHelper()
    result = db.get_department_detail(dept_id)

    return api_helper.return_response(result)
