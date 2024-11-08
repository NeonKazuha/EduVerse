from dotenv import load_dotenv
import os
import google.generativeai as genai

load_dotenv()
GOOGLE_API_KEY = os.getenv('GOOGLE_API_KEY')
genai.configure(api_key=GOOGLE_API_KEY)

ALLOWED_FILENAME = 'assets/lecture1.pdf'