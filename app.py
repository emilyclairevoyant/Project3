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
collection_infrastructure = db['infrastructure']
collection_data_2022 = db['data_2022']
collection_geojson = db['geojson']
collection_country_flags = db['country_flags']
collection_affordability = db['affordability']
collection_jobMarket = db['jobMarket']
collection_fam_friend = db['fam_friend']

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

@app.route('/affordability_data', methods=['GET'])
def fetch_affordability_data():
    try:
        data_afford = list(collection_affordability.find())
        for item in data_afford:
            item['_id'] = str(item['_id'])
        return jsonify(data_afford)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/geo_json', methods=['GET'])
def fetch_geo_json():
    try:
        data_geo_json = list(collection_geojson.find())
        for item in data_geo_json:
            item['_id'] = str(item['_id'])
        return jsonify(data_geo_json)
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

@app.route('/infrastructure_data', methods=['GET'])
def fetch_infrastructure_data():
    try:
        data_infrastructure = list(collection_infrastructure.find())
        for item in data_infrastructure:
            item['_id'] = str(item['_id'])
        return jsonify(data_infrastructure)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/country_flags', methods=['GET'])
def fetch_flag_data():
    try:
        data_flags = list(collection_country_flags.find())
        for item in data_flags:
            item['_id'] = str(item['_id'])
        return jsonify(data_flags)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/peace_security', methods=['GET'])
def peace_security():
    return render_template('peace_security_index.html')

@app.route('/parameters', methods=['GET'])
def fetch_parameters():
    try:
        data_parameters = list(collection_data_2022.find())
        for item in data_parameters:
            item['_id'] = str(item['_id'])
        return jsonify(data_parameters)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/parameters_map', methods=['GET'])
def parameters_map():
    return render_template('parameters.html')

@app.route('/summary_info', methods=['GET'])
def fetch_summary_info():
    try:
        data_summary_info = list(collection_summary_info.find())
        for item in data_summary_info:
            item['_id'] = str(item['_id'])
        return jsonify(data_summary_info)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/Affordability')
def affordability():
    return render_template('affordability.html')

@app.route('/infrastructure')
def infrastructure():
    return render_template('infra_index.html')

@app.route('/top_10_bottom_10')
def top_10():
    return render_template('top_10_bottom_10_countries.html')
    
@app.route('/About')
def about():
    return render_template('about.html')

@app.route('/jobMarket_data', methods=['GET'])
def fetch_jobMarket():
    try:
        data_jobMarket = list(collection_jobMarket.find())
        for item in data_jobMarket:
            item['_id'] = str(item['_id'])
        return jsonify(data_jobMarket)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/FamFr_data', methods=['GET'])
def fetch_famfr():
    try:
        data_family = list(collection_fam_friend.find())
        for item in data_family:
            item['_id'] = str(item['_id'])
        return jsonify(data_family)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/FamFr")
def famfriend():
    return render_template('family.html')  

@app.route("/jobMarket")
def jobM():
    return render_template('jobM.html')  

@app.route("/")
def home():
    return render_template('index.html')  

if __name__ == '__main__':
    app.run(debug=True)
