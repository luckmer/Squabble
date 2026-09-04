import base64
from urllib.parse import parse_qs, urlencode

from pydantic import BaseModel


class Cursor(BaseModel):
    offset: int = 0
    position: int | None = None


class CursorPagination:
    @staticmethod
    def encode_cursor(offset: int, position: int | None = None) -> str:
        tokens = {}
        if offset:
            tokens["o"] = str(offset)
        if position is not None:
            tokens["p"] = str(position)

        querystring = urlencode(tokens) if tokens else ""
        return base64.b64encode(querystring.encode("ascii")).decode("ascii")

    @staticmethod
    def decode_cursor(encoded: str) -> Cursor:
        try:
            querystring = base64.b64decode(encoded.encode("ascii")).decode("ascii")
            tokens = parse_qs(querystring, keep_blank_values=True)

            offset_raw = tokens.get("o", ["0"])[0]
            offset = int(offset_raw)

            position_raw = tokens.get("p", [None])[0]
            position = int(position_raw) if position_raw is not None else None

            return Cursor(offset=offset, position=position)

        except TypeError, ValueError, IndexError:
            raise ValueError("Invalid cursor")
