from flask import Blueprint, request
from flask_cors import CORS

# import api helper
import backend.helpers.api_response_helper as api_helper
import backend.helpers.read_google_sheet as read_sheet

# import authen
import backend.modules.AuthenticationModule as auth

admin_bp = Blueprint('admin_bp', __name__)
CORS(admin_bp)


# # # # # alumni part # # # # #
# read alumni survey google sheet
@admin_bp.route('/readsheet', methods=['GET'])
@auth.token_required
def read_google_sheet(current_user):
    # this api require google sheet share url
    # header and read data is an argument for select return type
    sheet_url = request.args.get('sheet_url')
    header = request.args.get('header')
    read_data = request.args.get('read_data')

    if header:
        data = read_sheet.read_table_header(sheet_url)
        return api_helper.return_response(data)

    if read_data:
        data = read_sheet.read_sheet_data(sheet_url)
        return api_helper.return_response(data)

    value = {
        'read_data': read_data,
        'header': header
    }

    return api_helper.create_response(response_code=500, message="Read error, One of these Null", response=False,
                                      data=value)
