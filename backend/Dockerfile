# base Img
FROM python:3.13.3
 
# workdir
WORKDIR /app
 
COPY requirements.txt .
 
# Run
RUN pip3 install -r requirements.txt
 
COPY . .
 
# Port
EXPOSE 8080
 
# command
CMD ["python3", "app.py"]