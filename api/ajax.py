from flask import Flask, jsonify, render_template, request
import conn as db
import cnt.categoriesController as categoriesController 
import cnt.itemsController as itemsController 

db = db.conn("api/database.db")

api = Flask(__name__)

categories = categoriesController.categories() 
items = itemsController.items()






