# this class to analyze Student data.
# to get data from database please use DatabaseConnection class and
# use method which provide the data that you want
# Example for get data
#  1. database = DatabaseConnection()
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
import backend.helpers.analyze_helper as analyze_helper

from collections import defaultdict
from collections import OrderedDict
import pandas as pd
import json


class AnalyzeStudent:

    # uses in user and admin
    # this function returns student data and status student that analyze in 'dept'.
    # this function required department id
    def analyze_by_dept(self, dept):
        value = {}
        connect = DatabaseHelper()
        data = connect.get_all_student(dept)
        if data['value']:
            df = pd.DataFrame(data['value'])

            # get_branch=connect.get_department(dept)
            # if dept:
            #     branch_data = analyze_helper.set_branch(get_branch['value'][0][2])
            # else :
            #     print(get_branch)
            #     branch=[]
            #     for i in get_branch['value']: 
            #         for index in range(len(i['branch'])):
            #             branch.append(i['branch'][index])
            #     branch_data = analyze_helper.set_branch(branch)
        
            get_branch = connect.get_department_ds()
            get_branch = pd.DataFrame(get_branch['value'])
            if dept:
                get_branch = get_branch[get_branch['dept_id']==dept]
            branch_data = get_branch[['branch_id','branch_name']]
            branch_data = branch_data.set_index('branch_id')
           
               
            status_data = analyze_helper.set_fullname(connect.get_status_list())
            branch_dic = analyze_helper.set_dict(branch_data.index, branch_data.branch_name)
            status_dic = analyze_helper.set_dict(status_data.index, status_data.status_title)
            status_by_branch = self.__status_by_branch(df, list(branch_data.index.values),
                                                       list(status_data.index.values))
            # print(df)
            status_by_branch_index = analyze_helper.set_fullname_index(branch_dic, status_by_branch)
            status_by_branch_finist = analyze_helper.set_fullname_column(status_dic, status_by_branch_index)
            status_by_year = self.__count_status(df[['student_year', 'education_status']],
                                                 list(status_data.index.values))
            status_by_year_finist = analyze_helper.set_fullname_column(status_dic, status_by_year)
           
            count_by_branch = df.groupby(['branch_id']).size()
            count_by_branch = analyze_helper.check_list(branch_data.index,count_by_branch)
            count_by_branch = analyze_helper.set_fullname_index(branch_dic, count_by_branch)

            value['dept_name'] = get_branch.iloc[0,1]
            value['all_stu_dept'] = self.__count_student_dept(df)
            value['branch'] = [count_by_branch.to_dict()]
            value['status_by_year'] = [status_by_year_finist.to_dict('index')]
            value['df_status_by_branch'] = [status_by_branch_finist.to_dict('index')]

            response = True
            message = "Analyze Student Successfully"
        else:
            response = False
            message = "Don't have Data"

        return inner_res_helper.make_inner_response(response, message, value)

    # uses in user and admin
    # this function return  academic results that analyze in 'dept'.
    # this function required department id
    # def analyze_by_subject_dept(self, dept=None,year=None):
    #     connect = DatabaseHelper()
    #     data = connect.get_all_academic_record(dept,year)
    #     value = {}
    #     if data['value']:
    #         df = pd.DataFrame(data['value'])
    #         get_branch      =connect.get_branch()
    #         branch_data     = analyze_helper.set_branch(get_branch['value'])
    #         branch_dic      = (branch_data.branch_name).to_dict()
    #         df_f            = df[df['grade']=='F']
    #         if dept:
    #             branch      = branch_data[branch_data['dept_id']==dept]
    #             list_branch = branch.index.tolist()
    #         else:
    #             list_branch = branch_data.index.tolist()
    #         group_subject   = df.groupby(['subject_code','grade']).size().unstack(fill_value=0)
    #         group_subject_F = df_f.groupby(['subject_code','branch_id']).size().unstack(fill_value=0)
    #         group_subject_F = analyze_helper.check_list_column(list_branch,group_subject_F)
    #         group_subject_F = analyze_helper.set_fullname_column(branch_dic,group_subject_F)

    #         value={
    #             'analyze_by_grade' : group_subject.to_dict('index'),
    #             'group_F'          : [group_subject_F.to_dict('index')]
    #         }
    #         response = True
    #         message = "Analyze Subject Successfully"
    #     else:
            
    #         response = False
    #         message = "Don't have Data"
    #     return inner_res_helper.make_inner_response(response, message, value)

    def student_tracking(self,id_student):
        connect = DatabaseHelper()
        data = connect.get_student_tracking(id_student)
        value = {}
        if data['value']:
            df = pd.DataFrame(data['value'])
            df = df.sort_values(by=['education_year', 'semester'])
            df_drop_s = df[df['semester']!='S']
            df_drop_s.reset_index(inplace=True)
            
            df_tracking = df_drop_s.gpa

            value={
                'student_id' : id_student,
                'firstname' : df_drop_s.loc[0,'firstname'],
                'lastname' : df_drop_s.loc[0,'lastname'],
                'gpax'  :   df_drop_s.current_gpax.loc[1],
                'trackking' : df_tracking.to_dict()
            }
            response = True
            message = "Analyze Subject Successfully"
        else:
            response= False
            message = "Don't have Data"
        
        return inner_res_helper.make_inner_response(response, message, value)


    def subject_by_branch(self,branch_id,semester,education_year):
        connect = DatabaseHelper()
        data = connect.subject_by_branch(branch_id,semester,education_year)
        value = {}
        if data['value']:
            df = pd.DataFrame(data['value'])
            list_grade = {'A': 4, 'B+': 3.5, 'B': 3, 'C+': 2.5, 'C' : 2,'D+' : 1.5, 'D' : 1 , 'F' : 0, 'Fe' : 0}
            df['grade'].replace(list_grade,inplace=True)
            df = df[df['grade']!='W']
            df['grade'] =df.grade.astype(int)
            grouped = df.groupby(["subject_code","subject_name_en","subject_weigth"])["grade"].agg(['size','mean','std'])
            grouped = grouped.reset_index(level=['subject_name_en','subject_weigth'])
            grouped = grouped.round(2)
            value={
                 'subject' : grouped.to_dict('index'),
            }
            response = True
            message = "Analyze Subject Successfully"
        else:
            response= False
            message = "Don't have Data"
        
        return inner_res_helper.make_inner_response(response, message, value)

    def student_admin(self):
        value = {}
        connect = DatabaseHelper()
        data = connect.get_all_student()
        if data['value']:
            df = pd.DataFrame(data['value'])
            # get_branch=connect.get_department(None)

            # dept_data = pd.io.json.json_normalize(get_branch['value'], 'branch', ['dept_id','dept_name'])

            # department_data = dept_data[['dept_id','dept_name']].set_index('dept_id')
            # department_data.drop_duplicates(inplace=True)

            get_branch = connect.get_department_ds()
            get_branch = pd.DataFrame(get_branch['value'])
            department_data = get_branch[['dept_id','dept_name']]
            department_data = department_data.set_index('dept_id')

            status_data = analyze_helper.set_fullname(connect.get_status_list())
            
            status_dic = analyze_helper.set_dict(status_data.index, status_data.status_title)
            
            list_department = department_data.index.unique().tolist()
            analyze_by_dept = []
            for dept in list_department:
                analyze = {}
                df_dept = df[df['dept_id']==dept]
                department_selector = get_branch[get_branch['dept_id']==dept]
                branch_data = analyze_helper.set_branch(department_selector[['branch_id','branch_name']])
                branch_dic = analyze_helper.set_dict(branch_data.index, branch_data.branch_name)
                
                status_by_branch = self.__status_by_branch(df_dept, list(branch_data.index.values),
                                                        list(status_data.index.values))
                status_by_branch_index = analyze_helper.set_fullname_index(branch_dic, status_by_branch)
                status_by_branch_finist = analyze_helper.set_fullname_column(status_dic, status_by_branch_index)
                status_by_year = self.__count_status(df_dept[['student_year', 'education_status']],
                                                    list(status_data.index.values))
                status_by_year_finist = analyze_helper.set_fullname_column(status_dic, status_by_year)

                count_by_branch=df_dept.groupby(['branch_id']).size()
                count_by_branch = analyze_helper.check_list(branch_data.index,count_by_branch)
                count_by_branch = analyze_helper.set_fullname_index(branch_dic, count_by_branch)
                analyze['dept_id'] = dept
                
                # print(branch_data)
                analyze['branch'] = count_by_branch.to_dict()
                analyze['status_by_year'] = [status_by_year_finist.to_dict('index')]
                analyze['df_status_by_branch'] = [status_by_branch_finist.to_dict('index')]
                analyze_by_dept.append(analyze)

            value ={
                'analyze_by_dept':analyze_by_dept
            }
            response = True
            message = "Analyze Student Successfully"
        else:
            response = False
            message = "Don't have Data"

        return inner_res_helper.make_inner_response(response, message, value)




    
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

    
    def __check_list(self, sample, main):
        list_miss = set(sample) - set(main)
        return list_miss

    
   

# get_all_student() method for get student data
# get_all_academic_record() method get student academic record data
