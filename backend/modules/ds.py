from backend.helpers.database_helper import DatabaseHelper
import backend.Constant as Constant

import pandas as pd

file_path = '../../uploads/activity/activity/not_ar_activity.xlsx'
education_year = 2562
project_id = "redux"
activity_id = "redux_back"
activity_name = "redux_add_not_ar"
budget = 500

# participant_data = pd.read_excel(file_path)
#
# activity_no_ar_table = participant_data.copy()
# activity_no_ar_table['activity_id'] = activity_id
# cols = activity_no_ar_table.columns.tolist()
# cols = cols[-1:] + cols[:-1]
# activity_no_ar_table = activity_no_ar_table[cols]
#
# out_data = {
#     'activity_no_ar': activity_no_ar_table.to_json(orient='index')
# }
