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
# import helper
from backend.helpers.database_helper import DatabaseHelper
import backend.helpers.analyze_helper as analyze_helper
import backend.helpers.inner_response_helper as inner_res_helper


class AnalyzeActivity:

    def analyze_publicize(self,year=None):
        connect = DatabaseHelper.get_instance()
        data = connect.get_admission_publicize(year)
        if data['value']:
            data        =   pd.DataFrame(data['value'])
            activity    =   analyze_helper.set_fullname(connect.get_activity_list())
            dupli_activity = activity.activity_name.duplicated(keep=False)
            activity.loc[dupli_activity, 'activity_name'] = activity.loc[dupli_activity, 'activity_name']+' ('+activity['activity_year'].astype(str)+')' 
            activityNoAr    =   activity[activity['activity_type_id']==0]
            activity_data   =   activityNoAr.drop(columns='activity_type_id')  
            activityNoAr    =   activityNoAr[['activity_name']]
            activity_dict   =   analyze_helper.set_dict(activityNoAr.index, activityNoAr.activity_name)
            data_year       =   data.copy()
            
            year_select            =   []
            if year:
                data_year   =   data[data['activity_year']==year]
                year_select.append(int(year))   
                year_select.append(int(year-1)) 
                activity_data =   activity_data[activity_data['activity_year']==year]

            else : 
                max_year    =   data.activity_year.max()
                year_select.append(int(max_year))  
                year_select.append(int(max_year-1))  
            
            activity_data.set_index(['activity_name'],inplace=True)
            
            #data_compare is data all person who joined activity not ar
            data_compare            = data[data['activity_year'].isin(year_select)]
            #data_student_compare is data all person who joined activity not ar and studied in KMUTT
            data_student_join       = data_compare.dropna()
            
            compare_year            = data_compare.groupby(['activity_id','activity_year']).size().unstack(fill_value=0)
            student_joined          = data_student_join.groupby(['activity_id','activity_year']).size().unstack(fill_value=0)
            if not compare_year.empty:
                compare_year_data   = analyze_helper.check_list(activityNoAr.index,compare_year)
                compare_year_data   = analyze_helper.check_list_column(year_select,compare_year_data)
                compare_year_data   = analyze_helper.set_fullname_index(activity_dict, compare_year_data)

                student_joined_compare = analyze_helper.check_list(activityNoAr.index,student_joined)
                student_joined_compare = analyze_helper.check_list_column(year_select,student_joined_compare)
                student_joined_compare = analyze_helper.set_fullname_index(activity_dict, student_joined_compare)
                # print(student_joined_compare)


            else:
                compare_year_data   = pd.DataFrame(columns = year_select)  
                activity_name       = activityNoAr.activity_name.tolist()
                compare_year_data['activity_name']   = activity_name
                compare_year_data.fillna(0,inplace=True)
                compare_year_data.set_index('activity_name',inplace=True)
                student_joined_compare      =compare_year_data.copy()


            activity_group      =  data_year.groupby('activity_id').size()
            activity_count_check=  analyze_helper.check_list(activityNoAr.index,activity_group)
            activity_count      =  analyze_helper.set_fullname_index(activity_dict,activity_count_check)

            student_join        =  data_student_join.groupby('activity_id').size()
            student_join_check  =  analyze_helper.check_list(activityNoAr.index,student_join)
            student_join_count  =  analyze_helper.set_fullname_index(activity_dict,student_join_check)
            value={
                'activity_count'        : activity_count.to_dict(),
                'student_join_count'    : student_join_count.to_dict(),
                'activity_yeat_compare' : compare_year_data.to_dict('index'),
                'student_joined_compare': student_joined_compare.to_dict('index'),
                'budget'                : activity_data.to_dict('index')
            }
            response = True
            message = "Analyze Successfully"
        else:
            response = False
            message = "Don't have Data"
            
        return inner_res_helper.make_inner_response(response="response", message="message", value=value)

    def analyze_ar(self,year=None):
        connect = DatabaseHelper.get_instance()
        data    = connect.get_admission_ar(year)
        if data['value']:
            data            =   pd.DataFrame(data['value'])
            activity        =   analyze_helper.set_fullname(connect.get_activity_list())
            dupli_activity  = activity.activity_name.duplicated(keep=False)
            activity.loc[dupli_activity, 'activity_name'] = activity.loc[dupli_activity, 'activity_name']+' ('+activity['activity_year'].astype(str)+')' 
            activityAr      =   activity[activity['activity_type_id']==1]
            activity_data   =   activityAr.drop(columns='activity_type_id')  
            activityAr      =   activityAr[['activity_name']]
            activity_dict   =   analyze_helper.set_dict(activityAr.index, activityAr.activity_name)
            #activity_data keep data activity such as activity_year and activity_budget
            #activity_dict keep data activity such as activity_year and activity_budget in syntex dic

            count_school        = data.school_name.value_counts()
            sort_count_school   = count_school.sort_values(ascending=False).head()

            gpax_school         = data.groupby(['school_name'])['gpax'].mean()
            sort_gpax_school    = gpax_school.sort_values(ascending=False).head()
            
           

            analyze_by_activity = data.groupby(['activity_id','branch_name']).size().unstack(fill_value=0)
            analyze_by_activity = analyze_helper.check_list(activityAr.index,analyze_by_activity)     
            analyze_by_activity = analyze_helper.set_fullname_index(activity_dict,analyze_by_activity) 

            analyze_by_activity_gpax = data.groupby(['activity_id','branch_name'])['gpax'].mean().unstack(fill_value=0)
            analyze_by_activity_gpax = analyze_helper.check_list(activityAr.index,analyze_by_activity_gpax)     
            analyze_by_activity_gpax = analyze_helper.set_fullname_index(activity_dict,analyze_by_activity_gpax) 
            analyze_by_activity_gpax = analyze_by_activity_gpax.round(2)

            value={
                'count_school'  : sort_count_school.to_dict(),
                'gpax'          : sort_gpax_school.to_dict(),
                'activity_by_branch_count': [analyze_by_activity.to_dict('index')],
                'activity_by_branch_gpax' : [analyze_by_activity_gpax.to_dict('index')]
            }
            response = True
            message = "Analyze Successfully"
        else:
            value={}
            response = False
            message = "Don't have Data"
        
        return inner_res_helper.make_inner_response(response=response, message=message, value=value)
