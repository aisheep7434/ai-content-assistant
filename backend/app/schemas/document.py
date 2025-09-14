from pydantic import BaseModel, ConfigDict
from datetime import datetime

# 导入这个文件是可选的，但有助于类型提示
# from typing import Optional 


# 这个 Schema 定义了当我们从 API "传出" (Out) 一个文档时，它应该长什么样
# 它应该包含我们希望前端看到的数据库模型中的所有字段
class DocumentOut(BaseModel):
    id: int
    prompt: str | None  # 我们的模型允许 prompt 为空 (nullable)
    content: str
    type: str
    created_at: datetime

    # 【关键】这就是我注释中提到的魔法配置
    # 它告诉 Pydantic 从对象的属性（ORM 模式）而不是字典中读取数据
    model_config = ConfigDict(from_attributes=True)