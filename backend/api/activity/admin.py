from flask import Blueprint, request, current_app as app

# import api helper
import backend.helpers.api_response_helper as api_helper
from backend.helpers.database_helper import DatabaseHelper

admin_activity = Blueprint('admin_activity', __name__)


# add activity project
@admin_activity.route('/', methods=['POST'])
def add_new_activity():
    data = request.get_json()

    if data is None:
        return api_helper.create_error_exception(message="Can not get value.", response_code=400, value="Can not get value.")

    if len(data) != 5:
        return api_helper.create_error_exception(message="Can not found some value.", response_code=400, value="Can not found some value.")

    activity_id = data['activity_id']
    project_id = data['project_id']
    activity_name = data['activity_name']
    activity_budget = data['activity_budget']
    year = data['year']

    data = [activity_id, project_id, activity_name, activity_budget, year]

    db = DatabaseHelper()
    result = db.insert_activity(data)

    return api_helper.return_response(result)


# add activity project
@admin_activity.route('/project', methods=['POST'])
def add_activity_project():
    data = request.get_json()

    if data is None:
        return api_helper.create_error_exception(message="Can not get value.", response_code=400, value="Can not get value.")

    if len(data) != 3:
        return api_helper.create_error_exception(message="Can not found some value.", response_code=400, value="Can not found some value.")

    project_id = data['project_id']
    project_name = data['project_name']
    project_type = data['project_type']

    data = [project_id, project_type, project_name]

    db = DatabaseHelper()
    result = db.insert_activity_project(data)

    return api_helper.return_response(result)


@admin_activity.route('/project/type')
def get_project_type():

    db = DatabaseHelper()
    result = db.get_project_type()

    return api_helper.return_response(result)


@admin_activity.route('/list', methods=['GET'])
def get_activity_list():

    db = DatabaseHelper()
    result = db.get_activity_list()

    return api_helper.return_response(result)


