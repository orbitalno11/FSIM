import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

import backend.Constant as Constant

import backend.helpers.inner_response_helper as inner_res_helper

__cred = credentials.Certificate(Constant.firebase_credentials)
firebase_admin.initialize_app(__cred, {'databaseURL': Constant.firebase_database_url})


class FirebaseModule:

    # FBM1 read all data for alumni survey
    def alumni_get_survey(self):
        db_ref = db.reference('alumni_survey')

        try:
            snapshot = db_ref.get()
        except Exception as e:
            print("Error %d: %s" % (e.args[0], e.args[1]))
            return inner_res_helper.make_inner_response(False, str(e.args[0]), str(e.args[1]))

        if snapshot is not None:
            return inner_res_helper.make_inner_response(True, "Query successful", [dict(snapshot)])
        else:
            return inner_res_helper.make_inner_response(False, "Can not found data", "Can not found data")

    # FBM2 read data for alumni survey by year
    def alumni_get_survey_by_year(self, year: int):
        year = int(year) 
        db_ref = db.reference('alumni_survey')

        try:
            snapshot = db_ref.order_by_child("educationYear").equal_to(year).get()
        except Exception as e:
            print(e)
            return inner_res_helper.make_inner_response(False, "Error", e)

        if snapshot is not None:
            return inner_res_helper.make_inner_response(True, "Query successful", [dict(snapshot)])
        else:
            return inner_res_helper.make_inner_response(False, "Can not found data", "Can not found data")

    # FBM3 read data for alumni survey by key
    def alumni_get_survey_by_key(self, key: str):

        db_ref = db.reference('alumni_survey')

        try:
            snapshot = db_ref.order_by_key().equal_to(key).get()
        except Exception as e:
            print("Error %d: %s" % (e.args[0], e.args[1]))
            return inner_res_helper.make_inner_response(False, str(e.args[0]), str(e.args[1]))

        if snapshot is not None:
            return inner_res_helper.make_inner_response(True, "Query successful", [dict(snapshot)])
        else:
            return inner_res_helper.make_inner_response(False, "Can not found data", "Can not found data")

    # FBM4 add data for alumni survey
    def alumni_add_survey(self, year: int = None, url: str = None, table_header: list = None, personal_header: list = None):
        year = int(year)

        data = {
            "educationYear": year,
            "tableHeader": table_header,
            "sheetUrl": url,
            "personalHeader": personal_header
        }

        db_ref = db.reference('alumni_survey')

        try:
            db_ref.push(data)
        except Exception as e:
            print("Error %d: %s" % (e.args[0], e.args[1]))
            return inner_res_helper.make_inner_response(False, str(e.args[0]), str(e.args[1]))

        return inner_res_helper.make_inner_response(True, "Add data successful", "Success")

    # FBM5 update data for alumni survey
    def alumni_update_survey(self, key: str = None, data=None):

        db_ref = db.reference('alumni_survey')

        try:
            data_ref = db_ref.child(key)
            data_ref.update(data)
        except Exception as e:
            print("Error %d: %s" % (e.args[0], e.args[1]))
            return inner_res_helper.make_inner_response(False, str(e.args[0]), str(e.args[1]))

        return inner_res_helper.make_inner_response(True, "Update data successful", "Success")

    # FBM6 delete data for alumni survey
    def alumni_delete_survey(self, key: str = None):

        db_ref = db.reference('alumni_survey/%s' % key)

        try:
            db_ref.delete()
        except Exception as e:
            print("Error %d: %s" % (e.args[0], e.args[1]))
            return inner_res_helper.make_inner_response(False, str(e.args[0]), str(e.args[1]))

        return inner_res_helper.make_inner_response(True, "Delete data successful", "Success")
