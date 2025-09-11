from src.helper import load_pdf_file, text_split, download_google_embeddings
from pinecone.grpc import PineconeGRPC as Pinecone 
from langchain_pinecone import PineconeVectorStore
from pinecone import ServerlessSpec
from dotenv import load_dotenv
import os

load_dotenv()

#Pinecone credentials
PINECONE_API_KEY=os.environ.get('PINECONE_API_KEY')
os.environ['PINECONE_API_KEY']=PINECONE_API_KEY

# Step 1: Load PDFs (old + new books)
data_folder = "Data/"        # your existing PDFs
new_book_folder = "Data/NewBook/" 

# Load and split old data
data_docs = load_pdf_file(data=data_folder)
data_chunks = text_split(data_docs)

# Load and split new book data
new_book_docs = load_pdf_file(data=new_book_folder)
new_book_chunks = text_split(new_book_docs)

# Combine both
all_chunks = data_chunks + new_book_chunks


#  2: Download embeddings
embeddings = download_google_embeddings()

# 3: pinecone initialization
pc = Pinecone(api_key=PINECONE_API_KEY)
index_name = "medicalbot"

# 4: Create index only if it doesn't exist
if index_name not in pc.list_indexes().names():
    pc.create_index(
        name=index_name,
        dimension=384,
        metric="cosine",
        spec=ServerlessSpec(
            cloud="aws",
            region="us-east-1")
    )
    print(f"✅ Created new index: {index_name}")
else:
    print(f"ℹ️ Using existing index: {index_name}")
    

# Convert text chunks into embeddings and store them in Pinecone for semantic search
docsearch = PineconeVectorStore.from_documents(
    documents=all_chunks,
    index_name=index_name,
    embedding=embeddings
)


docsearch.add_documents(all_chunks)
print(f"✅ Successfully added {len(all_chunks)} chunks (old + new books) into '{index_name}' index")