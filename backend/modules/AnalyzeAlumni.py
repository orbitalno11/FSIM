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
import backend.helpers.analyze_helper as analyze_helper
import backend.helpers.read_google_sheet as read_sheet


class AnalyzeAlumni:

    # uses in user pages and admin pages
    # this function will return analyze survey  in 'sheet_url' and 'column'

    # ALM1
    def analyze_survey(self, sheet_url, column):
        # read and analyze survey data
        read = read_sheet.read_sheet_data(sheet_url)

        if not read['response']:
            return inner_res_helper.make_inner_response(response=True, message="Developing", value="Developing")

        data = read['value']
        header = data[0]
        data = data[1:]
        select_column = list(column)

        data = pd.DataFrame(data, columns=header)
        data = data.loc[:, select_column].apply(pd.to_numeric)
        mean = pd.Series(data.mean(), name="mean")
        sd = pd.Series(data.std(), name="std")
        df = pd.concat([mean, sd], axis=1)
        return inner_res_helper.make_inner_response(response=True, message="Developing",
                                                    value=[df.round(2).to_dict('index')])

    # ALM2
    # uses in user pages and admin pages
    # this function will return analyze alumni working in 'year'
    def analyze_alumni_work(self, year=None):
        connect = DatabaseHelper()
        data = connect.get_all_alumni(year)
      
        if data['value']:
            df = pd.DataFrame(data['value'])
            df['graduated_gpax'] = df['graduated_gpax'].astype(int)
            branch = connect.get_branch()
            branch_data = analyze_helper.set_branch(branch['value'])
            status_working = analyze_helper.set_fullname(connect.get_working_status_list())
            status_apprentice = analyze_helper.set_fullname(connect.get_apprentice_status_list())
            branch_dic = analyze_helper.set_dict(branch_data.index, branch_data.branch_name)
            status_working_dic = analyze_helper.set_dict(status_working.index, status_working.status_title)
            status_apprentice_dic = analyze_helper.set_dict(status_apprentice.index, status_apprentice.status_title)

            df_brach = df.groupby('branch_id').size()
            df_branch_finish = analyze_helper.check_list(branch_data.index.values, df_brach)

            count_by_status = df.groupby('work_id').size()
            count_by_status_finish = analyze_helper.check_list(status_working.index.values, count_by_status)

            count_by_training = df.groupby('apprentice_id').size()
            count_by_training_finish = analyze_helper.check_list(status_apprentice.index.values, count_by_training)


            df_gpax = df[df['graduated_gpax']!=-1]
            gpax_by_branch = df_gpax.groupby('branch_id')['graduated_gpax'].mean()
            gpax_by_branch_2decimal = gpax_by_branch.round(2)
            gpax_by_branch_finish = analyze_helper.check_list(branch_data.index.values, gpax_by_branch_2decimal)

            list_salary = {1: 'น้อยกว่า 10,000', 2: '10,000-19,999', 3: '20,000-30,000', 4: 'มากกว่า 30,000'}
            salary_branch_trining = []
            list_analze = {}
            df_salary   = df[df['salary'].notna()]
            df_salary = df_salary.copy()
            df_salary['salary'] = df_salary['salary'].astype(int)
            
            # df_salary.loc[:, ['salary']] =df_salary['salary'].astype(int)
            salary_all_branch_trining = self.__salary_branch_training(df_salary[['salary','apprentice_id']])
            salary_all_branch_trining_check_index = analyze_helper.check_list_column(status_apprentice.index.values,
                                                                              salary_all_branch_trining)
            salary_all_branch_trining_check_column = analyze_helper.check_list(list_salary.keys(),
                                                                                      salary_all_branch_trining_check_index)
            salary_all_branch_trining_index = analyze_helper.set_fullname_column(status_apprentice_dic,
                                                                                salary_all_branch_trining_check_column)
            salary_all_branch_trining_finist = analyze_helper.set_fullname_index(list_salary,
                                                                                  salary_all_branch_trining_index)                                                                   
            list_analze['dept_name'] = 'ทั้งหมด'
            list_analze['num_student'] = len(df)
            list_analze['salary_all_branch_training'] = salary_all_branch_trining_finist.to_dict('index')
            salary_branch_trining.append(list_analze)

            list_branch_traning = df_brach.index.tolist()
            for i in list_branch_traning:
                list_analze = {}
                data = df[df['branch_id'] == i]
                if not data.empty:
                    analyze_salart = self.__salary_branch_training(data[['salary','apprentice_id']])
                    analyze_salart = analyze_helper.check_list_column(status_apprentice.index.values, analyze_salart)
                    analyze_salart = analyze_helper.check_list(list_salary.keys(), analyze_salart)
                    analyze_salart = analyze_helper.set_fullname_column(status_apprentice_dic, analyze_salart)
                    analyze_salart = analyze_helper.set_fullname_index(list_salary, analyze_salart)
                    list_analze['dept_name'] = branch_dic[i]
                    list_analze['num_student'] = len(data)
                    list_analze['salary_all_branch_training'] = analyze_salart.to_dict('index')
                else:
                    analyze_salart = pd.DataFrame(0, index=np.arange(len(list_salary)),
                                                  columns= status_apprentice.status_title.tolist())
                    analyze_salart['list_salary'] = list_salary.values()
                    analyze_salart.set_index('list_salary', inplace=True)
                    list_analze['dept_name'] = branch_dic[i]
                    list_analze['num_student'] = 0
                    list_analze['salary_all_branch_training'] = analyze_salart.to_dict('index')

                salary_branch_trining.append(list_analze)

            list_branch_traning.insert(0, 'all')


            value = {
                'count_student': len(df.index),
                'count_by_branch': analyze_helper.set_fullname_index(branch_dic, df_branch_finish).to_dict(),
                'count_by_status': analyze_helper.set_fullname_index(status_working_dic,
                                                                     count_by_status_finish).to_dict(),
                'count_by_training': analyze_helper.set_fullname_index(status_apprentice_dic,
                                                                       count_by_training_finish).to_dict(),
                'salary_all_branch_training': dict(zip(list_branch_traning, salary_branch_trining)),
                'gpax_by_branch': analyze_helper.set_fullname_index(branch_dic, gpax_by_branch_finish).to_dict(),
            }
            

            response = True
            message = "Analyze Successfully"
        else:
            value = {}
            response = False
            message = "Don't have Data"
        return inner_res_helper.make_inner_response(response=response, message=message, value=value)

    # ALM3
    def __salary_branch_training(self, df):
        grouped_df = df.copy()
        grouped_df.loc[df['salary'] < 10000, 'salary1'] = 1
        grouped_df = grouped_df.copy()
        grouped_df.loc[(df['salary'] >= 10000) & (df['salary'] < 20000), 'salary1'] = 2
        grouped_df.loc[(df['salary'] >= 20000) & (df['salary'] < 30000), 'salary1'] = 3
        grouped_df.loc[df['salary'] >= 30000, 'salary1'] = 4
        grouped_df = grouped_df.drop('salary', 1)
        count_status_all_branch = grouped_df.groupby(['salary1','apprentice_id']).size().unstack(
            fill_value=0)
        return count_status_all_branch
