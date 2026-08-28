from datetime import datetime, timedelta, timezone
from config.index import env
import jwt


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


security = Security()
