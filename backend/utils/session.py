from fastapi import Response

from schemas import (
    TokenResponse,
)

from security import security


class Session:

    @staticmethod
    def get_access_tokens(user_id: str) -> TokenResponse:
        return TokenResponse(
            access_token=security.create_access_token(user_id),
            refresh_token=security.create_refresh_token(user_id),
        )

    @staticmethod
    def token_refresh(response: Response, user_id: str):
        tokens = TokenResponse(
            access_token=security.create_access_token(user_id),
            refresh_token=security.create_refresh_token(user_id),
        )

        security.set_auth_cookies(response, tokens)

        return tokens
