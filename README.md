# ☁️ CloudTasker Pro

A cloud-native Kubernetes monitoring and task management dashboard built for a Cloud Computing assignment. Features a premium SaaS-grade UI inspired by Vercel, Datadog, and Grafana.

---

## 🗂️ Project Structure

```
cloudtasker-pro/
├── frontend/                   # React + Vite + TailwindCSS
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── MetricCard.jsx
│   │   │   ├── TaskManager.jsx
│   │   │   ├── ActivityLog.jsx
│   │   │   ├── CloudMonitoring.jsx
│   │   │   └── ArchitectureDiagram.jsx
│   │   ├── hooks/
│   │   │   ├── useMetrics.js
│   │   │   └── useTasks.js
│   │   ├── utils/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── Dockerfile
│   ├── nginx.conf
│   └── package.json
├── backend/                    # Python Flask
│   ├── app.py
│   ├── requirements.txt
│   └── Dockerfile
├── k8s/                        # Kubernetes manifests
│   ├── 00-namespace.yaml
│   ├── 01-configmap.yaml
│   ├── 02-backend.yaml
│   └── 03-frontend.yaml
├── docker-compose.yml
└── README.md
```

---

## 🚀 Quick Start (Local Dev)

### Prerequisites
- Node.js 18+
- Python 3.10+
- Docker & Docker Compose

### Option A: Run Everything Locally

**Backend:**
```bash
cd backend
pip install -r requirements.txt
python app.py
# Runs on http://localhost:5000
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
# Runs on http://localhost:5173
# Auto-proxies /api → localhost:5000
```

---

## 🐳 Docker Compose (Recommended)

```bash
# From project root
docker compose up --build

# Access app at:
http://localhost:3000
```

---

## ☸️ Kubernetes Deployment

### Prerequisites
- Minikube or any K8s cluster
- kubectl configured
- Docker images built

### Step 1: Start Minikube
```bash
minikube start --driver=docker --cpus=2 --memory=4g
```

### Step 2: Use Minikube Docker daemon
```bash
eval $(minikube docker-env)
```

### Step 3: Build Docker images inside Minikube
```bash
# Build backend
docker build -t cloudtasker-backend:latest ./backend

# Build frontend
docker build -t cloudtasker-frontend:latest ./frontend
```

### Step 4: Apply Kubernetes manifests
```bash
kubectl apply -f k8s/00-namespace.yaml
kubectl apply -f k8s/01-configmap.yaml
kubectl apply -f k8s/02-backend.yaml
kubectl apply -f k8s/03-frontend.yaml
```

### Step 5: Verify deployment
```bash
# Check all pods are running
kubectl get pods -n cloudtasker

# Check services
kubectl get svc -n cloudtasker

# Check deployments
kubectl get deployments -n cloudtasker
```

### Step 6: Access the app
```bash
# Get Minikube IP
minikube ip

# Access at:
http://<minikube-ip>:30080
```

Or use tunnel:
```bash
minikube service cloudtasker-frontend-svc -n cloudtasker
```

---

## 🔌 API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Backend health check |
| GET | `/api/metrics` | Cluster metrics |
| GET | `/api/tasks` | List all tasks |
| POST | `/api/tasks` | Create task `{title, priority}` |
| DELETE | `/api/tasks/:id` | Delete task |
| PATCH | `/api/tasks/:id/toggle` | Toggle completion |

---

## 🎨 Features

- **Live Metrics** — CPU, memory, pods, requests auto-refresh every 4s
- **Task Management** — Add, delete, complete tasks with priority labels
- **Charts** — Area charts for CPU/memory, line chart for API latency
- **Activity Log** — Scrolling live Kubernetes event stream
- **Architecture Diagram** — Visual K8s topology diagram
- **Glassmorphism UI** — Dark theme with blur, gradients, animations

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite, TailwindCSS |
| Animations | Framer Motion |
| Charts | Recharts |
| HTTP | Axios |
| Icons | Lucide React |
| Backend | Python Flask, Flask-CORS |
| Production Server | Gunicorn (backend), Nginx (frontend) |
| Containerization | Docker (multi-stage builds) |
| Orchestration | Kubernetes |
