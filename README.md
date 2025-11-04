# FastorCRM Backend

A simple **Customer Relationship Management (CRM) system backend** built with **Node.js, Express, and MongoDB**. This system is designed for employees/counselors to manage and track enquiries (leads) from prospective clients.

---

## 💡 Business Logic & Features

The application is built around the following core CRM logic:

1.  **Public Enquiries:** Prospective clients submit enquiries (Name, Email, Course Interest) via an unauthenticated API endpoint. All new leads are initially visible to all employees.
2.  **Claiming:** Any employee/counselor can "Claim" a public enquiry.
3.  **Private Enquiries:** Once claimed, the enquiry becomes private, visible only to the counselor who claimed it, and its status changes from `PUBLIC` to `CLAIMED`.
4.  **Authentication:** Employee access is secured using **JWT (JSON Web Tokens)**.

| Feature | Description |
| :--- | :--- |
| **Auth** | Employee registration and login with JWT. |
| **Lead Capture** | Unauthenticated endpoint for new enquiry submission. |
| **Public View** | Fetch all unclaimed enquiries (visible to all counselors). |
| **Claim Action** | Endpoint to assign a public lead to the logged-in counselor. |
| **Private View** | Fetch only the enquiries claimed by the logged-in counselor. |

---

## ⚙️ Tech Stack

This project uses the MERN stack's backend components with secure authentication libraries:

* **Node.js** – JavaScript runtime environment.
* **Express** – Minimalist and flexible Node.js web application framework.
* **MongoDB & Mongoose** – NoSQL database and Object Data Modeling (ODM) library.
* **bcrypt** – Library for hashing and securing passwords.
* **jsonwebtoken (JWT)** – Standard for secure token-based authentication.
* **dotenv** – Module to load environment variables from a `.env` file.

---

## 💻 Getting Started

### Prerequisites

* Node.js (LTS version recommended)
* MongoDB database (local or cloud instance)
* Postman or similar API testing tool

### Installation

1.  Clone the repository:

    ```bash
    git clone https://github.com/Raja28/FasterCRM.git
    cd FastorCRM
    ```

2.  Install dependencies:

    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    * Create a file named **`.env`** in the project root directory.
    * Add the following variables and fill in your actual connection string and secret key:

    ```dotenv
    # .env
    PORT=2025
    MONGO_URI=mongodb+srv://rja69100_db_user:pgACgUOi63mHZ9A6@fastercrm1.5jlwhjq.mongodb.net/?appName=fasterCRM1
    # Generate a long, random hexadecimal string for JWT_SECRET
    JWT_SECRET= "YOUR SECRET KEY" 
    ```

4.  Start the server:

    ```bash
    npm start
    # For development with automatic restart:
    # npm run dev
    ```

The server will be running at `http://localhost:2025`.

---

## 🚀 API Endpoints

All authenticated requests require a **JWT** sent in the `Authorization` header as **`Bearer <token>`**.

### Authentication & User Management

| Method | Endpoint | Description | Required Fields |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Create a new employee/counselor account. | `name`, `email`, `password` |
| `POST` | `/api/auth/login` | Authenticate an employee and receive a JWT. | `email`, `password` |

### Enquiry Management

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/enquiries` | **Client Submission:** Create a new public enquiry/lead. | No |
| `GET` | `/api/enquiries/` | View all **unclaimed** leads (where `status: 'PUBLIC'`). | Yes (Counselor) |
| `GET` | `/api/enquiries/claimed` | View all leads **claimed** by the logged-in counselor. | Yes (Counselor) |
| `PUT` | `/api/enquiries/:id/claim` | **Claim Action:** Assigns a public lead to the logged-in counselor. | Yes (Counselor) |