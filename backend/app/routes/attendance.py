from datetime import date, time

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session

from ..database.connection import get_db
from ..database.models import Attendance, Employee


router = APIRouter(
    prefix="/attendance",
    tags=["Attendance"]
)


class AttendanceCreate(BaseModel):
    employee_id: int
    attendance_date: date
    check_in: time | None = None
    check_out: time | None = None
    status: str = "present"


class CheckInRequest(BaseModel):
    employee_id: int


class CheckOutRequest(BaseModel):
    employee_id: int


@router.post("/")
def create_attendance(
    attendance_data: AttendanceCreate,
    db: Session = Depends(get_db)
):
    employee = db.query(Employee).filter(
        Employee.id == attendance_data.employee_id
    ).first()

    if not employee:
        raise HTTPException(
            status_code=404,
            detail="Employee not found"
        )

    attendance = Attendance(
        employee_id=attendance_data.employee_id,
        attendance_date=attendance_data.attendance_date,
        check_in=attendance_data.check_in,
        check_out=attendance_data.check_out,
        status=attendance_data.status
    )

    db.add(attendance)
    db.commit()
    db.refresh(attendance)

    return attendance


@router.get("/")
def get_all_attendance(
    db: Session = Depends(get_db)
):
    return db.query(Attendance).all()


@router.get("/employee/{employee_id}")
def get_employee_attendance(
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

    return db.query(Attendance).filter(
        Attendance.employee_id == employee_id
    ).all()


@router.post("/check-in")
def check_in(
    request: CheckInRequest,
    db: Session = Depends(get_db)
):
    employee = db.query(Employee).filter(
        Employee.id == request.employee_id
    ).first()

    if not employee:
        raise HTTPException(
            status_code=404,
            detail="Employee not found"
        )

    today = date.today()

    existing = db.query(Attendance).filter(
        Attendance.employee_id == request.employee_id,
        Attendance.attendance_date == today
    ).first()

    if existing:
        raise HTTPException(
            status_code=400,
            detail="Attendance already marked today"
        )

    current_time = time(
        hour=__import__("datetime").datetime.now().hour,
        minute=__import__("datetime").datetime.now().minute,
        second=__import__("datetime").datetime.now().second
    )

    attendance = Attendance(
        employee_id=request.employee_id,
        attendance_date=today,
        check_in=current_time,
        status="present"
    )

    db.add(attendance)
    db.commit()
    db.refresh(attendance)

    return attendance


@router.post("/check-out")
def check_out(
    request: CheckOutRequest,
    db: Session = Depends(get_db)
):
    today = date.today()

    attendance = db.query(Attendance).filter(
        Attendance.employee_id == request.employee_id,
        Attendance.attendance_date == today
    ).first()

    if not attendance:
        raise HTTPException(
            status_code=404,
            detail="No attendance record found for today"
        )

    if attendance.check_out:
        raise HTTPException(
            status_code=400,
            detail="Already checked out"
        )

    from datetime import datetime

    attendance.check_out = datetime.now().time()

    db.commit()
    db.refresh(attendance)

    return attendance