import streamlit as st
from config import GOOGLE_API_KEY, ALLOWED_FILENAME
from load_documents import load_and_index_pdf, sayyy
from llama_index import StorageContext, load_index_from_storage
from llama_index.llms import Gemini
from llama_index.embeddings import GeminiEmbedding

st.title("PDF Question Answering System")

uploaded_file = st.file_uploader("Upload a PDF file", type="pdf")

if uploaded_file:
    with open("temp.pdf", "wb") as f:
        f.write(uploaded_file.getbuffer())
    load_and_index_pdf("temp.pdf")
    st.success("PDF processed successfully!")

question = st.text_input("Ask a question about the PDF:")

if question:
    storage_context = StorageContext.from_defaults(persist_dir="index_storage")
    llm = Gemini(api_key=GOOGLE_API_KEY, model_name="gemini-pro")
    embed_model = GeminiEmbedding(model_name="models/embedding-001", api_key=GOOGLE_API_KEY)
    
    index = load_index_from_storage(
        storage_context,
        llm=llm,
        embed_model=embed_model
    )
    
    query_engine = index.as_query_engine(
        response_mode="compact",
        streaming=False
    )
    
    response = query_engine.query(question)
    answer = str(response)
    
    st.write("Answer:", answer)
    sayyy(answer)