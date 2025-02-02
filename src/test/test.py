import cv2
import pandas as pd
from insightface.app import FaceAnalysis
from sklearn.metrics.pairwise import cosine_similarity
from mtcnn.mtcnn import MTCNN
import json
import ast
import numpy as np
import pickle
import re
import math

def load_embeddings(embeddings_path):
    df = pd.read_excel(embeddings_path, engine='openpyxl')
    df['feature_0'] = df['feature_0'].apply(lambda x: [float(value) for value in re.sub(r'\[|\]', '', x).split()])
    return df[['Roll No', 'feature_0']]  

def get_face_embeddings(image, face_analysis_model):
    faces = face_analysis_model.get(image)
    return faces
    

def recognize_faces(embeddings, target_embedding):

        embeddings = embeddings/np.linalg.norm(embeddings)
        target_embedding = target_embedding/np.linalg.norm(target_embedding)

        similarities = abs(cosine_similarity([embeddings], [target_embedding])[0][0])
        similarities = similarities * 100
        return similarities

def main():
    input_image_path = "classa.jpg"
    embeddings_path = r"facereg\src\components\AddStudent\embedding.py"
    embeddings = load_embeddings(embeddings_path)
    face_detector = MTCNN()
    model = FaceAnalysis(name = "buffalo_l")
    model.prepare(ctx_id=-1)

    img = cv2.imread(input_image_path, cv2.IMREAD_COLOR)
    if img is not None:
        faces = model.get(img)

    print(len(faces))
    
    face_embeddings_dist = []
    k = {}
    
    Roll_no = embeddings['Roll No'] 
    embed = embeddings['feature_0']
    dict1 = {}
    t = len(Roll_no)
    for i in range(t):
           dict1[Roll_no[i]] = embed[i]
    roll = []
    for face in faces: 
        sim = []
        local_array = []
                   
        for l in Roll_no:
              k=recognize_faces(dict1[l],face['embedding'])
              if k > 35:
                sim.append(l)
        
    sim = set(sim)   
    sim = list(sim)
    sim.sort()
    for i in sim:
      print(i)

if __name__ == "__main__":
    main()
