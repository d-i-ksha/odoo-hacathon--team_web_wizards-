from datetime import date

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session

from ..database.connection import get_db
from ..database.models import Employee


router = APIRouter(
    prefix="/employees",
    tags=["Employees"]
)


class EmployeeCreate(BaseModel):
    user_id: int | None = None
    first_name: str
    last_name: str
    phone: str | None = None
    address: str | None = None
    profile_picture: str | None = None
    department: str | None = None
    designation: str | None = None
    joining_date: date | None = None
    status: str = "active"


class EmployeeUpdate(BaseModel):
    first_name: str | None = None
    last_name: str | None = None
    phone: str | None = None
    address: str | None = None
    profile_picture: str | None = None
    department: str | None = None
    designation: str | None = None
    joining_date: date | None = None
    status: str | None = None


@router.post("/")
def create_employee(
    employee_data: EmployeeCreate,
    db: Session = Depends(get_db)
):
    employee = Employee(
        user_id=employee_data.user_id,
        first_name=employee_data.first_name,
        last_name=employee_data.last_name,
        phone=employee_data.phone,
        address=employee_data.address,
        profile_picture=employee_data.profile_picture,
        department=employee_data.department,
        designation=employee_data.designation,
        joining_date=employee_data.joining_date,
        status=employee_data.status
    )

    db.add(employee)
    db.commit()
    db.refresh(employee)

    return employee


@router.get("/")
def get_employees(db: Session = Depends(get_db)):
    return db.query(Employee).all()


@router.get("/{employee_id}")
def get_employee(
    employee_id: int,
    db: Session = Depends(get_db)
):
    employee = db.query(Employee).filter(
        Employee.id == employee_id
    ).first()

    if not employee:
        raise HTTPException(
            status_code=404,
            detail="Employee not found"
        )

    return employee


@router.put("/{employee_id}")
def update_employee(
    employee_id: int,
    employee_data: EmployeeUpdate,
    db: Session = Depends(get_db)
):
    employee = db.query(Employee).filter(
        Employee.id == employee_id
    ).first()

    if not employee:
        raise HTTPException(
            status_code=404,
            detail="Employee not found"
        )

    update_data = employee_data.model_dump(
        exclude_unset=True
    )

    for key, value in update_data.items():
        setattr(employee, key, value)

    db.commit()
    db.refresh(employee)

    return employee


@router.delete("/{employee_id}")
def delete_employee(
    employee_id: int,
    db: Session = Depends(get_db)
):
    employee = db.query(Employee).filter(
        Employee.id == employee_id
    ).first()

    if not employee:
        raise HTTPException(
            status_code=404,
            detail="Employee not found"
        )

    db.delete(employee)
    db.commit()

    return {
        "message": "Employee deleted successfully"
    }