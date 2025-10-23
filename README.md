# Pokémon Explorer

A simple full-stack application that displays Pokémon information with a list and detail view.

## Tech Stack
- **Backend:** Node.js, Express, TypeScript, Axios  
- **Frontend:** React, TypeScript, Bootstrap  
- **External API:** https://pokeapi.co/docs/v2

## Prerequisites
Install **Node.js** from [https://nodejs.org/](https://nodejs.org/)

Verify installation:
```bash
node -v
npm -v
```

## Installation
1. Download the zip file from GitHub and unzip it, or clone the repository.  
2. Navigate to the root project folder.  
3. Install dependencies for both frontend and backend:
```bash
npm install
```
The `postinstall` script automatically installs dependencies for both **backend** and **frontend**.

## Running the Project

### Run Both Frontend and Backend Together
From the root folder:
```bash
npm start
```

This runs:
- Backend → http://localhost:5000  
- Frontend → http://localhost:3000  

### Run Separately

**Backend:**
```bash
cd backend
npm start
```

**Frontend:**
```bash
cd frontend
npm start
```
