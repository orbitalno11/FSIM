import pymysql
import json

# import our module
from backend.modules.FSIMConstant import FSIMConstant


class DatabaseConnection:
    __constant = FSIMConstant()
    __host = __constant.get_host()
    __db = __constant.get_db()
    __user = __constant.get_user_db()
    __password = __constant.get_password_db()
    __db_connection = None

    def __init__(self):
        self.__db_connection = pymysql.connect(self.__host, self.__user, self.__password, self.__db)

    def get_all_school_data(self):
        cursor = self.__db_connection.cursor()
        sql = "SELECT sc.school_id, sc.school_name, pro.name, dist.name, sub.name FROM school as sc LEFT JOIN province as pro ON sc.province_id LIKE pro.province_id LEFT JOIN district as dist ON sc.district_id LIKE dist.district_id LEFT JOIN sub_district as sub ON sc.sub_district_id LIKE sub.sub_district_id"

        try:
            cursor.execute(sql)
            result = cursor.fetchall()
        except pymysql.Error as e:
            print("Error %d: %s" % (e.args[0], e.args[1]))
            return False
        finally:
            self.__db_connection.close()

        out = []
        for school in result:
            data = {'school_id': school[0], 'school_name': school[1], 'province': school[2], 'district': school[3],
                    'subdistrict': school[4]}
            out.append(data)
        return out

    def get_school_by_id(self, school_id):
        cursor = self.__db_connection.cursor()
        sql = "SELECT sc.school_id, sc.school_name, pro.name, dist.name, sub.name FROM school as sc LEFT JOIN province as pro ON sc.province_id LIKE pro.province_id LEFT JOIN district as dist ON sc.district_id LIKE dist.district_id LEFT JOIN sub_district as sub ON sc.sub_district_id LIKE sub.sub_district_id WHERE sc.school_id like '" + str(
            school_id) + "'"

        try:
            cursor.execute(sql)
            result = cursor.fetchall()
        except pymysql.Error as e:
            print("Error %d: %d" % (e.args[0], e.args[1]))
            return False
        finally:
            self.__db_connection.close()

        out = []
        for school in result:
            data = {'school_id': school[0], 'school_name': school[1], 'province': school[2], 'district': school[3],
                    'subdistrict': school[4]}
            out.append(data)

        return out

    def create_staff(self, staff_id, level, name, lastname, password):
        cursor = self.__db_connection.cursor()
        sql = "INSERT INTO staff (staff_id, level_id, firstname, lastname, password) VALUES ('" + str(
            staff_id) + "'," + str(level) + ", '" + str(name) + "','" + str(lastname) + "','" + str(password) + "')"

        try:
            cursor.execute(sql)
            self.__db_connection.commit()
        except pymysql.Error as e:
            print("Error %d: %s" % (e.args[0], e.args[1]))
            return False
        finally:
            self.__db_connection.close()

        return "Account was created"

    def get_user(self, username):
        cursor = self.__db_connection.cursor()
        sql = "select * from staff where staff_id like '" + str(username) + "'"
        cursor.execute(sql)
        result = cursor.fetchone()

        self.__db_connection.close()
        return result
