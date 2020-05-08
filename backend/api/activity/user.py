from flask import Blueprint, request, current_app as app

# import api helper
import backend.helpers.api_response_helper as api_helper
from backend.helpers.database_helper import DatabaseHelper

# import module
from backend.modules.AnalyzeActivity import AnalyzeActivity

user_activity = Blueprint('user_activity', __name__)


# activity route
@user_activity.route('/analyze/activity', methods=['GET'])
def get_analyze_activity_noar():
    year = request.args.get('year')

    db = AnalyzeActivity()
    data = db.analyze_publicize(year)

    return api_helper.return_response(data)


@user_activity.route('/analyze/ar', methods=['GET'])
def get_analyze_activity_ar():
    year = request.args.get('year')

    db = AnalyzeActivity()
    data = db.analyze_ar(year)

    return api_helper.return_response(data)


@user_activity.route('/project', methods=['GET'])
def get_project_list():
    project_type = request.args.get('project_type')

    db = DatabaseHelper()
    result = db.get_project_list(project_type)

    return api_helper.return_response(result)
