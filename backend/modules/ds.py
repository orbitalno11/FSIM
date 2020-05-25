# from backend.helpers.database_helper import DatabaseHelper
# import pandas as pd
# import backend.helpers.inner_response_helper as inner_res_helper
# import json
#
# location = "../../uploads/std.xlsx"
# semester = 1
# year = 2560
#
# db = DatabaseHelper()
# status_list = db.get_status_list()['value']
#
# def calculate_education_status(student_id, gpax):
#     status = 1 # normal
#     if gpax >= 2.00:
#         status = 1
#     elif 1.5 <= gpax < 2.00:
#         status = 2
#     else:
#         status = 0
#
#     out = [status, std_id]
#     out = list(map(str, out))
#     return tuple(out)
#
# df = pd.read_excel(location, converters={'รหัส': str}, sheet_name=None)
#
# sheet_name = list(df.keys())
#
# academic_record = []
# gpa_record = []
# gpax_record = []
# status_record = []
#
# try:
#     for sheet_number in range(len(sheet_name)):
#         # get sheet from workbook
#         sheet = df[sheet_name[sheet_number]]
#         sheet.dropna(how='all', axis=1, inplace=True)
#         # read data from sheet
#         for std in range(sheet.shape[0]):
#             temp = sheet.iloc[std, :]
#             temp = temp.dropna()
#             temp = temp.reset_index()
#             subject_list = list(temp.index)
#             std_id = temp.iloc[0, 1]
#             gpa = [std_id, temp.iloc[-2, 1], semester, year]
#             gpa = list(map(str, gpa))
#             gpa_record.append(tuple(gpa))
#             gpax = [temp.iloc[-1, 1], std_id]
#             gpax = list(map(str, gpax))
#             gpax_record.append(tuple(gpax))
#             status = calculate_education_status(std_id, temp.iloc[-1, 1])
#             status_record.append(status)
#             # get data per student
#             for subject in range(1, len(subject_list) - 2):
#                 data = [std_id]
#                 code = temp.iloc[subject, 0][:6]
#                 grade = temp.iloc[subject, 1]
#                 data.append(code)
#                 data.append(grade)
#                 data.append(semester)
#                 data.append(year)
#                 data = list(map(str, data))
#                 academic_record.append(tuple(data))
# except Exception as e:
#     print(e)
#
# out_function_data = {
#     'academic_record': academic_record,
#     'gpa_record': gpa_record,
#     'gpax_record': gpax_record
# }
