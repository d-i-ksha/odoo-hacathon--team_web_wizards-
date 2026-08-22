from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session

from ..database.connection import get_db
from ..database.models import Payroll, Employee


router = APIRouter(
    prefix="/payroll",
    tags=["Payroll"]
)


class PayrollCreate(BaseModel):
    employee_id: int
    basic_salary: float
    allowances: float = 0
    deductions: float = 0
    pay_month: int
    pay_year: int
    payment_status: str = "pending"


class PayrollUpdate(BaseModel):
    basic_salary: float | None = None
    allowances: float | None = None
    deductions: float | None = None
    pay_month: int | None = None
    pay_year: int | None = None
    payment_status: str | None = None


def calculate_net_salary(
    basic_salary: float,
    allowances: float,
    deductions: float
):
    return basic_salary + allowances - deductions


@router.post("/")
def create_payroll(
    payroll_data: PayrollCreate,
    db: Session = Depends(get_db)
):
    employee = db.query(Employee).filter(
        Employee.id == payroll_data.employee_id
    ).first()

    if not employee:
        raise HTTPException(
            status_code=404,
            detail="Employee not found"
        )

    if not 1 <= payroll_data.pay_month <= 12:
        raise HTTPException(
            status_code=400,
            detail="pay_month must be between 1 and 12"
        )

    net_salary = calculate_net_salary(
        payroll_data.basic_salary,
        payroll_data.allowances,
        payroll_data.deductions
    )

    payroll = Payroll(
        employee_id=payroll_data.employee_id,
        basic_salary=payroll_data.basic_salary,
        allowances=payroll_data.allowances,
        deductions=payroll_data.deductions,
        net_salary=net_salary,
        pay_month=payroll_data.pay_month,
        pay_year=payroll_data.pay_year,
        payment_status=payroll_data.payment_status
    )

    db.add(payroll)
    db.commit()
    db.refresh(payroll)

    return payroll


@router.get("/")
def get_all_payroll(
    db: Session = Depends(get_db)
):
    return db.query(Payroll).all()


@router.get("/{payroll_id}")
def get_payroll(
    payroll_id: int,
    db: Session = Depends(get_db)
):
    payroll = db.query(Payroll).filter(
        Payroll.id == payroll_id
    ).first()

    if not payroll:
        raise HTTPException(
            status_code=404,
            detail="Payroll record not found"
        )

    return payroll


@router.get("/employee/{employee_id}")
def get_employee_payroll(
    employee_id: int,
    db: Session = Depends(get_db)
):
    return db.query(Payroll).filter(
        Payroll.employee_id == employee_id
    ).all()


@router.put("/{payroll_id}")
def update_payroll(
    payroll_id: int,
    payroll_data: PayrollUpdate,
    db: Session = Depends(get_db)
):
    payroll = db.query(Payroll).filter(
        Payroll.id == payroll_id
    ).first()

    if not payroll:
        raise HTTPException(
            status_code=404,
            detail="Payroll record not found"
        )

    update_data = payroll_data.model_dump(
        exclude_unset=True
    )

    for key, value in update_data.items():
        setattr(payroll, key, value)

    payroll.net_salary = calculate_net_salary(
        payroll.basic_salary,
        payroll.allowances,
        payroll.deductions
    )

    db.commit()
    db.refresh(payroll)

    return payroll


@router.delete("/{payroll_id}")
def delete_payroll(
    payroll_id: int,
    db: Session = Depends(get_db)
):
    payroll = db.query(Payroll).filter(
        Payroll.id == payroll_id
    ).first()

    if not payroll:
        raise HTTPException(
            status_code=404,
            detail="Payroll record not found"
        )

    db.delete(payroll)
    db.commit()

    return {
        "message": "Payroll record deleted successfully"
    }