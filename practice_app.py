from flask import Flask, jsonify, request
from pymongo import MongoClient
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
strmongo = "mongodb+srv://dataquesters:project3@cluster0.dy07n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
mongo = MongoClient(strmongo)
db = mongo['quality_life']
collection = db['data_2019']
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