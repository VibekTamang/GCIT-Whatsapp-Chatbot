from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_root():
    response = client.get("/")
    assert response.status_code == 200
    assert "Welcome" in response.json()["message"]
    print("Root endpoint OK:", response.json())

if __name__ == "__main__":
    print("Running basic tests...")
    test_root()
    print("Tests passed.")
