from backend.helpers.database_helper import DatabaseHelper
from collections import defaultdict
from collections import OrderedDict
import pandas as pd


def set_branch(data):
    branch_data = pd.DataFrame(data)
    branch_data['branch_name'] = (branch_data['branch_name'].str.split("-", n=1, expand=True))[0]
    branch_data = branch_data.set_index('branch_id')
    return branch_data

def set_fullname(data):
    df = pd.DataFrame(data['value'])
    df = df.set_index(df.columns[0])
    return df

def set_dict(key, value):
    return dict([(key, value) for key, value in zip(key, value)])

def set_fullname_index(dic, data):
    data.index = data.index.map(dic)
    return data

def set_fullname_column(dic, data):
    data.columns = data.columns.map(dic)
    return data

def check_list(sample,main):
    list_miss=set(sample) - set(main.index.values)
    return loop_to_set_zero_index(main,list_miss)

def check_list_column(sample,main):
    list_miss=set(sample) - set(main.columns.values)
    return loop_to_set_zero(main,list_miss)
    

def loop_to_set_zero(df,list):
    for col in list:
        df[col] = 0
    return df

def loop_to_set_zero_index(df,list):
    for col in list:
        df.loc[col] = 0
    return df