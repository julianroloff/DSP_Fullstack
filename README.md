# DSP Fullstack

This repository contains the complete full-stack implementation for the DSP project, organized into two main components:

1. **DSP_Backend**: The backend logic and services.
2. **DSP_Frontend**: The frontend interface and user experience.

## Repository Structure

```
DSP_Fullstack/
├── DSP_Backend/       # Backend services and APIs
├── DSP_Frontend/      # Frontend application
└── README.md          # Project overview and instructions
```

---

## Setup and Installation

### Prerequisites
Ensure you have the following installed:
- **Node.js** (version 16 or higher)
- **Python** (version 3.8 or higher, with `ifcopenshell` installed for IFC processing)
- **Git**

### Clone the Repository

```bash
git clone https://github.com/<your-username>/DSP_Fullstack.git
cd DSP_Fullstack
```

### Backend Setup

1. Navigate to the backend folder:
   ```bash
   cd DSP_Backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the backend server:
   ```bash
   npm start
   ```
   The server will run at `http://localhost:3000`.

### Frontend Setup

1. Navigate to the frontend folder:
   ```bash
   cd DSP_Frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the frontend application:
   ```bash
   npm start
   ```
   The application will run at `http://localhost:3001`.

---

## Features

### Backend
- **API for IFC to RDF Conversion**:
  - Converts uploaded IFC files to RDF format using Python's `ifcopenshell`.
- **File Upload Handling**:
  - Supports handling and processing of uploaded files.

### Frontend
- **User-Friendly Interface**:
  - Upload IFC files directly from the browser.
  - Download the resulting RDF files seamlessly.

---

## Usage

1. **Start Both Servers**:
   Ensure both the backend and frontend servers are running.

2. **Upload an IFC File**:
   - Navigate to the frontend application at `http://localhost:3001`.
   - Use the file upload feature to select an IFC file.

3. **Download RDF File**:
   - Once processed, download the converted RDF file directly from the frontend.

---

## Technologies Used

- **Backend**:
  - Node.js, Express.js
  - Python, IfcOpenShell

- **Frontend**:
  - React.js

---

## Contributing

1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature
   ```
5. Open a Pull Request.

---

## Contact


- **Name**: Julian Roloff
- **Email**: [julian.roloff@student.uva.nl]

- **Name**: Jeremy Palmerio
- **Email**: [jeremy.palmerio@student.uva.nl]

- **Name**: Theo Xu
- **Email**: [theo.xu@student.uva.nl]

- **Name**: Ties Leneman
- **Email**: [ties.leneman@student.uva.nl]



