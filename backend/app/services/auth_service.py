from pydantic import BaseModel, EmailStr
from typing import Optional


class EmployeeResponse(BaseModel):
    id: int
    employee_code: str
    name: str
    email: EmailStr
    phone: Optional[str] = None
    address: Optional[str] = None
    job_title: Optional[str] = None
    department: Optional[str] = None
    profile_picture: Optional[str] = None

    class Config:
        from_attributes = True


class EmployeeUpdate(BaseModel):
    phone: Optional[str] = None
    address: Optional[str] = None
    profile_picture: Optional[str] = None
    job_title: Optional[str] = None
    department: Optional[str] = None