# CampusFlow AI - Developer Contribution Guide

## Environment Setup
1. **Clone Repository**:
   ```bash
   git clone https://github.com/MitMakwana13/campusflow-ai.git
   cd campusflow-ai
   ```

2. **Backend Setup**:
   ```bash
   cd backend
   pip install -r requirements.txt
   python app/main.py
   ```

3. **Frontend Setup**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. **CI Pipeline Runner**:
   Before pushing changes, run the automated quality gate:
   ```bash
   python scripts/ci_test.py
   ```
