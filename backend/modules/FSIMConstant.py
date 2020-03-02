class FSIMConstant:

    __host = "<database host>"
    __db = "<database name>"
    __user_db = "<database username>"
    __password_db = "<database password>"

    def get_host(self):
        return self.__host

    def get_db(self):
        return self.__db

    def get_user_db(self):
        return self.__user_db

    def get_password_db(self):
        return self.__password_db
