DATABASE_HOST = "localhost"
DATABASE_NAME = "FSIM"
DATABASE_USER = "root"
DATABASE_PASSWORD = ""


UPLOAD_FOLDER = "./uploads/"
ADMISSION_FOLDER = UPLOAD_FOLDER + "admission"
ACADEMIC_FOLDER = UPLOAD_FOLDER + "academic"
STUDENT_FOLDER = UPLOAD_FOLDER + "student"
ALLOWED_EXTENSIONS = {'xlsx', 'xls'}

SECRET_KEY = "FSIM2020"

RESPONSE_HEADERS = {"Content-type": "application/json"}

# read google sheet part
google_credentials = "google_credentials.json"
google_sheet_scope = ["https://www.googleapis.com/auth/spreadsheets.readonly"]

# firebase
firebase_credentials = "firebase_credentials.json"
firebase_database_url = "https://my-fsim.firebaseio.com/"


def allowed_admission_file(filename):
    from werkzeug.utils import secure_filename
    name = secure_filename(filename)
    return '.' in name and name.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def allowed_academic_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def calculate_education_year(year):
    from datetime import datetime
    current_month = datetime.now().date().month
    current_year = datetime.now().year + 543
    current_year = int(str(current_year)[2:])
    education_year = current_year - int(year)
    if current_month >= 8:
        education_year += 1
    return education_year
