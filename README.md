# MedLink AI

An AI-assisted healthcare referral management platform that streamlines critical patient transfers through intelligent referral workflows, centralized hospital resource management, and role-based access control.

---

## Problem Statement

Every minute is critical during a medical emergency, yet thousands of patients experience delays in receiving timely treatment due to inefficient hospital referral processes. Patients often rely on phone calls, personal networks, or manual coordination to locate hospitals with available ICU beds, ventilators, specialists, or emergency resources. This fragmented process leads to delayed decision-making, increased administrative burden on healthcare professionals, and, in critical situations, can cost lives.

Additionally, hospitals lack a centralized system to share real-time resource availability, making it difficult to identify the most suitable facility for patient transfer. The absence of a structured referral workflow results in poor communication, limited visibility into referral status, and inefficient utilization of healthcare resources across hospitals.

---

## Solution

MedLink AI provides a centralized platform where:

- Doctors focus solely on patient diagnosis and referral initiation.
- Referral Coordinators manage hospital transfers using AI-assisted recommendations.
- Hospital Administrators manage staff, departments, and medical resources.
- Hospitals collaborate through a secure, role-based referral network.

---

## Key Features

- AI-assisted Hospital Recommendation
- Digital Patient Referral Workflow
- Hospital Resource Management
- Department & Staff Management
- Multi-Hospital Support
- Role-Based Access Control (RBAC)
- Secure JWT Authentication
- Responsive Modern Dashboard

---

## Workflow

```text
Hospital Registration
        │
        ▼
Hospital Admin
        │
        ├── Manage Staff
        ├── Manage Departments
        └── Manage Resources
                │
                ▼
Doctor
        │
        ├── Create Patient
        ├── Add Clinical Details
        └── Forward Referral
                │
                ▼
Referral Coordinator
        │
        ├── Review Case
        ├── AI Hospital Recommendation
        └── Send Referral
                │
                ▼
Receiving Hospital
        │
        ├── Accept / Reject Referral
        └── Patient Transfer
```

---

## Tech Stack

| Category | Technologies |
|----------|--------------|
| **Frontend** | React.js, Vite, Tailwind CSS, Shadcn UI, Aceternity UI|
| **Backend** | Node.js, Express.js, JWT Authentication, bcrypt |
| **AI & Machine Learning** | Python, Scikit-learn, Pandas, NumPy, uvicorn, fastapi |
| **Database** | MongoDB |

---

## Architecture

```text
React
   │
REST APIs
   │
Controllers
   │
Services
   │
Repositories
   │
MongoDB Atlas
```

---

## Security

- JWT Authentication
- Password Hashing (bcrypt)
- Role-Based Access Control (RBAC)
- Protected REST APIs
- Input Validation

---

## Future Enhancements

- Real-time Notifications using sockets.io
- Ambulance Integration
- Electronic Health Record (EHR) Integration

---

---

# Contributing

We welcome contributions from everyone! Whether you're fixing bugs, improving the UI, optimizing the backend, or adding new features, your contributions are appreciated.

### 1. Fork the repository

Click the **Fork** button on GitHub to create your own copy of the repository.

### 2. Clone your fork

```bash
git clone https://github.com/madupojumounika/medlink

```

### 3. Install dependencies

#### Frontend

```bash
cd client
npm install
```

#### Backend

```bash
cd ../server
npm install
```

#### AI Service

```bash
cd ../ai-service
pip install -r requirements.txt
```

### 4. Configure environment variables

Create (`server/.env`):

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### 5. Run the project

Backend

```bash
npm run dev
```

Frontend

```bash
npm run dev
```

AI Service

```bash
uvicorn main:app --reload
```

## Contribution Guidelines

- Create a new branch for every contribution.

```bash
git checkout -b feature/your-feature-name
```

- Write clean, readable, and maintainable code.
- Follow the existing folder structure.
- Test your changes before submitting.
- Update documentation if your changes affect functionality.
- Keep commits meaningful.

## Pull Request 

1. Push your branch to your fork.

```bash
git push origin feature/your-feature-name
```

2. Open a Pull Request.
3. Clearly describe:
   - What you changed
   - Why the change was needed
   - Screenshots (if UI changes)
4. Wait for review and address any requested changes.


> **Note:** Please avoid submitting trivial changes such as fixing a typo, changing spacing, or modifying formatting only. Meaningful contributions that improve functionality, performance, documentation, security, or user experience are encouraged.
