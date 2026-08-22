from datetime import datetime, date, time

from sqlalchemy import (
    Column,
    Integer,
    String,
    Boolean,
    Date,
    Time,
    DateTime,
    ForeignKey,
    Float,
    Text
)

from sqlalchemy.orm import relationship

from .connection import Base


# =========================================================
# USERS
# =========================================================

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    employee_id = Column(Integer, nullable=True)
    email = Column(String(255), unique=True, nullable=False, index=True)
    password_hash = Column(String(255), nullable=False)
    role = Column(String(50), nullable=False, default="employee")
    email_verified = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    employee = relationship(
        "Employee",
        back_populates="user",
        foreign_keys="Employee.user_id"
    )


# =========================================================
# EMPLOYEES
# =========================================================

class Employee(Base):
    __tablename__ = "employees"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)

    first_name = Column(String(100), nullable=False)
    last_name = Column(String(100), nullable=False)
    phone = Column(String(30), nullable=True)
    address = Column(Text, nullable=True)
    profile_picture = Column(String(500), nullable=True)

    department = Column(String(100), nullable=True)
    designation = Column(String(100), nullable=True)

    joining_date = Column(Date, nullable=True)
    status = Column(String(50), default="active")

    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow
    )

    user = relationship(
        "User",
        back_populates="employee",
        foreign_keys=[user_id]
    )

    attendance = relationship(
        "Attendance",
        back_populates="employee"
    )

    leave_requests = relationship(
        "LeaveRequest",
        back_populates="employee"
    )

    payroll = relationship(
        "Payroll",
        back_populates="employee"
    )


# =========================================================
# ATTENDANCE
# =========================================================

class Attendance(Base):
    __tablename__ = "attendance"

    id = Column(Integer, primary_key=True, index=True)

    employee_id = Column(
        Integer,
        ForeignKey("employees.id"),
        nullable=False
    )

    attendance_date = Column(Date, nullable=False)

    check_in = Column(Time, nullable=True)
    check_out = Column(Time, nullable=True)

    status = Column(
        String(50),
        nullable=False,
        default="present"
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )

    employee = relationship(
        "Employee",
        back_populates="attendance"
    )


# =========================================================
# LEAVE REQUESTS
# =========================================================

class LeaveRequest(Base):
    __tablename__ = "leave_requests"

    id = Column(Integer, primary_key=True, index=True)

    employee_id = Column(
        Integer,
        ForeignKey("employees.id"),
        nullable=False
    )

    leave_type = Column(String(50), nullable=False)

    start_date = Column(Date, nullable=False)
    end_date = Column(Date, nullable=False)

    remarks = Column(Text, nullable=True)

    status = Column(
        String(50),
        nullable=False,
        default="pending"
    )

    admin_comment = Column(Text, nullable=True)

    approved_by = Column(Integer, nullable=True)

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )

    updated_at = Column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow
    )

    employee = relationship(
        "Employee",
        back_populates="leave_requests"
    )


# =========================================================
# PAYROLL
# =========================================================

class Payroll(Base):
    __tablename__ = "payroll"

    id = Column(Integer, primary_key=True, index=True)

    employee_id = Column(
        Integer,
        ForeignKey("employees.id"),
        nullable=False
    )

    basic_salary = Column(Float, nullable=False, default=0)
    allowances = Column(Float, nullable=False, default=0)
    deductions = Column(Float, nullable=False, default=0)
    net_salary = Column(Float, nullable=False, default=0)

    pay_month = Column(Integer, nullable=False)
    pay_year = Column(Integer, nullable=False)

    payment_status = Column(
        String(50),
        nullable=False,
        default="pending"
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )

    updated_at = Column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow
    )

    employee = relationship(
        "Employee",
        back_populates="payroll"
    )