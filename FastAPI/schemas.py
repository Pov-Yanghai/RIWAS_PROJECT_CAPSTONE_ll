from pydantic import BaseModel
from uuid import UUID
from models import requ

# -----------------------------
# Job requirement schemas
# -----------------------------
class RequBase(BaseModel):
    title: str
    description: str
    company_name: str
    tags_skill: str

    @classmethod
    def from_orm_model(cls, model: requ):
        return cls(
            job_id=model.id,
            title=model.title,
            description=model.description,
            company_name=model.department or "Unknown",
            tags_skill=str(model.requirements or "")
        )

class RequCreate(RequBase):
    pass

class Requ(RequBase):
    job_id: UUID  

    model_config = {
        "from_attributes": True
    }

# -----------------------------
# User profile schemas2
# -----------------------------
class UserProfileBase(BaseModel):
    about: str

class UserProfileCreate(UserProfileBase):
    pass

class UserProfile(UserProfileBase):
    user_id: UUID

    model_config = {
        "from_attributes": True
    }