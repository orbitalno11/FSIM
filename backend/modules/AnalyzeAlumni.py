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

    # uses in user pages and admin pages
    # this function will return analyze alumni working in 'year'
    def analyze_alumni_work(self,year=None):
        connect = DatabaseHelper.get_instance()
        data = connect.get_all_alumni(year)
        if data['value']:
            df                          =   pd.DataFrame(data['value'])
            df['graduated_gpax']        =   df['graduated_gpax'].astype(int)
            df['salary']                =   df['salary'].astype(int)
            branch_data                 =   self.__set_branch(connect.get_branch())
            status_working              =   self.__set_status(connect.get_working_status_list())
            status_apprentice           =   self.__set_status(connect.get_apprentice_status_list())
            branch_dic                  =   self.__set_dict(branch_data.index, branch_data.branch_name)
            status_working_dic          =   self.__set_dict(status_working.index, status_working.status_title)
            status_apprentice_dic       =   self.__set_dict(status_apprentice.index, status_apprentice.status_title)
            

            df_brach                    =   df.groupby('branch_id').size()
            df_branch_finish            =   self.__check_list(branch_data.index.values,df_brach)
            
            count_by_status             =   df.groupby('work_id').size()
            count_by_status_finish      =   self.__check_list(status_working.index.values,count_by_status)

            count_by_training           =    df.groupby('apprentice_id').size()
            count_by_training_finish    =   self.__check_list(status_apprentice.index.values,count_by_training)
            
            gpax_by_branch              =   df.groupby('branch_id')['graduated_gpax'].mean()
            gpax_by_branch_2decimal     =   gpax_by_branch.round(2)
            gpax_by_branch_finish       =   self.__check_list(branch_data.index.values,gpax_by_branch_2decimal)
            print(gpax_by_branch_finish)
            
            list_salary                 =   {1:'น้อยกว่า 10,000',2:'10,000-19,999',3:'20,000-30,000',4:'มากกว่า 30,000'}

            salary_all_branch_trining            =  self.__salary_branch_training(df[['apprentice_id', 'salary']])
            salary_all_branch_trining_check_index =  self.__check_list(status_apprentice.index.values,salary_all_branch_trining)
            salary_all_branch_trining_check_column=  self.__check_list_column(list_salary.keys(),salary_all_branch_trining_check_index)
            salary_all_branch_trining_index      =  self.__set_fullname_index(status_apprentice_dic,salary_all_branch_trining_check_column)
            salary_all_branch_trining_finist     =  self.__set_fullname_column(list_salary,salary_all_branch_trining_index)

            value = {
                'count_student'                 : len(df.index),
                'count_by_branch'               : self.__set_fullname_index(branch_dic,df_branch_finish).to_dict(),
                'count_by_status'               : self.__set_fullname_index(status_working_dic,count_by_status_finish).to_dict(),
                'count_by_training'             : self.__set_fullname_index(status_apprentice_dic,count_by_training_finish).to_dict(),
                'salary_all_branch_trining'     : [salary_all_branch_trining_index.to_dict('index')],
                'gpax_by_branch'                : self.__set_fullname_index(branch_dic,gpax_by_branch_finish).to_dict(),
            }
            response = True
            message = "Analyze Alumni Work Successfully"
        else:
            value = {}
            response = False
            message = "AnalyzeAlumni Work Failed"
        return inner_res_helper.make_inner_response(response=response, message=message, value=[value])

    # uses in user pages and admin pages
    # this function will return "analyze alumni salary only and number of student " in 'year' and 'branch'
    def analyze_alumni_salary(self,year=None,branch='all'):
        connect = DatabaseHelper.get_instance()
        data = connect.get_all_alumni(year)
        if data['value']:
            df  =   pd.DataFrame(data['value'])
            if branch!='all':
                df=df.loc[df['branch_id']==branch]
            
            if not df.empty:
                df['salary']                =   df['salary'].astype(int)
                status_apprentice           =   self.__set_status(connect.get_apprentice_status_list())
                status_apprentice_dic       =   self.__set_dict(status_apprentice.index, status_apprentice.status_title)
                list_salary                 =   {1:'น้อยกว่า 10,000',2:'10,000-19,999',3:'20,000-30,000',4:'มากกว่า 30,000'}
                salary_all_branch_trining               =  self.__salary_branch_training(df[['apprentice_id', 'salary']])
                salary_all_branch_trining_check_index   =  self.__check_list(status_apprentice.index.values,salary_all_branch_trining)
                salary_all_branch_trining_check_column  =  self.__check_list_column(list_salary.keys(),salary_all_branch_trining_check_index)
                salary_all_branch_trining_index         =  self.__set_fullname_index(status_apprentice_dic,salary_all_branch_trining_check_column)
                salary_all_branch_trining_finist        =  self.__set_fullname_column(list_salary,salary_all_branch_trining_index)

                value = {
                    'num_student'                   : len(df.index),
                    'salary_all_branch_trining'     : [salary_all_branch_trining_finist.to_dict('index')]
                }
                response = True
                message = "Analyze Alumni Salary Successfully"
            else: 
                value = {}
                response = False
                message = "Analyze Alumni Salary Failed,Don't have student in this branch"

        else:
            value = {}
            response = False
            message = "AnalyzeAlumni Work Failed"
        return inner_res_helper.make_inner_response(response=response, message=message, value=[value])



    

    def __set_branch(self,data):
        branch_data=pd.DataFrame(data['value'])
        branch_data['branch_name']=(branch_data['branch_name'].str.split("-", n = 1, expand = True))[0]
        branch_data=branch_data.set_index('branch_id')
        return branch_data
    
    def __set_status(self,data):
        status_df=pd.DataFrame(data['value']).set_index('status_id')
        return status_df

    def __salary_branch_training(self, df):
        grouped_df = df.copy()
        grouped_df.loc[df['salary'] < 10000, 'salary1'] = 1
        grouped_df = grouped_df.copy()
        grouped_df.loc[(df['salary'] >= 10000) & (df['salary'] < 20000), 'salary1'] = 2
        grouped_df.loc[(df['salary'] >= 20000) & (df['salary'] < 30000), 'salary1'] = 3
        grouped_df.loc[df['salary'] >= 30000, 'salary1'] = 4
        grouped_df = grouped_df.drop('salary', 1)
        count_status_all_branch = grouped_df.groupby(['apprentice_id', 'salary1']).size().unstack(
            fill_value=0)
        return count_status_all_branch

    def __check_list(self,sample,main):
        list_miss=set(sample) - set(main.index.values)
        return self.__loop_to_set_zero_index(main,list_miss)

    def __check_list_column(self,sample,main):
        list_miss=set(sample) - set(main.columns.values)
        return self.__loop_to_set_zero(main,list_miss)
       
    def __set_fullname_index(self,dic,data):
        data.index  =data.index.map(dic)
        return data

    def __set_fullname_column(self,dic,data):
        data.columns  =data.columns.map(dic)
        return data

    def __set_dict(self,key,value):
        return dict([(key,value) for key,value in zip(key, value)])

    def __loop_to_set_zero(self,df,list):
        for col in list:
            df[col] = 0
        print(df)
        return df

    def __loop_to_set_zero_index(self,df,list):
        for col in list:
            df.loc[col] = 0
        print(df)
        return df