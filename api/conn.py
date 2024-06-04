import sqlite3
import debug

class conn:

    
    def __init__(self,name):
        #table name
        self.name = name
        self.debug = debug.log()
        #open connection
        self.conn = sqlite3.connect(self.name)

        #initialize tables
        self.create_tables()
        self.categories_load()


    def create_tables(self):

        queries = [
            """ CREATE TABLE IF NOT EXISTS categories (
                ID              INTEGER PRIMARY KEY AUTOINCREMENT,
                cod             TEXT NOT NULL UNIQUE,
                name            TEXT NOT NULL UNIQUE,
                description     TEXT NULL DEFAULT '',
                category_id     INTEGER NULL, 
                active          INTEGER NOT NULL DEFAULT 1,
                create_date     TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                update_date     TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (category_id) REFERENCES categories(ID)
            )
            """,
            """ CREATE TABLE IF NOT EXISTS items(
                ID              INTEGER PRIMARY KEY AUTOINCREMENT,
                category_id     INTEGER NOT NULL, 
                name            TEXT NOT NULL,
                description     TEXT NULL DEFAULT '',
                begin           DATE NOT NULL,
                end             DATE NULL,
                file            TEXT NULL,  
                active          INTEGER NOT NULL DEFAULT 1,
                create_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                update_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (category_id) REFERENCES categories(ID)
            )
            """
        ]
        try:
            cursor = self.conn.cursor()
            for query in queries:
                cursor.execute(query)
                self.commit()
        except sqlite3.Error as e:
            print(e)

    def categories_load(self):

        categories = [
            ['Experiencia profesional','EXPR',''],
            ['Educación y formación','EDFO',''],
            ['Certificados y cursos','CRCU',''],
            ['Habilidades Técnicas (Hard Skills)','HASK',''],
            ['Habilidades Personales (Soft Skills)','SOSK','']
        ] 

        try:
        
            cursor = self.conn.cursor()
                    
            for category in categories:
                # 0 nombre, 1 cod, 2 description
                select = f"SELECT ID FROM categories WHERE cod = '{category[1]}'"
                cursor.execute(select)
                result = cursor.fetchone()
                if (result is None):
                    insert = f"INSERT INTO categories (name,cod,description) VALUES('{category[0]}','{category[1]}','{category[2]}')"
                    cursor.execute(insert)
            
            self.conn.commit()
               

        except sqlite3.Error as e:
            self.debug.log.write(e,'error')
            print(e)
   
    def query(self,query):
        try:
            cursor = self.conn.cursor()  
            cursor.execute(query)
            return cursor
        except sqlite3.Error as e:
            self.debug.log.write(e,'error')
            return False

    def select(self,query):
        try:
            cursor = self.conn.cursor()  
            cursor.execute(query)
            results = cursor.fetchall()

            if (results is None):
                return False
            else:
                return results
        except sqlite3.Error as e:
            self.debug.log.write(e,'error')
            return False

    def insert(self,table,columns):
        try:
            columns_names = ""
            columns_values = ""
            cursor = self.conn.cursor()
            for column in columns:

                columns_names += f"{column},"

                if(columns[column].isnumeric()):
                    columns_values = f"{columns[column]},"
                else:
                    columns_values = f"'{columns[column]}',"

            columns_names = columns_names.rsplit(",")
            columns_values = columns_values.rsplit(",")
            query = f"INSERT INTO {table} ({columns_names}) VALUES ({columns_values})" 
            cursor.execute(query)
            results = cursor.fetchall()

            if (results is None):
                return False
            else:
                return results

        except sqlite3.Error as e:
            self.debug.log.write(e,'error')
            return False

    def update(self,table,columns,where):
        try:
            cursor = self.conn.cursor()
            set = ""
            
            for column in columns:
                if(column[1].isnumeric()):
                    value = column[1]
                else:
                    value = "'"+column[1]+"'"

                set += f" {column[0]} = {value}, "

            set = set.rstrip(",")

            for condition in where: 
                if(condition[1].isnumeric()):
                    value = condition[1]
                else:
                    value = "'"+condition[1]+"'"
                conditions = f" AND {condition[0]} = {value} "

            query = f"UPDATE FROM {table} SET {set} WHERE 1=1 {conditions}"  
            cursor.execute(query)
            results = cursor.fetchall()

            if (results is None):
                return False
            else:
                return results
        except sqlite3.Error as e:
            self.debug.log.write(e,'error')
            return False

    def delete(self,table,ID,pk = 'ID'):
        try:
            cursor = self.conn.cursor()

            if not (ID.isnumeric()):
                ID = f"'{ID}'"

            query = f"DELETE FROM {table} WHERE {pk} = {ID}"  
            cursor.execute(query)
            results = cursor.fetchall()

            if (results is None):
                return False
            else:
                return results
        except sqlite3.Error as e:
            self.debug.log.write(e,'error')
            return False 

    def commit(self):
        return self.conn.commit()
    
    def close(self):
        return self.conn.close()
