# read data from google sheet
from oauth2client.service_account import ServiceAccountCredentials
import gspread as gspread

# import project constant
import backend.Constant as Constant

# import helper
import backend.helpers.inner_response_helper as inner_res_helper

credentials = ServiceAccountCredentials.from_json_keyfile_name(Constant.google_credentials, Constant.google_sheet_scope)
gc = gspread.authorize(credentials)


def read_table_header(sheet_url: str):
    # this function read only first sheet in wokbook
    sheet = gc.open_by_url(sheet_url)
    worksheet = sheet.get_worksheet(0)
    header = worksheet.row_values(1)

    if header is None:
        return inner_res_helper.make_inner_response(response=False, message="Cannot find table head", value=header)
    return inner_res_helper.make_inner_response(response=True, message="Table header", value=header)


def read_alumni_sheet(sheet_url: str):
    # this function read only first sheet in wokbook
    sheet = gc.open_by_url(sheet_url)
    worksheet = sheet.get_worksheet(0)
    read = worksheet.get_all_values()
    table_head = read[0]
    data = worksheet.col_values(1)
    print(data)

    data = read[1:]

    if data is None:
        return inner_res_helper.make_inner_response(response=False, message="Cannot find table", value=data)
    return inner_res_helper.make_inner_response(response=True, message="Table data", value=data)
