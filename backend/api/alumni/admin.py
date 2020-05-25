from flask import Blueprint, request
from flask_cors import cross_origin

# import constant

# import api helper
import backend.helpers.api_response_helper as api_helper
from backend.helpers.database_helper import DatabaseHelper
from backend.helpers.data_helper import DataHelper
import backend.helpers.read_google_sheet as read_sheet

# import module
from backend.modules.FirebaseModule import FirebaseModule

# import authen
import backend.modules.AuthenticationModule as auth

admin_alumni = Blueprint('admin_alumni', __name__)


# add survey data to firebase by year
@admin_alumni.route('/survey', methods=['POST'])
@auth.token_required
def add_alumni_survey(current_user):
    # this api need education year (2561, 2562), table header as a list and google sheet url
    data = request.get_json()

    year = data['year']
    table_header = data['table_header']
    sheet_url = data['sheet_url']
    personal_header = data['personal_header']

    read = read_sheet.read_sheet_data_by_column(sheet_url, personal_header)

    if not read['response']:
        return api_helper.return_response(read)

    data_helper = DataHelper()
    result = data_helper.read_alumni_personal_data(read['value'], personal_header, year)

    if not result['response']:
        return api_helper.return_response(result)

    db = DatabaseHelper()
    result = db.insert_alumni_data(result['value'])

    if not result['response']:
        return api_helper.return_response(result)

    firebase = FirebaseModule()
    result = firebase.alumni_add_survey(year, sheet_url, table_header, personal_header)

    return api_helper.return_response(result)


# add survey data to firebase by year
@admin_alumni.route('/survey', methods=['DELETE'])
@auth.token_required
@cross_origin(origin="https://my-fsim.web.app", headers=['Content- Type','Authorization'])
def delete_alumni_survey(current_user):
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
@auth.token_required
def edit_alumni_survey(current_user):
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