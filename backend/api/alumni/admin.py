from flask import Blueprint, request, current_app as app

# import constant
import backend.Constant as Constant

# import api helper
import backend.helpers.api_response_helper as api_helper
from backend.helpers.database_helper import DatabaseHelper
import backend.helpers.read_google_sheet as read_sheet

# import module
from backend.modules.FirebaseModule import FirebaseModule

# import authen
import backend.modules.AuthenticationModule as auth

admin_alumni = Blueprint('admin_alumni', __name__)


# add survey data to firebase by year
@admin_alumni.route('/survey', methods=['POST'])
def add_alumni_survey():
    # this api need education year (2561, 2562), table header as a list and google sheet url
    data = request.get_json()

    year = data['year']
    table_header = data['table_header']
    sheet_url = data['sheet_url']
    personal_header = data['personal_header']

    print(personal_header)

    # firebase = FirebaseModule()
    # result = firebase.alumni_add_survey(year, sheet_url, table_header, personal_header)
    read = read_sheet.read_sheet_data_by_column(sheet_url, personal_header)



    return api_helper.create_response("DEV", True, "DEV", 200)


# add survey data to firebase by year
@admin_alumni.route('/survey', methods=['DELETE'])
def delete_alumni_survey():
    # this api need education year (2561, 2562), table header as a list and google sheet url
    key = request.args.get('key')
    year = request.args.get('year')

    db = DatabaseHelper()
    result = db.delete_alumni_by_year(year)

    if not result['response']:
        return api_helper.return_response(result)

    firebase = FirebaseModule()
    result = firebase.alumni_delete_survey(key)

    return api_helper.return_response(result)


# add survey data to firebase by year
@admin_alumni.route('/survey', methods=['PUT'])
def edit_alumni_survey():
    # this api need education year (2561, 2562), table header as a list and google sheet url
    data = request.get_json()

    key = data['key']
    year = data['year']
    table_header = data['table_header']
    sheet_url = data['sheet_url']
    personal_header = data['personal_header']

    update = {
        "educationYear": year,
        "tableHeader": table_header,
        "sheetUrl": sheet_url,
        "personalHeader": personal_header
    }

    firebase = FirebaseModule()
    result = firebase.alumni_update_survey(key, update)

    return api_helper.return_response(result)