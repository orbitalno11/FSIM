from flask import Blueprint, request
from flask_cors import CORS

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

admin_student = Blueprint('admin_student', __name__)
CORS(admin_student)


@admin_student.route('', methods=['POST'])
@auth.token_required
def add_student_data(current_user):
    try:
        file = request.files['upload']
        if file and Constant.allowed_file(file.filename):
            destination = upload_helper.upload_file(store_folder=Constant.STUDENT_FOLDER, file=file)
        else:
            return api_helper.create_error_exception("Type of file is not match", "file not match", 418)
    except Exception as e:
        print(e)
        return api_helper.create_error_exception(str(e), "Can not find a file with " + str(e.args[0]), 400)

    if destination['response']:
        data_helper = DataHelper()
        insert_value = data_helper.read_new_student_file(destination['value'])
        if insert_value['response']:
            db = DatabaseHelper()
            insert = db.insert_new_student_data(insert_value['value'])
        else:
            return api_helper.return_response(insert_value)
    else:
        return api_helper.return_response(destination)
    return api_helper.return_response(insert)


@admin_student.route('', methods=['DELETE'])
@auth.token_required
def delete_student_data(current_user):
    year = request.args.get('year')
    database = DatabaseHelper()
    result = database.delete_student_by_year(year)

    return api_helper.return_response(result)


# upload current student academic record
@admin_student.route('/academic', methods=['POST'])
@auth.token_required
def insert_academic_record(current_user):
    # this api need education year (2561, 2562) and semester (1,2 or S)
    year = request.form.get('year')
    semester = request.form.get('semester')

    if year is None or semester is None:
        value = {
            'year': year,
            'semester': semester
        }
        return api_helper.create_response(message="One of these is Null", response=False, data=[value],
                                          response_code=418)

    try:
        file = request.files['upload']
        if file and Constant.allowed_file(file.filename):
            destination = upload_helper.upload_file(store_folder=Constant.ACADEMIC_FOLDER, file=file, year=year)
        else:
            return api_helper.create_error_exception("Type of file is not match", "file not match", 418)
    except Exception as e:
        print(e)
        return api_helper.create_error_exception(str(e), "Can not find a file with " + str(e.args[0]), 400)

    if destination['response']:
        data_helper = DataHelper()
        insert_value = data_helper.read_academic_file(destination['value'], year, semester)
        if insert_value['response']:
            data = insert_value['value']
            db = DatabaseHelper()
            academic_record = db.insert_academic_record(data['academic_record'], data['gpa_record'],
                                                        data['gpax_record'], data['status_record'])
            if not academic_record['response']:
                return api_helper.create_response(message=academic_record['message'], response=False, response_code=500,
                                                  data=academic_record['value'])

    return api_helper.create_response(message="Developing", response=True, response_code=200, data="Developing")


# get student in department by status
@admin_student.route('/department/status', methods=['GET'])
@auth.token_required
def get_probation_student(current_user):
    # this api need department id and status id
    department = request.args.get('dept_id')
    status = request.args.get('status_id')

    db = DatabaseHelper()
    data = db.get_student_status(department, status)

    return api_helper.return_response(data)


# get student list by year
@admin_student.route('/list', methods=['GET'])
@auth.token_required
def get_student_list(current_user):
    year = request.args.get('year')

    if year == 'null' or year is None:
        return api_helper.create_response("Can not found input.", False, "Can not found input.", 400)

    year = year[2:]

    db = DatabaseHelper()
    result = db.get_student_by_year(year)

    return api_helper.return_response(result)


# get education list
@admin_student.route('/education/list', methods=['GET'])
@auth.token_required
def get_education_year_list(current_user):
    db = DatabaseHelper()
    result = db.get_education_year_list()

    return api_helper.return_response(result)


@admin_student.route('/tracking', methods=['GET'])
@auth.token_required
def get_student_tracking(current_user):
    id_student = request.args.get('id_student')
    db = AnalyzeStudent()
    data = db.student_tracking(id_student)

    return api_helper.return_response(data)


@admin_student.route('/analyze/subject/branch', methods=['GET'])
@auth.token_required
def subject_by_branch(current_user):
    db = AnalyzeStudent()
    branch = request.args.get('branch')
    semester = request.args.get('semester')
    year = request.args.get('year')
    semester = int(semester)
    year = int(year)
    data = db.subject_by_branch(branch, semester, year)

    return api_helper.return_response(data)


@admin_student.route('/analyze', methods=['GET'])
@auth.token_required
def analyze_student(current_user):
    db = AnalyzeStudent()
    data = db.student_admin()
    return api_helper.return_response(data)
