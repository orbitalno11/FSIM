from flask import Blueprint, request, current_app as app

import backend.Constant as Constant

# import api helper
import backend.helpers.api_response_helper as api_helper
import backend.helpers.upload_helper as upload_helper
from backend.helpers.data_helper import DataHelper
from backend.helpers.database_helper import DatabaseHelper

# import module
from backend.modules.AnalyzeActivity import AnalyzeActivity

admin_activity = Blueprint('admin_activity', __name__)


# add activity project
@admin_activity.route('/', methods=['POST'])
def add_new_activity():
    form = request.form
    activity_id = form.get('activity_id')
    project_id = form.get('project_id')
    activity_name = form.get('activity_name')
    activity_budget = form.get('budget')
    year = form.get('year')

    data = [activity_id, project_id, activity_name, activity_budget, year]

    if None in data:
        return api_helper.create_error_exception(message="Can not found some value.", response_code=400,
                                                 value="Can not found some value.")

    try:
        file = request.files['upload']
        if file and Constant.allowed_file(file.filename):
            destination = upload_helper.upload_file(Constant.ACTIVITY_FOLDER + "/{}".format(project_id), file, year)
        else:
            return api_helper.create_error_exception("Type of file is not match", "file not match", 418)
    except Exception as e:
        print(e)
        return api_helper.create_error_exception(str(e), "Can not find a file with " + str(e.args[0]), 400)

    if destination['response']:
        data_helper = DataHelper()
        insert_value = data_helper.read_activity_participant(destination['value'], activity_id)
        if insert_value['response']:
            db = DatabaseHelper()
            result = db.insert_activity(data, insert_value['value'], project_id)
        else:
            return api_helper.return_response(insert_value)
    else:
        return api_helper.return_response(destination)

    return api_helper.return_response(result)


# delete activity
@admin_activity.route('', methods=['DELETE'])
def delete_activity():
    act_id = request.args.get('act_id')
    project_type = request.args.get('project_type')

    if act_id is None or act_id == "null" or act_id == "undefined":
        return api_helper.create_error_exception(message="Can not get value.", response_code=400,
                                                 value="Can not get value.")

    db = DatabaseHelper()
    result = db.delete_activity(act_id, project_type)

    return api_helper.return_response(result)


# add activity project
@admin_activity.route('/project', methods=['POST'])
def add_activity_project():
    data = request.get_json()

    if data is None:
        return api_helper.create_error_exception(message="Can not get value.", response_code=400,
                                                 value="Can not get value.")

    if len(data) != 3:
        return api_helper.create_error_exception(message="Can not found some value.", response_code=400,
                                                 value="Can not found some value.")

    project_id = data['project_id']
    project_name = data['project_name']
    project_type = data['project_type']

    data = [project_id, project_type, project_name]

    db = DatabaseHelper()
    result = db.insert_activity_project(data)

    return api_helper.return_response(result)


@admin_activity.route('/project/type', methods=['GET'])
def get_project_type():
    db = DatabaseHelper()
    result = db.get_project_type()

    return api_helper.return_response(result)


@admin_activity.route('/analyze/project/ar', methods=['GET'])
def get_analyze_project_ar():
    year = request.args.get('year')

    db = AnalyzeActivity()
    data = db.analyze_ar(year)


    return api_helper.return_response(data)


@admin_activity.route('/list', methods=['GET'])
def get_activity_list():
    year = request.args.get('year')

    db = DatabaseHelper()
    result = db.get_activity_list(year)

    return api_helper.return_response(result)
