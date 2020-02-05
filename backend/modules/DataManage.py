import pandas as pd
import pymysql
from sqlalchemy import create_engine

# import our module
from backend.modules.FSIMConstant import FSIMConstant


class DataManage:

    def __init__(self):
        self.constant = FSIMConstant()
        self.host = self.constant.get_host()
        self.db = self.constant.get_db()
        self.user = self.constant.get_user_db()
        self.password = self.constant.get_password_db()
        self.engine = create_engine("mysql+pymysql://{user}:{pw}@{host}/{db}"
                                    .format(user=self.user,
                                            pw=self.password,
                                            db=self.db,
                                            host=self.host))

    def readExcel(self, url):
        df = pd.read_excel(url, sheet_name='Sheet1')
        # column name in xlsx file must equal an attribute name in database
        # df.to_sql('Book2', con=self.engine, if_exists='append', chunksize=1000, index=False)
        print(df)

    def pre_read(self):
        df = pd.read_excel('uploads/2B.xlsx', sheet_name='Sheet1')
        df = df.loc[1:, ['เลขที่ใบสมัคร', 'หมายเลขบัตรประชาชน', 'คำนำหน้านาม(ไทย)', 'ชื่อ(ไทย)', 'นามสกุล(ไทย)', 'GPAX',
                         'รหัสสถานศึกษา', 'สาขาวิชาที่สมัคร', 'เหตุผลในการสละสิทธิ์']]
        df.rename(columns={'เลขที่ใบสมัคร': 'application_no', 'หมายเลขบัตรประชาชน': 'national_id',
                           'คำนำหน้านาม(ไทย)': 'gender', 'ชื่อ(ไทย)': 'firstname', 'นามสกุล(ไทย)': 'lastname',
                           'รหัสสถานศึกษา': 'school_id', 'สาขาวิชาที่สมัคร': 'branch',
                           'เหตุผลในการสละสิทธิ์': 'decision'}, inplace=True)

        df.loc[df['gender'] == 'นาย', ['gender']] = 'male'
        df.loc[df['gender'].str.contains('นาง'), ['gender']] = 'female'
        df['admission_type'] = 1
        df['admission_channel'] = 1

        branch = {
            1: "คณิตศาสตร์",
            2: "วิทยาการคอมพิวเตอร์ประยุกต์",
            3: "สถิติ",
            4: "เคมี",
            5: "จุลชีววิทยา",
            6: "วิทยาศาสตร์และเทคโนโลยีการอาหาร",
            7: "ฟิสิกส์ประยุกต์(หลักสูตรสองภาษา)"
        }

        for i=0 len(branch):
            print(i)
            # df.loc[df['branch'].str.contains(y), ['branch']] = x
        # df.loc[df['branch'].str.contains(branch[i]), ['branch']] = i

        # df.rename(columns={'prefix': 'gender'}, inplace=True)
        # column = ['application_no', 'national_id', 'firstname', 'lastname', 'gender', 'gpax', 'school_id', 'admission_type', 'admission_channel', 'branch', 'year', 'decision']
        # ndf = pd.DataFrame(columns=column)
        # ndf = pd.concat([ndf, df])
        # ndf.loc[ndf['']]
        print(df.loc[:, ['branch']])
