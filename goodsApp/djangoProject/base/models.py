from pydantic import BaseModel, Field, EmailStr, ValidationError
from typing import Optional
from datetime import datetime
from db_connection import db
# Create your models here.
goods_coollection = db['user']
#USER model
class User(BaseModel):
    _id: Optional[str] = None
    username: str
    password: str
    email: EmailStr
    phone: Optional[str] = None
    trustsdegree: Optional[int] = None
    image: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.now)