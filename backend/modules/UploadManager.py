import os
from werkzeug.utils import secure_filename
from datetime import datetime


class UploadManager:

    @staticmethod
    def upload_file(store_folder, file, year):
        if not os.path.isdir(store_folder):
            os.makedirs(store_folder)
        name = str(year) + "_" + str(datetime.now().strftime("%d-%m-%Y")) + "_" + file.filename
        filename = secure_filename(name)
        destination = "/".join([store_folder, filename])

        try:
            file.save(destination)
            return destination
        except Exception as e:
            print(e)
            return False
