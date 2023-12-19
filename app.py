from flask import Flask, request, jsonify
import tensorflow as tf
from keras.models import load_model
import pandas as pd
import os
from sklearn.preprocessing import LabelEncoder, StandardScaler
from flask_cors import CORS


app = Flask(__name__)
CORS(app)
model = load_model('./model')
df_train = pd.read_csv('./data/datatrain.csv')
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
    prediction = model.predict(input_data)
    result = postprocess(prediction)
    return jsonify(result)


if __name__ == '__main__':
    app.run(debug=True, port=5000)