from fastapi import FastAPI, Form
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from llama_index import StorageContext, load_index_from_storage
from llama_index.llms import Gemini
from llama_index.embeddings import GeminiEmbedding
from config import GOOGLE_API_KEY
from load_documents import load_and_index_pdf, sayyy

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/process_pdf/")
async def process_pdf(file_path: str = Form(...)):
    print("file_path: ", file_path)
    load_and_index_pdf(file_path)
    return {"message": "PDF processed successfully"}

@app.post("/answer_question/")
async def answer_question(question: str = Form(...)):
    print(question)
    
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
    
    print(answer)
    sayyy(answer)
    return JSONResponse(content={"answer": answer})

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)