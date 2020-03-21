import pymysql
import json
from datetime import datetime

# import project constant
import backend.Constant

# import helper
import backend.helpers.inner_response_helper as inner_res_helper


class DatabaseHelper:
    # class attribute
    __constant = backend.Constant
    __host = __constant.DATABASE_HOST
    __db = __constant.DATABASE_NAME
    __user = __constant.DATABASE_USER
    __password = __constant.DATABASE_PASSWORD
    __db_connection = None
    __instance = None

    # singleton check
    @staticmethod
    def get_instance():
        if DatabaseHelper.__instance is None:
            DatabaseHelper()
        return DatabaseHelper.__instance

    def __init__(self):
        if DatabaseHelper.__instance is not None:
            raise Exception("This class is a singleton!")
        else:
            if self.__db_connection is None:
                self.__db_connection = pymysql.connect(self.__host, self.__user, self.__password, self.__db)
                DatabaseHelper.__instance = self

    def change_time_epoch_to_string(self,time):
        convert = datetime.fromtimestamp(int(time)).strftime("%Y-%m-%d")
        return str(convert)
        # # # # # manage data for admin part # # # # #

# admission part
    def insert_admission(self, data):
        # prepare receive data
        admission_table = data['admission_table']
        admission_table = json.loads(admission_table)
        admission_table = list(admission_table.values())
        admission_branch = data['admission_branch']
        admission_branch = json.loads(admission_branch)
        admission_from = data['admission_from']
        admission_from = json.loads(admission_from)
        admission_studied = data['admission_studied']
        admission_studied = json.loads(admission_studied)

        # setup database connection
        cursor = self.__db_connection.cursor()

        # insert in to admission_table
        # change format to insert
        insert_data = []
        for load in admission_table:
            print(load)
            temp = list(load.values())
            temp[6] = self.change_time_epoch_to_string(temp[6])
            temp = list(map(str, temp))
            temp = ",".join(temp)
            temp = "(" + temp + ")"
            insert_data.append(temp)

        # upload_date_list = []
        # for receive_date in admission_table['upload_date']:
        #     convert = datetime.fromtimestamp(int(receive_date)).date()
        #     upload_date_list.append(convert)

        sql_command = "insert into admission (application_no, firstname, lastname, gender, admission_year, decision, upload_date) values (%s, %s, %s, %s, %s, %s, %s)"
        try:
            cursor.executemany(sql_command, insert_data)
            self.__db_connection.commit()
        except pymysql.Error as e:
            print("Error %d: %s" % (e.args[0], e.args[1]))
            return inner_res_helper.make_inner_response(False, str(e.args[0]), str(e.args[1]))

        return inner_res_helper.make_inner_response(True, "Query Successful", "Success")


# # # # # general path # # # # #
    def get_branch(self):
        cursor = self.__db_connection.cursor()
        sql_command = "select branch.branch_id as id, branch.branch_name as name, dept.dept_id, dept.dept_name, has_branch_id from branch natural join has_branch natural join department as dept"

        try:
            cursor.execute(sql_command)
            result = cursor.fetchall()
        except pymysql.Error as e:
            print("Error %d: %s" % (e.args[0], e.args[1]))
            return inner_res_helper.make_inner_response(False, str(e.args[0]), str(e.args[1]))

        out_function_data = []
        for branch in result:
            data = {'branch_id': branch[0], 'branch_name': branch[1], 'dept_id': branch[2], 'dept_name': branch[3],
                    'has_branch_id': branch[4]}
            out_function_data.append(data)

        return inner_res_helper.make_inner_response(True, "Query Successful", out_function_data)
