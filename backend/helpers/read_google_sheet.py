# read data from google sheet
from oauth2client.service_account import ServiceAccountCredentials
import gspread as gspread
import pandas as pd

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


def read_sheet_data(sheet_url: str):

    sheet = gc.open_by_url(sheet_url)
    worksheet = sheet.get_worksheet(0)
    read = worksheet.get_all_values()

    if read is None:
        return inner_res_helper.make_inner_response(response=False, message="Cannot find table", value=read)
    return inner_res_helper.make_inner_response(response=True, message="Table data", value=read)


def read_sheet_data_by_column(sheet_url: str, header: list):

    sheet = gc.open_by_url(sheet_url)
    worksheet = sheet.get_worksheet(0)

    sheet_header = read_table_header(sheet_url)
    print(len(sheet_header))

    if not sheet_header['response']:
        return header

    sheet_header = sheet_header['value']

    column_index = []
    count = 1
    for name in sheet_header:
        if name in header:
            column_index.append(count)
        count += 1

    df = pd.DataFrame()
    count = 1
    for index in column_index:
        read = worksheet.col_values(index)
        # print(read)
        df[count] = read
        count += 1

    print(df.dtypes)

    df.columns = df.iloc[0]
    df = df[1:]

    if df is None:
        return inner_res_helper.make_inner_response(response=False, message="Cannot find table", value=df)
    return inner_res_helper.make_inner_response(response=True, message="Table data", value=df)
