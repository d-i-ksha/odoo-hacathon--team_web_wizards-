from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session

from ..database.connection import get_db
from ..database.models import Employee, Payroll


router = APIRouter(
    prefix="/payroll",
    tags=["Payroll"]
)


class PayrollRequest(BaseModel):
    employee_id: int
    basic_salary: float
    allowances: float = 0
    deductions: float = 0


@router.post("/")
def create_or_update_payroll(
    data: PayrollRequest,
    db: Session = Depends(get_db)
):
    employee = db.query(Employee).filter(
        Employee.id == data.employee_id
    ).first()

    if not employee:
        raise HTTPException(
            status_code=404,
            detail="Employee not found"
        )

    if data.basic_salary < 0:
        raise HTTPException(
            status_code=400,
            detail="Basic salary cannot be negative"
        )

    if data.allowances < 0 or data.deductions < 0:
        raise HTTPException(
            status_code=400,
            detail="Allowances and deductions cannot be negative"
        )

    net_salary = (
        data.basic_salary
        + data.allowances
        - data.deductions
    )

    payroll = db.query(Payroll).filter(
        Payroll.employee_id == data.employee_id
    ).first()

    if payroll:
        payroll.basic_salary = data.basic_salary
        payroll.allowances = data.allowances
        payroll.deductions = data.deductions
        payroll.net_salary = net_salary
    else:
        payroll = Payroll(
            employee_id=data.employee_id,
            basic_salary=data.basic_salary,
            allowances=data.allowances,
            deductions=data.deductions,
            net_salary=net_salary
        )
        db.add(payroll)

    db.commit()
    db.refresh(payroll)

    return payroll


@router.get("/{employee_id}")
def get_payroll(
    employee_id: int,
    db: Session = Depends(get_db)
):
    payroll = db.query(Payroll).filter(
        Payroll.employee_id == employee_id
    ).first()

    if not payroll:
        raise HTTPException(
            status_code=404,
            detail="Payroll not found"
        )

    return payroll