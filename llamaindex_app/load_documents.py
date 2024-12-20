from llama_index.core import SimpleDirectoryReader, VectorStoreIndex
from llama_index.llms.gemini import Gemini
from llama_index.embeddings.gemini import GeminiEmbedding
import pyttsx3
from config import GOOGLE_API_KEY, ALLOWED_FILENAME

text_speech = pyttsx3.init()

def load_and_index_pdf(file_path):
    documents = SimpleDirectoryReader(input_files=[ALLOWED_FILENAME]).load_data()
    llm = Gemini(api_key=GOOGLE_API_KEY, model_name="gemini-pro")
    embed_model = GeminiEmbedding(model_name="models/embedding-001", api_key=GOOGLE_API_KEY)
    
    index = VectorStoreIndex.from_documents(
        documents,
        llm=llm,
        embed_model=embed_model
    )
    index.storage_context.persist("index_storage")
    return index

def sayyy(answer):
    text_speech.say(answer)
    text_speech.runAndWait()