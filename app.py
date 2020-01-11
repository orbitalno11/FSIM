from flask import Flask, render_template, jsonify, request
from werkzeug.utils import secure_filename
import logging
import jwt
import os

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
    # data = DataManage()
    # data.readExcel(destination)
    # print(destination)
    # sessions['uploadFilePath'] = destination
    response = "Whatever you wish too return"
    return jsonify({'res': response})



@app.route('/v1/getallschool', methods=['GET'])
def get_all_school():
    connect = DatabaseConnection()
    data = connect.get_all_school_data()

    return jsonify({"data": data})


@app.route('/v1/getschool', methods=['GET'])
def get_school_by_id():
    school_id = request.args.get('school_id')

    connect = DatabaseConnection()
    data = connect.get_school_by_id(str(school_id))

    return jsonify({"data": data})


if __name__ == '__main__':
    app.run(debug=True)
