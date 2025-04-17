import os
from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware  # Untuk mengizinkan request dari frontend Next.js di domain berbeda 
import json
import google.generativeai as genai
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Set environment variable for Google credentials
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = os.getenv("GOOGLE_APPLICATION_CREDENTIALS")


app = FastAPI()

# Setup CORS 
origins = [
    "http://localhost:3000",  # dev server Next.js 
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/sales-reps")
def get_sales_data():
    try:
        with open("dummyData.json", "r") as f:
            data = json.load(f)
        return data  
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# Define the /api/ai endpoint
genai.configure()
model = genai.GenerativeModel('gemini-2.0-flash')

@app.post("/api/ai")
async def ai_endpoint(request: Request):
    data = await request.json()
    question = data.get("question")
    
    if not question:
        raise HTTPException(status_code=400, detail="Question is required")

    try:
        response = model.generate_content(question)
        return {"answer": response.text}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

