import conn as db
import datetime as dt

class items():

    def __init__(self):
        pass

    def list(self,active = False):
        if (active): 
            condition = "WHERE active = 1"
        query = f"SELECT * FROM items {condition} ORDER BY name ASC, data-created DESC"
        return db.conn.select(query)
    
    def read(self,ID):
        query = f"SELECT * FROM items WHERE ID = {ID} "
        return db.conn.select(query)

    def create(self,data):
        required = ['name','category_id','begin']
        if not all(k in required for k in data.keys()): 
            return False
        
        try: 
            begin = dt.strptime(data[begin],"%Y-%m-%d")
            return db.conn.insert('items',{
                "name" : data["name"],
                "category_id"  : data["category_id"],
                "begin" : begin,
                "description" : "description" in data.keys() if data["description"] else "",
                "file" : "file" in data.keys() if data["file"] else "",
                "active" : "active" in data.keys() if data["active"] else 1,
            })
        except: 
            return False
           
    def update(self,data,where):
        
        allowed = ['name','description','begin','end','file','category_id','active','update_date']

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
                'items',
                columns,
                conditions
            )
    
    def delete(self,ID):
        
        return db.conn.delete('items',ID)

        
