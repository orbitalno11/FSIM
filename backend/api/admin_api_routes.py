from flask import Blueprint, request, current_app as app

# import api helper
import backend.helpers.api_response_helper as api_helper
import backend.helpers.upload_helper as upload_helper
from backend.helpers.data_helper import DataHelper
from backend.helpers.database_helper import DatabaseHelper

# import project constant
import backend.Constant as Constant

admin_bp = Blueprint('admin_bp', __name__, url_prefix='/api/v1/admin')


# upload admission data api
@admin_bp.route('/admission', methods=['POST'])
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
        return api_helper.create_response(message="One of these is Null", response=False, data=[value], response_code=418)

    try:
        file = request.files['upload']
        if file and Constant.allowed_admission_file(file.filename):
            destination = upload_helper.upload_admission_file(Constant.ADMISSION_FOLDER, file, year)
        else:
            return api_helper.create_error_exception("Type of file is not match", "file not match", 418)
    except Exception as e:
        print(e)
        return api_helper.create_error_exception(str(e), "Can not find a file with " + str(e.args[0]), 400)

    if destination['response']:
        data_helper = DataHelper.get_instance()
        insert_value = data_helper.read_admission(channel, year, destination['value'])
        if insert_value['response']:
            db = DatabaseHelper.get_instance()
            insert = db.insert_admission(insert_value['value'])
        else:
            return api_helper.return_response(insert_value)
    else:
        return api_helper.return_response(destination)
    return api_helper.return_response(insert)


# upload current student academic record
@admin_bp.route('/academic', methods=['GET'])
def insert_academic_record():
    return api_helper.create_response(message="Developing", response=True, response_code=200)


# get student in department by status
@admin_bp.route('/department/student/status', methods=['GET'])
def get_probation_student():
    # this api need department id and status id
    department = request.args.get('dept_id')
    status = request.args.get('status_id')

    db = DatabaseHelper.get_instance()
    data = db.get_student_status(department, status)

    return api_helper.return_response(data)
