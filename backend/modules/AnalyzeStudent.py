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

# import helper
from backend.helpers.database_helper import DatabaseHelper
import backend.helpers.inner_response_helper as inner_res_helper
from collections import defaultdict
from collections import OrderedDict
import pandas as pd
import json


class AnalyzeStudent:
    __instance = None

    @staticmethod
    def get_instance():
        if AnalyzeStudent.__instance is None:
            AnalyzeStudent()
        return AnalyzeStudent.__instance

    def __init__(self):
        if AnalyzeStudent.__instance is not None:
            raise Exception("This class is a singleton! analyze student")
        else:
            AnalyzeStudent.__instance = self

    # uses in user and admin
    # this function returns student data and status student that analyze in 'dept'.
    # this function required department id
    def analyze_by_dept(self, dept):
        value = {}
        connect = DatabaseHelper.get_instance()
        data = connect.get_all_student(dept)

        if data['value']:
            df = pd.DataFrame(data['value'])
            df_branch = df[['branch_id', 'branch']]
            get_branch=connect.get_department(dept)
            branch_data = self.__set_branch(get_branch)
            status_data = self.__set_status(connect.get_status_list())
            branch_dic = self.__set_dict(branch_data.index, branch_data.branch_name)
            status_dic = self.__set_dict(status_data.index, status_data.status_title)
            status_by_branch = self.__status_by_branch(df, list(branch_data.index.values),
                                                       list(status_data.index.values))
            status_by_branch_index = self.__set_fullname_index(branch_dic, status_by_branch)
            status_by_branch_finist = self.__set_fullname_column(status_dic, status_by_branch_index)
            status_by_year = self.__count_status(df[['student_year', 'education_status']],
                                                 list(status_data.index.values))
            status_by_year_finist = self.__set_fullname_column(status_dic, status_by_year)
            value['dept_name'] = get_branch['value'][0]['dept_name']
            value['all_stu_dept'] = self.__count_student_dept(df)
            value['branch'] = [self.__set_fullname_index(branch_dic, branch_data['amount_student']).to_dict()]
            value['status_by_year'] = [status_by_year_finist.to_dict('index')]
            value['df_status_by_branch'] = [status_by_branch_finist.to_dict('index')]
            response = True
            message = "Analyze Student Successfully"
        else:
            response = False
            message = "Analyze Student Failed"

        return inner_res_helper.make_inner_response(response, message, value)

    # uses in user and admin
    # this function return  academic results that analyze in 'dept'.
    # this function required department id
    def analyze_by_subject_dept(self, dept):
        connect = DatabaseHelper.get_instance()
        data = connect.get_all_academic_record(dept)
        value = {}

        if data['value']:
            df = pd.DataFrame(data['value'])
            grouped = df.groupby(['education_year', 'subject_code', 'grade']).size().unstack(fill_value=0)
            df_grouped = pd.DataFrame(grouped.stack().to_frame(name='count').reset_index())
            value['subject_by_year'] = [self.__retro_dictify(df_grouped)]
            response = True
            message = "Analyze Subject Successfully"
        else:
            response = False
            message = "Analyze Subject Failed"
        return inner_res_helper.make_inner_response(response, message, value)

    def __set_branch(self, data):
        branch_data = pd.DataFrame(data['value'][0]['branch'])
        branch_data['branch_name'] = (branch_data['branch_name'].str.split("-", n=1, expand=True))[0]
        branch_data = branch_data.set_index('branch_id')
        return branch_data

    def __set_status(self, data):
        status_df = pd.DataFrame(data['value']).set_index('status_id')
        return status_df

    def __count_student_dept(self, df):
        num_student_dept = len(df.index)
        return num_student_dept

    def __count_status(self, df, list_sample):
        count_status_all_branch = df.groupby(['student_year', 'education_status']).size().unstack(fill_value=0)
        list_status = self.__check_list(list_sample, list(count_status_all_branch.columns.values))
        for col in list_status:
            count_status_all_branch[col] = 0
        return count_status_all_branch

    def __status_by_branch(self, df, list_sample, status):
        grouped = df.groupby(['branch_id', 'education_status']).size().unstack(fill_value=0)
        list_branch = self.__check_list(list_sample, list(grouped.index.values))
        list_status = self.__check_list(status, list(grouped.columns.values))
        for col in list_branch:
            grouped.loc[col] = [0, 0]
        for col in list_status:
            grouped[col] = 0
        return grouped

    def __retro_dictify(self, frame):
        d = {}
        for row in frame.values:
            here = d
            for elem in row[:-2]:
                if elem not in here:
                    here[elem] = {}
                here = here[elem]
            here[row[-2]] = row[-1]
        return d

    def __check_list(self, sample, main):
        list_miss = set(sample) - set(main)
        return list_miss

    def __set_fullname_index(self, dic, data):
        data.index = data.index.map(dic)
        return data

    def __set_fullname_column(self, dic, data):
        data.columns = data.columns.map(dic)
        return data

    def __set_dict(self, key, value):
        return dict([(key, value) for key, value in zip(key, value)])

# get_all_student() method for get student data
# get_all_academic_record() method get student academic record data
