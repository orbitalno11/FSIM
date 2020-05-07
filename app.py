from flask import Flask, render_template, jsonify, request, make_response
from werkzeug.utils import secure_filename
from werkzeug.security import check_password_hash, generate_password_hash
import logging
import jwt
import os
import datetime
from functools import wraps
from flask_cors import CORS

# import modules
from backend.modules.old_DatabaseConnection import DatabaseConnection

# import blueprint
from backend.api import api_routes
from backend.api import admin_api_routes

from backend.api.activity.admin import admin_activity
from backend.api.activity.user import user_activity
from backend.api.admission.admin import admin_admission
from backend.api.admission.user import user_admission
from backend.api.alumni.admin import admin_alumni
from backend.api.alumni.user import user_alumni
from backend.api.student.admin import admin_student
from backend.api.student.user import user_student
from backend.api.department.admin import admin_department
from backend.api.department.user import user_department

# import Constant
import backend.Constant as constant

# set log
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("FSIM")

# create flask app
app = Flask(__name__, static_folder='frontend/build/static', template_folder='frontend/build')
app.config['UPLOAD_FOLDER'] = constant.UPLOAD_FOLDER

# to set json encode
app.config['JSON_AS_ASCII'] = False
app.config['SECRET_KEY'] = constant.SECRET_KEY

# setup blueprint
# user
app.register_blueprint(api_routes.api_bp, url_prefix='/api/v1')
app.register_blueprint(user_activity, url_prefix='/api/v1/activity')
app.register_blueprint(user_admission, url_prefix='/api/v1/admission')
app.register_blueprint(user_alumni, url_prefix='/api/v1/alumni')
app.register_blueprint(user_department, url_prefix='/api/v1/department')
app.register_blueprint(user_student, url_prefix='/api/v1/student')

# admin
app.register_blueprint(admin_api_routes.admin_bp, url_prefix='/api/v1/admin')
app.register_blueprint(admin_activity, url_prefix='/api/v1/admin/activity')
app.register_blueprint(admin_admission, url_prefix='/api/v1/admin/admission')
app.register_blueprint(admin_alumni, url_prefix='/api/v1/admin/alumni')
app.register_blueprint(admin_department, url_prefix='/api/v1/admin/department')
app.register_blueprint(admin_student, url_prefix='/api/v1/admin/student')

# CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000/*"}})
CORS(app)


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


@app.route('/admin')
def about():
    return render_template('index.html')


@app.route('/std')
def std():
    return render_template('index.html')


if __name__ == '__main__':
    app.run(debug=True)
