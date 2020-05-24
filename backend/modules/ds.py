from backend.helpers.database_helper import DatabaseHelper
import pandas as pd
import backend.helpers.inner_response_helper as inner_res_helper
import json

location = "../../uploads/std.xlsx"


def read_new_student_file(file_location):
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
    graduated.fillna("0000000000", inplace=True)

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


data = read_new_student_file(location)
data = data['value']

student_table = data['student']
student_table = json.loads(student_table)
student_table = list(student_table.values())

entrance_table = data['entrance']
entrance_table = json.loads(entrance_table)
entrance_table = list(entrance_table.values())

graduated_table = data['graduated']
graduated_table = json.loads(graduated_table)
graduated_table = list(graduated_table.values())

has_status_table = data['has_status']
has_status_table = json.loads(has_status_table)
has_status_table = list(has_status_table.values())

study_in_table = data['study_in']
study_in_table = json.loads(study_in_table)
study_in_table = list(study_in_table.values())

student_table = pd.DataFrame(student_table)
entrance_table = pd.DataFrame(entrance_table)
graduated_table = pd.DataFrame(graduated_table)
has_status_table = pd.DataFrame(has_status_table)
study_in_table = pd.DataFrame(study_in_table)
