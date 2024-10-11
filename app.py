from flask import Flask, jsonify, request
from pymongo import MongoClient
from flask_cors import CORS
app = Flask(__name__)

CORS(app)

client = MongoClient('mongodb://localhost:27017/')
db = client['proj3test']
collection = db['collection_2019']

@app.route('/data', methods=['GET'])
def fetch_data():
    try:
        data = list(collection.find())
        for item in data:
            item['_id'] = str(item['_id']) 
        return jsonify(data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
