from flask import Blueprint, jsonify, request, make_response, current_app as app
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
import datetime

# import database connection
from backend.modules.DatabaseConnection import DatabaseConnection

# import data manager
from backend.modules.DataManage import DataManage

# import Upload manager
from backend.modules.UploadManager import UploadManager

# import application Constant
import backend.Constant as constant


api_bp = Blueprint('api_bp', __name__, url_prefix='/api/v1')


@api_bp.route('/school', methods=['GET'])
def allSchool():
    headers = {"Content-type": "application/json"}

    connect = DatabaseConnection()
    data = connect.get_all_school_data()
    del connect

    if data:
        return make_response(jsonify({"data": data}), 200, headers)
    else:
        return make_response(jsonify({"data": data}), 500, headers)


@api_bp.route('/staff', methods=['POST'])
def create_staff():
    if request.method == 'POST':
        headers = {"Content-type": "application/json"}
        data = request.get_json()

        staff_id = data['staff_id']
        staff_level = data['staff_level']
        fname = data['firstname']
        lname = data['lastname']
        hashed_pass = generate_password_hash(data['password'], method='sha256')

        connect = DatabaseConnection()
        result = connect.create_staff(staff_id, staff_level, fname, lname, hashed_pass)
        del connect

        if result:
            return make_response(jsonify({"result": result}), 200, headers)
        else:
            return make_response(jsonify({"result": result}), 500, headers)


@api_bp.route('/login', methods=['POST'])
def login():
    auth = request.authorization
    if not auth or not auth.username or not auth.password:
        return make_response('Could not verify', 401, {'WWW-Authenticate': 'Basic realm="Please Login'})

    connect = DatabaseConnection()
    user = connect.get_user(auth.username)
    del connect

    if user is None:
        return make_response('Could not verify', 401, {'WWW-Authenticate': 'Basic realm="Please Login'})

    if check_password_hash(user[4], auth.password):
        token = jwt.encode({'staff_id': user[0], 'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60)},
                           app.config['SECRET_KEY'])
        return jsonify({'token': token.decode('UTF-8')})

    return make_response('Could not verify', 401, {'WWW-Authenticate': 'Basic realm="Please Login'})


@api_bp.route('/admission', methods=['POST'])
def insert_admission():

    # This api need "Year" as year , "Admission type" as admission_type and "Admission channel" as admission_channel to be a parameter
    headers = {"Content-type": "application/json"}

    year = request.form.get('year')
    admission_type = request.form.get('admission_type')
    admission_channel = request.form.get('admission_channel')

    try:
        file = request.files['file']
        destination = UploadManager.upload_file(constant.ADMISSION_FOLDER, file, year)
    except Exception as e:
        print(e)
        return make_response(jsonify({"result": "Error"}), 400, headers)

    insert = False

    if destination:
        dm = DataManage()
        insert = dm.insert_admission(admission_type, admission_channel, year, destination)

    if insert:
        return make_response(jsonify({"result": "OK"}), 200, headers)
    else:
        return make_response(jsonify({"result": "Error"}), 500, headers)


@api_bp.route('/admission/<year>/<type>/<channel>', methods=['GET'])
def get_admission(year, type, channel):
    headers = {"Content-type": "application/json"}
    con = DatabaseConnection()
    data = con.get_admission_data(type, channel, year)
    del con

    if data:
        return make_response(jsonify({"data": data}), 200, headers)
    else:
        return make_response(jsonify({"data": data}), 500, headers)


@api_bp.route('/branch', methods=['GET'])
def branch():
    headers = {"Content-type": "application/json"}
    con = DatabaseConnection()
    data = con.get_branch()

    if data:
        return make_response(jsonify({"data": data}), 200, headers)
    else:
        return make_response(jsonify({"data": "Error"}), 500, headers)
