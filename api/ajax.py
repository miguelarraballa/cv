from flask import Flask, request, jsonify, session
import conn as db
import cnt.categoriesController as categoriesController 
import cnt.itemsController as itemsController 


db = db.conn("api/database.db")

api = Flask(__name__)
api.secret_key = ''
api.config['SESSION_TYPE'] = 'filesystem'
session(api)

categories = categoriesController.categories() 
items = itemsController.items()

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data['username']
    password = db.conn.hash_password(data['password'])

    query = 'SELECT id FROM users WHERE username = ? AND password = ?', (username, password)
    user = db.conn.select(query)

    if user:
        session['user_id'] = user[0]
        response = {'success': True, 'message': 'Login successful'}
    else:
        response = {'success': False, 'message': 'Invalid username or password'}

    return jsonify(response)

@app.route('/content', methods=['GET'])
def get_content():
    if 'user_id' in session:
        return jsonify({'success': True, 'content': 'This is protected content'})
    else:
        return jsonify({'success': False, 'message': 'Not authorized'})

@app.route('/save-content', methods=['POST'])
def save_content():
    if 'user_id' not in session:
        return jsonify({'success': False, 'message': 'Not authorized'})

   

    return jsonify({'success': True, 'message': 'Content saved successfully'})

if __name__ == '__main__':
    api.run(debug=True)
