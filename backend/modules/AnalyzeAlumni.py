# this class to analyze Student data.
# to get data from database please use DatabaseConnection class and
# use method which provide the data that you want
# Example for get data
#  1. database = DatabaseConnection().get_instance()
#  2. variable_to_get_response_data = database.your_method()
# the response data is in JSON form it will have 3 part
# 1. response state (True/False) this part will send the state of query success or not
# 2. message this part will send the description of response sate
# 3. value this part will contain the data that you request if it success
# Finally, after process the data to send to api route please return the data in JSON Format like
# the response data that you receive. Thank you
# !!!!! Don't edit database_helper.py file, Please !!!!!

# NOTICE!! TODO()
# We have new helper to help you send your computing result. inner_response_helper is the name
# please use the helper to return the value to another method
# I imported the helper to this class as "inner_res_helper"
# to use the helper just call "inner_res_helper.make_inner_response()"
# and pass the argument like the receive data format reponse, message and value the description is above

import pandas as pd
import numpy as np
from collections import Counter
# import helper
from backend.helpers.database_helper import DatabaseHelper
import backend.helpers.inner_response_helper as inner_res_helper
import backend.helpers.read_google_sheet as read_sheet


class AnalyzeAlumni:

    __instance = None

    @staticmethod
    def get_instance():
        if AnalyzeAlumni.__instance is None:
            AnalyzeAlumni()
        return AnalyzeAlumni.__instance

    def __init__(self):
        if AnalyzeAlumni.__instance is not None:
            raise Exception("This class is a singleton! Alumni")
        else:
            AnalyzeAlumni.__instance = self

# get_all_alumni() method for get alumni data

    def analyze_survey(self, sheet_url, column):
        # read and analyze survey data
        read = read_sheet.read_sheet_data(sheet_url)

        if not read['response']:
            return inner_res_helper.make_inner_response(response=True, message="Developing", value="Developing")

        data = read['value']
        header = data[0]
        data = data[1:]
        select_column = list(column)
        print(select_column)

        data = pd.DataFrame(data, columns=header)
        data = data.loc[:, select_column]
        print(data.head())

        return inner_res_helper.make_inner_response(response=True, message="Developing", value=header)

    def analyze_alumni_work(self):
        connect = DatabaseHelper.get_instance()
        data = connect.get_all_alumni()
        df = pd.DataFrame(data['value'])
        value={}
        value['count_by_branch']=df.groupby('branch_id').size().to_dict()
        value['count_by_status']=df.groupby('work_status').size().to_dict()
        value['count_by_training']=df.groupby('apprentice_title').size().to_dict()
        # value['salary_branch_training']=
        [self.__salary_branch_training(df[['branch_id','apprentice_title','salary']])]

        # print(df)

        return inner_res_helper.make_inner_response(response=True, message="Developing", value=[value])

    # def __salary_branch_training(self,df):
    #     df.loc[df['salary'] >= 30000, 'salary'] = 1
    #     df.loc[(df['salary']>=20000)&(df['salary']<30000), 'salary'] = 2
    #     df.loc[(df['salary']>=10000)&(df['salary']<20000), 'salary'] = 3
    #     df.loc[df['salary']<10000, 'salary'] = 4
    #     count_status_all_branch = df.groupby(['branch_id', 'apprentice_title','salary']).size().unstack(fill_value=0)
    #     print(count_status_all_branch)
    #     # return count_status_all_branch



   

