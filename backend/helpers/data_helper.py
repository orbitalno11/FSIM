# this file for manage data from upload file
import pandas as pd
from datetime import datetime

# import project constant
import backend.Constant

# import database connection
from backend.helpers.database_helper import DatabaseHelper

# import inner response
import backend.helpers.inner_response_helper as inner_res_helper


class DataHelper:

    # read admission data from excel file
    def read_admission(self, channel, year, file_location):
        df = pd.read_excel(file_location, converters={'เลขที่ใบสมัคร': str, 'รหัสสถานศึกษา': str})

        try:
            df = df.loc[1:, ['เลขที่ใบสมัคร', 'คำนำหน้านาม(ไทย)', 'ชื่อ(ไทย)', 'นามสกุล(ไทย)', 'GPAX', 'รหัสสถานศึกษา',
                             'สาขาวิชาที่สมัคร', 'ได้เข้าศึกษา']]
            df.rename(
                columns={'เลขที่ใบสมัคร': 'application_no', 'คำนำหน้านาม(ไทย)': 'gender', 'ชื่อ(ไทย)': 'firstname',
                         'นามสกุล(ไทย)': 'lastname', 'รหัสสถานศึกษา': 'school_id', 'สาขาวิชาที่สมัคร': 'branch',
                         'ได้เข้าศึกษา': 'decision'}, inplace=True)
        except Exception as e:
            print(e)
            return inner_res_helper.make_inner_response(False,
                                                        "Please check your file or table head " + str(e.args[0]),
                                                        "Please check your file or table head " + str(e.args[0]))
        # admission table
        admission_table = df.loc[:, ['application_no', 'firstname', 'lastname', 'gender', 'decision']]
        admission_table['admission_year'] = year
        admission_table['upload_date'] = datetime.now().timestamp()
        admission_table.loc[admission_table['gender'] == 'นาย', ['gender']] = 'M'
        admission_table.loc[admission_table['gender'].str.contains('นาง'), ['gender']] = 'F'
        admission_table.loc[admission_table['decision'] == 'ไม่', ['decision']] = -1
        admission_table.loc[admission_table['decision'] == 'ใช่', ['decision']] = 1
        admission_table['decision'].fillna(-1, inplace=True)

        # admission in branch table
        admission_branch = df.loc[:, ['application_no', 'branch']]

        # get branch data from database
        db = DatabaseHelper()
        branch = db.get_branch()
        branch = branch['value']

        for i in branch:
            branch_name = i['branch_name']
            if admission_branch.loc[admission_branch['branch'].str.contains(branch_name.split()[0]), ['branch']].shape[
                0] > 0:
                admission_branch.loc[admission_branch['branch'].str.contains(branch_name.split()[0]), ['branch']] = str(
                    i['branch_id'])

        admission_branch.rename(columns={'branch': 'branch_id'}, inplace=True)

        # admission from table
        admission_from = df.loc[:, ['application_no']]
        admission_from['channel_id'] = channel

        # admission studied
        admission_studied = df.loc[:, ['application_no', 'GPAX', 'school_id']]
        # admission_studied['school_id'] = '1010335002'

        # make json data to send to database helper class
        out_function_data = {'admission_table': admission_table.to_json(orient='index'),
                             'admission_branch': admission_branch.to_json(orient='index'),
                             'admission_from': admission_from.to_json(orient='index'),
                             'admission_studied': admission_studied.to_json(orient='index')}
        return inner_res_helper.make_inner_response(True,
                                                    "Data for insert in to database",
                                                    out_function_data)

    def read_academic_file(self, file_location, year, semester):
        df = pd.read_excel(file_location, converters={'รหัส': str}, sheet_name=None)

        if df is None:
            return inner_res_helper.make_inner_response(response=False, message="Cannot read file",
                                                        value="Cannot read file")
        sheet_name = list(df.keys())

        academic_record = []
        gpa_record = []

        try:
            for sheet_number in range(len(sheet_name)):
                # get sheet from workbook
                sheet = df[sheet_name[sheet_number]]
                sheet.dropna(how='all', axis=1, inplace=True)
                # read data from sheet
                for std in range(sheet.shape[0]):
                    temp = sheet.iloc[std, :]
                    temp = temp.dropna()
                    temp = temp.reset_index()
                    subject_list = list(temp.index)
                    std_id = temp.iloc[0, 1]
                    gpa = [std_id, temp.iloc[-2, 1], semester, year]
                    gpa = list(map(str, gpa))
                    gpa_record.append(tuple(gpa))
                    # get data per student
                    for subject in range(1, len(subject_list) - 2):
                        data = [std_id]
                        code = temp.iloc[subject, 0][:6]
                        grade = temp.iloc[subject, 1]
                        data.append(code)
                        data.append(grade)
                        data.append(semester)
                        data.append(year)
                        data = list(map(str, data))
                        academic_record.append(tuple(data))
        except Exception as e:
            print(e)
            return inner_res_helper.make_inner_response(response=False, message="Error in read data", value=str(e))

        out_function_data = {
            'academic_record': academic_record,
            'gpa_record': gpa_record
        }

        return inner_res_helper.make_inner_response(True,
                                                    "Data for insert in to database",
                                                    out_function_data)

    def read_new_student_file(self, file_location):

        df = pd.read_excel(file_location,
                           converters={'STUDENT_CODE': str, 'APPLICATION_NO': str, 'INSTITUTE_CODE': str})

        if df is None:
            return inner_res_helper.make_inner_response(response=False, message="Cannot read file",
                                                        value="Cannot read file")

        try:
            df.rename(columns={
                'STUDENT_CODE': 'student_id',
                'APPLICATION_NO': 'application_no',
                'FIRSTNAME_TH': 'firstname',
                'LASTNAME_TH': 'lastname',
                'SEX_NAME': 'gender',
                'PROGRAM_PROJECT_NAME_TH': 'branch_name',
                'INSTITUTE_CODE': 'school_id',
                'OLDGPA': 'old_gpa'},
                inplace=True)
        except Exception as e:
            print(e)
            return inner_res_helper.make_inner_response(False,
                                                        "Please check your file or table head " + str(e.args[0]),
                                                        "Please check your file or table head " + str(e.args[0]))

        # change gender from full text to M or F
        df.loc[df['gender'] == 'ชาย', ['gender']] = 'M'
        df.loc[df['gender'] == 'หญิง', ['gender']] = 'F'

        # get branch data
        db = DatabaseHelper()
        branch = db.get_branch()
        branch = branch['value']

        # change branch name to branch id
        for i in branch:
            branch_name = i['branch_name']
            if df.loc[df['branch_name'].str.contains(branch_name.split()[0]), ['branch_name']].shape[0] > 0:
                df.loc[df['branch_name'].str.contains(branch_name.split()[0]), ['branch_name']] = str(i['branch_id'])

        # data frame for student table
        student = df.loc[:, ['student_id', 'firstname', 'lastname', 'gender']]

        # data frame for entrance table
        entrance = df.loc[:, ['student_id', 'application_no']]

        # data frame for graduated
        graduated = df.loc[:, ['student_id', 'school_id', 'old_gpa']]
        graduated.rename(columns={'old_gpa': 'gpax'}, inplace=True)

        # data frame for has status table
        has_status = df.loc[:, ['student_id']]
        has_status['status_id'] = 1

        # data frame for study in
        study_in = df.loc[:, ['student_id', 'branch_name']]
        study_in.rename(columns={'branch_name': 'branch_id'}, inplace=True)

        out_function_data = {
            'student': student.to_json(orient='index'),
            'entrance': entrance.to_json(orient='index'),
            'graduated': graduated.to_json(orient='index'),
            'has_status': has_status.to_json(orient='index'),
            'study_in': study_in.to_json(orient='index')
        }

        return inner_res_helper.make_inner_response(True,
                                                    "Data for insert in to database",
                                                    out_function_data)

    # read alumni survey data
    def read_alumni_personal_data(self, data: pd.DataFrame):
        print(data.head(5))
        return inner_res_helper.make_inner_response(True, "DEV", "DEV")
