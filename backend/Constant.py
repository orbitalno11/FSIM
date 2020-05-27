DATABASE_HOST = "localhost"
DATABASE_NAME = "FSIM"
DATABASE_USER = "root"
DATABASE_PASSWORD = ""


UPLOAD_FOLDER = "./uploads/"
ADMISSION_FOLDER = UPLOAD_FOLDER + "admission"
ACADEMIC_FOLDER = UPLOAD_FOLDER + "academic"
STUDENT_FOLDER = UPLOAD_FOLDER + "student"
ACTIVITY_FOLDER = UPLOAD_FOLDER + "activity"
ALLOWED_EXTENSIONS = {'xlsx', 'xls'}

SECRET_KEY = "FSIM2020"

RESPONSE_HEADERS = {"Content-type": "application/json"}

EDUCATION_YEAR_START_MONTH = 8

# read google sheet part
google_credentials = "google_credentials.json"
google_sheet_scope = ["https://www.googleapis.com/auth/spreadsheets.readonly"]

# firebase
firebase_credentials = "firebase_credentials.json"
firebase_database_url = "https://my-fsim.firebaseio.com/"


# CON1
def allowed_file(filename):
    from werkzeug.utils import secure_filename
    name = secure_filename(filename)
    return '.' in name and name.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


# CON2
def calculate_education_year(year):
    from datetime import datetime
    current_month = datetime.now().date().month
    current_year = datetime.now().year + 543
    current_year = int(str(current_year)[2:])
    education_year = current_year - int(year)
    if current_month >= EDUCATION_YEAR_START_MONTH:
        education_year += 1
    return education_year
