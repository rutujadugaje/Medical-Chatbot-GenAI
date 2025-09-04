from src.helper import load_pdf_file, text_split, download_hugging_face_embeddings
from pinecone.grpc import PineconeGRPC as Pinecone 
from langchain_pinecone import PineconeVectorStore
from pinecone import ServerlessSpec
from dotenv import load_dotenv
import os

load_dotenv()

#Pinecone credentials
PINECONE_API_KEY=os.environ.get('PINECONE_API_KEY')
os.environ['PINECONE_API_KEY']=PINECONE_API_KEY


extracted_data = load_pdf_file(data = "Data/")
text_chunks = text_split(extracted_data)
embeddings = download_hugging_face_embeddings()


#pinecone initialization
pc = Pinecone(api_key=PINECONE_API_KEY)

index_name = "medicalbot"

pc.create_index(
    name=index_name,
    dimension=384,
    metric="cosine",
    spec=ServerlessSpec(
        cloud="aws",
        region="us-east-1"
    )
)

# OR
# if index_name not in pc.list_indexes().names():
#     pc.create_index(
#         name=index_name,
#         dimension=384,
#         metric="cosine",
#         spec=ServerlessSpec(cloud="aws", region="us-east-1")
#     )



# Convert text chunks into embeddings and store them in Pinecone for semantic search
docsearch = PineconeVectorStore.from_documents(
    documents=text_chunks,
    index_name=index_name,
    embedding=embeddings
)