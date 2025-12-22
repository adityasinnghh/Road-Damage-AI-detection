 
---

# 🚧 AI-Based Road Damage Detection Dashboard

An **AI-powered road damage detection system** that uses **Google Gemini AI** to identify damaged road surfaces such as **potholes, cracks, depressions, and surface wear** from images and video inputs.
The system provides a **modern dashboard** to visualize detected damage along with **location, severity, confidence score, and status**, helping authorities take faster action.

---

## 📌 Project Overview

Road infrastructure damage is a major concern for urban safety and transportation efficiency. Traditional manual inspections are slow, expensive, and inefficient.

This project leverages **Artificial Intelligence (AI)** and **Computer Vision** to automatically detect road damage and present actionable insights through a **centralized dashboard**.

### 🎯 Key Objectives

* Detect road damage automatically using AI
* Classify damage severity (Critical, High, Medium, Low)
* Store and visualize damage data with location details
* Provide a dashboard for monitoring and decision-making
* Enable future integration with live maps and GPS

---

## 🤖 AI Technology Used

### Google Gemini AI

The project uses **Google Gemini AI** for intelligent object detection and analysis.

**Why Gemini AI?**

* Advanced multimodal understanding (images + context)
* High accuracy for object and damage recognition
* Scalable and future-ready AI platform
* Fast inference suitable for real-time or near real-time detection

**AI Capabilities**

* Detects damaged road objects such as:

  * Potholes
  * Road cracks
  * Surface depressions
  * Patch failures
* Assigns:

  * Damage type
  * Severity level
  * Confidence score

---

## 🖥️ Dashboard Features

The project includes a **professional web dashboard** designed for municipalities and administrators.

### 📊 Current Dashboard Features

* 📍 **Location-based damage records**
* 📄 **Detailed damage reports**
* ⚠️ **Severity classification**
* 📈 **Statistics & analytics**
* 🗂️ **Status tracking** (Pending, Verified, Resolved)
* 🎨 **Modern UI with Blue–White–Purple gradient theme**

### 🗺️ Map Integration (Coming Soon)

* Interactive map to visualize damage locations
* Pins/markers for each detected issue
* Heatmaps based on severity
* Integration planned using:

  * Google Maps API / Mapbox

---

## 🏗️ System Architecture

```
Image / Video Input
        ↓
Google Gemini AI
        ↓
Damage Detection & Classification
        ↓
Structured Damage Data
        ↓
Dashboard Visualization
        ↓
(Upcoming) Map Integration
```

---

## 🧩 Tech Stack

### Frontend

* **React + TypeScript**
* **Tailwind CSS**
* **ShadCN UI**
* Lucide Icons

### AI & Processing

* **Google Gemini AI**
* Object detection & classification logic

### Data Handling

* Mock data (current)
* API-ready structure for future backend integration

### Planned Backend (Future)

* Node.js / Java / Python backend
* Database (PostgreSQL / MongoDB)
* REST APIs

---

## 📂 Project Structure

```
src/
 ├── components/
 │    ├── Header
 │    ├── StatCard
 │    ├── DamageCard
 │    ├── SeverityBadge
 │
 ├── data/
 │    ├── mockData.ts
 │
 ├── pages/
 │    ├── Dashboard.tsx
 │
 ├── types/
 │    ├── damage.ts
 │
 ├── styles/
 │    ├── globals.css
```

---

## 🧪 Data Model (Example)

```ts
{
  id: "DL-1",
  type: "pothole",
  severity: "critical",
  latitude: 28.6675,
  longitude: 77.2283,
  address: "Ring Road, Delhi",
  confidence: 0.96,
  status: "pending",
  timestamp: "2024-12-15T10:30:00"
}
```

---

## 🚀 How to Run the Project

### Prerequisites

* Node.js (v18+ recommended)
* npm or yarn

### Installation

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

The app will be available at:

```
http://localhost:5173
```

---

## 🔮 Future Enhancements

* 🗺️ Live map integration with real GPS data
* 📱 Mobile camera support for live detection
* ☁️ Cloud backend & database
* 👮 Role-based access (Admin / Field Officer)
* 📊 Advanced analytics & reports
* 🔔 Real-time alerts for critical damage
* 🚗 Integration with dashcams & IoT devices

---

## 🏛️ Use Cases

* Municipal corporations
* Smart city initiatives
* Road maintenance departments
* Infrastructure monitoring agencies
* Research & academic projects

---

## 🎓 Academic & Practical Relevance

This project is ideal for:

* **Smart India Hackathon (SIH)**
* **Final year engineering projects**
* **AI / ML portfolios**
* **Urban infrastructure research**

---

## 📜 Disclaimer

This project currently uses **mock data** for demonstration purposes.
Map functionality and live AI inference will be integrated in future releases.

---

## 👨‍💻 Authors

**Aditya Singh**
 **Shivam Verma**
 **Piyush Singh**

---

---
## 🏁 Smart India Hackathon (SIH) – Problem Statement

Problem Title

AI-Based Road Damage Detection and Monitoring System

---
## ⭐ Support

If you like this project:

* ⭐ Star the repository
* 🧠 Suggest improvements


---

