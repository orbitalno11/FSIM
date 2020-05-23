import pymysql
import json
from datetime import datetime

# import constant
import backend.Constant

# import helper
import backend.helpers.inner_response_helper as inner_res_helper


class Database:
    # class attribute
    __constant = backend.Constant
    __host = __constant.DATABASE_HOST
    __db = __constant.DATABASE_NAME
    __user = __constant.DATABASE_USER
    __password = __constant.DATABASE_PASSWORD
    __db_connection = None
    __instance = None
    __cursor = None

    def __init__(self):
        self.__db_connection = pymysql.connect(self.__host, self.__user, self.__password, self.__db)
        self.__cursor = self.__db_connection.cursor()

    # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
    # # # # # # # # # # # # # # # # # # # # # class helping tool function # # # # # # # # # # # # # # # # # # # # # # #
    # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #

    # 1. change epoch time to string format 2020-01-01
    def __change_epoch_to_string(self, time):
        convert = datetime.fromtimestamp(int(time)).strftime("%Y-%m-%d")
        return str(convert)

    # 2. change list to insert format (no date column)
    def __change_to_list_no_time(self, load):
        output_list = []
        for data in load:
            temp = list(data.values())
            # TODO() if some insert error please determine the line under this comment
            # temp = list(map(str, temp))
            output_list.append(tuple(temp))
        return output_list

    # 3. change list to insert format (with date column)
    def __change_to_list_with_time_columns(self, load, time_cols_index):
        output_list = []
        for data in load:
            temp = list(data.values())
            # convert epoch time to string
            if isinstance(time_cols_index, list):
                for i in time_cols_index:
                    temp[i] = self.__change_time_epoch_to_string(temp[i])
            else:
                temp[time_cols_index] = self.__change_time_epoch_to_string(temp[time_cols_index])
            temp = list(map(str, temp))
            output_list.append(tuple(temp))
        return output_list

    # 4. query data from database
    def __execute_query(self, sql_command):
        try:
            self.__cursor.execute(sql_command)
            result = self.__cursor.fetchall()
        except pymysql.Error as e:
            print("Error %d: %s" % (e.args[0], e.args[1]))
            return inner_res_helper.make_inner_response(False, str(e.args[0]), str(e.args[1]))
        return inner_res_helper.make_inner_response(True, "Success", result)

    # 5. insert data into database (one value)
    def __insert_into(self, table, attribute, value):
        sql_command = "INSERT INTO {} ({}) VALUES ({})".format(table,
                                                               ','.join(attribute),
                                                               ','.join('%s' for _ in attribute))
        try:
            self.__cursor.execute(sql_command, value)
            self.__db_connection.commit()
        except pymysql.Error as e:
            print("Error %d: %s" % (e.args[0], e.args[1]))
            return inner_res_helper.make_inner_response(False, str(e.args[0]), str(e.args[1]))
        return inner_res_helper.make_inner_response(True, "Success", "Insert data success.")

    # 6. insert data into database (multiple value) from dataframe convert to json by index
    def __insert_multiple_from_dataframe_into(self, table, attribute, value, has_time=False, time_attr_indicator=None):
        sql_command = "INSERT INTO {} ({}) VALUES ({})".format(table,
                                                               ','.join(attribute),
                                                               ','.join('%s' for _ in attribute))
        try:
            if has_time:
                insert_data = self.__change_to_list_with_time_columns(value, time_attr_indicator)
            else:
                insert_data = self.__change_to_list_no_time(value)

            self.__cursor.executemany(sql_command, insert_data)
            self.__db_connection.commit()
        except Exception as e:
            print(e)
            return inner_res_helper.make_inner_response(False, "Insert data failed.", str(e))
        return inner_res_helper.make_inner_response(True, "Success", "Insert data success.")

    # 7. insert data into database (multiple value)
    def __insert_multiple_into(self, table, attribute, value):
        sql_command = "INSERT INTO {} ({}) VALUES {}".format(table,
                                                             ','.join(attribute),
                                                             ','.join('%s' for _ in attribute))
        try:
            self.__cursor.executemany(sql_command, value)
            self.__db_connection.commit()
        except pymysql.Error as e:
            print("Error %d: %s" % (e.args[0], e.args[1]))
            return inner_res_helper.make_inner_response(False, str(e.args[0]), str(e.args[1]))
        return inner_res_helper.make_inner_response(True, "Success", "Insert data success.")

    # 8. delete data from database (one value)
    def __execute_delete_data(self, table, attribute, value):
        sql_command = "DELETE FROM {} WHERE {} LIKE '{}'".format(table, attribute, value)
        try:
            self.__cursor.execute(sql_command)
            self.__db_connection.commit()
        except pymysql.Error as e:
            print("Error %d: %s" % (e.args[0], e.args[1]))
            return inner_res_helper.make_inner_response(False, str(e.args[0]), str(e.args[1]))
        return inner_res_helper.make_inner_response(True, "Success", "Delete data success.")

    # 9. delete data from database (multiple data)
    def __execute_delete_multiple_data(self, table, attribute, value):
        sql_command = "DELETE FROM {} WHERE {} LIKE {}".format(table, attribute, '%s')
        try:
            self.__cursor.executemany(sql_command, value)
            self.__db_connection.commit()
        except pymysql.Error as e:
            print("Error %d: %s" % (e.args[0], e.args[1]))
            return inner_res_helper.make_inner_response(False, str(e.args[0]), str(e.args[1]))
        return inner_res_helper.make_inner_response(True, "Success", "Delete data success.")

    # 10. custom sql command with database connection commit (one execute)
    def __execute_custom_command(self, sql_command):
        try:
            self.__cursor.execute(sql_command)
            self.__db_connection.commit()
        except pymysql.Error as e:
            print("Error %d: %s" % (e.args[0], e.args[1]))
            return inner_res_helper.make_inner_response(False, str(e.args[0]), str(e.args[1]))
        return inner_res_helper.make_inner_response(True, "Success", "Execute success.")

    # 11. custom sql command with database connection commit (many execute)
    def __execute_many_custom_command(self, sql_command):
        try:
            self.__cursor.executemany(sql_command)
            self.__db_connection.commit()
        except pymysql.Error as e:
            print("Error %d: %s" % (e.args[0], e.args[1]))
            return inner_res_helper.make_inner_response(False, str(e.args[0]), str(e.args[1]))
        return inner_res_helper.make_inner_response(True, "Success", "Execute success.")

    # 12. create out function data (list type)
    def __create_out_function_data(self, data, object_indicator_list, data_indicator_list):
        out_data = []
        for item in data:
            obj = dict(zip(object_indicator_list, list(item[x] for x in data_indicator_list)))
            out_data.append(obj)
        return out_data

    # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
    # # # # # # # # # # # # # # # # # # # # # # # # # CLASS METHOD  # # # # # # # # # # # # # # # # # # # # # # # # # #
    # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #

    # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
    # # # # # # # # # # # # # # # # # # # # # # # # # ACTIVITY # # # # # # # # # # # # # # # # # # # # # # # # # # # # #

    # 1AC. get all publicize activity (not ActivityActiveRecruitment activity)
    def get_activity_publicize(self, year=None):
        if year is not None and year != "null":
            current = int(year)
            previous = current - 1
            sql_command = "SELECT activity_id, year, activity_budget from activity NATURAL JOIN activity_project NATURAL JOIN activity_no_ar " \
                          "WHERE project_type = 0 AND year BETWEEN %d AND %d" % (int(previous), int(year))
        else:
            sql_command = "SELECT activity_id, year, activity_budget from activity NATURAL JOIN activity_project NATURAL JOIN activity_no_ar " \
                          "WHERE project_type = 0"

        execute = self.__execute_query(sql_command)
        if not execute['response']:
            return execute

        out_function_data = self.__create_out_function_data(execute['value'],
                                                            ['activity_id', 'activity_year',
                                                             'activity_budget'],
                                                            [0, 1, 2])

        return inner_res_helper.make_inner_response(response=True, message="Success", value=out_function_data)

    # 2AC. get all active recruitment activity
    def get_activity_ar(self, year: int = None):
        if year is not None and year != "null":
            sql_command = "SELECT activity_id, school_name, branch_name, gpax, year, project_id " \
                          "FROM activity_ar NATURAL JOIN activity NATURAL JOIN activity_project " \
                          "WHERE year = {}".format(int(year))
        else:
            sql_command = "SELECT activity_id, school_name, branch_name, gpax, year, project_id " \
                          "FROM activity_ar NATURAL JOIN activity NATURAL JOIN activity_project"

        execute = self.__execute_query(sql_command)
        if not execute['response']:
            return execute

        out_function_data = self.__create_out_function_data(execute['value'],
                                                            ['activity_id', 'school_name', 'branch_name', 'gpax',
                                                             'activity_year', 'project_id'],
                                                            [0, 1, 2, 3, 4, 5])

        return inner_res_helper.make_inner_response(response=True, message="Success", value=out_function_data)

    # 3AC. get project list
    def get_project_list(self, project_type: int = None):
        if project_type is None or project_type == 'null':
            sql_command = "SELECT project_id, project_name,project_type FROM activity_project"
        else:
            sql_command = "SELECT project_id, project_name,project_type FROM activity_project " \
                          "WHERE project_type = {}".format(int(project_type))

        execute = self.__execute_query(sql_command)
        if not execute['response']:
            return execute

        out_data = self.__create_out_function_data(execute['value'],
                                                   ['project_id', 'project_id', 'project_type'],
                                                   [0, 1, 2])

        return inner_res_helper.make_inner_response(True, "Success", out_data)

    # 4AC. get activity list
    def get_activity_list(self, education_year: int = None):
        if education_year is None or education_year == 'null':
            sql_command = "SELECT activity_id, activity_name, type_name, year, activity_budget, project_type " \
                          "FROM activity NATURAL JOIN activity_project NATURAL JOIN activity_type"
        else:
            sql_command = "SELECT activity_id, activity_name, type_name, year, activity_budget, project_type " \
                          "FROM activity NATURAL JOIN activity_project NATURAL JOIN activity_type " \
                          "WHERE year = {}".format(int(education_year))

        execute = self.__execute_query(sql_command)
        if not execute['response']:
            return execute

        out_data = self.__create_out_function_data(execute['value'],
                                                   ['activity_id', 'activity_name', 'project_type_name',
                                                    'education_year', 'activity_budget', 'project_type'],
                                                   [0, 1, 2, 3, 4, 5])

        return inner_res_helper.make_inner_response(True, "Query success.", out_data)

    # 5AC. get project type
    def get_project_type(self):
        sql_command = "SELECT project_type, type_name FROM activity_type"

        execute = self.__execute_query(sql_command)
        if not execute['response']:
            return execute

        out_data = self.__create_out_function_data(execute['value'],
                                                   ['project_type', 'type_name'],
                                                   [0, 1])

        return inner_res_helper.make_inner_response(True, "Query success", out_data)

    # 6AC. create project
    def create_project(self, data):
        insert = self.__insert_into(table="activity_project",
                                    attribute=['project_id', 'project_type', 'project_name'],
                                    value=data)
        return insert

    # 7AC. create activity
    def create_activity(self, data):
        insert = self.__insert_into(table="activity",
                                    attribute=['activity_id', 'project_id', 'activity_name', 'activity_budget', 'year'],
                                    value=data)
        return insert

    # 8AC. insert activity participant data
    def insert_activity_participant(self, participant_data, project_id):
        participant_table = participant_data['participant_data']
        participant_table = json.loads(participant_table)
        participant_table = list(participant_table.values())

        project_list = self.get_project_list()
        project_list = project_list['value']

        project_type = None
        for project in project_list:
            if project['project_id'] == project_id:
                project_type = project['project_type']
                break

        if project_type == 0:
            result = self.__insert_multiple_from_dataframe_into(table='activity_no_ar',
                                                                attribute=['activity_id', 'firstname', 'lastname',
                                                                           'school_name'],
                                                                value=participant_table)
        elif project_type == 1:
            result = self.__insert_multiple_from_dataframe_into(table='activity_ar',
                                                                attribute=['activity_id', 'firstname', 'lastname',
                                                                           'school_name', 'branch_name', 'gpax'],
                                                                value=participant_table)
        else:
            result = inner_res_helper.make_inner_response(False, "Error",
                                                          "Can not insert data for this project type.")

        return result

    # 9AC. delete activity by activity id
    def delete_activity(self, act_id: str = None):
        result = self.__execute_delete_data(table='activity_no_ar', attribute='activity_id', value=act_id)
        if result['response']:
            result = self.__execute_delete_data(table="activity_ar", attribute="activity_id", value=act_id)
            if result['response']:
                result = self.__execute_delete_data(table="activity", attribute="activity_id", value=act_id)

        return result

    # 10AC. get year list of activity
    def get_year_list_of_activity(self):
        sql_command = "SELECT year FROM activity GROUP BY year"

        execute = self.__execute_query(sql_command)
        out_data = list()
        for year in execute['value']:
            out_data.append(year[0])

        return inner_res_helper.make_inner_response(response=True, message="Success", value=out_data)

    # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
    # # # # # # # # # # # # # # # # # # # # # # # ADMISSION # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #

    # 1AD. insert admission data
    def insert_admission(self, data):
        # prepare receive data
        admission_table = data['admission_table']
        admission_table = json.loads(admission_table)
        admission_table = list(admission_table.values())
        admission_branch = data['admission_branch']
        admission_branch = json.loads(admission_branch)
        admission_branch = list(admission_branch.values())
        admission_from = data['admission_from']
        admission_from = json.loads(admission_from)
        admission_from = list(admission_from.values())
        admission_studied = data['admission_studied']
        admission_studied = json.loads(admission_studied)
        admission_studied = list(admission_studied.values())

        result = self.__insert_multiple_from_dataframe_into(table="admission",
                                                            attribute=['application_no', 'firstname', 'lastname',
                                                                       'gender', 'decision', 'admission_year',
                                                                       'upload_date'],
                                                            value=admission_table, has_time=True,
                                                            time_attr_indicator=6)
        if result['response']:
            result = self.__insert_multiple_from_dataframe_into(table="admission_in_branch",
                                                                attribute=['application_no', 'branch_id'],
                                                                value=admission_branch)
            if result['response']:
                result = self.__insert_multiple_from_dataframe_into(table="admission_from",
                                                                    attribute=['application_no', 'channel_id'],
                                                                    value=admission_from)
                if result['response']:
                    result = self.__insert_multiple_from_dataframe_into(table="admission_studied",
                                                                        attribute=['application_no', 'gpax',
                                                                                   'school_id'],
                                                                        value=admission_studied)
        return result

    # 2AD. get all admission data
    def get_all_admission(self, year: int = None):
        if year is None or year == 'null':
            sql_command = "SELECT channel_id, channel_name, admission_year, branch_id, school_id, status_id, student.current_gpax " \
                          "FROM (admission NATURAL JOIN admission_from NATURAL JOIN admission_in_branch NATURAL JOIN " \
                          "admission_channel NATURAL JOIN admission_studied NATURAL JOIN entrance) " \
                          "LEFT JOIN (student NATURAL JOIN has_status) ON student.student_id LIKE entrance.student_id"
        else:
            sql_command = "SELECT channel_id, channel_name, admission_year, branch_id, school_id, status_id, student.current_gpax " \
                          "FROM (admission NATURAL JOIN admission_from NATURAL JOIN admission_in_branch NATURAL JOIN " \
                          "admission_channel NATURAL JOIN admission_studied NATURAL JOIN entrance) " \
                          "LEFT JOIN (student NATURAL JOIN has_status) ON student.student_id LIKE entrance.student_id " \
                          "WHERE admission_year BETWEEN {} and {}".format(int(year) - 1, int(year))

        execute = self.__execute_query(sql_command)
        if not execute['response']:
            return execute

        out_data = self.__create_out_function_data(execute['value'],
                                                   ['channel_id', 'admission_year', 'branch_id', 'school_id',
                                                    'status_id', 'current_gpax', 'channel_name'],
                                                   [0, 2, 3, 4, 5, 6, 1])

        return inner_res_helper.make_inner_response(response=True, message="Success", value=out_data)

    # 3AD. get all admission channel
    def get_admission_channel(self):
        sql_command = "SELECT channel_id, channel_name, round_id, round_name FROM admission_channel NATURAL JOIN has_round NATURAL JOIN admission_round"
        execute = self.__execute_query(sql_command)

        if not execute['response']:
            return execute

        out_data = self.__create_out_function_data(execute['value'],
                                                   ['channel_id', 'channel_name', 'round_id', 'round_name'],
                                                   [0, 1, 2, 3])

        return inner_res_helper.make_inner_response(True, "Query Successful", out_data)

    # 4AD. get year list of admission
    def get_year_list_of_admission(self):
        sql_command = "SELECT admission_year FROM admission GROUP BY admission_year"

        execute = self.__execute_query(sql_command)
        out_data = list()
        for year in execute['value']:
            out_data.append(year[0])

        return inner_res_helper.make_inner_response(response=True, message="Success", value=out_data)

    # 5AD. get admission list
    def get_admission_list(self):
        sql_command = "SELECT admission_year, round_name, channel_name, round_id, channel_id " \
                      "FROM admission NATURAL JOIN admission_from NATURAL JOIN admission_channel " \
                      "NATURAL JOIN has_round NATURAL JOIN admission_round " \
                      "GROUP BY channel_id, admission_year ORDER BY admission_year DESC"

        execute = self.__execute_query(sql_command)
        if not execute['response']:
            return execute

        out_data = self.__create_out_function_data(execute['value'],
                                                   ['admission_year', 'round_name', 'channel_name', 'round_id',
                                                    'channel_id'],
                                                   [0, 1, 2, 3, 4])

        return inner_res_helper.make_inner_response(True, "Query success.", out_data)

    # 6AD. delete admission data
    def delete_admission_data(self, data=None):
        get_application_no_command = "SELECT application_no FROM admission NATURAL JOIN admission_from " \
                                     "NATURAL JOIN admission_channel NATURAL JOIN has_round " \
                                     "NATURAL JOIN admission_round WHERE admission_year = {} " \
                                     "AND round_id = {} AND channel_id = {}" \
            .format(data['year'], data['round_id'], data['channel_id'])
        execute = self.__execute_query(get_application_no_command)

        if not execute['response']:
            return execute

        data = execute['value']
        data = list(data)

        student_id_list = []
        for student_id in data:
            student_id_list.append(student_id[0])

        result = self.__execute_delete_multiple_data(table="admission_studied", attribute="application_no",
                                                     value=student_id_list)
        if result['response']:
            result = self.__execute_delete_multiple_data(table="admission_in_branch", attribute="application_no",
                                                         value=student_id_list)
            if result['response']:
                result = self.__execute_delete_multiple_data(table="admission_from", attribute="application_no",
                                                             value=student_id_list)
                if result['response']:
                    result = self.__execute_delete_multiple_data(table="admission", attribute="application_no",
                                                                 value=student_id_list)
        return result

    # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
    # # # # # # # # # # # # # # # # # # # # # # # ALUMNI # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #

    # 1AL. get all alumni data
    def get_all_alumni(self, graduated_year: int = None):
        if graduated_year is None or graduated_year == 'null':
            sql_command = "SELECT alumni_id as student_id, branch_id, branch_name, gpax, graduated_year, status_id, " \
                          "status_title, salary, apprentice_id, apprentice_title, dept_id, dept_name FROM alumni " \
                          "NATURAL JOIN alumni_graduated NATURAL JOIN has_branch NATURAL JOIN branch " \
                          "NATURAL JOIN working NATURAL JOIN work_status NATURAL JOIN apprentice " \
                          "NATURAL JOIN apprentice_status NATURAL JOIN department"
        else:
            sql_command = "SELECT alumni_id as student_id, branch_id, branch_name, gpax, graduated_year, status_id, " \
                          "status_title, salary, apprentice_id, apprentice_title, dept_id, dept_name " \
                          "FROM alumni NATURAL JOIN alumni_graduated NATURAL JOIN has_branch NATURAL JOIN branch " \
                          "NATURAL JOIN working NATURAL JOIN work_status NATURAL JOIN apprentice " \
                          "NATURAL JOIN apprentice_status NATURAL JOIN department " \
                          "WHERE graduated_year = {}".format(int(graduated_year))

        execute = self.__execute_query(sql_command)
        if not execute['response']:
            return execute

        out_data = self.__create_out_function_data(execute['value'],
                                                   ['student_id', 'branch_id', 'branch_name', 'dept_id', 'dept_name',
                                                    'graduated_gpax', 'congrat_year', 'work_id', 'work_status',
                                                    'salary', 'apprentice_id', 'apprentice_title'],
                                                   [0, 1, 2, 10, 11, 3, 4, 5, 6, 7, 8, 9])

        return inner_res_helper.make_inner_response(response=True, message="Success", value=out_data)

    # 2AL. delete alumni by year
    def delete_alumni_by_year(self, year: int):
        year = int(year)
        sql_command = "select alumni_id from alumni where graduated_year = %d" % year
        execute = self.__execute_query(sql_command)

        if not execute['response']:
            return execute

        data = execute['value']
        data = list(data)

        student_id_list = []
        for student_id in data:
            student_id_list.append(student_id[0])

        result = self.__execute_delete_multiple_data(table="alumni_graduated", attribute="alumni_id",
                                                     value=student_id_list)
        if result['response']:
            result = self.__execute_delete_multiple_data(table="working", attribute="alumni_id",
                                                         value=student_id_list)
            if result['response']:
                result = self.__execute_delete_multiple_data(table="apprentice", attribute="alumni_id",
                                                             value=student_id_list)
                if result['response']:
                    result = self.__execute_delete_multiple_data(table="alumni", attribute="alumni_id",
                                                                 value=student_id_list)
        return result

    # 3AL. get working status list
    def get_working_status_list(self):
        sql_command = "SELECT * FROM work_status"
        execute = self.__execute_query(sql_command)
        if not execute['response']:
            return execute

        out_data = self.__create_out_function_data(execute['value'],
                                                   ['status_id', 'status_title'],
                                                   [0, 1])

        return inner_res_helper.make_inner_response(response=True, message="Success", value=out_data)

    # 4AL. get apperentice status list
    def get_apprentice_status_list(self):
        sql_command = "SELECT * FROM apprentice_status"
        execute = self.__execute_query(sql_command)

        if not execute['response']:
            return execute

        out_function_data = self.__create_out_function_data(execute['value'],
                                                            ['status_id', 'status_title'],
                                                            [0, 1])

        return inner_res_helper.make_inner_response(response=True, message="Success", value=out_function_data)

    # 5AL. insert alumni data to database
    def insert_alumni_data(self, data):
        # prepare receive data
        alumni_table = data['alumni']
        alumni_table = json.loads(alumni_table)
        alumni_table = list(alumni_table.values())
        alumni_graduated = data['alumni_graduated']
        alumni_graduated = json.loads(alumni_graduated)
        alumni_graduated = list(alumni_graduated.values())
        alumni_working = data['working_table']
        alumni_working = json.loads(alumni_working)
        alumni_working = list(alumni_working.values())
        alumni_apprentice = data['apprentice_table']
        alumni_apprentice = json.loads(alumni_apprentice)
        alumni_apprentice = list(alumni_apprentice.values())

        result = self.__insert_multiple_from_dataframe_into(table="alumni",
                                                            attribute=['alumni_id', 'gpax', 'graduated_year'],
                                                            value=alumni_table)
        if result['response']:
            result = self.__insert_multiple_from_dataframe_into(table="alumni_graduated",
                                                                attribute=['alumni_id', 'branch_id'],
                                                                value=alumni_graduated)
            if result['response']:
                result = self.__insert_multiple_from_dataframe_into(table="working",
                                                                    attribute=['alumni_id', 'status_id', 'company',
                                                                               'institution', 'job_description',
                                                                               'faculty', 'branch', 'salary'],
                                                                    value=alumni_working)
                if result['response']:
                    result = self.__insert_multiple_from_dataframe_into(table="apprentice",
                                                                        attribute=['alumni_id', 'apprentice_id'],
                                                                        value=alumni_apprentice)

        return result


    
