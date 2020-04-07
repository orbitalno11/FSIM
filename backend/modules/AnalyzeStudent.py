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
            df = self.__set_status(pd.DataFrame(data['value']))
            df_branch=df[['branch_id','branch']]
            dic_branch=self.__set_branch_dic(df_branch)
            count_by_branch=self.__count_by_branch(df)
            status_by_branch=self.__status_by_branch(df)
            value['all_stu_dept']           = self.__count_student_dept(df)
            value['branch']                 = [self.__set_branch(dic_branch,count_by_branch).to_dict()]
            value['status_by_year']         = [self.__count_status(df[['student_year', 'education_status']])]
            value['df_status_by_branch']    = [self.__set_branch(dic_branch,status_by_branch).to_dict('index')]
            response = True
            message = "Analyze Student Successfully"
            print(inner_res_helper.make_inner_response(response, message, value))
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



    def __count_by_branch(self, df_dept):
        df_branch = df_dept.groupby('branch_id').size()
        return df_branch

    def __count_student_dept(self, df):
        num_student_dept = len(df.index)
        return num_student_dept

    def __count_status(self, df):
        count_status_all_branch = df.groupby(['student_year', 'education_status']).size().unstack(fill_value=0)
        df_set_column_name=self.__check_column_status(count_status_all_branch).to_dict('index')
        return df_set_column_name


    def __status_by_branch(self, df):
        grouped = df.groupby(['branch_id', 'education_status']).size().unstack(fill_value=0)
        df_set_status=self.__check_column_status(grouped)
        # print(grouped)
        return df_set_status

    def __set_status(self, df):
        return df.replace({'education_status': {1: 'ปกติ', 2: 'วิทยาฑัณฑ์', 3: 'ตกออก', 4: 'ลาพัก'}})

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

    def __check_column_status(self,df):
        header_df=list(df.columns.values)
        list_all=['ปกติ','วิทยาฑัณฑ์','ตกออก','ลาพัก']
        list_add=set(list_all) - set(header_df)
        for col in list_add:
            df[col] = 0
        df=df[['ปกติ','วิทยาฑัณฑ์','ตกออก','ลาพัก']]
        return df


    def __set_branch_dic(self,main):
        main['branch']=main.branch.str.split('-').str[0]
        main=main.drop_duplicates(keep='last')
        branch_dic=dict([(branch_id,branch) for branch_id,branch in zip(main.branch_id, main.branch)])
        return branch_dic

    def __set_branch(self,dic,data):
        data.index =data.index.map(dic)
        return data
    
# get_all_student() method for get student data
# get_all_academic_record() method get student academic record data
