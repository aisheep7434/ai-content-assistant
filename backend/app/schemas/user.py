from pydantic import BaseModel, ConfigDict

class UserCreate(BaseModel):
    username: str
    password: str
class UserOut(BaseModel):
    id: int
    username: str
    model_config = ConfigDict(from_attributes=True)

class ApiKeyUpdate(BaseModel):
    api_key: str

class ApiKeyStatus(BaseModel):
    is_set: bool