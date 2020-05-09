from backend.helpers.database_helper import DatabaseHelper
# import inner response
import backend.Constant as Constant

import pandas as pd

from backend.helpers.read_google_sheet import read_sheet_data_by_column

graduated_year = 2560

sheet_url = "https://docs.google.com/spreadsheets/d/1zUs9RbKjPx2L2J_9J_x6UZcLaSBt0OBF-XtsAv8I-_Y/edit?usp=sharing"

personal_header = ["รหัสนักศึกษา", "คะแนนเฉลี่ยตลอดหลักสูตร (GPAX)", "หลักสูตร", "ชื่อหน่วยงาน / บริษัท",
                   "ปัจจุบันท่านมีภาวะการทำงานเป็นอย่างไร", "ชื่อตำแหน่งงาน",
                   "เงินเดือน หรือรายได้เฉลี่ยต่อเดือน", "ชื่อสถาบันที่ท่านศึกษาต่อ", "คณะวิชา", "สาขาวิชาที่ศึกษาต่อ",
                   "ท่านผ่านกิจกรรมฝึกงานในรูปแบบใด"]
data = pd.DataFrame()
data = read_sheet_data_by_column(sheet_url, personal_header)
data = data['value']
data = data.loc[1:, :]
data.drop_duplicates(subset=personal_header[0], keep=False, inplace=True)

data.rename(columns={
    personal_header[0]: 'alumni_id',
    personal_header[1]: 'gpax',
    personal_header[2]: 'branch_name',
    personal_header[3]: 'company',
    personal_header[4]: 'status',
    personal_header[5]: 'job_description',
    personal_header[6]: 'salary',
    personal_header[7]: 'institution',
    personal_header[9]: 'branch',
    personal_header[10]: 'apprentice',
    personal_header[8]: 'faculty'
}, inplace=True)

data.astype({'alumni_id': str})

# alumni table
alumni = data.loc[:, ['alumni_id', 'gpax']]
alumni['graduated_year'] = graduated_year
alumni.loc[alumni['gpax'] == 'ไม่ระบุ', ['gpax']] = -1
alumni.astype({'gpax': float})

# alumni graduated table
db = DatabaseHelper()
branch = db.get_branch()
branch = branch['value']
alumni_graduated = data.loc[:, ['alumni_id', 'branch_name']]

for i in branch:
    branch_name = i['branch_name']
    if alumni_graduated.loc[alumni_graduated['branch_name'].str.contains(branch_name.split()[0]), ['branch_name']].shape[
        0] > 0:
        alumni_graduated.loc[alumni_graduated['branch_name'].str.contains(branch_name.split()[0]), ['branch_name']] = str(
            i['branch_id'])

alumni_graduated.rename(columns={'branch_name': 'branch_id'}, inplace=True)

# alumni apprentice table
apprentice = db.get_apprentice_status_list()
apprentice = apprentice['value']

apprentice_table = data.loc[:, ['alumni_id', 'apprentice']]

for i in apprentice:
    title = i['status_title']
    title_id = i['status_id']
    if apprentice_table.loc[apprentice_table['apprentice'].str.contains(title), ['apprentice']].shape[0] > 0:
        apprentice_table.loc[apprentice_table['apprentice'].str.contains(title), ['apprentice']] = str(title_id)

apprentice_table.rename(columns={'apprentice': 'apprentice_id'}, inplace=True)

# alumni working table
working_status = db.get_working_status_list()
working_status = working_status['value']

working_table = data.loc[:, ['alumni_id', 'status', 'company', 'institution', 'job_description', 'faculty', 'branch', 'salary']]

for i in working_status:
    title = i['status_title']
    title_id = i['status_id']
    if working_table.loc[working_table['status'].str.contains(title), ['status']].shape[0] > 0:
        working_table.loc[working_table['status'].str.contains(title), ['status']] = str(title_id)

working_table.rename(columns={'status': 'status_id'}, inplace=True)

working_table.loc[working_table['salary'].str.contains("ไม่ระบุ"), ['salary']] = None

