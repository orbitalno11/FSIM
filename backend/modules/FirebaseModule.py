import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

import backend.Constant as Constant

import backend.helpers.inner_response_helper as inner_res_helper


class FirebaseModule:
    # class attribute
    __instance = None
    __cred = credentials.Certificate(Constant.firebase_credentials)

    # singleton check
    @staticmethod
    def get_instance():
        if FirebaseModule.__instance is None:
            FirebaseModule()
        return FirebaseModule.__instance

    def __init__(self):
        if FirebaseModule.__instance is not None:
            raise Exception("This class is singleton")
        else:
            FirebaseModule.__instance = self
            firebase_admin.initialize_app(self.__cred, {'databaseURL': Constant.firebase_database_url})

    # read all data for alumni survey
    def alumni_get_survey(self):
        db_ref = db.reference('alumni_survey')

        try:
            snapshot = db_ref.get()
        except Exception as e:
            print("Error %d: %s" % (e.args[0], e.args[1]))
            return inner_res_helper.make_inner_response(False, str(e.args[0]), str(e.args[1]))

        return inner_res_helper.make_inner_response(True, "Query successful", [dict(snapshot)])

    # read data for alumni survey by year
    def alumni_get_survey_by_year(self, year: int):
        db_ref = db.reference('alumni_survey')

        try:
            snapshot = db_ref.order_by_child("educationYear").equal_to(year).get()
        except Exception as e:
            print("Error %d: %s" % (e.args[0], e.args[1]))
            return inner_res_helper.make_inner_response(False, str(e.args[0]), str(e.args[1]))

        return inner_res_helper.make_inner_response(True, "Query successful", [dict(snapshot)])

    # add data for alumni survey
    def alumni_add_survey(self, year: int = None, url: str = None, table_header: list = None):
        data = {
            "educationYear": year,
            "tableHeader": table_header,
            "sheetUrl": url
        }

        db_ref = db.reference('alumni_survey')

        try:
            db_ref.push(data)
        except Exception as e:
            print("Error %d: %s" % (e.args[0], e.args[1]))
            return inner_res_helper.make_inner_response(False, str(e.args[0]), str(e.args[1]))

        return inner_res_helper.make_inner_response(True, "Add data successful", "Success")

    # update data for alumni survey
    def alumni_update_survey(self, year: int = None, data=None):
        old_data = self.alumni_get_survey_by_year(year)

        if not old_data['response']:
            return old_data

        old_data = old_data['value']
        old_data = old_data[0]
        key = list(old_data.keys())[0]

        db_ref = db.reference('alumni_survey')

        try:
            data_ref = db_ref.child(key)
            data_ref.update(data)
        except Exception as e:
            print("Error %d: %s" % (e.args[0], e.args[1]))
            return inner_res_helper.make_inner_response(False, str(e.args[0]), str(e.args[1]))

        return inner_res_helper.make_inner_response(True, "Update data successful", "Success")
