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


class AnalyzeAdmission:

    def analyze_admission(self,branch_id=None,year=None):
        connect = DatabaseHelper()
        data = connect.get_all_admission(year)
        value = {}

        if data['value']:

            df = pd.DataFrame(data['value'])
            # real data  
            print(df)
            branch          =   connect.get_branch()
            branch_data     =   analyze_helper.set_branch(branch['value'])
            status_data     =   analyze_helper.set_fullname(connect.get_status_list())
            channel_data    =   analyze_helper.set_fullname(connect.get_admission_channel())
            channel_sample  =   self.split_channel(channel_data)
            school          =   analyze_helper.set_fullname(connect.get_working_school_list())
            branch_dict     =   analyze_helper.set_dict(branch_data.index, branch_data.branch_name)
            school_dict     =   analyze_helper.set_dict(school.index, school.school_title)
            status_dic      =   analyze_helper.set_dict(status_data.index, status_data.status_title)
            data_split      =   self.split_channel(df)
            data_split_now  =   data_split.copy()
            data_not_year   =   data_split.copy()

            
            
            if year :
                data_split_now  =   data_split.loc[data_split['admission_year']==int(year)]
                
            count_by_branch                 = data_split_now.groupby(['channel_name','branch_id']).size().unstack(fill_value=0)
            count_by_branch_check_branch    = analyze_helper.check_list_column(branch_data.index,count_by_branch)
            count_by_branch_check_channel   = analyze_helper.check_list(channel_sample.channel_name,count_by_branch_check_branch)
            count_by_branch_fullname        = analyze_helper.set_fullname_column(branch_dict,count_by_branch_check_channel)
            
            if  branch_id :
                data_not_year    =   data_not_year.loc[data_not_year['branch_id']==branch_id]
                data_split_now   =   data_split_now.loc[data_split_now['branch_id']==branch_id]

            #not used branch 
            #used year
           
            #used branch and year
            count_channel                   = data_split_now.groupby('channel_name').size()
            count_channel_check_channel     = analyze_helper.check_list(channel_sample.channel_name,count_channel)
            count_school                    = data_split_now.school_id.value_counts()
            sort_count_school               = count_school.sort_values(ascending=False).head()
            sort_count_school_fullname      = analyze_helper.set_fullname_index(school_dict,sort_count_school)

            count_by_status                 = data_split_now.groupby(['channel_name','status_id']).size().unstack(fill_value=0)
            count_by_status_check_status    = analyze_helper.check_list_column(status_data.index,count_by_status)
            count_by_status_check_channel   = analyze_helper.check_list(channel_sample.channel_name,count_by_status_check_status)
            count_by_status_fullname        = analyze_helper.set_fullname_column(status_dic,count_by_status_check_channel)

           
            #used year and branch but used year and year-1
            year_select=[] 
            if year:
                year_select.append(int(year))
                year_select.append(int(year)-1)
            else:
                max_year=data_not_year.admission_year.max()
                year_select.append(max_year)
                year_select.append(max_year-1)
            data_compare    = data_not_year[data_not_year['admission_year'].isin(year_select)]
            compare_year    = data_compare.groupby(['channel_name','admission_year']).size().unstack(fill_value=0)
            
            if compare_year.empty:
            
                compare_year_success = pd.DataFrame(0,index=np.arange(1),columns = year_select)  
                channel_name=channel_sample.channel_name.drop_duplicates().tolist()
                compare_year_success['channel_name']=channel_name
                compare_year_success.set_index('channel_name',inplace=True)
            else:
                compare_year_check_channel  = analyze_helper.check_list(channel_sample.channel_name,compare_year)
                compare_year_success        = analyze_helper.check_list_column(year_select,compare_year_check_channel)
                

            value={
                'count_channel'   : count_channel_check_channel.to_dict(),
                'count_by_branch' : [count_by_branch_fullname.to_dict('index')],
                'count_by_school' : [sort_count_school_fullname.to_dict()],
                'compare_year'    : [compare_year_success.to_dict('index')],
                'count_by_status' : [count_by_status_fullname.to_dict('index')]
            }

            response = True
            message = "Analyze Successfully"
        else:
            response = False
            message = "Don't have Data"
        return inner_res_helper.make_inner_response(response=response, message=message, value=value)



    #admin
    def analyze_admission_admin(self,year=None):
        connect = DatabaseHelper()
        data = connect.get_all_admission(year)
        value = {}
        if data['value']:
            df = pd.DataFrame(data['value'])
            branch          =   connect.get_branch()
            branch_data     =   analyze_helper.set_branch(branch['value'])
            branch_dict     =   analyze_helper.set_dict(branch_data.index, branch_data.branch_name)
            channel_data    =   analyze_helper.set_fullname(connect.get_admission_channel())
            channel_sample  =   self.split_channel(channel_data)

            data_split      =   self.split_channel(df)
            channel_round=channel_sample.channel_round.drop_duplicates().to_list()
            analyze_by_round = []
            for i in channel_round: 
                data_in_round=data_split[data_split['channel_round']==i]
                
                
                if data_in_round.empty:
                    data_channel_sample=channel_sample[channel_sample['channel_round']==i]
                    data_group=data_channel_sample.groupby(['channel_round','channel_name']).size().unstack(fill_value=0)
                    data_group.iloc[:]=0
                    analyze_by_round.append(data_group.to_dict('index'))

                    
                else:
                    data_group=data_in_round.groupby(['channel_round','channel_name']).size().unstack(fill_value=0)
                    channel_sample_selector=(channel_sample[channel_sample['channel_round']==i])
                    data_group_check_channel   = analyze_helper.check_list_column(channel_sample_selector.channel_name,data_group)
                    analyze_by_round.append(data_group_check_channel.to_dict('index'))



            value={
                'analyze_by_round': analyze_by_round
            }
            response = True
            message = "Analyze Successfully"

        else:
            value={}
            response = False
            message = "Don't have Data"
        return inner_res_helper.make_inner_response(response=response, message=message, value=value)

    #admin
    def analyze_student_status(self,year=None):
        connect = DatabaseHelper()
        data = connect.get_all_status_admission(year)
        value = {}
        if data['value']:
            df = pd.DataFrame(data['value'])
            status_data     = analyze_helper.set_fullname(connect.get_status_list())
            status_dic      = analyze_helper.set_dict(status_data.index, status_data.status_title)
            channel_data    = analyze_helper.set_fullname(connect.get_admission_channel())
            channel_dict     =   analyze_helper.set_dict(channel_data.index, channel_data.channel_name)

            all_student     = len(df)
            channel_count   = df.channel_id.value_counts()

            group       = df[(df['status_id']==2)|(df['status_id']==3)]
            group       = group.groupby(['channel_id','status_id']).size().unstack(fill_value=0)
            group       = analyze_helper.set_fullname_column(status_dic,group)

            list_name   = group.columns.tolist()
            group       = pd.merge(channel_count ,group, left_index=True, right_index=True, how='inner')
            group.rename(columns={group.columns[0]: "all"} , inplace=True)
            for name in list_name:
                group['per_Type_'+name] = group.apply(lambda row: (row[name]/row['all'])*100, axis = 1) 
                group['per_Stu_'+name] = group.apply(lambda row: (row[name]/all_student)*100, axis = 1) 

            group = group.round(2).sort_index()
            group_check_index  = analyze_helper.check_list(channel_data.index,group)
            group_fullname     = analyze_helper.set_fullname_index(channel_dict,group_check_index)

            value ={
                'all_student' : all_student,
                'table' : group_fullname.to_dict('index')
            }



            response = True
            message = "Don't have Data"
        else:
            value={}
            response = False
            message = "Don't have Data"
        return inner_res_helper.make_inner_response(response=response, message=message, value=value)





    def split_channel(self,df):
        df[['round','number','channel_name']]   =   df['channel_name'].str.split(" ", expand=True, n=2)
        df['channel_round']                     =   df['round']+" "+df['number']
        df.drop(columns=['round','number'],inplace=True)
        return df


  