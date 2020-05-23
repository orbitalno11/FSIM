from backend.helpers.database import Database

db = Database()
data = db.get_all_admission()
