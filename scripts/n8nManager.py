import os
import sys
import json
import urllib.request
import urllib.parse

if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8')

N8N_BASE_URL = os.environ.get("N8N_BASE_URL", "http://localhost:5678/api/v1")
N8N_API_KEY = os.environ.get("N8N_API_KEY", "")

def make_request(endpoint, method="GET", payload=None):
    url = f"{N8N_BASE_URL}{endpoint}"
    headers = {
        "X-N8N-API-KEY": N8N_API_KEY,
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
    data = json.dumps(payload).encode('utf-8') if payload else None
    req = urllib.request.Request(url, data=data, headers=headers, method=method)
    
    try:
        with urllib.request.urlopen(req) as response:
            res_body = response.read().decode('utf-8')
            return json.loads(res_body) if res_body else {}
    except urllib.error.HTTPError as http_err:
        err_body = http_err.read().decode('utf-8')
        print(f"HTTP {http_err.code} Error for {method} {url}: {err_body}")
        raise http_err
    except Exception as e:
        print(f"Error executing {method} {url}: {e}")
        raise e

def list_workflows():
    return make_request("/workflows")

def create_workflow(name, nodes, connections, settings=None):
    payload = {
        "name": name,
        "nodes": nodes,
        "connections": connections,
        "settings": settings or {"executionOrder": "v1"}
    }
    return make_request("/workflows", method="POST", payload=payload)

def update_workflow(workflow_id, name, nodes, connections, settings=None):
    payload = {
        "name": name,
        "nodes": nodes,
        "connections": connections,
        "settings": settings or {"executionOrder": "v1"}
    }
    return make_request(f"/workflows/{workflow_id}", method="PUT", payload=payload)

def activate_workflow(workflow_id):
    return make_request(f"/workflows/{workflow_id}/activate", method="POST")

def deactivate_workflow(workflow_id):
    return make_request(f"/workflows/{workflow_id}/deactivate", method="POST")

def delete_workflow(workflow_id):
    return make_request(f"/workflows/{workflow_id}", method="DELETE")

def list_executions(limit=10):
    return make_request(f"/executions?limit={limit}")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python n8nManager.py [list|create|activate|executions]")
        sys.exit(1)
        
    cmd = sys.argv[1]
    if cmd == "list":
        wf_list = list_workflows()
        print(json.dumps(wf_list, indent=2))
    elif cmd == "executions":
        exec_list = list_executions()
        print(json.dumps(exec_list, indent=2))
    else:
        print(f"Unknown command: {cmd}")
