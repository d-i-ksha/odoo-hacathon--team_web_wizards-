from sqlalchemy import (
    Column,
    Integer,
    String,
    Date,
    Text,
    Enum,
    ForeignKey,
    TIMESTAMP,
    Numeric,
    SmallInteger,
    text
)
from sqlalchemy.orm import relationship

from .connection import Base


class Payroll(Base):
    __tablename__ = "payroll"

    id = Column(
        Integer,
        primary_key=True,
        autoincrement=True
    )

    employee_id = Column(
        Integer,
        ForeignKey("employees.id"),
        nullable=False,
        index=True
    )

    basic_salary = Column(
        Numeric(12, 2),
        nullable=False,
        default=0.00
    )

    allowances = Column(
        Numeric(12, 2),
        nullable=True,
        default=0.00
    )

    deductions = Column(
        Numeric(12, 2),
        nullable=True,
        default=0.00
    )

    net_salary = Column(
        Numeric(12, 2),
        nullable=False,
        default=0.00
    )

    pay_month = Column(
        SmallInteger,
        nullable=False
    )

    pay_year = Column(
        SmallInteger,
        nullable=False
    )

    payment_status = Column(
        String(20),
        nullable=True,
        default="pending"
    )

    created_at = Column(
        TIMESTAMP,
        nullable=True
    )

    updated_at = Column(
        TIMESTAMP,
        nullable=True
    )

    employee = relationship(
        "Employee",
        back_populates="payroll"
    )

class Leave(Base):
    __tablename__ = "leaves"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)

    employee_id = Column(
        Integer,
        ForeignKey("employees.id"),
        nullable=False
    )

    leave_type = Column(
        Enum("paid", "sick", "unpaid"),
        nullable=False
    )

    start_date = Column(Date, nullable=False)
    end_date = Column(Date, nullable=False)

    remarks = Column(Text, nullable=True)

    status = Column(
        Enum("pending", "approved", "rejected"),
        nullable=True,
        default="pending"
    )

    admin_comment = Column(Text, nullable=True)

    approved_by = Column(
        Integer,
        ForeignKey("employees.id"),
        nullable=True
    )

    created_at = Column(
        TIMESTAMP,
        nullable=True,
        server_default=text("CURRENT_TIMESTAMP")
    )

    updated_at = Column(
        TIMESTAMP,
        nullable=True,
        server_default=text("CURRENT_TIMESTAMP"),
        onupdate=text("CURRENT_TIMESTAMP")
    )