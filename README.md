### Techstack Used:

 
- Python
- LangChain
- Flask
- GPT
- Pinecone
- AWS



# AWS-CICD-Deployment-with-Github-Actions

## 1. Login to AWS console.

## 2. Create IAM user for deployment

	#with specific access

	1. EC2 access : It is virtual machine

	2. ECR: Elastic Container registry to save your docker image in aws


	#Description: About the deployment

	1. Build docker image of the source code

	2. Push your docker image to ECR

	3. Launch Your EC2 

	4. Pull Your image from ECR in EC2

	5. Lauch your docker image in EC2

	#Policy:

	1. AmazonEC2ContainerRegistryFullAccess

	2. AmazonEC2FullAccess

	
## 3. Create ECR repo to store/save docker image
    - Save the URI: 555012476061.dkr.ecr.ap-south-1.amazonaws.com/medicalchatbot
	
## 4. Create EC2 machine (Ubuntu) 

## 5. Open EC2 and Install docker in EC2 Machine:
	
	
	#optinal

	sudo apt-get update -y

	sudo apt-get upgrade
	
	#required

	curl -fsSL https://get.docker.com -o get-docker.sh

	sudo sh get-docker.sh

	sudo usermod -aG docker ubuntu

	newgrp docker
	
# 6. Configure EC2 as self-hosted runner:
    setting>actions>runner>new self hosted runner> choose os> then run command one by one


# 7. Setup github secrets:

   - AWS_ACCESS_KEY_ID
   - AWS_SECRET_ACCESS_KEY
   - AWS_DEFAULT_REGION
   - ECR_REPO
   - PINECONE_API_KEY
   - OPENAI_API_KEY





run command
<!-- CMD uvicorn main_demo:app --host 0.0.0.0 --port 8000 -->
docker run -it -p 8080:8080 -e PINECONE_API_KEY=pcsk_6ifaW2_Q6RZEH9yszDxYQkfxYKjEhHYr7FWGC3pRR8fMerLsqjHNL73bn2CLf5pEkrfj7R -e GOOGLE_API_KEY=AIzaSyBwiWy-lbKn_MhosBjRnMeheJz0hgOTon0  medical-chatbot:v1 

docker run -it -p 8080:8080 medical-chatbot:v1


# frontend buld
cd frontend
docker build --no-cache -t medical-frontend:v1 .     
docker run -d -p 80:80 medical-frontend:v1 .   



# docker initializing and build,run 
docker init
docker build --no-cache -t medical-chatbot:v1 .
docker history medical-chatbot:v1
docker system prune -a -f




# EC2 ubuntu command
docker ps -a
docker logs bf0d198f45f8     #type container id here
 ls -la
 cd backend/
 ls -la
 
