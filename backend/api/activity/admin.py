from flask import Blueprint, request, current_app as app

# import api helper
import backend.helpers.api_response_helper as api_helper

admin_activity = Blueprint('admin_activity', __name__)


# add activity project
@admin_activity.route('/project', methods=['POST'])
def add_activity_project():
    data = request.get_json()

    return api_helper.create_response(message="DEV", response=True, response_code=200, data="Dev")


# add activity project
@admin_activity.route('/subProject', methods=['POST'])
def add_new_activity():
    data = request.get_json()

    return api_helper.create_response(message="DEV", response=True, response_code=200, data="Dev")
