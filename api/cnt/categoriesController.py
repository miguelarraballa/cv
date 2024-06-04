import conn as db
import datetime as dt

class categories():

    def __init__(self):
        pass

    def list(self,active = False):
        if (active): 
            condition = "WHERE active = 1"
        query = f"SELECT * FROM categories {condition} ORDER BY name ASC, data-created DESC"
        return db.conn.select(query)
    
    def read(self,ID):
        query = f"SELECT * FROM categorias WHERE ID = {ID} "
        return db.conn.select(query)

    def create(self,data):
        if not "name" in data.keys(): 
            return False
        
        return db.conn.insert('categories',{
            "cod" : "cod" in data.keys() if data["cod"] else data["name"][:4].upper(),
            "name" : data["name"],
            "description" : "description" in data.keys() if data["description"] else "",
            "category_id"  : "category_id" in data.keys() if data["category_id"] else 0,
            "active" : "active" in data.keys() if data["active"] else 1,
            })
    
    def update(self,data,where):
        
        allowed = ['cod','name','description','category_id','active','update_date']

        columns = {}
        for column in data:
            if column in allowed: 
                columns[column] = data[column]
        
        conditions = {}
        for condition in where:
            if condition in allowed:
                conditions[condition] = where[condition]

        if not 'update_date' in columns:
            columns['update_date'] = dt.datetime.now()

        return db.conn.update(
                'categories',
                columns,
                conditions
            )
    
    def delete(self,ID):

        return db.conn.delete('categories',ID)

        
