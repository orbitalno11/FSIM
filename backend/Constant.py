DATABASE_HOST = "127.0.0.1"
DATABASE_NAME = "fsim"
DATABASE_USER = "root"
DATABASE_PASSWORD = ""


UPLOAD_FOLDER = "./uploads/"
ADMISSION_FOLDER = UPLOAD_FOLDER + "admission"
ACADEMIC_FOLDER = UPLOAD_FOLDER + "academic"
ALLOWED_EXTENSIONS = {'xlsx', 'xls'}

SECRET_KEY = "FSIM2020"

RESPONSE_HEADERS = {"Content-type": "application/json"}

def allowed_admission_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def allowed_academic_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

