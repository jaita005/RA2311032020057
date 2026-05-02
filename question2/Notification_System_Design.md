# STAGE 2 - NOTIFICATION PRIORITY WITH SIMPLE UI

## Problem Statement 

To build a notification react display to fetch all notifications.

## Features

### 1. Display Notifications

- Fetches notifications from the provided API.
- Displays them using Material UI cards.

### 2. Filter by Type

Users can filter notifications by:
- Event
- Result
- Placement
- Selecting "All" shows all notifications.

### 3. Priority View
Displays top 10 most important notifications.

### 4. Pagination
- Notifications are displayed in pages (5 per page).
- Users can navigate using Next and Previous buttons.

---

## Priority Logic

Each notification type is assigned a weight:

- Placement → 3
- Result → 2
- Event → 1

Sorting is performed based on:

1. Higher priority weight first
2. More recent timestamp if weights are equal


## Tech Stack

* React (Vite)
* Material UI
* JavaScript (ES6+)



## How to Run

```bash
npm install
npm run dev
```

Application runs on:

```
http://localhost:5173
```


## Project Structure

```
frontend/
 ├── src/
 │    ├── App.jsx
 │    └── main.jsx
 ├── package.json
```





