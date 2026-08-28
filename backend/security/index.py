from datetime import datetime, timedelta, timezone
from typing import Annotated

import jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer

from config.index import env

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


class Security:
    def create_token(
        self, subject: str, expires_delta: timedelta, token_type: str = "access"
    ) -> str:
        expire = datetime.now(timezone.utc) + expires_delta
        payload = {"sub": subject, "exp": expire, "type": token_type}
        return jwt.encode(payload, env.SECRET_KEY, algorithm=env.ALGORITHM)

    def create_access_token(self, user_id: str) -> str:
        return self.create_token(
            user_id, timedelta(minutes=env.ACCESS_TOKEN_EXPIRE_MINUTES), "access"
        )

    def create_refresh_token(self, user_id: str) -> str:
        return self.create_token(
            user_id, timedelta(days=env.REFRESH_TOKEN_EXPIRE_DAYS), "refresh"
        )

    def decode_token(self, token: str) -> dict:
        return jwt.decode(token, env.SECRET_KEY, algorithms=[env.ALGORITHM])

    def validate_token(self, token: Annotated[str, Depends(oauth2_scheme)]) -> str:
        credentials_exception = HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
        try:
            payload = self.decode_token(token)
            if payload.get("type") != "access":
                raise credentials_exception
            user_id = payload.get("sub")
            if user_id is None:
                raise credentials_exception
        except jwt.InvalidTokenError:
            raise credentials_exception

        return user_id


security = Security()
