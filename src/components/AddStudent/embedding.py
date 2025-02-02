import cv2
from insightface.app import FaceAnalysis
import numpy as np
import os
import pandas as pd
import sys

class ImageCache:
    data = {}

def modified_get_image(name, to_rgb=False):
    key = (name, to_rgb)
    if key in ImageCache.data:
        return ImageCache.data[key]

    script_dir = os.path.dirname(os.path.abspath(__file__))
    images_dir = os.path.join(script_dir)
    ext_names = ['.jpg', '.png', '.jpeg']
    image_file = None

    for ext_name in ext_names:
        _image_file = os.path.join(images_dir, name)
        print(_image_file)
        if os.path.exists(_image_file):
            image_file = _image_file
            break

    if image_file is None:
        print('%s not found' % name)
        return None

    img = cv2.imread(image_file)
    if to_rgb:
        img = img[:, :, ::-1]

    ImageCache.data[key] = img
    return img

def is_image_processed(image_path, processed_df):
    return image_path in processed_df['Image Path'].tolist()

def update_processed_images(image_path, roll_no, processed_df):
    processed_df = processed_df.append({'Image Path': image_path, 'Roll No': roll_no}, ignore_index=True)
    processed_df.to_csv('processed_images.csv', index=False)

def create_embedding(image_path):
    model = FaceAnalysis(name="buffalo_l")
    model.prepare(ctx_id=-1)

    image = cv2.imread(image_path)
    embedding = model.get(image)
    return embedding[0]['embedding']

def save_embedding_to_excel(embedding, output_path, processed_df, input_image_path):
    try:

        if is_image_processed(input_image_path, processed_df):
            print(f"Image {input_image_path} has already been processed.")
            return

        if os.path.exists(output_path):

            df_existing = pd.read_excel(output_path, engine='openpyxl')
        else:

            df_existing = pd.DataFrame(columns=['Roll No'])
        last_roll_no = df_existing['Roll No'].max() if 'Roll No' in df_existing.columns else 0
        # new_roll_no = last_roll_no + 1 if last_roll_no > 0 else 1
        df_new = pd.DataFrame({'Roll No': [last_roll_no]})
        df_expanded = pd.DataFrame({'feature_0': [embedding]})
        df_new = pd.concat([df_new, df_expanded], axis=1)
        df_combined = pd.concat([df_existing, df_new], ignore_index=True)
        df_combined.to_excel(output_path, index=False, engine='openpyxl', sheet_name='Sheet1')
        update_processed_images(input_image_path, last_roll_no, processed_df)

        print(f"Embedding saved to {output_path}")
    except PermissionError:
        print(f"Error: Excel file '{output_path}' is currently open. Please close it and run the code again.")

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python script.py <photo_path>")
        sys.exit(1)

    input_image_path = sys.argv[1]
    output_excel_path = "images/embedding.xlsx"

    processed_images_path = 'processed_images.csv'
    if os.path.exists(processed_images_path):
        processed_df = pd.read_csv(processed_images_path)
    else:
        processed_df = pd.DataFrame(columns=['Image Path', 'Roll No'])

    embedding = create_embedding(input_image_path)

    if embedding is not None:
        save_embedding_to_excel(embedding, output_excel_path, processed_df, input_image_path)
    else:
        print("Failed to generate embedding.")
