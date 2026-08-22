from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .database.connection import Base, engine

from .routes import (
    auth,
    employees,
    attendance,
    leaves,
    payroll
)


# Create database tables if they don't exist
Base.metadata.create_all(bind=engine)


app = FastAPI(
    title="DayFlow HR Management API",
    description="Backend API for DayFlow HR Management System",
    version="1.0.0"
)


# =========================================================
# CORS
# =========================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =========================================================
# ROUTES
# =========================================================

app.include_router(auth.router)
app.include_router(employees.router)
app.include_router(attendance.router)
app.include_router(leaves.router)
app.include_router(payroll.router)


# =========================================================
# ROOT
# =========================================================

@app.get("/")
def root():
    return {
        "message": "DayFlow API is running",
        "database": "dayflowdb",
        "status": "success"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }