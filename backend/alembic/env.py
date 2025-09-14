# ⬇️ ⬇️ ⬇️ 在文件的最顶部添加这几行代码 ⬇️ ⬇️ ⬇️
from dotenv import load_dotenv
import os

# 构建 .env 文件的路径 (它在 alembic 目录的上一级, 即 backend/ 目录)
# os.path.dirname(__file__) 指向 /alembic 目录
# os.path.join(..., '..') 指向 /backend 目录
dotenv_path = os.path.join(os.path.dirname(__file__), '..', '.env')

# 加载 .env 文件中的环境变量
load_dotenv(dotenv_path)
from app.db.models import Base
from logging.config import fileConfig

from sqlalchemy import engine_from_config
from sqlalchemy import pool

from alembic import context

# this is the Alembic Config object, which provides
# access to the values within the .ini file in use.
config = context.config


# ----------------------------------------------------
# ⬇️ ⬇️ ⬇️ 在这里添加补充修复 ⬇️ ⬇️ ⬇️

# 从 .env 中读取我们的异步 URL (由顶部的 dotenv 加载)
async_db_url = os.getenv("DATABASE_URL")

if async_db_url:
    # 创建 Alembic 需要的同步 URL
    # 我们将 "postgresql+asyncpg" 替换为 "postgresql+psycopg2"
    sync_db_url = async_db_url.replace("postgresql+asyncpg", "postgresql+psycopg2")

    # 在 Alembic 的配置对象中，用同步 URL 覆盖原有的 sqlalchemy.url
    # 这样，当 run_migrations_online 被调用时，它会使用这个同步 URL
    config.set_main_option("sqlalchemy.url", sync_db_url)

# ⬆️ ⬆️ ⬆️ 修复添加完毕 ⬆️ ⬆️ ⬆️
# ----------------------------------------------------
# Interpret the config file for Python logging.
# This line sets up loggers basically.
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# add your model's MetaData object here
# for 'autogenerate' support
# from myapp import mymodel
# target_metadata = mymodel.Base.metadata
target_metadata = Base.metadata

# other values from the config, defined by the needs of env.py,
# can be acquired:
# my_important_option = config.get_main_option("my_important_option")
# ... etc.


def run_migrations_offline() -> None:
    """Run migrations in 'offline' mode.

    This configures the context with just a URL
    and not an Engine, though an Engine is acceptable
    here as well.  By skipping the Engine creation
    we don't even need a DBAPI to be available.

    Calls to context.execute() here emit the given string to the
    script output.

    """
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online() -> None:
    """Run migrations in 'online' mode.

    In this scenario we need to create an Engine
    and associate a connection with the context.

    """
    connectable = engine_from_config(
        config.get_section(config.config_ini_section, {}),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:
        context.configure(
            connection=connection, target_metadata=target_metadata
        )

        with context.begin_transaction():
            context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
