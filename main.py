from pathlib import Path

import uvicorn


def main() -> None:
    backend_path = Path(__file__).resolve().parent / "backend"
    uvicorn.run(
        "main:app",
        app_dir=str(backend_path),
        host="127.0.0.1",
        port=8000,
        reload=True,
    )


if __name__ == "__main__":
    main()
