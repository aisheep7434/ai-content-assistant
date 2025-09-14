from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, func
from sqlalchemy.orm import relationship
from .session import Base


class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    encrypted_api_key = Column(String, nullable=True) # 存储加密后的 API Key
    documents = relationship("Document", back_populates="owner")

# ... (确保 Document 类的代码也是正确的)

class Document(Base):# ... (定义 Document 表, 如上一教程所示)
    __tablename__ = "documents"
    id = Column(Integer, primary_key=True, index=True)
    owner_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    prompt = Column(String)
    content = Column(String, nullable=False)
    type = Column(String, default="generation")
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    owner = relationship("User", back_populates="documents")