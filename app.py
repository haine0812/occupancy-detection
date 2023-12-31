
# A very simple Flask Hello World app for you to get started with...

from flask import Flask, request, jsonify
import pandas as pd
from sklearn.preprocessing import StandardScaler
from flask_cors import CORS
import pickle

app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
with open('/home/haitt1467/project/svm_model.pkl', 'rb') as model_file:
    loaded_svm_model = pickle.load(model_file)
df_train = pd.read_csv('/home/haitt1467/project/datatrain.csv')
df_train = df_train.drop('Occupancy', axis=1).drop('date', axis=1)
scaler = StandardScaler()
scaler.fit(df_train)


def raw_to_df(data):
    input = [
        {
            'Temperature': data['temperature'],
            'Humidity': data['humidity'],
            'Light': data['light'],
            'CO2': data['co2'],
            'HumidityRatio': data['humidityRatio'],
        }
    ]
    df = pd.DataFrame(input)
    return df


def standardize(data):
    output_data = data
    output_data = scaler.transform(output_data)
    return output_data


def preprocess(data):
    df = raw_to_df(data)
    standardized = standardize(df)
    return standardized


def postprocess(prediction):
    return 'Someone went in' if prediction > 0.5 else 'Nobody went in'


@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json(force=True)
    input_data = preprocess(data)
    prediction = loaded_svm_model.predict(input_data)
    result = postprocess(prediction)
    return jsonify(result)


@app.route('/')
def hello_world():
    return 'Hello from Flask!'

