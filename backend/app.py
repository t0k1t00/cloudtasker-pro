from flask import Flask, jsonify, request
from flask_cors import CORS
import time
import random
import uuid
from datetime import datetime

app = Flask(__name__)
CORS(app)

# In-memory task store
tasks = [
    {"id": str(uuid.uuid4()), "title": "Deploy frontend to staging cluster", "completed": False, "priority": "high", "created_at": datetime.now().isoformat()},
    {"id": str(uuid.uuid4()), "title": "Configure HPA for backend pods", "completed": True, "priority": "medium", "created_at": datetime.now().isoformat()},
    {"id": str(uuid.uuid4()), "title": "Update Ingress TLS certificates", "completed": False, "priority": "high", "created_at": datetime.now().isoformat()},
    {"id": str(uuid.uuid4()), "title": "Review Prometheus alerting rules", "completed": False, "priority": "low", "created_at": datetime.now().isoformat()},
    {"id": str(uuid.uuid4()), "title": "Scale replica count for peak load", "completed": True, "priority": "medium", "created_at": datetime.now().isoformat()},
]

request_count = [1240]

@app.before_request
def count_request():
    request_count[0] += 1

@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "version": "1.4.2"
    })

@app.route("/api/metrics", methods=["GET"])
def metrics():
    cpu = random.randint(28, 72)
    memory_mb = random.randint(380, 640)
    pods = random.choice([2, 2, 2, 3])
    return jsonify({
        "requests": request_count[0] + random.randint(0, 20),
        "pods": pods,
        "cpu": f"{cpu}%",
        "memory": f"{memory_mb}MB",
        "uptime": "4h 32m",
        "replicas": 2,
        "cluster_status": "running",
        "deployment_status": "healthy",
        "api_latency_ms": random.randint(12, 48),
        "error_rate": round(random.uniform(0.0, 0.4), 2),
        "node_count": 3,
        "namespace": "cloudtasker",
        "cpu_raw": cpu,
        "memory_raw": memory_mb,
    })

@app.route("/api/tasks", methods=["GET"])
def get_tasks():
    return jsonify(tasks)

@app.route("/api/tasks", methods=["POST"])
def add_task():
    data = request.get_json()
    if not data or not data.get("title"):
        return jsonify({"error": "Title is required"}), 400
    task = {
        "id": str(uuid.uuid4()),
        "title": data["title"],
        "completed": False,
        "priority": data.get("priority", "medium"),
        "created_at": datetime.now().isoformat(),
    }
    tasks.append(task)
    return jsonify(task), 201

@app.route("/api/tasks/<task_id>", methods=["DELETE"])
def delete_task(task_id):
    global tasks
    original = len(tasks)
    tasks = [t for t in tasks if t["id"] != task_id]
    if len(tasks) == original:
        return jsonify({"error": "Task not found"}), 404
    return jsonify({"message": "Deleted"}), 200

@app.route("/api/tasks/<task_id>/toggle", methods=["PATCH"])
def toggle_task(task_id):
    for task in tasks:
        if task["id"] == task_id:
            task["completed"] = not task["completed"]
            return jsonify(task)
    return jsonify({"error": "Task not found"}), 404

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=False)
