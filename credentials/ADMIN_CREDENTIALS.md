# Admin Credentials

This document stores the pre-registered admin account details for the GCIT WhatsApp AI Chatbot Dashboard.

**Email:** `admin.gcit@rub.edu.bt`  
**Password:** `............`  

## Implementation Details
- Currently, these credentials are hardcoded into the React frontend context (`AuthContext.jsx`) as a mocked simulation so the dashboard UI and routing flow can be fully explored without an active backend.
- When connecting to the Python backend, you should remove the hardcoded check inside `AuthContext.login` and substitute it with an API `POST` request to an `/api/auth/login` endpoint that produces a secure JWT token.
- Standard React Context protects the routing flow (`<ProtectedRoute>`).
