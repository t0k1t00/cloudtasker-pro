# CloudTasker Pro

CloudTasker Pro is a cloud-native Kubernetes monitoring and task management dashboard built for a Cloud Computing assignment. It combines a modern SaaS-style interface with containerized backend services, Kubernetes deployment manifests, live infrastructure metrics, and task management features.

The UI is inspired by modern cloud platforms such as Vercel, Datadog, and Grafana, with a dark glassmorphism design, animated components, and real-time monitoring visuals.

---

## Features

- **Live Infrastructure Metrics**  
  Monitor CPU usage, memory usage, pod count, request volume, and API latency with auto-refreshing metrics.

- **Task Management**  
  Create, complete, delete, and prioritize deployment or infrastructure-related tasks.

- **Interactive Charts**  
  Visualize CPU, memory, and latency trends using responsive charts.

- **Activity Log**  
  View a simulated live Kubernetes event stream for deployments, scaling events, health checks, and alerts.

- **Architecture Diagram**  
  Display a visual overview of the application’s Kubernetes-based architecture.

- **Cloud-Native Deployment**  
  Includes Dockerfiles, Docker Compose configuration, and Kubernetes manifests.

- **Modern SaaS UI**  
  Dark theme, glassmorphism cards, gradients, icons, and smooth animations.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, Tailwind CSS |
| Animations | Framer Motion |
| Charts | Recharts |
| HTTP Client | Axios |
| Icons | Lucide React |
| Backend | Python Flask, Flask-CORS |
| Production Server | Gunicorn, Nginx |
| Containerization | Docker, Docker Compose |
| Orchestration | Kubernetes |
| Local Cluster | Minikube |

---

## Project Structure

~~~text
cloudtasker-pro/
├── frontend/                   # React + Vite + Tailwind CSS frontend
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
├── backend/                    # Python Flask API
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
~~~

---

## Architecture

~~~mermaid
graph TB
  USER[User Browser] --> UI[React Dashboard<br/>Vite + Tailwind CSS]

  UI --> NGINX[Nginx Frontend Server]
  NGINX --> API[Flask REST API<br/>Gunicorn]

  API --> HEALTH[Health Check API<br/>/api/health]
  API --> METRICS[Metrics API<br/>/api/metrics]
  API --> TASKS[Task API<br/>/api/tasks]

  METRICS --> MONITOR[Cloud Monitoring Panel]
  TASKS --> TASKMANAGER[Task Manager]
  HEALTH --> STATUS[System Status Cards]

  API --> DATA[In-Memory App Data<br/>Tasks + Simulated Metrics]

  UI --> CHARTS[Charts Layer<br/>Recharts]
  UI --> ACTIVITY[Activity Log<br/>Kubernetes Event Stream]
  UI --> ARCH[Architecture Diagram]

  DOCKER[Docker Compose] --> FRONTEND_CONTAINER[Frontend Container]
  DOCKER --> BACKEND_CONTAINER[Backend Container]

  FRONTEND_CONTAINER --> NGINX
  BACKEND_CONTAINER --> API

  K8S[Kubernetes Cluster] --> NS[cloudtasker Namespace]
  NS --> FE_DEPLOY[Frontend Deployment]
  NS --> BE_DEPLOY[Backend Deployment]
  NS --> CONFIG[ConfigMap]

  FE_DEPLOY --> FE_SVC[Frontend Service<br/>NodePort 30080]
  BE_DEPLOY --> BE_SVC[Backend Service<br/>ClusterIP]

  FE_SVC --> NGINX
  BE_SVC --> API
  CONFIG --> API

  USER --> FE_SVC

  style UI fill:#1e40af,stroke:#3b82f6,stroke-width:2px,color:#fff
  style API fill:#065f46,stroke:#10b981,stroke-width:2px,color:#fff
  style NGINX fill:#7c2d12,stroke:#f97316,stroke-width:2px,color:#fff
  style K8S fill:#1e3a8a,stroke:#6366f1,stroke-width:2px,color:#fff
  style DOCKER fill:#0f766e,stroke:#14b8a6,stroke-width:2px,color:#fff
  style METRICS fill:#581c87,stroke:#a855f7,stroke-width:2px,color:#fff
  style TASKS fill:#92400e,stroke:#f59e0b,stroke-width:2px,color:#fff
  style HEALTH fill:#064e3b,stroke:#22c55e,stroke-width:2px,color:#fff
~~~

### Core Components

| Component | Responsibility |
|---|---|
| React Dashboard | Main user interface for metrics, tasks, activity logs, and architecture view |
| Nginx Frontend Server | Serves the production React build and forwards API traffic |
| Flask REST API | Provides health, metrics, and task management endpoints |
| Metrics API | Supplies simulated CPU, memory, pod, request, and latency metrics |
| Task API | Handles task creation, deletion, completion toggling, and priority labels |
| Activity Log | Displays simulated Kubernetes deployment and cluster events |
| Docker Compose | Runs frontend and backend containers together for local deployment |
| Kubernetes Manifests | Deploy the application using namespace, services, deployments, and config maps |
| Frontend Service | Exposes the React/Nginx frontend through a NodePort service |
| Backend Service | Exposes the Flask backend internally through a ClusterIP service |

---

## Getting Started

### Prerequisites

Make sure the following tools are installed:

- Node.js 18+
- Python 3.10+
- Docker
- Docker Compose
- kubectl
- Minikube or another Kubernetes cluster

---

## Run Locally

You can run the frontend and backend separately during development.

### 1. Start the Backend

~~~bash
cd backend
pip install -r requirements.txt
python app.py
~~~

The backend will run at:

~~~text
http://localhost:5000
~~~

### 2. Start the Frontend

Open a new terminal:

~~~bash
cd frontend
npm install
npm run dev
~~~

The frontend will run at:

~~~text
http://localhost:5173
~~~

The frontend proxies API requests from `/api` to the Flask backend running on port `5000`.

---

## Run with Docker Compose

Docker Compose is the recommended way to run the full application locally.

~~~bash
docker compose up --build
~~~

After the containers start, open:

~~~text
http://localhost:3000
~~~

To stop the containers:

~~~bash
docker compose down
~~~

---

## Kubernetes Deployment

CloudTasker Pro includes Kubernetes manifests for deploying the frontend and backend into a local or remote Kubernetes cluster.

### 1. Start Minikube

~~~bash
minikube start --driver=docker --cpus=2 --memory=4g
~~~

### 2. Use the Minikube Docker Daemon

~~~bash
eval $(minikube docker-env)
~~~

### 3. Build Docker Images

~~~bash
docker build -t cloudtasker-backend:latest ./backend
docker build -t cloudtasker-frontend:latest ./frontend
~~~

### 4. Apply Kubernetes Manifests

~~~bash
kubectl apply -f k8s/00-namespace.yaml
kubectl apply -f k8s/01-configmap.yaml
kubectl apply -f k8s/02-backend.yaml
kubectl apply -f k8s/03-frontend.yaml
~~~

Alternatively, apply all manifests at once:

~~~bash
kubectl apply -f k8s/
~~~

### 5. Verify the Deployment

~~~bash
kubectl get pods -n cloudtasker
kubectl get svc -n cloudtasker
kubectl get deployments -n cloudtasker
~~~

### 6. Access the Application

Using the Minikube IP:

~~~bash
minikube ip
~~~

Then open:

~~~text
http://<minikube-ip>:30080
~~~

Or use the Minikube service command:

~~~bash
minikube service cloudtasker-frontend-svc -n cloudtasker
~~~

---

## API Reference

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/health` | Returns backend health status |
| GET | `/api/metrics` | Returns simulated cluster metrics |
| GET | `/api/tasks` | Returns all tasks |
| POST | `/api/tasks` | Creates a new task |
| DELETE | `/api/tasks/:id` | Deletes a task |
| PATCH | `/api/tasks/:id/toggle` | Toggles task completion status |

### Example Task Payload

~~~json
{
  "title": "Deploy backend service",
  "priority": "high"
}
~~~

---

## Monitoring Data

The dashboard displays simulated cloud and Kubernetes metrics, including:

- CPU usage
- Memory usage
- Active pods
- API latency
- Request count
- Deployment status
- Cluster activity events

This makes the project useful as a cloud computing, DevOps, or Kubernetes demonstration project.

---

## Docker Images

| Service | Image Name |
|---|---|
| Backend | `cloudtasker-backend:latest` |
| Frontend | `cloudtasker-frontend:latest` |

---

## Useful Commands

### View Kubernetes Resources

~~~bash
kubectl get all -n cloudtasker
~~~

### View Backend Logs

~~~bash
kubectl logs -n cloudtasker deployment/cloudtasker-backend
~~~

### View Frontend Logs

~~~bash
kubectl logs -n cloudtasker deployment/cloudtasker-frontend
~~~

### Delete Kubernetes Resources

~~~bash
kubectl delete namespace cloudtasker
~~~

### Restart Docker Compose

~~~bash
docker compose down
docker compose up --build
~~~

---

## Author

Swathi B Raj

---

## License

This project is open source and available under the MIT License.
