from cryptography.fernet import Fernet
import os
from app.core.config import settings


def generate_key() -> bytes:
    """生成加密密钥"""
    return Fernet.generate_key()


def encrypt_data(data: str) -> str:
    """加密数据"""
    if not data:
        return ""
    fernet = Fernet(settings.ENCRYPTION_KEY.encode())
    encrypted = fernet.encrypt(data.encode())
    return encrypted.decode()


def decrypt_data(encrypted_data: str) -> str:
    """解密数据"""
    if not encrypted_data:
        return ""
    fernet = Fernet(settings.ENCRYPTION_KEY.encode())
    decrypted = fernet.decrypt(encrypted_data.encode())
    return decrypted.decode()