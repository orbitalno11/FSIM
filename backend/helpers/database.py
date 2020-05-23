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

    # 1. get all publicize activity (not ActivityActiveRecruitment activity)
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

    # 2. get all active recruitment activity
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

    # 3. get project list
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

    # 4. get activity list
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

    # 5. get project type
    def get_project_type(self):
        sql_command = "SELECT project_type, type_name FROM activity_type"

        execute = self.__execute_query(sql_command)
        if not execute['response']:
            return execute

        out_data = self.__create_out_function_data(execute['value'],
                                                   ['project_type', 'type_name'],
                                                   [0, 1])

        return inner_res_helper.make_inner_response(True, "Query success", out_data)

    # 6. create project
    def create_project(self, data):
        insert = self.__insert_into(table="activity_project",
                                    attribute=['project_id', 'project_type', 'project_name'],
                                    value=data)
        return insert

    # 7. create activity
    def create_activity(self, data):
        insert = self.__insert_into(table="activity",
                                    attribute=['activity_id', 'project_id', 'activity_name', 'activity_budget', 'year'],
                                    value=data)
        return insert

    # 8. insert activity participant data
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

    # 9. delete activity by activity id
    def delete_activity(self, act_id: str = None):
        result = self.__execute_delete_data(table='activity_no_ar', attribute='activity_id', value=act_id)
        if result['response']:
            result = self.__execute_delete_data(table="activity_ar", attribute="activity_id", value=act_id)
            if result['response']:
                result = self.__execute_delete_data(table="activity", attribute="activity_id", value=act_id)

        return result

    # 10. get year list of activity
    def get_year_list_of_activity(self):
        sql_command = "SELECT year FROM activity GROUP BY year"

        execute = self.__execute_query(sql_command)
        out_data = list()
        for year in execute['value']:
            out_data.append(year[0])

        return inner_res_helper.make_inner_response(response=True, message="Success", value=out_data)

    # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
    # # # # # # # # # # # # # # # # # # # # # # # ADMISSION # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #

    
