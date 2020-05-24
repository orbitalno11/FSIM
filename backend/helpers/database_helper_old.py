# import pymysql
# import json
# from datetime import datetime
#
# # import project constant
# import backend.Constant
#
# # import helper
# import backend.helpers.inner_response_helper as inner_res_helper
#
#
# class DatabaseHelper:
#     # class attribute
#     __constant = backend.Constant
#     __host = __constant.DATABASE_HOST
#     __db = __constant.DATABASE_NAME
#     __user = __constant.DATABASE_USER
#     __password = __constant.DATABASE_PASSWORD
#     __db_connection = None
#     __instance = None
#     __cursor = None
#
#     def __init__(self):
#         self.__db_connection = pymysql.connect(self.__host, self.__user, self.__password, self.__db)
#         self.__cursor = self.__db_connection.cursor()
#
#     # change epoch time to string format 2020-01-01//
#     def __change_time_epoch_to_string(self, time):
#         convert = datetime.fromtimestamp(int(time)).strftime("%Y-%m-%d")
#         return str(convert)
#
#     # change list ton insert format//
#     def __change_to_list_no_time(self, load):
#         output_list = []
#         for data in load:
#             temp = list(data.values())
#             # TODO() if some insert error please determine the line under this comment
#             # temp = list(map(str, temp))
#             output_list.append(tuple(temp))
#         return output_list
#
#     def __change_to_list_with_time_columns(self, load, time_cols_index):
#         output_list = []
#         for data in load:
#             temp = list(data.values())
#             # convert epoch time to string
#             if isinstance(time_cols_index, list):
#                 for i in time_cols_index:
#                     temp[i] = self.__change_time_epoch_to_string(temp[i])
#             else:
#                 temp[time_cols_index] = self.__change_time_epoch_to_string(temp[time_cols_index])
#             temp = list(map(str, temp))
#             output_list.append(tuple(temp))
#         return output_list
#
#     # insert data to database function //
#     def __multiple_insert(self, table, column, data, has_time=False, time_cols=None):
#         sql_command = "insert into %s (%s) values (%s)" % (table, ','.join(column), ','.join('%s' for _ in column))
#         if has_time:
#             insert_list = self.__change_to_list_with_time_columns(data, time_cols)
#         else:
#             insert_list = self.__change_to_list_no_time(data)
#
#         self.__cursor.executemany(sql_command, insert_list)
#         self.__db_connection.commit()
#
#     # insert data with correctly form
#     # insert multiple value //
#     def __insert_multiple_into(self, table, column, data):
#         sql_command = "insert into %s (%s) values (%s)" % (table, ','.join(column), ','.join('%s' for _ in column))
#         self.__cursor.executemany(sql_command, data)
#         self.__db_connection.commit()
#
#     # insert single value //
#     def __insert_into(self, table, column, data):
#         sql_command = "insert into %s (%s) values (%s)" % (table, ','.join(column), ','.join('%s' for _ in column))
#         self.__cursor.execute(sql_command, data)
#         self.__db_connection.commit()
#
#     # execute query function //
#     def __execute_query(self, sql_command):
#         try:
#             self.__cursor.execute(sql_command)
#             result = self.__cursor.fetchall()
#             return inner_res_helper.make_inner_response(True, "Success", result)
#         except pymysql.Error as e:
#             print("Error %d: %s" % (e.args[0], e.args[1]))
#             return inner_res_helper.make_inner_response(False, str(e.args[0]), str(e.args[1]))
#
#     # execute delete function
#     def __execute_delete_data(self, table, column, value):
#         sql_command = "DELETE FROM {} WHERE {} LIKE '{}'".format(table, column, value)
#         self.__cursor.execute(sql_command)
#         self.__db_connection.commit()
#
#     # execute delete multiple function
#     def __execute_delete_multiple(self, table, column, data):
#         sql_command = "DELETE FROM {} WHERE {} LIKE {}".format(table, column, '%s')
#         self.__cursor.executemany(sql_command, data)
#         self.__db_connection.commit()
#
#     # execute delete from command
#     def __execute_delete_from_command(self, sql_command):
#         self.__cursor.execute(sql_command)
#         self.__db_connection.commit()
#
#     # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
#     # # # # # # # # # # # # # # # # # # # # # # # ACTIVITY # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
#
#     # get all activity NOT ActivityActiveRecruitment (pueng)
#     def get_activity_publicize(self, year=None):#//
#         # TODO() no activity join table
#         # TODO() SELECT activity_id, year, activity_budget from activity NATURAL JOIN activity_project WHERE project_type = 0
#         if not year is None or year == "null":
#             current = int(year)
#             previous = current - 1
#             sql_command = "SELECT activity_id, year, activity_budget from activity NATURAL JOIN activity_project NATURAL JOIN activity_no_ar " \
#                           "WHERE project_type = 0 AND year BETWEEN %d AND %d" % (int(previous), int(year))
#         else:
#             sql_command = "SELECT activity_id, year, activity_budget from activity NATURAL JOIN activity_project NATURAL JOIN activity_no_ar " \
#                           "WHERE project_type = 0"
#
#         execute = self.__execute_query(sql_command)
#         if not execute['response']:
#             return execute
#
#         out_function_data = []
#         for data in execute['value']:
#             data = {
#                 'activity_id': data[0],
#                 'activity_year': data[1],
#                 'activity_budget': data[2],
#             }
#             out_function_data.append(data)
#
#         return inner_res_helper.make_inner_response(response=True, message="Success", value=out_function_data)
#
#     # get all activity  ActivityActiveRecruitment (pueng)
#     def get_activity_ar(self, year=None):#//
#         if not year is None and year != "null":
#             sql_command = "SELECT activity_id, school_name, branch_name, gpax, year FROM activity_ar " \
#                           "NATURAL JOIN activity WHERE year = {} ".format(int(year))
#         else:
#             sql_command = "SELECT activity_id, school_name, branch_name, gpax, year FROM activity_ar " \
#                           "NATURAL JOIN activity"
#
#         execute = self.__execute_query(sql_command)
#
#         if not execute['response']:
#             return execute
#
#         out_function_data = []
#         for data in execute['value']:
#             data = {
#                 'activity_id': data[0],
#                 'school_name': data[1],
#                 'branch_name': data[2],
#                 'gpax': data[3],
#                 'activity_year': data[4]
#             }
#             out_function_data.append(data)
#
#         return inner_res_helper.make_inner_response(response=True, message="Success", value=out_function_data)
#
#     # get all activity  ActivityActiveRecruitment (pueng)
#     def get_project_ar(self, year=None):#//
#         if not year is None and year != "null":
#             sql_command = "SELECT project_id, gpax ,branch_name FROM activity_ar NATURAL JOIN activity NATURAL " \
#                           "JOIN activity_project where project_type=1 and year = %d " % (int(year))
#         else:
#             sql_command = "SELECT project_id, gpax ,branch_name FROM activity_ar NATURAL JOIN activity NATURAL " \
#                           "JOIN activity_project where project_type=1"
#
#         print(sql_command)
#         execute = self.__execute_query(sql_command)
#
#         if not execute['response']:
#             return execute
#         out_function_data = []
#         for data in execute['value']:
#             data = {
#                 'project_id': data[0],
#                 'grade': data[1],
#                 'branch_name': data[2]
#             }
#             out_function_data.append(data)
#
#         return inner_res_helper.make_inner_response(response=True, message="Success", value=out_function_data)
#
#     # get project list
#     def get_project_list(self, project_type: int = None):
#         try:
#             if project_type is None:
#                 sql_command = "SELECT project_id, project_name,project_type FROM activity_project"
#             else:
#                 sql_command = "SELECT project_id, project_name,project_type FROM activity_project WHERE project_type = %d" % int(
#                     project_type)
#         except Exception as e:
#             print(e)
#             return inner_res_helper.make_inner_response(False, "Error to write sql command", "SQL command error")
#
#         execute = self.__execute_query(sql_command)
#
#         if not execute['response']:
#             return execute
#
#         out_data = []
#
#         for data in execute['value']:
#             project = {
#                 'project_id': data[0],
#                 'project_id': data[1],
#                 'project_type': data[2]
#             }
#             out_data.append(project)
#
#         return inner_res_helper.make_inner_response(True, "Success", out_data)
#
#     # get activity list
#     def get_activity_list(self, education_year: int = None):
#         try:
#             if education_year is None:
#                 sql_command = "SELECT activity_id, activity_name, type_name, year, activity_budget, project_type " \
#                               "FROM activity NATURAL JOIN activity_project NATURAL JOIN activity_type"
#             else:
#                 sql_command = "SELECT activity_id, activity_name, type_name, year, activity_budget, project_type " \
#                               "FROM activity NATURAL JOIN activity_project NATURAL JOIN activity_type " \
#                               "WHERE year = %d" % int(education_year)
#         except Exception as e:
#             print(e)
#             return inner_res_helper.make_inner_response(False, "Error to write sql command", "SQL command error")
#
#         execute = self.__execute_query(sql_command)
#
#         if not execute['response']:
#             return execute
#
#         out_data = []
#
#         for data in execute['value']:
#             activity = {
#                 'activity_id': data[0],
#                 'activity_name': data[1],
#                 'project_type_name': data[2],
#                 'education_year': data[3],
#                 'activity_budget': data[4],
#                 'project_type': data[5]
#             }
#             out_data.append(activity)
#
#         return inner_res_helper.make_inner_response(True, "Query success.", out_data)
#
#     # get project type
#     def get_project_type(self):
#         sql_command = "SELECT project_type, type_name FROM activity_type"
#
#         execute = self.__execute_query(sql_command)
#
#         if not execute['response']:
#             return execute
#
#         out_data = []
#
#         for data in execute['value']:
#             proj_type = {
#                 'project_type': data[0],
#                 'type_name': data[1]
#             }
#             out_data.append(proj_type)
#
#         return inner_res_helper.make_inner_response(True, "Query success", out_data)
#
#     # insert activity project
#     def insert_activity_project(self, data):
#         try:
#             self.__insert_into(table="activity_project",
#                                column=['project_id', 'project_type', 'project_name'],
#                                data=data)
#         except pymysql.Error as e:
#             print("Error %d: %s" % (e.args[0], e.args[1]))
#             return inner_res_helper.make_inner_response(False, str(e.args[0]), str(e.args[1]))
#
#         return inner_res_helper.make_inner_response(True, "Query Successful", "Success")
#
#     # insert activity
#     def insert_activity(self, data, participant_data, project_id):
#         try:
#             participant_table = participant_data['participant_data']
#             participant_table = json.loads(participant_table)
#             participant_table = list(participant_table.values())
#
#             db = DatabaseHelper()
#             project_list = db.get_project_list()
#             project_list = project_list['value']
#
#             project_type = None
#             for project in project_list:
#                 if project['project_id'] == project_id:
#                     project_type = project['project_type']
#                     break
#
#             self.__insert_into(table="activity",
#                                column=['activity_id', 'project_id', 'activity_name', 'activity_budget', 'year'],
#                                data=data)
#
#             if project_type == 0:
#                 self.__multiple_insert(table="activity_no_ar",
#                                        column=['activity_id', 'firstname', 'lastname', 'school_name'],
#                                        data=participant_table)
#             elif project_type == 1:
#                 self.__multiple_insert(table="activity_ar",
#                                        column=['activity_id', 'firstname', 'lastname', 'school_name', 'branch_name',
#                                                'gpax'],
#                                        data=participant_table)
#             else:
#                 return inner_res_helper.make_inner_response(False, "Error",
#                                                             "Can not insert data for this project type.")
#         except Exception as e:
#             print(e)
#             return inner_res_helper.make_inner_response(False, str(e.args[0]), str(e.args[1]))
#
#         return inner_res_helper.make_inner_response(True, "Query Successful", "Success")
#
#     # delete activity
#     def delete_activity(self, act_id: str = None, project_type: int = None):
#         try:
#             self.__execute_delete_data(table="activity_no_ar", column="activity_id", value=act_id)
#             self.__execute_delete_data("activity_ar", "activity_id", act_id)
#             self.__execute_delete_data("activity", "activity_id", act_id)
#         except pymysql.err as e:
#             print("Error %d: %s" % (e.args[0], e.args[1]))
#             return inner_res_helper.make_inner_response(False, str(e.args[0]), str(e.args[1]))
#
#         return inner_res_helper.make_inner_response(True, "Successful", "Successful")
#
#     # get year list of activity
#     def get_year_list_of_activity(self):
#         sql_command = "SELECT year FROM activity GROUP BY year"
#         execute = self.__execute_query(sql_command)
#
#         if not execute['response']:
#             return execute
#
#         out_data = list()
#         for year in execute['value']:
#             out_data.append(year[0])
#
#         return inner_res_helper.make_inner_response(response=True, message="Success", value=out_data)
#
#     # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
#     # # # # # # # # # # # # # # # # # # # # # # # ADMISSION # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
#
#     # add admission data
#     def insert_admission(self, data):
#         # prepare receive data
#         admission_table = data['admission_table']
#         admission_table = json.loads(admission_table)
#         admission_table = list(admission_table.values())
#         admission_branch = data['admission_branch']
#         admission_branch = json.loads(admission_branch)
#         admission_branch = list(admission_branch.values())
#         admission_from = data['admission_from']
#         admission_from = json.loads(admission_from)
#         admission_from = list(admission_from.values())
#         admission_studied = data['admission_studied']
#         admission_studied = json.loads(admission_studied)
#         admission_studied = list(admission_studied.values())
#
#         try:
#             self.__multiple_insert(table="admission",
#                                    column=['application_no', 'firstname', 'lastname', 'gender', 'decision',
#                                            'admission_year', 'upload_date'], data=admission_table, has_time=True,
#                                    time_cols=6)
#             self.__multiple_insert(table="admission_in_branch", column=['application_no', 'branch_id'],
#                                    data=admission_branch)
#             self.__multiple_insert(table="admission_from", column=['application_no', 'channel_id'], data=admission_from)
#             self.__multiple_insert(table="admission_studied", column=['application_no', 'gpax', 'school_id'],
#                                    data=admission_studied)
#         except pymysql.Error as e:
#             print("Error %d: %s" % (e.args[0], e.args[1]))
#             return inner_res_helper.make_inner_response(False, str(e.args[0]), str(e.args[1]))
#
#         return inner_res_helper.make_inner_response(True, "Query Successful", "Success")
#
#     # get all admission data (pueng)
#     def get_all_admission(self, year=None):
#         if year is not None:
#             sql_command = "SELECT channel_id ,channel_name, admission_year ,branch_id,school_id,status_id,student.current_gpax " \
#                           "FROM (admission NATURAL JOIN admission_from NATURAL JOIN admission_in_branch NATURAL JOIN " \
#                           "admission_channel NATURAL JOIN admission_studied NATURAL JOIN entrance) " \
#                           "LEFT JOIN (student NATURAL JOIN has_status) ON student.student_id LIKE entrance.student_id " \
#                           "WHERE admission_year BETWEEN {} and {}".format(int(year) - 1, int(year))
#         else:
#             sql_command = "SELECT channel_id,channel_name , admission_year ,branch_id,school_id,status_id,student.current_gpax " \
#                           "FROM (admission NATURAL JOIN admission_from NATURAL JOIN admission_in_branch NATURAL JOIN " \
#                           "admission_channel NATURAL JOIN admission_studied NATURAL JOIN entrance) " \
#                           "LEFT JOIN (student NATURAL JOIN has_status) ON student.student_id LIKE entrance.student_id"
#
#         execute = self.__execute_query(sql_command)
#         if not execute['response']:
#             return execute
#         out_function_data = []
#         for data in execute['value']:
#             data = {
#                 'channel_id': data[0],
#                 'admission_year': data[2],
#                 'branch_id': data[3],
#                 'school_id': data[4],
#                 'status_id': data[5],
#                 'current_gpax': data[6],
#                 'channel_name':data[1],
#             }
#             out_function_data.append(data)
#
#         return inner_res_helper.make_inner_response(response=True, message="Success", value=out_function_data)
#
#     def get_all_status_admission(self, year=None):
#         if year is not None:
#             sql_command = "SELECT status_id,channel_id,branch_id FROM `admission_in_branch` NATURAL JOIN `admission` NATURAL JOIN admission_channel NATURAL JOIN admission_from NATURAL JOIN entrance NATURAL JOIN has_status where admission_year like '%s' " % (
#                 year)
#         else:
#             sql_command = "SELECT status_id,channel_id,branch_id FROM `admission_in_branch` NATURAL JOIN `admission` NATURAL JOIN admission_channel NATURAL JOIN admission_from NATURAL JOIN entrance NATURAL JOIN has_status "
#
#         execute = self.__execute_query(sql_command)
#
#         if not execute['response']:
#             return execute
#         out_function_data = []
#         for data in execute['value']:
#             data = {
#
#                 'status_id': data[0],
#                 'channel_id': data[1],
#                 'branch_id' : data[2]
#             }
#             out_function_data.append(data)
#
#         return inner_res_helper.make_inner_response(response=True, message="Success", value=out_function_data)
#
#     def get_admission_channel(self):
#         sql_command = "SELECT `channel_id`,`channel_name`,`round_id`,`round_name` FROM `admission_channel` NATURAL JOIN `has_round` NATURAL JOIN `admission_round`"
#         execute = self.__execute_query(sql_command)
#
#         if not execute['response']:
#             return execute
#
#         out_function_data = []
#         for channel in execute['value']:
#             data = {
#                 'channel_id': channel[0],
#                 'channel_name': channel[1],
#                 'round_id': channel[2],
#                 'round_name': channel[3],
#             }
#             out_function_data.append(data)
#
#         return inner_res_helper.make_inner_response(True, "Query Successful", out_function_data)
#
#     # get admission data by department and year TODO() check who use
#     def get_admission_data_by_dept(self, department=None, year=None):
#         if department is None or department == "null":
#             sql_command = "SELECT school_id, school_name, channel_id, channel_name, branch_id, branch_name " \
#                           "from admission_studied NATURAL JOIN admission_from NATURAL JOIN school " \
#                           "NATURAL JOIN admission_channel NATURAL JOIN admission_in_branch NATURAL JOIN branch"
#         elif year is None or year == "null":
#             sql_command = "SELECT school_id, school_name, channel_id, channel_name, branch_id, branch_name  " \
#                           "from admission_studied NATURAL JOIN admission_from NATURAL JOIN school" \
#                           " NATURAL JOIN admission_channel NATURAL JOIN admission_in_branch " \
#                           "NATURAL JOIN admission NATURAL JOIN has_branch NATURAL JOIN department " \
#                           "NATURAL JOIN branch WHERE dept_id like '%s'" % (department)
#         else:
#             sql_command = "SELECT school_id, school_name, channel_id, channel_name, branch_id, branch_name  " \
#                           "from admission_studied NATURAL JOIN admission_from " \
#                           "NATURAL JOIN school NATURAL JOIN admission_channel " \
#                           "NATURAL JOIN admission_in_branch NATURAL JOIN admission " \
#                           "NATURAL JOIN has_branch NATURAL JOIN department " \
#                           "NATURAL JOIN branch WHERE admission_year = %d and dept_id like '%s'" \
#                           % (year, department)
#
#         execute = self.__execute_query(sql_command)
#
#         if not execute['response']:
#             return execute
#
#         out_function_data = []
#         for data in execute['value']:
#             temp = {
#                 'school_id': data[0],
#                 'school_name': data[1],
#                 'channel_id': data[2],
#                 'channel_name': data[3],
#                 'branch_id': data[4],
#                 'branch_name': data[5]
#             }
#             out_function_data.append(temp)
#
#         return inner_res_helper.make_inner_response(response=True, message="Success", value=out_function_data)
#
#     # get admission data list
#     def get_admission_list(self):
#         sql_command = "SELECT admission_year, round_name, channel_name, round_id, channel_id " \
#                       "FROM admission NATURAL JOIN admission_from NATURAL JOIN admission_channel " \
#                       "NATURAL JOIN has_round NATURAL JOIN admission_round " \
#                       "GROUP BY channel_id, admission_year ORDER BY admission_year DESC"
#         execute = self.__execute_query(sql_command)
#
#         if not execute['response']:
#             return execute
#
#         out_data = []
#
#         for data in execute['value']:
#             detail = {
#                 'admission_year': data[0],
#                 'round_name': data[1],
#                 'channel_name': data[2],
#                 'round_id': data[3],
#                 'channel_id': data[4]
#             }
#             out_data.append(detail)
#
#         return inner_res_helper.make_inner_response(True, "Query success.", out_data)
#
#     # delete admission
#     def delete_admission_data(self, data=None):
#         get_application_no_command = "SELECT application_no FROM admission NATURAL JOIN admission_from " \
#                                      "NATURAL JOIN admission_channel NATURAL JOIN has_round " \
#                                      "NATURAL JOIN admission_round WHERE admission_year = {} " \
#                                      "AND round_id = {} AND channel_id = {}" \
#             .format(data['year'], data['round_id'], data['channel_id'])
#         execute = self.__execute_query(get_application_no_command)
#
#         if not execute['response']:
#             return execute
#
#         data = execute['value']
#         data = list(data)
#
#         student_id_list = []
#         for student_id in data:
#             student_id_list.append(student_id[0])
#
#         try:
#             self.__execute_delete_multiple("admission_studied", "application_no", student_id_list)
#             self.__execute_delete_multiple("admission_in_branch", "application_no", student_id_list)
#             self.__execute_delete_multiple("admission_from", "application_no", student_id_list)
#             self.__execute_delete_multiple("admission", "application_no", student_id_list)
#         except pymysql as e:
#             print("Error %d: %s" % (e.args[0], e.args[1]))
#             return inner_res_helper.make_inner_response(False, str(e.args[0]), str(e.args[1]))
#
#         return inner_res_helper.make_inner_response(response=True, message="Delete admission data successful.",
#                                                     value="Delete admission data successful.")
#
#     # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
#     # # # # # # # # # # # # # # # # # # # # # # # ALUMNI # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
#
#     # get alumni data (aom request)
#     def get_all_alumni(self, graduated_year: int = None):
#
#         if graduated_year is None or graduated_year == "null":
#
#             sql_command = "SELECT alumni_id as student_id, branch_id, branch_name, gpax, graduated_year, status_id, " \
#                           "status_title, salary, apprentice_id, apprentice_title, dept_id, dept_name FROM alumni " \
#                           "NATURAL JOIN alumni_graduated NATURAL JOIN has_branch NATURAL JOIN branch " \
#                           "NATURAL JOIN working NATURAL JOIN work_status NATURAL JOIN apprentice " \
#                           "NATURAL JOIN apprentice_status NATURAL JOIN department"
#         else:
#             sql_command = "SELECT alumni_id as student_id, branch_id, branch_name, gpax, graduated_year, status_id, " \
#                           "status_title, salary, apprentice_id, apprentice_title, dept_id, dept_name " \
#                           "FROM alumni NATURAL JOIN alumni_graduated NATURAL JOIN has_branch NATURAL JOIN branch " \
#                           "NATURAL JOIN working NATURAL JOIN work_status NATURAL JOIN apprentice " \
#                           "NATURAL JOIN apprentice_status NATURAL JOIN department " \
#                           "WHERE graduated_year = '%s'" % (graduated_year)
#         execute = self.__execute_query(sql_command)
#
#         if not execute['response']:
#             return execute
#
#         out_function_data = []
#         for data in execute['value']:
#             data = {
#                 'student_id': data[0],
#                 'branch_id': data[1],
#                 'branch_name': data[2],
#                 'dept_id': data[10],
#                 'dept_name': data[11],
#                 'graduated_gpax': data[3],
#                 'congrat_year': data[4],
#                 'work_id': data[5],
#                 'work_status': data[6],
#                 'salary': data[7],
#                 'apprentice_id': data[8],
#                 'apprentice_title': data[9]
#             }
#             out_function_data.append(data)
#
#         return inner_res_helper.make_inner_response(response=True, message="Success", value=out_function_data)
#
#     # delete alumni
#     def delete_alumni_by_year(self, year: int):
#         # search student ID from graduated year
#         year = int(year)
#         sql_command = "select alumni_id from alumni where graduated_year = %d" % year
#         execute = self.__execute_query(sql_command)
#
#         if not execute['response']:
#             return execute
#
#         data = execute['value']
#         data = list(data)
#
#         student_id_list = []
#         for student_id in data:
#             student_id_list.append(student_id[0])
#
#         try:
#             self.__execute_delete_multiple("alumni_graduated", "alumni_id", student_id_list)
#             self.__execute_delete_multiple("working", "alumni_id", student_id_list)
#             self.__execute_delete_multiple("apprentice", "alumni_id", student_id_list)
#             self.__execute_delete_multiple("alumni", "alumni_id", student_id_list)
#         except pymysql.Error as e:
#             print("Error %d: %s" % (e.args[0], e.args[1]))
#             return inner_res_helper.make_inner_response(False, str(e.args[0]), str(e.args[1]))
#
#         return inner_res_helper.make_inner_response(response=True, message="Delete alumni data sucessful.",
#                                                     value="Delete alumni data sucessful.")
#
#     # get working status list data
#     def get_working_status_list(self):
#         sql_command = "SELECT * FROM work_status"
#         execute = self.__execute_query(sql_command)
#
#         if not execute['response']:
#             return execute
#
#         out_function_data = []
#         for data in execute['value']:
#             temp = {
#                 'status_id': data[0],
#                 'status_title': data[1]
#             }
#             out_function_data.append(temp)
#
#         return inner_res_helper.make_inner_response(response=True, message="Success", value=out_function_data)
#
#     # get apprentice status list data
#     def get_apprentice_status_list(self):
#         sql_command = "SELECT * FROM apprentice_status"
#         execute = self.__execute_query(sql_command)
#
#         if not execute['response']:
#             return execute
#
#         out_function_data = []
#         for data in execute['value']:
#             temp = {
#                 'status_id': data[0],
#                 'status_title': data[1]
#             }
#             out_function_data.append(temp)
#
#         return inner_res_helper.make_inner_response(response=True, message="Success", value=out_function_data)
#
#     # add alumni data to database
#     def insert_alumni_data(self, data):
#         # prepare receive data
#         alumni_table = data['alumni']
#         alumni_table = json.loads(alumni_table)
#         alumni_table = list(alumni_table.values())
#         alumni_graduated = data['alumni_graduated']
#         alumni_graduated = json.loads(alumni_graduated)
#         alumni_graduated = list(alumni_graduated.values())
#         alumni_working = data['working_table']
#         alumni_working = json.loads(alumni_working)
#         alumni_working = list(alumni_working.values())
#         alumni_apprentice = data['apprentice_table']
#         alumni_apprentice = json.loads(alumni_apprentice)
#         alumni_apprentice = list(alumni_apprentice.values())
#
#         try:
#             self.__multiple_insert(table="alumni",
#                                    column=['alumni_id', 'gpax', 'graduated_year'],
#                                    data=alumni_table)
#             self.__multiple_insert(table="alumni_graduated",
#                                    column=['alumni_id', 'branch_id'],
#                                    data=alumni_graduated)
#             self.__multiple_insert(table="working",
#                                    column=['alumni_id', 'status_id', 'company', 'institution',
#                                            'job_description', 'faculty', 'branch', 'salary'],
#                                    data=alumni_working)
#             self.__multiple_insert(table="apprentice",
#                                    column=['alumni_id', 'apprentice_id'],
#                                    data=alumni_apprentice)
#         except pymysql.Error as e:
#             print("Error %d: %s" % (e.args[0], e.args[1]))
#             return inner_res_helper.make_inner_response(False, str(e.args[0]), str(e.args[1]))
#
#         return inner_res_helper.make_inner_response(True, "Query Successful", "Success")
#
#     # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
#     # # # # # # # # # # # # # # # # # # # # # # INFORMATION # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
#
#     def get_department(self, name):
#         if name is None or name == "null":
#             sql_command = "SELECT count(branch_id) as student_amount, branch_id, branch_name, dept_id, dept_name " \
#                           "FROM student NATURAL JOIN study_in NATURAL JOIN has_branch NATURAL JOIN department " \
#                           "NATURAL JOIN branch GROUP BY branch_id ORDER BY dept_id ASC"
#         else:
#             sql_command = "SELECT count(branch_id) as student_amount, branch_id, branch_name, dept_id, dept_name " \
#                           "FROM student NATURAL JOIN study_in NATURAL JOIN has_branch NATURAL JOIN department " \
#                           "NATURAL JOIN branch WHERE dept_id like '%s' GROUP BY branch_id " \
#                           "ORDER BY dept_id ASC" % (name)
#
#         execute = self.__execute_query(sql_command)
#
#         if not execute['response']:
#             return execute
#
#         out_function_data = []
#
#         cur_dept = None
#         for dept in execute['value']:
#             if dept[3] != cur_dept:
#                 cur_dept = dept[3]
#                 temp = {
#                     'dept_id': dept[3],
#                     'dept_name': dept[4],
#                     'branch': []
#                 }
#                 out_function_data.append(temp)
#
#         cur_dept = execute['value'][0][3]
#         count = 0
#
#         for branch in execute['value']:
#             dept = branch[3]
#             if dept != cur_dept:
#                 cur_dept = dept
#                 count += 1
#
#             temp = {
#                 'branch_id': branch[1],
#                 'branch_name': branch[2],
#                 'amount_student': branch[0]
#             }
#
#             out_function_data[count]['branch'].append(temp)
#
#         return inner_res_helper.make_inner_response(response=True, message="Success", value=out_function_data)
#
#     # get department detail that include branch and course
#     def get_department_detail(self, dept_id: str = None):
#         if dept_id is None or dept_id == "null":
#             sql_command = "SELECT dept_id, branch_id, course_id, dept_name, branch_name, course_name, course_year " \
#                           "FROM department NATURAL JOIN has_branch NATURAL JOIN branch NATURAL JOIN has_course " \
#                           "NATURAL JOIN course"
#         else:
#             sql_command = "SELECT dept_id, branch_id, course_id, dept_name, branch_name, course_name, course_year " \
#                           "FROM department NATURAL JOIN has_branch NATURAL JOIN branch NATURAL JOIN has_course " \
#                           "NATURAL JOIN course WHERE dept_id like '{}'".format(dept_id)
#
#         execute = self.__execute_query(sql_command)
#
#         data = execute['value']
#         out_data = []
#         cur_dept = None
#         past_dept = []
#         for dept in data:
#             if cur_dept != dept[0] and not dept[0] in past_dept:
#                 cur_dept = dept[0]
#                 detail = {'dept_id': dept[0], 'dept_name': dept[3], 'branch': list(), 'course': list()}
#                 cur_branch = None
#                 for dept2 in data:
#                     if cur_branch != dept2[1] and dept[0] == dept2[0]:
#                         cur_branch = dept2[1]
#                         branch = {
#                             'branch_id': dept2[1],
#                             'branch_name': dept2[4]
#                         }
#                         detail['branch'].append(branch)
#                         # detail['branch'][dept2[1]] = dept2[4]
#                 cur_course = None
#                 for dept3 in data:
#                     if cur_course != dept3[2] and dept[0] == dept3[0]:
#                         cur_course = dept3[2]
#                         course = {
#                             'course_id': dept3[2],
#                             'course_name': dept3[5],
#                             'course_year': dept3[6]
#                         }
#                         detail['course'].append(course)
#                         # detail['course'][dept3[2]] = course
#                 past_dept.append(dept[0])
#                 out_data.append(detail)
#
#         return inner_res_helper.make_inner_response(True, "Query success", out_data)
#
#     def get_branch(self, branch_id=None):
#         if branch_id is None or branch_id == "null":
#             sql_command = "select branch.branch_id as id, branch.branch_name as name, dept.dept_id, dept.dept_name, " \
#                           "has_branch_id from branch natural join has_branch natural join department as dept"
#         else:
#             sql_command = "select branch.branch_id as id, branch.branch_name as name, dept.dept_id, dept.dept_name, " \
#                           "has_branch_id from branch natural join has_branch natural join department as dept " \
#                           "where branch_id like '%s'" % (branch_id)
#
#         execute = self.__execute_query(sql_command)
#
#         if not execute['response']:
#             return execute
#
#         out_function_data = []
#         for branch in execute['value']:
#             data = {
#                 'branch_id': branch[0],
#                 'branch_name': branch[1],
#                 'dept_id': branch[2],
#                 'dept_name': branch[3],
#                 'has_branch_id': branch[4]
#             }
#             out_function_data.append(data)
#
#         return inner_res_helper.make_inner_response(True, "Query Successful", out_function_data)
#
#     # get course and subject in course
#     def get_course(self, course_id: str = None):
#         if course_id is None or course_id == "null":
#             sql_command = "SELECT course_id, course_name, course_year, subject_code, subject_name_th, subject_name_en, " \
#                           "subject_weigth FROM course NATURAL JOIN has_subject NATURAL JOIN subject"
#         else:
#             sql_command = "SELECT course_id, course_name, course_year, subject_code, subject_name_th, subject_name_en, " \
#                           "subject_weigth FROM course NATURAL JOIN has_subject NATURAL JOIN subject" \
#                           " WHERE course_id like {}".format( course_id)
#
#         execute = self.__execute_query(sql_command)
#
#         if not execute['response']:
#             return execute
#
#         data = execute['value']
#         out_data = list()
#         cur_course = None
#
#         for data_row in data:
#             if cur_course != data_row[0]:
#                 cur_course = data_row[0]
#                 detail = {
#                     'course_id': data_row[0], 'course_name': data_row[1], 'course_year': data_row[2], 'subject': list()
#                 }
#                 cur_subject = None
#                 for subject in data:
#                     if cur_subject != subject[3] and cur_course == subject[0]:
#                         cur_subject = subject[3]
#                         subject_data = {
#                             'subject_code': subject[3],
#                             'subject_name_th': subject[4],
#                             'subject_name_en': subject[5],
#                             'subject_weight': subject[6]
#                         }
#                         detail['subject'].append(subject_data)
#                 out_data.append(detail)
#
#         return inner_res_helper.make_inner_response(True, "Query success.", out_data)
#
#     # get course list
#     def get_course_list(self):
#         sql_command = "SELECT course_id, course_name, course_year FROM course"
#         execute = self.__execute_query(sql_command)
#
#         if not execute['response']:
#             return execute
#
#         out_data = list()
#         for data in execute['value']:
#             course = {
#                 'course_id': data[0],
#                 'course_name': data[1],
#                 'course_year': data[2]
#             }
#             out_data.append(course)
#
#         return inner_res_helper.make_inner_response(True, "Query success.", out_data)
#
#     # get working school list data
#     def get_working_school_list(self):
#         sql_command = "SELECT * FROM school"
#         execute = self.__execute_query(sql_command)
#
#         if not execute['response']:
#             return execute
#
#         out_function_data = []
#         for data in execute['value']:
#             temp = {
#                 'school_id': data[0],
#                 'school_title': data[1]
#             }
#             out_function_data.append(temp)
#
#         return inner_res_helper.make_inner_response(response=True, message="Success", value=out_function_data)
#
#     # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
#     # # # # # # # # # # # # # # # # # # # # # # # STUDENT # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
#
#     # insert student academic record
#     def insert_academic_record(self, academic_data):
#         try:
#             self.__insert_multiple_into(table="academic_record",
#                                         column=['student_id', 'subject_code', 'semester', 'year', 'grade'],
#                                         data=academic_data)
#         except pymysql.Error as e:
#             print("Error %d: %s" % (e.args[0], e.args[1]))
#             return inner_res_helper.make_inner_response(False, str(e.args[0]), str(e.args[1]))
#
#         return inner_res_helper.make_inner_response(True, "Query Successful", "Success")
#
#     # insert student gpa record
#     def insert_gpa_record(self, gpa_data):
#         try:
#             self.__insert_multiple_into(table="gpa_record",
#                                         column=['student_id', 'gpa', 'semester', 'year'],
#                                         data=gpa_data)
#         except Exception as e:
#             print("Error %d: %s" % (e.args[0], e.args[1]))
#             return inner_res_helper.make_inner_response(False, str(e.args[0]), str(e.args[1]))
#
#         return inner_res_helper.make_inner_response(True, "Query Successful", "Success")
#
#     # insert new student data
#     def insert_new_student_data(self, data):
#         # prepare receive data
#         student_table = data['student']
#         student_table = json.loads(student_table)
#         student_table = list(student_table.values())
#
#         entrance_table = data['entrance']
#         entrance_table = json.loads(entrance_table)
#         entrance_table = list(entrance_table.values())
#
#         graduated_table = data['graduated']
#         graduated_table = json.loads(graduated_table)
#         graduated_table = list(graduated_table.values())
#
#         has_status_table = data['has_status']
#         has_status_table = json.loads(has_status_table)
#         has_status_table = list(has_status_table.values())
#
#         study_in_table = data['study_in']
#         study_in_table = json.loads(study_in_table)
#         study_in_table = list(study_in_table.values())
#
#         try:
#             self.__multiple_insert(table="student",
#                                    column=['student_id', 'firstname', 'lastname', 'gender'],
#                                    data=student_table)
#             self.__multiple_insert(table="entrance", column=['student_id', 'firstname', 'lastname', 'gender'],
#                                    data=entrance_table)
#             self.__multiple_insert(table="graduated",
#                                    column=['student_id', 'school_id', 'gpax'],
#                                    data=graduated_table)
#             self.__multiple_insert(table="has_status",
#                                    column=['student_id', 'status_id'],
#                                    data=has_status_table)
#             self.__multiple_insert(table="study_in",
#                                    column=['student_id', 'branch_id'],
#                                    data=study_in_table)
#         except pymysql.Error as e:
#             print("Error %d: %s" % (e.args[0], e.args[1]))
#             return inner_res_helper.make_inner_response(False, str(e.args[0]), str(e.args[1]))
#
#         return inner_res_helper.make_inner_response(True, "Query Successful", "Success")
#
#     # delete all student by year
#     def delete_student_by_year(self, year: str):
#         year = str(year)
#
#         if year is None or year == "null":
#             return inner_res_helper.make_inner_response(response=False,
#                                                         message="No delete year input.",
#                                                         value="No delete year input")
#
#         year = year[2:]
#         year = "{}%".format(year)
#
#         try:
#             print("DELETE HELLO {}".format(year))
#             # self.__execute_delete_data(table="study_in", column="student_id", value=year)
#             # self.__execute_delete_data(table="entrance", column="student_id", value=year)
#             # self.__execute_delete_data(table="graduated", column="student_id", value=year)
#             # self.__execute_delete_data(table="gpa_record", column="student_id", value=year)
#             # self.__execute_delete_data(table="academic_record", column="student_id", value=year)
#             # self.__execute_delete_data(table="student", column="student_id", value=year)
#         except pymysql.Error as e:
#             print("Error %d: %s" % (e.args[0], e.args[1]))
#             return inner_res_helper.make_inner_response(False, str(e.args[0]), str(e.args[1]))
#
#         return inner_res_helper.make_inner_response(True, "Query Successful", "Success")
#
#     # get all student data (pueng)
#     def get_all_student(self, dept_id=None): #//
#         if dept_id is not None:
#             sql_command = "select student_id, dept_name, branch_name, current_gpax, status_id, dept_id, branch_id " \
#                           "from student natural join study_in natural join has_branch natural join branch " \
#                           "natural join department NATURAL JOIN has_status where dept_id like '%s'" % dept_id
#         else:
#             sql_command = "select student_id, dept_name, branch_name, current_gpax, status_id, dept_id, branch_id " \
#                           "from student natural join study_in natural join has_branch natural join branch " \
#                           "natural join department NATURAL JOIN has_status"
#         execute = self.__execute_query(sql_command)
#
#         if not execute['response']:
#             return execute
#
#         out_function_data = []
#
#         for data in execute['value']:
#             year = data[0]
#             year = year[:2]
#             year = self.__constant.calculate_education_year(year)
#             data = {
#                 'student_id': data[0],
#                 'dept_id': data[5],
#                 'department': data[1],
#                 'branch_id': data[6],
#                 'branch': data[2],
#                 'current_gpax': data[3],
#                 'education_status': data[4],
#                 'student_year': year
#             }
#             out_function_data.append(data)
#
#         return inner_res_helper.make_inner_response(response=True, message="Success", value=out_function_data)
#
#     # get all student data (pueng)
#     def get_student_tracking(self, id_student):
#         sql_command = "SELECT gpa, semester, current_gpax, education_year " \
#                       "FROM `gpa_record` NATURAL JOIN student where student_id='%s'" % id_student
#         execute = self.__execute_query(sql_command)
#         print(sql_command)
#         if not execute['response']:
#             return execute
#
#         out_function_data = []
#         for data in execute['value']:
#             data = {
#                 'gpa': data[0],
#                 'semester': data[1],
#                 'current_gpax': data[2],
#                 'education_year': data[3]
#             }
#             out_function_data.append(data)
#
#         return inner_res_helper.make_inner_response(response=True, message="Success", value=out_function_data)
#
#     # get all student academic record (pueng)
#     def get_all_academic_record(self, dept_id=None, year=None):
#         if dept_id is None and year is None or dept_id == "null" or year == "null":
#             sql_command = "select student_id, subject_code, semester, education_year, grade, status_id, branch_id " \
#                           "from academic_record NATURAL JOIN has_status NATURAL JOIN study_in NATURAL JOIN has_branch"
#         elif dept_id is not None and year is None or year == "null":
#             sql_command = "select student_id, subject_code, semester, education_year, grade, status_id, branch_id " \
#                           "from academic_record NATURAL JOIN has_status NATURAL JOIN study_in " \
#                           "NATURAL JOIN has_branch WHERE dept_id like '%s'" % dept_id
#         elif year is not None and dept_id is None or dept_id == "null":
#             sql_command = "select student_id, subject_code, semester, education_year, grade, status_id, branch_id " \
#                           "from academic_record NATURAL JOIN has_status NATURAL JOIN study_in " \
#                           "NATURAL JOIN has_branch WHERE education_year like '%s'" % year
#         else:
#             sql_command = "select student_id, subject_code, semester, education_year, grade, status_id, branch_id " \
#                           "from academic_record NATURAL JOIN has_status NATURAL JOIN study_in " \
#                           "NATURAL JOIN has_branch WHERE education_year like '%s' " \
#                           "and dept_id like '%s'" % (year, dept_id)
#         execute = self.__execute_query(sql_command)
#
#         if not execute['response']:
#             return execute
#
#         out_function_data = []
#         for data in execute['value']:
#             data = {
#                 'student_id': data[0],
#                 'subject_code': data[1],
#                 'semester': data[2],
#                 'education_year': data[3],
#                 'grade': data[4],
#                 'education_status': data[5],
#                 'branch_id': data[6]
#             }
#             out_function_data.append(data)
#
#         return inner_res_helper.make_inner_response(response=True, message="Success", value=out_function_data)
#
#     def subject_by_branch(self, branch_id, semester, education_year):
#         sql_command = "SELECT subject.subject_code,subject.subject_name_en,subject.subject_weigth ,academic_record.grade " \
#                       "FROM study_in NATURAL JOIN `academic_record`join subject where branch_id='%s' and academic_record.semester=%s " \
#                       "and academic_record.education_year=%s and academic_record.subject_code=subject.subject_code" % (
#                           branch_id, semester, education_year)
#
#         execute = self.__execute_query(sql_command)
#         if not execute['response']:
#             return execute
#
#         out_function_data = []
#         for data in execute['value']:
#             data = {
#                 'subject_code': data[0],
#                 'subject_name_en': data[1],
#                 'subject_weigth': data[2],
#                 'grade': data[3],
#
#             }
#             out_function_data.append(data)
#
#         return inner_res_helper.make_inner_response(response=True, message="Success", value=out_function_data)
#
#     # get student data by department
#     # def get_department_student_data(self, dept_id):
#     #     sql_command = "SELECT student_id, current_gpax, branch_id, status_id " \
#     #                   "FROM student NATURAL JOIN study_in NATURAL JOIN has_branch " \
#     #                   "NATURAL JOIN branch NATURAL JOIN department NATURAL JOIN has_status " \
#     #                   "WHERE dept_id like '%s'" % (str(dept_id))
#     #     execute = self.__execute_query(sql_command)
#     #
#     #     if not execute['response']:
#     #         return execute
#     #
#     #     out_function_data = []
#     #     for data in execute['value']:
#     #         year = data[0]
#     #         year = year[:2]
#     #         year = self.__constant.calculate_education_year(year)
#     #         temp = {
#     #             'student_id': data[0],
#     #             'current_gpax': data[1],
#     #             'branch_id': data[2],
#     #             'status_id': data[3],
#     #             'education_year': year
#     #         }
#     #         out_function_data.append(temp)
#     #     return inner_res_helper.make_inner_response(response=True, message="Success", value=out_function_data)
#
#     # get student in department by status
#     def get_student_status(self, dept_id, status_id):
#         sql_command = "SELECT student_id, firstname, lastname, current_gpax, branch_name, branch_id " \
#                       "FROM student NATURAL JOIN study_in NATURAL JOIN has_branch NATURAL JOIN branch " \
#                       "NATURAL JOIN department NATURAL JOIN has_status WHERE dept_id = %s " \
#                       "and status_id = %s" % (str(dept_id), str(status_id))
#         execute = self.__execute_query(sql_command)
#
#         if not execute['response']:
#             return execute
#
#         out_function_data = []
#         for data in execute['value']:
#             year = data[0]
#             year = year[:2]
#             year = self.__constant.calculate_education_year(year)
#             temp = {
#                 'student_id': data[0],
#                 'firstname': data[1],
#                 'lastname': data[2],
#                 'current_gpax': data[3],
#                 'branch_name': data[4],
#                 'education_year': year
#             }
#             out_function_data.append(temp)
#         return inner_res_helper.make_inner_response(response=True, message="Success", value=out_function_data)
#
#     # get student status list data
#     def get_status_list(self):
#         sql_command = "SELECT * FROM student_status"
#         execute = self.__execute_query(sql_command)
#
#         if not execute['response']:
#             return execute
#
#         out_function_data = []
#         for data in execute['value']:
#             temp = {
#                 'status_id': data[0],
#                 'status_title': data[1]
#             }
#             out_function_data.append(temp)
#
#         return inner_res_helper.make_inner_response(response=True, message="Success", value=out_function_data)
#
#     # get student list by year
#     def get_student_by_year(self, year: str = None):
#         sql_command = "SELECT student_id, firstname, lastname, branch_name, current_gpax, dept_id, dept_name, branch_id " \
#                       "FROM student NATURAL JOIN study_in NATURAL JOIN branch NATURAL JOIN " \
#                       "has_branch NATURAL JOIN department WHERE student_id LIKE '{}%'" \
#             .format(year)
#
#         execute = self.__execute_query(sql_command)
#
#         if not execute['response']:
#             return execute
#
#         data = execute['value']
#         out_data = []
#         cur_dept = None
#         past_dept = []
#         for student in data:
#             if cur_dept != student[5] and not student[5] in past_dept:
#                 cur_dept = student[5]
#                 detail = {'dept_id': student[5], 'dept_name': student[5]}
#                 std_list = []
#                 for s_detail in data:
#                     if cur_dept == s_detail[5]:
#                         std_detail = {
#                             'student_id': s_detail[0],
#                             'firstname': s_detail[1],
#                             'lastname': s_detail[2],
#                             'current_gpax': s_detail[4],
#                             'branch_name': s_detail[3]
#                         }
#                         std_list.append(std_detail)
#                 detail['student'] = std_list
#                 past_dept.append(student[5])
#                 out_data.append(detail)
#
#         return inner_res_helper.make_inner_response(True, "Query success", out_data)
#
#     # get education year list
#     def get_education_year_list(self):
#         sql_commad = "SELECT student_id, dept_name, branch_name, dept_id, branch_id " \
#                      "FROM student NATURAL JOIN study_in NATURAL JOIN branch " \
#                      "NATURAL JOIN has_branch NATURAL JOIN department " \
#                      "GROUP BY LEFT(student_id,2), dept_id, branch_id"
#
#         execute = self.__execute_query(sql_commad)
#
#         if not execute['response']:
#             return execute
#
#         out_data = []
#         for data in execute['value']:
#             year = {
#                 'education_year': data[0][:2],
#                 'dept_name': data[1],
#                 'branch_name': data[2],
#                 'dept_id': data[3],
#                 'branch_id': data[4]
#             }
#             out_data.append(year)
#
#         return inner_res_helper.make_inner_response(True, "Query success.", out_data)
#
#     # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
#     # # # # # # # # # # # # # # # # # # # # # # # # USER # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
#
#     # get user
#     def get_user(self, username: str = None):
#         if username is None or username == "null":
#             return inner_res_helper.make_inner_response(response=False, message="No username input.",
#                                                         value="No username input")
#
#         sql_command = "select staff_id, level_id, firstname, lastname from staff where staff_id like '%s'" % username
#         execute = self.__execute_query(sql_command)
#
#         if not execute['response']:
#             return inner_res_helper.make_inner_response(response=False, message="User not found",
#                                                         value="User not found")
#
#         return execute
#
#     # get user for auth (have password)
#     def get_user_for_auth(self, username: str = None):
#         if username is None or username == "null":
#             return inner_res_helper.make_inner_response(response=False, message="No username input.",
#                                                         value="No username input")
#
#         sql_command = "select staff_id, level_id, firstname, lastname, password " \
#                       "from staff where staff_id like '%s'" % username
#         execute = self.__execute_query(sql_command)
#
#         if not execute['response']:
#             return inner_res_helper.make_inner_response(response=False, message="User not found",
#                                                         value="User not found")
#
#         return execute
#
#     # create user
#     def create_user(self, staff_id: str = None, first_name: str = None, last_name: str = None, hashed_pass: str = None,
#                     staff_level: int = -1, ):
#         if staff_id is None or first_name is None or last_name is None or hashed_pass is None or staff_id == "null" \
#                 or first_name == "null" or last_name == "null" or hashed_pass == "null":
#             return inner_res_helper.make_inner_response(response=False, message="Some argument is None",
#                                                         value="Some argument is None")
#
#         try:
#             self.__insert_into(table="staff", column=["staff_id", "level_id", "firstname", "lastname", "password"],
#                                data=[staff_id, staff_level, first_name, last_name, hashed_pass])
#         except Exception as e:
#             print("Error %d: %s" % (e.args[0], e.args[1]))
#             return inner_res_helper.make_inner_response(False, str(e.args[0]), str(e.args[1]))
#
#         return inner_res_helper.make_inner_response(True, "Success", "User was created")
