from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..database.connection import get_db
from ..database.models import User, Employee
from ..schemas.auth import SignupRequest, LoginRequest
from ..services.auth_service import (
    hash_password,
    verify_password,
    create_access_token
)


router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


@router.post("/signup")
def signup(
    data: SignupRequest,
    db: Session = Depends(get_db)
):
    existing_user = db.query(User).filter(
        User.email == data.email
    ).first()

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    existing_employee = db.query(Employee).filter(
        Employee.employee_code == data.employee_code
    ).first()

    if existing_employee:
        raise HTTPException(
            status_code=400,
            detail="Employee ID already exists"
        )

    employee = Employee(
        employee_code=data.employee_code,
        name=data.name,
        email=data.email
    )

    db.add(employee)
    db.commit()
    db.refresh(employee)

    user = User(
        email=data.email,
        password=hash_password(data.password),
        role=data.role,
        employee_id=employee.id
    )

    db.add(user)
    db.commit()

    return {
        "message": "Account created successfully",
        "employee_id": employee.id
    }


@router.post("/login")
def login(
    data: LoginRequest,
    db: Session = Depends(get_db)
):
    user = db.query(User).filter(
        User.email == data.email
    ).first()

    if not user:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    if not verify_password(
        data.password,
        user.password
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    token = create_access_token(
        user.id,
        user.role
    )

    return {
        "access_token": token,
        "token_type": "bearer",
        "role": user.role
    }