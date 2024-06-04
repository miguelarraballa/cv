import conn as db

db = db.conn("api/database.db")

password = input("¿Palabra? ")
print (db.hash_password(password))