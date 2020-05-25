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

    def analyze_admission(self, year=None):
        connect = DatabaseHelper()
        data = connect.get_all_admission(year)
        value = {}
       
        if data['value']:

            df = pd.DataFrame(data['value'])
            # real data  
            # deparment = connect.get_department()
            # deparment = pd.io.json.json_normalize(deparment['value'], max_level=0)
            # # branch_data = analyze_helper.set_branch(branch['value'])
            # deparment_data = deparment[['dept_id','dept_name']]
            # deparment_data.set_index('dept_id',inplace=True)
            
            deparment = connect.get_department_ds()
            deparment_data = pd.DataFrame(deparment['value']) 
            deparment_data = deparment_data[['dept_id','dept_name']]
            deparment_data.set_index('dept_id',inplace=True)

            status_data = analyze_helper.set_fullname(connect.get_status_list())
            channel_data = analyze_helper.set_fullname(connect.get_admission_channel())
            channel_sample = self.split_channel(channel_data)
            
            ###check duplicate channel anme
            dupli_channel = channel_sample.channel_name.duplicated(keep=False)
            channel_sample.loc[dupli_channel, 'channel_name'] = channel_sample.loc[dupli_channel, 'channel_name'] + ' (' + \
                                                            channel_sample['channel_round'] + ')'
            channel_sample_for_dict = channel_sample[['channel_name']]
            round_data = channel_sample[['round_id','round_name']]

            school = analyze_helper.set_fullname(connect.get_school_lis())
            deparment_dict = analyze_helper.set_dict(deparment_data.index, deparment_data.dept_name)
            school_dict = analyze_helper.set_dict(school.index, school.school_title)
            status_dic = analyze_helper.set_dict(status_data.index, status_data.status_title)
            channel_dic = analyze_helper.set_dict(channel_sample_for_dict.index, channel_sample_for_dict.channel_name)

            data_split_now = df.copy()
            data_not_year = df.copy()

            if year:
                data_split_now = df.loc[df['admission_year'] == int(year)]

            round_list=channel_sample['round_id'].unique().tolist()
            
            data_not_none=data_split_now.dropna()
            gpa_by_branch = []
            for i in round_list: 
                gpa_by_count = {}
                channel_list = channel_sample[channel_sample['round_id']==i]
                list_channel = channel_list.index.tolist()
                if(not data_not_none.empty):
                    count_by_branch= data_not_none['channel_id'].isin(list_channel)
                    count_by_branch= data_not_none[count_by_branch]
                    count_by_branch = count_by_branch.groupby(['channel_id', 'dept_id'])['current_gpax'].mean().unstack(
                        fill_value=0)
                    count_by_branch = count_by_branch.round(2)
                    count_by_branch_check_branch = analyze_helper.check_list_column(deparment_data.index, count_by_branch)
                    count_by_branch_check_channel = analyze_helper.check_list(channel_list.index,
                                                                            count_by_branch_check_branch)
                    check_by_round_channel = analyze_helper.set_fullname_column(deparment_dict, count_by_branch_check_branch)
                    check_by_round_channel = analyze_helper.set_fullname_index(channel_dic, check_by_round_channel)
                    gpa_by_count['gpa_by_branch']=check_by_round_channel.to_dict('index')
                    gpa_by_branch.append(gpa_by_count)  
                else: 
                    gpa_by_branch.append(gpa_by_count)                           

          
            count_channel = data_split_now.groupby('channel_id').size()
            count_channel_check_channel = analyze_helper.check_list(channel_sample.index, count_channel)
            count_channel_check_channel = analyze_helper.set_fullname_index(channel_dic, count_channel_check_channel)


            count_school = data_split_now.school_id.value_counts()
            sort_count_school = count_school.sort_values(ascending=False).head()
            sort_count_school_fullname = analyze_helper.set_fullname_index(school_dict, sort_count_school)

            count_by_status = data_split_now.groupby(['channel_id', 'status_id']).size().unstack(fill_value=0)
            count_by_status_check_status = analyze_helper.check_list_column(status_data.index, count_by_status)
            count_by_status_check_channel = analyze_helper.check_list(channel_sample.index,
                                                                      count_by_status_check_status)
            count_by_status_fullname = analyze_helper.set_fullname_column(status_dic, count_by_status_check_channel)
            count_by_status_fullname = analyze_helper.set_fullname_index(channel_dic, count_by_status_fullname)

            # used year and branch but used year and year-1
            year_select = []
            if year:
                year_select.append(int(year))
                year_select.append(int(year) - 1)
            else:
                max_year = data_not_year.admission_year.max()
                year_select.append(max_year)
                year_select.append(max_year - 1)
            data_compare = data_not_year[data_not_year['admission_year'].isin(year_select)]
            compare_year = data_compare.groupby(['channel_id', 'admission_year']).size().unstack(fill_value=0)

            if compare_year.empty:
                channel_name = channel_sample['channel_name'].unique().tolist()
                compare_year_success = pd.DataFrame(0, index=np.arange(len(channel_name)), columns=year_select)
                compare_year_success['channel_name'] = channel_name
                compare_year_success.set_index('channel_name', inplace=True)
            else:
                compare_year_check_channel = analyze_helper.check_list(channel_sample.index, compare_year)
                compare_year_success = analyze_helper.check_list_column(year_select, compare_year_check_channel)
                compare_year_success = analyze_helper.set_fullname_index(channel_dic, compare_year_success)

            
            value = {
                'count_channel': count_channel_check_channel.to_dict(),
                'count_by_branch':  dict(zip(round_list, gpa_by_branch)),
                'count_by_school': [sort_count_school_fullname.to_dict()],
                'compare_year': [compare_year_success.to_dict('index')],
                'count_by_status': [count_by_status_fullname.to_dict('index')]
            }
            response = True
            message = "Analyze Successfully"
        else:
            response = False
            message = "Don't have Data"
        return inner_res_helper.make_inner_response(response=response, message=message, value=value)

    # admin
    def analyze_admission_admin(self, year=None):
        connect = DatabaseHelper()
        data = connect.get_all_admission_admin(year)
        value = {}
        if data['value']:
            df = pd.DataFrame(data['value'])
            branch = connect.get_branch()
            branch_data = analyze_helper.set_branch(branch['value'])
            branch_dict = analyze_helper.set_dict(branch_data.index, branch_data.branch_name)
            channel_data = analyze_helper.set_fullname(connect.get_admission_channel())
            channel_sample = self.split_channel(channel_data)

            data_split = self.split_channel(df)
            channel_round = channel_sample.channel_round.drop_duplicates().to_list()
            analyze_by_round=[]
            for i in channel_round:
                analyze_by_round_s = {}
                data_in_round = data_split[data_split['channel_round'] == i]

                if data_in_round.empty:
                    data_channel_sample = channel_sample[channel_sample['channel_round'] == i]
                    data_group = data_channel_sample.groupby(['channel_round', 'channel_name']).size().unstack(
                        fill_value=0)
                    data_group.iloc[:] = 0
                    data_group.reset_index(inplace=True)
                    name = data_group.iloc[0,0]
                    data_group=data_group.drop(columns=['channel_round'])
                    analyze_by_round_s['name'] = name
                    analyze_by_round_s['analyze'] = data_group.to_dict('index')


                else:
                    data_group = data_in_round.groupby(['channel_round', 'channel_name']).size().unstack(fill_value=0)
                    channel_sample_selector = (channel_sample[channel_sample['channel_round'] == i])
                    data_group_check_channel = analyze_helper.check_list_column(channel_sample_selector.channel_name,
                                                                                data_group)
                    data_group_check_channel.reset_index(inplace=True)
                    name = data_group_check_channel.iloc[0,0]
                    data_group_check_channel=data_group_check_channel.drop(columns=['channel_round'])
                    
                    analyze_by_round_s['name'] = name
                    analyze_by_round_s['analyze'] = data_group_check_channel.to_dict('index')
                analyze_by_round.append(analyze_by_round_s)
            value = {
                'analyze_by_round': analyze_by_round
            }
            response = True
            message = "Analyze Successfully"

        else:
            value = {}
            response = False
            message = "Don't have Data"
        return inner_res_helper.make_inner_response(response=response, message=message, value=value)

    # admin
    def analyze_student_status(self, year=None):
        connect = DatabaseHelper()
        data = connect.get_all_admission(year)
        value = {}
        if data['value']:
           
            df = pd.DataFrame(data['value'])
            status_data = analyze_helper.set_fullname(connect.get_status_list())
            status_dic = analyze_helper.set_dict(status_data.index, status_data.status_title)
            channel_data = analyze_helper.set_fullname(connect.get_admission_channel())
            channel_sample = self.split_channel(channel_data)
            dupli_channel = channel_sample.channel_name.duplicated(keep=False)
            channel_sample.loc[dupli_channel, 'channel_name'] = channel_sample.loc[dupli_channel, 'channel_name'] + ' (' + \
                                                            channel_sample['channel_round'] + ')'
            channel_dict = analyze_helper.set_dict(channel_sample.index, channel_sample.channel_name)
            branch = connect.get_branch()
            branch_data = analyze_helper.set_branch(branch['value'])
            branch_dict = analyze_helper.set_dict(branch_data.index, branch_data.branch_name)


            group_brance = df.groupby(['channel_id','branch_id']).size().unstack(fill_value=0)
            group_brance = analyze_helper.check_list_column(branch_data.index,group_brance)
            group_brance = analyze_helper.check_list(channel_data.index,group_brance)
            group_brance = analyze_helper.set_fullname_column(branch_dict, group_brance)
            group_brance = analyze_helper.set_fullname_index(channel_dict, group_brance)
            branch_list =group_brance.columns.tolist()
            channel_id_list=channel_data.index.tolist()

            table_count = []
            for c_id in channel_id_list:
                by_channel = {}
                data = df[df['channel_id']==c_id]
                if not data.empty:
                    count = len(data)
                    max_data=data.branch_id.value_counts().max()
                    min_data=data.branch_id.value_counts().min()
                else: 
                    count=0
                    max_data=0
                    min_data= 0
                by_channel['channel'] = channel_dict[c_id]
                by_channel['count'] = str(count)
                by_channel['max_data'] = str(max_data)
                by_channel['min_data'] = str(min_data)
                table_count.append(by_channel)

            
            all_student = len(df)
            channel_count = df.channel_id.value_counts()

            

            group = df[(df['status_id'] == 2) | (df['status_id'] == 3)]
            
            group = group.groupby(['channel_id', 'status_id']).size().unstack(fill_value=0)
            if group.empty:
                group = pd.DataFrame(0, index=np.arange(len(channel_count)), columns= [2,3])
                group['channel'] = channel_count.index
                group.set_index('channel', inplace=True)
            group = group.rename(columns={2:"probation",3:"drop"})

            list_name = group.columns.tolist()
            group = pd.merge(channel_count, group, left_index=True, right_index=True, how='inner')
            group.rename(columns={group.columns[0]: "all"}, inplace=True)
            all_admission = group['all'].sum()
            for name in list_name:
                group['per_Type_' + str(name)] = group.apply(lambda row: (row[name] / row['all']) * 100, axis=1)
                group['per_Stu_' + str(name)] = group.apply(lambda row: (row[name] / all_student) * 100, axis=1)

            group['per_all_student'] = (group['all']/all_admission)* 100
            group = group.round(2).sort_index()
            
            group_check_index = analyze_helper.check_list(channel_data.index, group)
            group_fullname = analyze_helper.set_fullname_index(channel_dict, group_check_index)
            value = {
                'branch' : branch_list,
                'count_by_brance' : group_brance.to_dict('index'),
                'all_student': str(all_student),
                'table': group_check_index.to_dict('index'),
                'table_count' : table_count,
            }

            response = True
            message = "Don't have Data"
        else:
            value = {}
            response = False
            message = "Don't have Data"
        return inner_res_helper.make_inner_response(response=response, message=message, value=value)

    def split_channel(self, df):
        df[['round', 'number', 'channel_name']] = df['channel_name'].str.split(" ", expand=True, n=2)
        df['channel_round'] = df['round'] + " " + df['number']
        df.drop(columns=['round', 'number'], inplace=True)
        return df
