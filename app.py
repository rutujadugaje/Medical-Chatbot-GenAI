from flask import Flask, request, send_from_directory
from src.helper import download_hugging_face_embeddings
from langchain_pinecone import PineconeVectorStore
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.chains import create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.prompts import ChatPromptTemplate
from dotenv import load_dotenv
from src.prompt import *
import os
from flask_cors import CORS

# initializing flask 
app = Flask(__name__, static_folder="frontend")
CORS(app)

load_dotenv()

# Setting up the gemini and pinecone environment
PINECONE_API_KEY=os.environ.get('PINECONE_API_KEY')
GOOGLE_API_KEY=os.environ.get('GOOGLE_API_KEY')

os.environ["PINECONE_API_KEY"]=PINECONE_API_KEY
os.environ["GOOGLE_API_KEY"]=GOOGLE_API_KEY


embeddings = download_hugging_face_embeddings() 

index_name = "medicalbot"

docsearch = PineconeVectorStore.from_existing_index(
    index_name=index_name,
    embedding=embeddings
)

retriver = docsearch.as_retriever(search_type="similarity", search_kwargs={"k":3})


llm = ChatGoogleGenerativeAI(
    model="gemini-1.5-flash",
    temperature=0.4,
    max_output_tokens=500
)

prompt=ChatPromptTemplate.from_messages(
    [
        ("system",system_prompt),
        ("human","{input}"),
    ]
)

question_ans_chain = create_stuff_documents_chain(llm,prompt)
rag_chain = create_retrieval_chain(retriver,question_ans_chain)


@app.route("/")
def index():
    return send_from_directory("frontend", "index.html")


@app.route("/get", methods=["GET", "POST"])
def chat():
    msg = request.form["msg"]
    input = msg
    print(input)
    response = rag_chain.invoke({"input": msg})
    print(" Response: ", response["answer"])
    return str(response['answer'])


if __name__ ==  '__main__':
    app.run(host="0.0.0.0", port= 8080, debug= True)