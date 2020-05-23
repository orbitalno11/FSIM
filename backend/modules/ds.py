from backend.helpers.database import Database

db = Database()
data = db.get_year_list_of_activity()
