from backend.helpers.database_helper import DatabaseHelper
# import inner response
import backend.Constant as Constant

import pandas as pd

file_location = "../../uploads/student/new_student_file_template.xlsx"

df = pd.read_excel(file_location, converters={'STUDENT_CODE': str, 'APPLICATION_NO': str, 'INSTITUTE_CODE': str})

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

