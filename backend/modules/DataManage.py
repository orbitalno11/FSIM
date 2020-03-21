import pandas as pd
import pymysql
from sqlalchemy import create_engine
import os
from datetime import datetime

import backend.Constant

# import database connection
from backend.modules.DatabaseConnection import DatabaseConnection


class DataManage:
    __constant = backend.Constant
    __host = __constant.DATABASE_HOST
    __db = __constant.DATABASE_NAME
    __user = __constant.DATABASE_USER
    __password = __constant.DATABASE_PASSWORD
    __engine = None
    __instance = None

    @staticmethod
    def getInstance():
        if DataManage.__instance is None:
            DataManage()
        return DataManage.__instance

    def __init__(self):
        if DataManage.__instance is not None:
            raise Exception("This class is a singleton!")
        else:
            if self.__engine is None:
                self.__engine = create_engine("mysql+pymysql://{user}:{pw}@{host}/{db}"
                                              .format(user=self.__user,
                                                    pw=self.__password,
                                                    db=self.__db,
                                                    host=self.__host))
            DataManage.__instance = self

    def readExcel(self, url):
        df = pd.read_excel(url, sheet_name='Sheet1')
        # column name in xlsx file must equal an attribute name in database
        # df.to_sql('Book2', con=self.engine, if_exists='append', chunksize=1000, index=False)
        print(df)

    def insert_admission(self, channel, year, url):
        df = pd.read_excel(url, sheet_name='Sheet1')

        out_response = {}

        try:
            df = df.loc[1:, ['เลขที่ใบสมัคร', 'คำนำหน้านาม(ไทย)', 'ชื่อ(ไทย)', 'นามสกุล(ไทย)', 'GPAX', 'รหัสสถานศึกษา', 'สาขาวิชาที่สมัคร', 'ได้เข้าศึกษา']]
            df.rename(columns={'เลขที่ใบสมัคร': 'application_no', 'คำนำหน้านาม(ไทย)': 'gender', 'ชื่อ(ไทย)': 'firstname',
                               'นามสกุล(ไทย)': 'lastname', 'รหัสสถานศึกษา': 'school_id', 'สาขาวิชาที่สมัคร': 'branch',
                               'ได้เข้าศึกษา': 'decision'}, inplace=True)
        except Exception as e:
            print(e)
            out_response['response'] = False
            out_response['message'] = "Please check your file or table head " + str(e.args[0])
            return out_response

        # admission table
        admission_table = df.loc[:, ['application_no', 'firstname', 'lastname', 'gender', 'decision']]
        admission_table['admission_year'] = year
        admission_table['upload_date'] = datetime.now().date()
        admission_table.loc[admission_table['gender'] == 'นาย', ['gender']] = 'male'
        admission_table.loc[admission_table['gender'].str.contains('นาง'), ['gender']] = 'female'
        admission_table.loc[admission_table['decision'] == 'ไม่', ['decision']] = -1
        admission_table.loc[admission_table['decision'] == 'ใช่', ['decision']] = 1
        admission_table['decision'].fillna(-1, inplace=True)

        # admission in branch table
        admission_branch = df.loc[:, ['application_no', 'branch']]

        # print(admission_branch.loc[:, ['branch']])

        # get branch data from database
        db = DatabaseConnection.getInstance()
        branch = db.get_branch()
        branch = branch['data']

        for i in branch:
            branch_name = i['branch_name']
            if admission_branch.loc[admission_branch['branch'].str.contains(branch_name.split()[0]), ['branch']].shape[0] > 0:
                admission_branch.loc[admission_branch['branch'].str.contains(branch_name.split()[0]), ['branch']] = str(i['has_branch_id'])

        admission_branch.rename(columns={'branch': 'has_branch_id'}, inplace=True)

        # admission from table
        admission_from = df.loc[:, ['application_no']]
        admission_from['channel_id'] = channel

        # admission studied
        admission_studied = df.loc[:, ['application_no', 'GPAX']]
        admission_studied['school_id'] = '1170100028'

        try:
            admission_table.to_sql('admission', con=self.__engine, if_exists='append', chunksize=1000, index=False)
            admission_branch.to_sql('admission_in_branch', con=self.__engine, if_exists='append', chunksize=1000, index=False)
            admission_from.to_sql('admission_from', con=self.__engine, if_exists='append', chunksize=1000, index=False)
            admission_studied.to_sql('admission_studied', con=self.__engine, if_exists='append', chunksize=1000, index=False)
            out_response['response'] = True
            out_response['message'] = "Insert data to database successful"
            return out_response
        except Exception as e:
            print(e.args[0])
            out_response['response'] = False
            out_response['message'] = str(e.args[0])
            return out_response
