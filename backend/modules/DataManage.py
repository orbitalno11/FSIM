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
        df['year'] = 2561
        df['school_id'] = '0010039990'

        branch = {
            1: "คณิตศาสตร์",
            2: "วิทยาการคอมพิวเตอร์ประยุกต์",
            3: "สถิติ",
            4: "เคมี",
            5: "จุลชีววิทยา",
            6: "วิทยาศาสตร์และเทคโนโลยีการอาหาร",
            7: "ฟิสิกส์ประยุกต์(หลักสูตรสองภาษา)"
        }

        for i in branch:
            b = branch[i]
            if df.loc[df['branch'].str.contains(b), ['branch']].shape[0] > 0:
                df.loc[df['branch'].str.contains(b), ['branch']] = str(i)

        df.loc[df['decision'].notnull(), ['decision']] = -1
        df['decision'].fillna(1, inplace=True)

        try:
            df.to_sql('admission', con=self.engine, if_exists='append', chunksize=1000, index=False)
            return True
        except Exception as e:
            print(e)
            return False

    def read(self):
        df = pd.read_excel('uploads/2B.xlsx', sheet_name='Sheet1')
        df = df.loc[1:, ['ชื่อ(ไทย)', 'นามสกุล(ไทย)', 'เลขที่ใบสมัคร']]
        out = []
        for i in range(df.shape[0]):
            data = {'ชื่อ': df.loc[i,['ชื่อ(ไทย)']], 'นามสกุล': df.loc[i,['นามสกุล(ไทย)']], 'เลขที่ใบสมัคร': df.loc[i,['เลขที่ใบสมัคร']]}
            out.append(data)
        print(out)
        return out
        
