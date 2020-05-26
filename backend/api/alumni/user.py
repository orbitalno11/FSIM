from flask import Blueprint, request
from flask_cors import CORS

# import api helper
import backend.helpers.api_response_helper as api_helper

# import module
from backend.modules.FirebaseModule import FirebaseModule
from backend.modules.AnalyzeAlumni import AnalyzeAlumni

user_alumni = Blueprint('user_alumni', __name__)
CORS(user_alumni)


# get analyze analyze survey
@user_alumni.route('/analyze/survey', methods=['POST'])
def get_analyze_alumni_survey():
    data = request.get_json()

    sheet_url = data['sheet_url']
    column = data['table_header']

    db = AnalyzeAlumni()
    data = db.analyze_survey(sheet_url, column)

    return api_helper.return_response(data)


# get analyze analyze work
@user_alumni.route('/analyze/work', methods=['GET'])
def get_analyze_alumni_work():
    year = request.args.get('year')

    db = AnalyzeAlumni()
    data = db.analyze_alumni_work(year)

    return api_helper.return_response(data)


# get data from firebase
@user_alumni.route('/survey', methods=['GET'])
def get_alumni_survey():
    year = request.args.get('year')

    if year is None or year == 'null':
        db = FirebaseModule()
        data = db.alumni_get_survey()
    else:
        db = FirebaseModule()
        data = db.alumni_get_survey_by_year(int(year))

    return api_helper.return_response(data)
