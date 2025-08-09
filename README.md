# AI-Powered Feedback App

A simple full-stack application that takes a user's response, sends it to a **mock Gemini API** (Mock Data), and returns AI-generated feedback.  
The app also stores all responses and feedback in MongoDB and allows users to view past submissions.

---

## 🚀 Features

- **Frontend**: React.js + Tailwind CSS
- **Backend**: Node.js + Express
- **Database**: MongoDB Atlas
- **Mock API**: Mock Data(for simulating Gemini API)
- **Endpoints**:
  - `POST /api/feedback` → Accepts user input, returns AI feedback, stores in DB
  - `GET /api/history` → Returns past submissions

---

## 🛠 Tech Stack

- **React.js** – UI development
- **Tailwind CSS** – Styling
- **Axios** – API requests
- **Node.js + Express** – Backend
- **MongoDB + Mongoose** – Database

---

## 📂 Project Structure

```
ai-feedback-app/
├── client/ # React.js Frontend
├── server/ # Node.js + Express Backend
├── README.md
```
