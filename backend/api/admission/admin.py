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

# import authen
import backend.modules.AuthenticationModule as auth

admin_admission = Blueprint('admin_admission', __name__)


# upload admission data api
@admin_admission.route('', methods=['POST'])
# @auth.token_required
def insert_admission():
    # This api need "Year" as year , "Admission type" as admission_type
    # and "Admission channel" as channel to be a parameter

    year = request.form.get('year')
    channel = request.form.get('channel')

    if year is None or channel is None:
        value = {
            "year": year,
            "channel": channel
        }
        return api_helper.create_response(message="One of these is Null", response=False, data=[value],
                                          response_code=418)

    try:
        file = request.files['upload']
        if file and Constant.allowed_file(file.filename):
            destination = upload_helper.upload_file(Constant.ADMISSION_FOLDER, file, year)
        else:
            return api_helper.create_error_exception("Type of file is not match", "file not match", 418)
    except Exception as e:
        print(e)
        return api_helper.create_error_exception(str(e), "Can not find a file with " + str(e.args[0]), 400)

    if destination['response']:
        data_helper = DataHelper()
        insert_value = data_helper.read_admission(channel, year, destination['value'])
        if insert_value['response']:
            print(insert_value['value'])
            # db = DatabaseHelper()
            # insert = db.insert_admission(insert_value['value'])
        else:
            return api_helper.return_response(insert_value)
    else:
        return api_helper.return_response(destination)
    return api_helper.return_response(insert)

    return api_helper.create_response("DEV", True, "DEV", 200)


# delete admission data
@admin_admission.route('', methods=['DELETE'])
def delete_admission_list():
    year = request.args.get('year')
    round_id = request.args.get('round_id')
    channel_id = request.args.get('channel_id')

    if year == 'null' or round_id == 'null' or channel_id == 'null':
        return api_helper.create_error_exception("Some data null", "Some data null", 400)

    data = {
        'year': int(year),
        'round_id': int(round_id),
        'channel_id': int(channel_id)
    }

    db = DatabaseHelper()
    result = db.delete_admission_data(data)
    return api_helper.return_response(result)


# get analyze admission channel
@admin_admission.route('/analyze/channel', methods=['GET'])
def get_analyze_admission_channel():
    # get admission_year
    year = request.args.get('year')

    db = AnalyzeAdmission()
    data = db.analyze_admission_admin(year)

    return api_helper.return_response(data)


# get analyze admission channel
@admin_admission.route('/analyze/status', methods=['GET'])
def get_analyze_admission_status():
    # get admission_year
    year = request.args.get('year')

    db = AnalyzeAdmission()
    data = db.analyze_student_status(year)

    return api_helper.return_response(data)


# get admission data list
@admin_admission.route('/list', methods=['GET'])
def get_admission_list():
    db = DatabaseHelper()
    result = db.get_admission_list()
    return api_helper.return_response(result)
