FROM python:3.10-slim-buster

WORKDIR /app

COPY . /app

# Install git + other dependencies needed for building Python packages
RUN apt-get update && apt-get install -y \
    git \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

RUN pip install --upgrade pip
RUN pip install -r requirements.txt

CMD ["python3", "app.py"]