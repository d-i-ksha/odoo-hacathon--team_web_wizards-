from datetime import date, datetime

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..database.connection import get_db
from ..database.models import Attendance, Employee


router = APIRouter(
    prefix="/attendance",
    tags=["Attendance"]
)


@router.post("/check-in/{employee_id}")
def check_in(
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

    today = date.today()

    record = db.query(Attendance).filter(
        Attendance.employee_id == employee_id,
        Attendance.date == today
    ).first()

    if record and record.check_in:
        raise HTTPException(
            status_code=400,
            detail="Already checked in today"
        )

    if not record:
        record = Attendance(
            employee_id=employee_id,
            date=today,
            check_in=datetime.now().time(),
            status="Present"
        )
        db.add(record)
    else:
        record.check_in = datetime.now().time()

    db.commit()
    db.refresh(record)

    return {
        "message": "Check-in successful",
        "employee_id": employee_id,
        "date": record.date,
        "check_in": record.check_in,
        "status": record.status
    }


@router.post("/check-out/{employee_id}")
def check_out(
    employee_id: int,
    db: Session = Depends(get_db)
):
    today = date.today()

    record = db.query(Attendance).filter(
        Attendance.employee_id == employee_id,
        Attendance.date == today
    ).first()

    if not record:
        raise HTTPException(
            status_code=404,
            detail="No check-in record found for today"
        )

    if record.check_out:
        raise HTTPException(
            status_code=400,
            detail="Already checked out today"
        )

    record.check_out = datetime.now().time()

    db.commit()
    db.refresh(record)

    return {
        "message": "Check-out successful",
        "employee_id": employee_id,
        "date": record.date,
        "check_out": record.check_out
    }


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
    ).order_by(
        Attendance.date.desc()
    ).all()


@router.get("/")
def get_all_attendance(
    db: Session = Depends(get_db)
):
    return db.query(Attendance).order_by(
        Attendance.date.desc()
    ).all()