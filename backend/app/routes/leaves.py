from datetime import date
from typing import Optional

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session

from ..database.connection import get_db
from ..database.models import Employee, Leave


router = APIRouter(
    prefix="/leaves",
    tags=["Leave Management"]
)


class LeaveRequest(BaseModel):
    employee_id: int
    leave_type: str
    start_date: date
    end_date: date
    remarks: Optional[str] = None


class LeaveDecision(BaseModel):
    status: str
    admin_comment: Optional[str] = None


@router.post("/")
def apply_leave(
    data: LeaveRequest,
    db: Session = Depends(get_db)
):
    # Check employee exists
    employee = db.query(Employee).filter(
        Employee.id == data.employee_id
    ).first()

    if not employee:
        raise HTTPException(
            status_code=404,
            detail="Employee not found"
        )

    # Validate dates
    if data.start_date > data.end_date:
        raise HTTPException(
            status_code=400,
            detail="Start date cannot be after end date"
        )

    # Validate leave type
    leave_type = data.leave_type.lower()

    if leave_type not in [
        "paid",
        "sick",
        "unpaid"
    ]:
        raise HTTPException(
            status_code=400,
            detail="Leave type must be Paid, Sick, or Unpaid"
        )

    # Create leave request
    leave = Leave(
        employee_id=data.employee_id,
        leave_type=leave_type,
        start_date=data.start_date,
        end_date=data.end_date,
        remarks=data.remarks,
        status="pending"
    )

    db.add(leave)
    db.commit()
    db.refresh(leave)

    return {
        "message": "Leave request submitted",
        "leave_id": leave.id,
        "status": leave.status
    }


@router.get("/")
def get_all_leaves(
    db: Session = Depends(get_db)
):
    return db.query(Leave).order_by(
        Leave.start_date.desc()
    ).all()


@router.get("/employee/{employee_id}")
def get_employee_leaves(
    employee_id: int,
    db: Session = Depends(get_db)
):
    # Check employee exists
    employee = db.query(Employee).filter(
        Employee.id == employee_id
    ).first()

    if not employee:
        raise HTTPException(
            status_code=404,
            detail="Employee not found"
        )

    return db.query(Leave).filter(
        Leave.employee_id == employee_id
    ).order_by(
        Leave.start_date.desc()
    ).all()


@router.put("/{leave_id}/decision")
def decide_leave(
    leave_id: int,
    data: LeaveDecision,
    db: Session = Depends(get_db)
):
    # Convert input to lowercase
    decision = data.status.lower()

    # Validate decision
    if decision not in [
        "approved",
        "rejected"
    ]:
        raise HTTPException(
            status_code=400,
            detail="Status must be Approved or Rejected"
        )

    # Find leave request
    leave = db.query(Leave).filter(
        Leave.id == leave_id
    ).first()

    if not leave:
        raise HTTPException(
            status_code=404,
            detail="Leave request not found"
        )

    # Check current status
    if leave.status != "pending":
        raise HTTPException(
            status_code=400,
            detail="This leave request has already been decided"
        )

    # Update leave
    leave.status = decision
    leave.admin_comment = data.admin_comment

    db.commit()
    db.refresh(leave)

    return {
        "message": f"Leave {decision}",
        "leave_id": leave.id,
        "status": leave.status,
        "admin_comment": leave.admin_comment
    }