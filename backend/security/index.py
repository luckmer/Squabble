from datetime import datetime, timedelta, timezone
from typing import Annotated
import jwt
from fastapi import Cookie, HTTPException, Response, status

from config.index import env
from models.security import TokenResponse


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

    def validate(self, token: str | None, type: str) -> str:
        credentials_exception = HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
        if token is None:
            raise credentials_exception
        try:
            payload = self.decode_token(token)
            if payload.get("type") != type:
                raise credentials_exception
            user_id = payload.get("sub")
            if user_id is None:
                raise credentials_exception
        except jwt.InvalidTokenError:
            raise credentials_exception
        return user_id

    def validate_token(
        self, access_token: Annotated[str | None, Cookie()] = None
    ) -> str:
        return self.validate(access_token, "access")

    def validate_refresh_token(
        self, refresh_token: Annotated[str | None, Cookie()] = None
    ) -> str:
        return self.validate(refresh_token, "refresh")

    def set_auth_cookies(self, response: Response, tokens: TokenResponse) -> None:
        response.set_cookie(
            key="access_token",
            value=tokens.access_token,
            httponly=True,
            secure=env.IS_PROD,
            samesite="strict" if env.IS_PROD else "lax",
            max_age=env.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
            path="/",
        )

        response.set_cookie(
            key="refresh_token",
            value=tokens.refresh_token,
            httponly=True,
            secure=env.IS_PROD,
            samesite="strict" if env.IS_PROD else "lax",
            max_age=env.REFRESH_TOKEN_EXPIRE_DAYS * 24 * 60 * 60,
            path="/",
        )

    def clear_auth_cookies(self, response: Response) -> None:
        response.delete_cookie(
            key="access_token",
            path="/",
            secure=env.IS_PROD,
            samesite="strict" if env.IS_PROD else "lax",
        )
        response.delete_cookie(
            key="refresh_token",
            path="/",
            secure=env.IS_PROD,
            samesite="strict" if env.IS_PROD else "lax",
        )


security = Security()
