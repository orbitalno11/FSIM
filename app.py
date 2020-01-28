from flask import Flask, render_template, jsonify, request, make_response
from werkzeug.utils import secure_filename
from werkzeug.security import check_password_hash, generate_password_hash
import logging
import jwt
import os
import datetime
from functools import wraps

# import modules
from backend.modules.DataManage import DataManage
from backend.modules.DatabaseConnection import DatabaseConnection

# set log
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("FSIM")

# create flask app
app = Flask('FSIM', static_folder='frontend/build/static', template_folder='frontend/build')
upload_folder = './uploads'
app.config['UPLOAD_FOLDER'] = upload_folder
# to set json encode
app.config['JSON_AS_ASCII'] = False
app.config['SECRET_KEY'] = 'FSIM2020'


def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None

        if 'x-access-token' in request.headers:
            token = request.headers['x-access-token']

        if not token:
            return jsonify({'message': 'Token is missing'}), 401

        try:
            data = jwt.decode(token, app.config['SECRET_KEY'])
            print(data['staff_id'])
            connect = DatabaseConnection()
            result = connect.get_user(data['staff_id'])
            current_user = result

        except:
            return jsonify({'message': 'Token is missing'}), 401

        return f(current_user, *args, **kwargs)

    return decorated


# route
@app.route('/')
def index():
    return render_template('index.html')


@app.route('/about')
def about():
    return render_template('index.html')


@app.route('/std')
def std():
    return render_template('index.html')


# api part
@app.route('/v1/upload', methods=['POST'])
def file_upload():
    target = os.path.join(upload_folder, 'test_docs')
    if not os.path.isdir(target):
        os.makedirs(target)
    logger.info("welcome to upload")
    file = request.files['file']
    filename = secure_filename(file.filename)
    destination = "/".join([target, filename])
    file.save(destination)

    # read excel file when upload was finished
    data = DataManage()
    data.readExcel(destination)
    # print(destination)
    # sessions['uploadFilePath'] = destination
    response = "Whatever you wish too return"
    return jsonify({'res': response})


@app.route('/v1/getallschool', methods=['GET'])
@token_required
def get_all_school(current_user):

    connect = DatabaseConnection()
    data = connect.get_all_school_data()
    del connect

    return jsonify({"data": data})


@app.route('/v1/getschool', methods=['GET'])
def get_school_by_id():
    school_id = request.args.get('school_id')

    connect = DatabaseConnection()
    data = connect.get_school_by_id(str(school_id))
    del connect

    return jsonify({"data": data})


@app.route('/v1/staff', methods=['POST'])
def signup():
    data = request.get_json()

    staff_id = data['staff_id']
    staff_level = data['staff_level']
    fname = data['firstname']
    lname = data['lastname']
    hashed_pass = generate_password_hash(data['password'], method='sha256')

    connect = DatabaseConnection()
    result = connect.create_staff(staff_id, staff_level, fname, lname, hashed_pass)
    del connect

    return jsonify(result)


@app.route('/v1/login', methods=['POST'])
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


if __name__ == '__main__':
    app.run(debug=True)
