from datetime import date

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session

from ..database.connection import get_db
from ..database.models import LeaveRequest, Employee


router = APIRouter(
    prefix="/leaves",
    tags=["Leave Management"]
)


class LeaveCreate(BaseModel):
    employee_id: int
    leave_type: str
    start_date: date
    end_date: date
    remarks: str | None = None


class LeaveStatusUpdate(BaseModel):
    status: str
    admin_comment: str | None = None
    approved_by: int | None = None


@router.post("/")
def create_leave_request(
    leave_data: LeaveCreate,
    db: Session = Depends(get_db)
):
    employee = db.query(Employee).filter(
        Employee.id == leave_data.employee_id
    ).first()

    if not employee:
        raise HTTPException(
            status_code=404,
            detail="Employee not found"
        )

    if leave_data.end_date < leave_data.start_date:
        raise HTTPException(
            status_code=400,
            detail="End date cannot be before start date"
        )

    leave = LeaveRequest(
        employee_id=leave_data.employee_id,
        leave_type=leave_data.leave_type,
        start_date=leave_data.start_date,
        end_date=leave_data.end_date,
        remarks=leave_data.remarks,
        status="pending"
    )

    db.add(leave)
    db.commit()
    db.refresh(leave)

    return leave


@router.get("/")
def get_all_leaves(
    db: Session = Depends(get_db)
):
    return db.query(LeaveRequest).all()


@router.get("/{leave_id}")
def get_leave(
    leave_id: int,
    db: Session = Depends(get_db)
):
    leave = db.query(LeaveRequest).filter(
        LeaveRequest.id == leave_id
    ).first()

    if not leave:
        raise HTTPException(
            status_code=404,
            detail="Leave request not found"
        )

    return leave


@router.get("/employee/{employee_id}")
def get_employee_leaves(
    employee_id: int,
    db: Session = Depends(get_db)
):
    return db.query(LeaveRequest).filter(
        LeaveRequest.employee_id == employee_id
    ).all()


@router.put("/{leave_id}/status")
def update_leave_status(
    leave_id: int,
    status_data: LeaveStatusUpdate,
    db: Session = Depends(get_db)
):
    leave = db.query(LeaveRequest).filter(
        LeaveRequest.id == leave_id
    ).first()

    if not leave:
        raise HTTPException(
            status_code=404,
            detail="Leave request not found"
        )

    allowed_statuses = [
        "pending",
        "approved",
        "rejected",
        "cancelled"
    ]

    if status_data.status not in allowed_statuses:
        raise HTTPException(
            status_code=400,
            detail="Invalid leave status"
        )

    leave.status = status_data.status
    leave.admin_comment = status_data.admin_comment
    leave.approved_by = status_data.approved_by

    db.commit()
    db.refresh(leave)

    return leave


@router.delete("/{leave_id}")
def delete_leave(
    leave_id: int,
    db: Session = Depends(get_db)
):
    leave = db.query(LeaveRequest).filter(
        LeaveRequest.id == leave_id
    ).first()

    if not leave:
        raise HTTPException(
            status_code=404,
            detail="Leave request not found"
        )

    db.delete(leave)
    db.commit()

    return {
        "message": "Leave request deleted successfully"
    }