# Importing libraries

from __future__ import print_function
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.metrics import classification_report
from sklearn import metrics
from sklearn import tree
import warnings
warnings.filterwarnings('ignore')

#loading the dataset
df = pd.read_csv("C:\\Users\\SATWIK M BADIGER\\Desktop\\crop-recommendation-system-based-on-machine-learning-using-python\\Data\\crop_recommendation.csv")
features = df[['N', 'P','K','temperature', 'humidity', 'ph', 'rainfall']]
target = df['label']

#features = df[['temperature', 'humidity', 'ph', 'rainfall']]
labels = df['label']

# Initialzing empty lists to append all model's name and corresponding name
acc = []
model = []
# Splitting into train and test data

from sklearn.model_selection import train_test_split
Xtrain, Xtest, Ytrain, Ytest = train_test_split(features,target,test_size = 0.2,random_state =2)
from sklearn.ensemble import RandomForestClassifier

RF = RandomForestClassifier(n_estimators=20, random_state=0)
RF.fit(Xtrain,Ytrain)

predicted_values = RF.predict(Xtest)

x = metrics.accuracy_score(Ytest, predicted_values)
acc.append(x)
model.append('RF')

#print("RF's Accuracy is: ", x)
#print(classification_report(Ytest,predicted_values))
# Now your model is saved in the file 'crop_recommendation_model.joblib'

#data = np.array([[83, 45, 60, 28, 70.3, 7.0, 150.9]])
#prediction = RF.predict(data)
#print(prediction)

import sys
# Features start from the second element
features = [float(arg) for arg in sys.argv[1:]]

# Use the features for prediction with your machine learning model
# Example: Assuming you have a loaded model named 'RF'
prediction = RF.predict([features])
print(prediction)

prediction = ''