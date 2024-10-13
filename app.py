from flask import Flask, jsonify, request, render_template
from pymongo import MongoClient
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

strmongo = "mongodb+srv://dataquesters:project3@cluster0.dy07n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
mongo = MongoClient(strmongo)
db = mongo['quality_life']
collection_2019 = db['data_2019']
collection_consolidated = db['consolidated_data']
collection_peace_security = db['peace_and_security']
collection_summary_info = db['summary_info']

@app.route('/data_2019', methods=['GET'])
def fetch_data():
    try:
        data = list(collection_2019.find())
        for item in data:
            item['_id'] = str(item['_id'])
        return jsonify(data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/consolidated_data', methods=['GET'])
def fetch_consolidated_data():
    try:
        data_consolidated = list(collection_consolidated.find())
        for item in data_consolidated:
            item['_id'] = str(item['_id'])
        return jsonify(data_consolidated)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/peace_and_security', methods=['GET'])
def fetch_peace_and_security():
    try:
        data_peace_and_security = list(collection_peace_security.find())
        for item in data_peace_and_security:
            item['_id'] = str(item['_id'])
        return jsonify(data_peace_and_security)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/summary_info', methods=['GET'])
def fetch_summary_info():
    try:
        data_summary_info = list(collection_summary_info.find())
        for item in data_summary_info:
            item['_id'] = str(item['_id'])
        return jsonify(data_summary_info)
    except Exception as e:
        return jsonify({"error": str(e)}), 500



@app.route("/")
def home():
    return render_template('index.html')  

if __name__ == '__main__':
    app.run(debug=True)