import os
import sys

def write_file(filepath, content):
    os.makedirs(os.path.dirname(filepath), exist_ok=True)
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Created: {filepath}")

# ==========================================
# 1. BLUEPRINT: n8n-qdrant-fastapi-bridge
# ==========================================
bp1_dir = os.path.abspath("blueprints/n8n-qdrant-fastapi-bridge")

write_file(f"{bp1_dir}/app/__init__.py", '"""n8n-qdrant-fastapi-bridge package."""\n')

write_file(f"{bp1_dir}/app/config.py", '''from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import Field
from typing import Optional


class Settings(BaseSettings):
    """Application configuration loaded from environment variables."""
    
    APP_NAME: str = "n8n-qdrant-fastapi-bridge"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = False
    
    # Qdrant Configuration
    QDRANT_HOST: str = Field(default="qdrant", description="Qdrant service host or IP")
    QDRANT_PORT: int = Field(default=6333, description="Qdrant REST API port")
    QDRANT_GRPC_PORT: int = Field(default=6334, description="Qdrant gRPC port")
    QDRANT_API_KEY: Optional[str] = Field(default=None, description="Qdrant API Key for secured instances")
    QDRANT_PREFER_GRPC: bool = Field(default=False, description="Use gRPC for faster throughput")
    QDRANT_DEFAULT_COLLECTION: str = Field(default="knowledge_base", description="Default vector collection name")
    
    # Embedding Configuration
    EMBEDDING_PROVIDER: str = Field(default="fastembed", description="fastembed | openai | passthrough")
    EMBEDDING_MODEL: str = Field(default="BAAI/bge-small-en-v1.5", description="Default embedding model")
    EMBEDDING_DIMENSION: int = Field(default=384, description="Vector dimension size")
    OPENAI_API_KEY: Optional[str] = Field(default=None, description="OpenAI API key if provider is openai")
    
    # Security & Bridge Authentication
    API_BEARER_TOKEN: Optional[str] = Field(default=None, description="Bearer token to authenticate n8n requests")
    
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore"
    )


settings = Settings()
''')

write_file(f"{bp1_dir}/app/models.py", '''from pydantic import BaseModel, Field
from typing import List, Dict, Any, Optional, Union


class HealthResponse(BaseModel):
    status: str = "ok"
    app: str
    version: str
    qdrant_connected: bool
    embedding_model: str


class DocumentInput(BaseModel):
    id: Optional[Union[str, int]] = Field(default=None, description="Unique document identifier (UUID or int)")
    text: Optional[str] = Field(default=None, description="Raw text content to embed")
    vector: Optional[List[float]] = Field(default=None, description="Pre-computed vector embedding")
    metadata: Dict[str, Any] = Field(default_factory=dict, description="Arbitrary JSON metadata payload")


class UpsertRequest(BaseModel):
    collection_name: Optional[str] = Field(default=None, description="Target Qdrant collection name")
    documents: List[DocumentInput] = Field(..., description="List of documents to upsert")
    batch_size: int = Field(default=64, description="Batch processing size for embeddings")


class UpsertResponse(BaseModel):
    success: bool
    collection_name: str
    inserted_count: int
    point_ids: List[Union[str, int]]


class SearchRequest(BaseModel):
    collection_name: Optional[str] = Field(default=None, description="Target Qdrant collection")
    query_text: Optional[str] = Field(default=None, description="Natural language query text")
    query_vector: Optional[List[float]] = Field(default=None, description="Direct query vector")
    limit: int = Field(default=5, ge=1, le=100, description="Number of nearest neighbors to retrieve")
    score_threshold: Optional[float] = Field(default=None, description="Minimum similarity score threshold (0.0 - 1.0)")
    filters: Optional[Dict[str, Any]] = Field(default=None, description="Key-value metadata filter conditions")


class SearchResultItem(BaseModel):
    id: Union[str, int]
    score: float
    text: Optional[str] = None
    metadata: Dict[str, Any]


class SearchResponse(BaseModel):
    collection_name: str
    total_results: int
    query: Optional[str] = None
    results: List[SearchResultItem]


class CollectionInitRequest(BaseModel):
    collection_name: str = Field(..., description="Name of the collection to create or ensure")
    vector_size: Optional[int] = Field(default=None, description="Vector dimension size")
    distance: str = Field(default="Cosine", description="Cosine | Dot | Euclid")
    on_disk_payload: bool = Field(default=True, description="Store payload on disk for lower RAM footprint")


class DeletePointsRequest(BaseModel):
    collection_name: Optional[str] = Field(default=None, description="Target collection")
    point_ids: List[Union[str, int]] = Field(..., description="Point IDs to delete")
''')

write_file(f"{bp1_dir}/app/services/__init__.py", '"""Service layer modules."""\n')

write_file(f"{bp1_dir}/app/services/embedding_service.py", '''import logging
from typing import List, Optional
from app.config import settings

logger = logging.getLogger("uvicorn")

try:
    from fastembed import TextEmbedding
    _fastembed_available = True
except ImportError:
    _fastembed_available = False
    TextEmbedding = None


class EmbeddingService:
    """Handles text-to-vector embedding generation."""

    def __init__(self):
        self.provider = settings.EMBEDDING_PROVIDER.lower()
        self.model_name = settings.EMBEDDING_MODEL
        self._fastembed_model = None

        if self.provider == "fastembed":
            if _fastembed_available:
                logger.info(f"Loading FastEmbed model: {self.model_name}...")
                self._fastembed_model = TextEmbedding(model_name=self.model_name)
                logger.info("FastEmbed model loaded successfully.")
            else:
                logger.warning("FastEmbed package not installed. Falling back to passthrough vector mode.")

    def embed_texts(self, texts: List[str]) -> List[List[float]]:
        """Generate embeddings for a list of string chunks."""
        if not texts:
            return []

        if self.provider == "fastembed" and self._fastembed_model:
            embeddings = list(self._fastembed_model.embed(texts))
            return [emb.tolist() for emb in embeddings]

        elif self.provider == "openai":
            import httpx
            if not settings.OPENAI_API_KEY:
                raise ValueError("OPENAI_API_KEY is not configured.")
            
            with httpx.Client(timeout=30.0) as client:
                res = client.post(
                    "https://api.openai.com/v1/embeddings",
                    headers={"Authorization": f"Bearer {settings.OPENAI_API_KEY}"},
                    json={"input": texts, "model": self.model_name}
                )
                res.raise_for_status()
                data = res.json()
                return [item["embedding"] for item in data["data"]]

        else:
            raise ValueError(
                f"Embedding provider '{self.provider}' requires pre-computed 'vector' in document payloads."
            )

    def embed_single(self, text: str) -> List[float]:
        """Generate embedding for a single text query."""
        results = self.embed_texts([text])
        if not results:
            raise ValueError("Failed to generate embedding for query.")
        return results[0]


embedding_service = EmbeddingService()
''')

write_file(f"{bp1_dir}/app/services/qdrant_service.py", '''import logging
from typing import List, Dict, Any, Optional, Union
from uuid import uuid4
from qdrant_client import QdrantClient
from qdrant_client.http import models as rest_models
from app.config import settings

logger = logging.getLogger("uvicorn")


class QdrantService:
    """Qdrant Vector Engine interface layer with connection lifecycle management."""

    def __init__(self):
        self.client: Optional[QdrantClient] = None

    def connect(self):
        """Initialize Qdrant client connection."""
        try:
            logger.info(f"Connecting to Qdrant at {settings.QDRANT_HOST}:{settings.QDRANT_PORT}...")
            self.client = QdrantClient(
                host=settings.QDRANT_HOST,
                port=settings.QDRANT_PORT,
                grpc_port=settings.QDRANT_GRPC_PORT,
                api_key=settings.QDRANT_API_KEY,
                prefer_grpc=settings.QDRANT_PREFER_GRPC,
                timeout=20.0
            )
            collections = self.client.get_collections()
            logger.info(f"Connected to Qdrant successfully. Found {len(collections.collections)} collections.")
            
            self.ensure_collection(
                collection_name=settings.QDRANT_DEFAULT_COLLECTION,
                vector_size=settings.EMBEDDING_DIMENSION
            )
        except Exception as e:
            logger.error(f"Failed to connect to Qdrant: {str(e)}")

    def is_connected(self) -> bool:
        """Check if Qdrant instance is reachable."""
        try:
            if not self.client:
                return False
            self.client.get_collections()
            return True
        except Exception:
            return False

    def ensure_collection(
        self,
        collection_name: str,
        vector_size: Optional[int] = None,
        distance: str = "Cosine",
        on_disk_payload: bool = True
    ) -> bool:
        """Idempotently create collection if it does not exist."""
        if not self.client:
            return False
        size = vector_size or settings.EMBEDDING_DIMENSION
        dist = getattr(rest_models.Distance, distance.upper(), rest_models.Distance.COSINE)

        collections = [c.name for c in self.client.get_collections().collections]
        if collection_name not in collections:
            logger.info(f"Creating collection '{collection_name}' (dim={size}, dist={distance})...")
            self.client.create_collection(
                collection_name=collection_name,
                vectors_config=rest_models.VectorParams(
                    size=size,
                    distance=dist,
                    on_disk=True
                ),
                on_disk_payload=on_disk_payload
            )
            return True
        return False

    def upsert_points(
        self,
        collection_name: str,
        vectors: List[List[float]],
        payloads: List[Dict[str, Any]],
        ids: Optional[List[Union[str, int]]] = None
    ) -> List[Union[str, int]]:
        """Upsert points into Qdrant collection."""
        points = []
        point_ids = ids or [str(uuid4()) for _ in vectors]

        for pid, vec, payload in zip(point_ids, vectors, payloads):
            points.append(
                rest_models.PointStruct(
                    id=pid,
                    vector=vec,
                    payload=payload
                )
            )

        self.client.upsert(
            collection_name=collection_name,
            points=points,
            wait=True
        )
        return point_ids

    def search_similar(
        self,
        collection_name: str,
        query_vector: List[float],
        limit: int = 5,
        score_threshold: Optional[float] = None,
        filters: Optional[Dict[str, Any]] = None
    ) -> List[Dict[str, Any]]:
        """Search similar vectors in collection."""
        query_filter = None
        if filters:
            conditions = []
            for k, v in filters.items():
                conditions.append(
                    rest_models.FieldCondition(
                        key=k,
                        match=rest_models.MatchValue(value=v)
                    )
                )
            query_filter = rest_models.Filter(must=conditions)

        search_result = self.client.search(
            collection_name=collection_name,
            query_vector=query_vector,
            limit=limit,
            score_threshold=score_threshold,
            query_filter=query_filter,
            with_payload=True
        )

        results = []
        for hit in search_result:
            payload = hit.payload or {}
            text = payload.get("text") or payload.get("content") or None
            results.append({
                "id": hit.id,
                "score": round(hit.score, 4),
                "text": text,
                "metadata": payload
            })
        return results

    def delete_points(self, collection_name: str, point_ids: List[Union[str, int]]) -> bool:
        """Delete points by IDs."""
        self.client.delete(
            collection_name=collection_name,
            points_selector=rest_models.PointIdsList(points=point_ids),
            wait=True
        )
        return True

    def get_collection_stats(self, collection_name: str) -> Dict[str, Any]:
        """Retrieve collection statistics and vector count."""
        info = self.client.get_collection(collection_name=collection_name)
        return {
            "name": collection_name,
            "status": info.status,
            "points_count": info.points_count,
            "indexed_vectors_count": info.indexed_vectors_count,
            "segments_count": info.segments_count
        }


qdrant_service = QdrantService()
''')

write_file(f"{bp1_dir}/app/main.py", '''import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException, Security, Depends, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.middleware.cors import CORSMiddleware
from typing import Dict, Any
from uuid import uuid4

from app.config import settings
from app.models import (
    HealthResponse,
    UpsertRequest,
    UpsertResponse,
    SearchRequest,
    SearchResponse,
    SearchResultItem,
    CollectionInitRequest,
    DeletePointsRequest
)
from app.services.qdrant_service import qdrant_service
from app.services.embedding_service import embedding_service

logging.basicConfig(
    level=logging.DEBUG if settings.DEBUG else logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s"
)
logger = logging.getLogger("n8n-bridge")

security = HTTPBearer(auto_error=False)


def verify_token(credentials: HTTPAuthorizationCredentials = Security(security)):
    """Optional Bearer Token authorization check for n8n webhooks."""
    if settings.API_BEARER_TOKEN:
        if not credentials or credentials.credentials != settings.API_BEARER_TOKEN:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid or missing Bearer Authentication Token"
            )
    return True


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Lifespan context manager for startup and shutdown events."""
    logger.info(f"Starting {settings.APP_NAME} v{settings.APP_VERSION}...")
    qdrant_service.connect()
    yield
    logger.info("Shutting down n8n-qdrant-fastapi-bridge.")


app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description="High-performance FastAPI bridge connecting n8n automation workflows to Qdrant vector database.",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/", tags=["General"])
async def root():
    return {
        "service": settings.APP_NAME,
        "version": settings.APP_VERSION,
        "docs": "/docs",
        "status": "running",
        "reference": "https://whoisalfaz.me/blog/pinecone-vs-qdrant-vultr-benchmark/"
    }


@app.get("/health", response_model=HealthResponse, tags=["General"])
async def health_check():
    connected = qdrant_service.is_connected()
    return HealthResponse(
        status="healthy" if connected else "degraded",
        app=settings.APP_NAME,
        version=settings.APP_VERSION,
        qdrant_connected=connected,
        embedding_model=settings.EMBEDDING_MODEL
    )


@app.post("/api/v1/collections/ensure", dependencies=[Depends(verify_token)], tags=["Collections"])
async def ensure_collection(payload: CollectionInitRequest):
    """Ensure a collection exists with target vector dimension and metric."""
    try:
        created = qdrant_service.ensure_collection(
            collection_name=payload.collection_name,
            vector_size=payload.vector_size,
            distance=payload.distance,
            on_disk_payload=payload.on_disk_payload
        )
        return {
            "success": True,
            "collection_name": payload.collection_name,
            "action": "created" if created else "already_exists"
        }
    except Exception as e:
        logger.error(f"Error ensuring collection: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/v1/collections/{collection_name}/stats", dependencies=[Depends(verify_token)], tags=["Collections"])
async def get_collection_stats(collection_name: str):
    """Retrieve point count and index status for a collection."""
    try:
        return qdrant_service.get_collection_stats(collection_name)
    except Exception as e:
        raise HTTPException(status_code=404, detail=f"Collection not found: {str(e)}")


@app.post("/api/v1/documents/upsert", response_model=UpsertResponse, dependencies=[Depends(verify_token)], tags=["Vectors"])
async def upsert_documents(request: UpsertRequest):
    """
    Ingest and upsert documents from n8n HTTP Request node.
    Automatically generates dense embeddings if text is provided without vector.
    """
    try:
        target_collection = request.collection_name or settings.QDRANT_DEFAULT_COLLECTION
        texts_to_embed = []
        embed_indices = []
        vectors = []
        payloads = []
        ids = []

        for idx, doc in enumerate(request.documents):
            doc_id = str(doc.id) if doc.id is not None else str(uuid4())
            ids.append(doc_id)

            payload = dict(doc.metadata)
            if doc.text:
                payload["text"] = doc.text
            payloads.append(payload)

            if doc.vector:
                vectors.append(doc.vector)
            elif doc.text:
                texts_to_embed.append(doc.text)
                embed_indices.append(idx)
                vectors.append(None)
            else:
                raise HTTPException(
                    status_code=400,
                    detail=f"Document at index {idx} must provide either text or vector."
                )

        if texts_to_embed:
            generated_embeddings = embedding_service.embed_texts(texts_to_embed)
            for emb_idx, emb in zip(embed_indices, generated_embeddings):
                vectors[emb_idx] = emb

        inserted_ids = qdrant_service.upsert_points(
            collection_name=target_collection,
            vectors=vectors,
            payloads=payloads,
            ids=ids
        )

        return UpsertResponse(
            success=True,
            collection_name=target_collection,
            inserted_count=len(inserted_ids),
            point_ids=inserted_ids
        )
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Upsert failed: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Upsert operation failed: {str(e)}")


@app.post("/api/v1/documents/search", response_model=SearchResponse, dependencies=[Depends(verify_token)], tags=["Vectors"])
async def search_documents(request: SearchRequest):
    """
    Semantic vector search for n8n RAG and AI Agent tool calls.
    Takes natural query_text or precomputed query_vector.
    """
    try:
        target_collection = request.collection_name or settings.QDRANT_DEFAULT_COLLECTION

        if request.query_vector:
            query_vec = request.query_vector
        elif request.query_text:
            query_vec = embedding_service.embed_single(request.query_text)
        else:
            raise HTTPException(
                status_code=400,
                detail="Search request must provide either query_text or query_vector."
            )

        results = qdrant_service.search_similar(
            collection_name=target_collection,
            query_vector=query_vec,
            limit=request.limit,
            score_threshold=request.score_threshold,
            filters=request.filters
        )

        formatted_items = [SearchResultItem(**item) for item in results]

        return SearchResponse(
            collection_name=target_collection,
            total_results=len(formatted_items),
            query=request.query_text,
            results=formatted_items
        )
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Search failed: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Search operation failed: {str(e)}")


@app.post("/api/v1/documents/delete", dependencies=[Depends(verify_token)], tags=["Vectors"])
async def delete_documents(request: DeletePointsRequest):
    """Delete points from collection by ID list."""
    try:
        target_collection = request.collection_name or settings.QDRANT_DEFAULT_COLLECTION
        qdrant_service.delete_points(target_collection, request.point_ids)
        return {
            "success": True,
            "collection_name": target_collection,
            "deleted_count": len(request.point_ids)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
''')

write_file(f"{bp1_dir}/requirements.txt", '''fastapi>=0.111.0
uvicorn[standard]>=0.30.0
pydantic>=2.7.0
pydantic-settings>=2.2.0
qdrant-client>=1.9.0
fastembed>=0.2.7
httpx>=0.27.0
python-dotenv>=1.0.1
numpy>=1.26.0
''')

write_file(f"{bp1_dir}/Dockerfile", '''FROM python:3.11-slim

ENV PYTHONUNBUFFERED=1 \\
    PYTHONDONTWRITEBYTECODE=1 \\
    PIP_NO_CACHE_DIR=1 \\
    PIP_DISABLE_PIP_VERSION_CHECK=1

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \\
    curl \\
    build-essential \\
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

RUN python -c "from fastembed import TextEmbedding; TextEmbedding(model_name='BAAI/bge-small-en-v1.5')" || true

COPY app/ ./app/

RUN useradd -m -u 1000 appuser && chown -R appuser:appuser /app
USER appuser

EXPOSE 8000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \\
  CMD curl -f http://localhost:8000/health || exit 1

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "2"]
''')

write_file(f"{bp1_dir}/docker-compose.yml", '''version: "3.8"

services:
  qdrant:
    image: qdrant/qdrant:v1.9.2
    container_name: qdrant-engine
    restart: unless-stopped
    ports:
      - "6333:6333"
      - "6334:6334"
    environment:
      - QDRANT__SERVICE__GRPC_PORT=6334
      - QDRANT__STORAGE__ON_DISK_PAYLOAD=true
    volumes:
      - qdrant_data:/qdrant/storage
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:6333/healthz"]
      interval: 10s
      timeout: 5s
      retries: 3
    networks:
      - n8n_rag_net

  fastapi-bridge:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: n8n-qdrant-bridge
    restart: unless-stopped
    ports:
      - "8000:8000"
    environment:
      - QDRANT_HOST=qdrant
      - QDRANT_PORT=6333
      - QDRANT_DEFAULT_COLLECTION=knowledge_base
      - EMBEDDING_PROVIDER=fastembed
      - EMBEDDING_MODEL=BAAI/bge-small-en-v1.5
      - EMBEDDING_DIMENSION=384
      - API_BEARER_TOKEN=${API_BEARER_TOKEN:-secret_bridge_token}
    depends_on:
      qdrant:
        condition: service_healthy
    networks:
      - n8n_rag_net

volumes:
  qdrant_data:
    driver: local

networks:
  n8n_rag_net:
    driver: bridge
''')

write_file(f"{bp1_dir}/.env.example", '''# Bridge Settings
APP_NAME=n8n-qdrant-fastapi-bridge
DEBUG=false
API_BEARER_TOKEN=your_secure_random_bridge_token_here

# Qdrant Vector Engine Configuration
QDRANT_HOST=qdrant
QDRANT_PORT=6333
QDRANT_GRPC_PORT=6334
QDRANT_API_KEY=
QDRANT_PREFER_GRPC=false
QDRANT_DEFAULT_COLLECTION=knowledge_base

# Embedding Pipeline (fastembed | openai | passthrough)
EMBEDDING_PROVIDER=fastembed
EMBEDDING_MODEL=BAAI/bge-small-en-v1.5
EMBEDDING_DIMENSION=384

# OpenAI Configuration (Only needed if EMBEDDING_PROVIDER=openai)
OPENAI_API_KEY=
''')

write_file(f"{bp1_dir}/.gitignore", '''__pycache__/
*.py[cod]
*$py.class
.venv/
env/
venv/
.env
.env.local
.DS_Store
*.log
.coverage
htmlcov/
''')

write_file(f"{bp1_dir}/README.md", '''# n8n Qdrant FastAPI Bridge ⚡

An enterprise-grade, high-throughput FastAPI bridge and middleware layer connecting **n8n automation workflows** with the **Qdrant Vector Database**. Built for production RevOps, automated RAG pipelines, and self-hosted AI agents.

[![Docker Compose](https://img.shields.io/badge/docker--compose-ready-blue.svg)](docker-compose.yml)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.111.0-009688.svg)](https://fastapi.tiangolo.com)
[![Qdrant](https://img.shields.io/badge/Qdrant-v1.9.2-red.svg)](https://qdrant.tech)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

> 📖 **Architecture & Benchmark Reference:** Read the in-depth technical analysis and real-world latency benchmarks at [Pinecone vs Qdrant on Vultr: High-Scale Vector Benchmark](https://whoisalfaz.me/blog/pinecone-vs-qdrant-vultr-benchmark/).

---

## 🎯 Key Capabilities

- **Zero-Latency In-Memory Embeddings:** Built-in ONNX runtime via `FastEmbed` (`BAAI/bge-small-en-v1.5`) generates 384-dimensional vector embeddings in sub-5ms without external API rate limits or recurring costs.
- **Native n8n HTTP Request Compatibility:** Standardized JSON payloads matching n8n `HTTP Request` node conventions for single and batch vector ingestion.
- **Idempotent Collection Initialization:** Auto-provisions Qdrant collections with on-disk payload indexing to minimize RAM footprint on cloud VPS (Vultr / Hetzner).
- **Hybrid & Filtered Vector Search:** Full support for payload metadata filtering (e.g., tenant ID, source URL, date range, author).
- **Production-Ready Docker Stack:** Complete `docker-compose.yml` with healthchecks, isolated bridge network, and persistent storage.

---

## 🏗️ Architecture Overview

```mermaid
graph LR
    A[n8n Workflow] -->|POST /api/v1/documents/upsert| B[FastAPI Bridge]
    A -->|POST /api/v1/documents/search| B
    B -->|FastEmbed ONNX| C[Dense Vector]
    B -->|REST / gRPC| D[(Qdrant Vector DB)]
```

---

## 🚀 Quick Start

### 1. Clone & Configure Environment

```bash
git clone https://github.com/AlfazMahmudRizve/n8n-qdrant-fastapi-bridge.git
cd n8n-qdrant-fastapi-bridge
cp .env.example .env
```

### 2. Launch with Docker Compose

```bash
docker compose up -d --build
```

### 3. Verify Health

```bash
curl http://localhost:8000/health
```

Response:
```json
{
  "status": "healthy",
  "app": "n8n-qdrant-fastapi-bridge",
  "version": "1.0.0",
  "qdrant_connected": true,
  "embedding_model": "BAAI/bge-small-en-v1.5"
}
```

Interactive Swagger UI is available at `http://localhost:8000/docs`.

---

## 📡 API Endpoints

### 1. Ingest & Upsert Documents (`POST /api/v1/documents/upsert`)

```bash
curl -X POST http://localhost:8000/api/v1/documents/upsert \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer secret_bridge_token" \\
  -d '{
    "collection_name": "knowledge_base",
    "documents": [
      {
        "text": "Qdrant delivers sub-5ms semantic search with lower memory usage than Pinecone.",
        "metadata": {
          "source": "benchmark_report",
          "author": "Alfaz Mahmud Rizve",
          "url": "https://whoisalfaz.me/blog/pinecone-vs-qdrant-vultr-benchmark/"
        }
      }
    ]
  }'
```

### 2. Semantic Search (`POST /api/v1/documents/search`)

```bash
curl -X POST http://localhost:8000/api/v1/documents/search \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer secret_bridge_token" \\
  -d '{
    "collection_name": "knowledge_base",
    "query_text": "Which vector database is best for self-hosting on Vultr?",
    "limit": 3,
    "score_threshold": 0.70
  }'
```

---

## 🧩 n8n Integration Guide

1. In n8n, create an **HTTP Request** node.
2. Set Method to `POST`.
3. Set URL to `http://fastapi-bridge:8000/api/v1/documents/upsert` (if inside same docker network) or your public domain.
4. Set Authentication to **Header Auth**: `Authorization: Bearer <API_BEARER_TOKEN>`.
5. Map document body JSON with your CRM, support ticket, or blog post content.

---

## 📊 Performance & Scaling

For benchmarks comparing self-hosted Qdrant on Vultr Cloud Compute vs Pinecone Serverless across 1M+ vectors, throughput (QPS), and 99th-percentile latency, visit [whoisalfaz.me/blog/pinecone-vs-qdrant-vultr-benchmark](https://whoisalfaz.me/blog/pinecone-vs-qdrant-vultr-benchmark/).

---

## 📄 License

MIT © [Alfaz Mahmud Rizve](https://whoisalfaz.me)
''')


# ==========================================
# 2. BLUEPRINT: enterprise-rag-vultr-docker
# ==========================================
bp2_dir = os.path.abspath("blueprints/enterprise-rag-vultr-docker")

write_file(f"{bp2_dir}/docker-compose.yml", '''version: "3.8"

services:
  # --- Reverse Proxy with Auto HTTPS ---
  caddy:
    image: caddy:2.7.6-alpine
    container_name: caddy-proxy
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
      - "443:443/udp"
    volumes:
      - ./Caddyfile:/etc/caddy/Caddyfile:ro
      - caddy_data:/data
      - caddy_config:/config
    networks:
      - enterprise_rag_net
    depends_on:
      - dify-web
      - qdrant

  # --- High-Performance Vector Database ---
  qdrant:
    image: qdrant/qdrant:v1.9.2
    container_name: qdrant-engine
    restart: unless-stopped
    environment:
      - QDRANT__SERVICE__HTTP_PORT=6333
      - QDRANT__SERVICE__GRPC_PORT=6334
      - QDRANT__STORAGE__ON_DISK_PAYLOAD=true
      - QDRANT__SERVICE__API_KEY=${QDRANT_API_KEY}
    volumes:
      - qdrant_storage:/qdrant/storage
      - qdrant_snapshots:/qdrant/snapshots
    networks:
      - enterprise_rag_net
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:6333/healthz"]
      interval: 10s
      timeout: 5s
      retries: 3

  # --- Local LLM & Embedding Inference (CPU/GPU) ---
  ollama:
    image: ollama/ollama:latest
    container_name: ollama-engine
    restart: unless-stopped
    environment:
      - OLLAMA_KEEP_ALIVE=24h
      - OLLAMA_NUM_PARALLEL=4
    volumes:
      - ollama_models:/root/.ollama
    networks:
      - enterprise_rag_net

  # --- Dify Enterprise AI Platform (API & Backend) ---
  dify-api:
    image: langgenius/dify-api:0.6.11
    container_name: dify-api
    restart: unless-stopped
    environment:
      - MODE=api
      - SECRET_KEY=${DIFY_SECRET_KEY}
      - DB_USERNAME=${POSTGRES_USER:-postgres}
      - DB_PASSWORD=${POSTGRES_PASSWORD:-dify_secure_pwd}
      - DB_HOST=dify-db
      - DB_PORT=5432
      - DB_DATABASE=${POSTGRES_DB:-dify}
      - REDIS_HOST=dify-redis
      - REDIS_PORT=6379
      - REDIS_PASSWORD=${REDIS_PASSWORD:-redis_secure_pwd}
      - VECTOR_STORE=qdrant
      - QDRANT_URL=http://qdrant:6333
      - QDRANT_API_KEY=${QDRANT_API_KEY}
      - STORAGE_TYPE=local
      - STORAGE_LOCAL_PATH=/app/api/storage
    volumes:
      - dify_app_storage:/app/api/storage
    networks:
      - enterprise_rag_net
    depends_on:
      - dify-db
      - dify-redis
      - qdrant

  dify-web:
    image: langgenius/dify-web:0.6.11
    container_name: dify-web
    restart: unless-stopped
    environment:
      - CONSOLE_API_URL=
      - APP_API_URL=
    networks:
      - enterprise_rag_net
    depends_on:
      - dify-api

  # --- Database & Cache ---
  dify-db:
    image: pgvector/pgvector:pg15
    container_name: dify-postgres
    restart: unless-stopped
    environment:
      - POSTGRES_USER=${POSTGRES_USER:-postgres}
      - POSTGRES_PASSWORD=${POSTGRES_PASSWORD:-dify_secure_pwd}
      - POSTGRES_DB=${POSTGRES_DB:-dify}
      - PGDATA=/var/lib/postgresql/data/pgdata
    volumes:
      - dify_pgdata:/var/lib/postgresql/data
    networks:
      - enterprise_rag_net
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${POSTGRES_USER:-postgres}"]
      interval: 10s
      timeout: 5s
      retries: 5

  dify-redis:
    image: redis:7-alpine
    container_name: dify-redis
    restart: unless-stopped
    command: redis-server --requirepass ${REDIS_PASSWORD:-redis_secure_pwd}
    volumes:
      - dify_redis_data:/data
    networks:
      - enterprise_rag_net
    healthcheck:
      test: ["CMD", "redis-cli", "-a", "${REDIS_PASSWORD:-redis_secure_pwd}", "ping"]
      interval: 10s
      timeout: 5s
      retries: 3

volumes:
  caddy_data:
    driver: local
  caddy_config:
    driver: local
  qdrant_storage:
    driver: local
  qdrant_snapshots:
    driver: local
  ollama_models:
    driver: local
  dify_app_storage:
    driver: local
  dify_pgdata:
    driver: local
  dify_redis_data:
    driver: local

networks:
  enterprise_rag_net:
    driver: bridge
''')

write_file(f"{bp2_dir}/Caddyfile", '''{
    email {$ACME_EMAIL:admin@whoisalfaz.me}
    admin off
}

# --- Dify Studio & RAG Application ---
{$RAG_DOMAIN:rag.yourdomain.com} {
    encode gzip zstd

    # API Routing
    handle /console/api/* {
        reverse_proxy dify-api:5001
    }
    handle /api/* {
        reverse_proxy dify-api:5001
    }
    handle /v1/* {
        reverse_proxy dify-api:5001
    }
    handle /files/* {
        reverse_proxy dify-api:5001
    }

    # Frontend UI
    handle {
        reverse_proxy dify-web:3000
    }

    # Security Headers
    header {
        Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"
        X-Content-Type-Options "nosniff"
        X-Frame-Options "SAMEORIGIN"
        X-XSS-Protection "1; mode=block"
        Referrer-Policy "strict-origin-when-cross-origin"
    }
}

# --- Qdrant Vector Engine UI & API (Protected) ---
{$QDRANT_DOMAIN:qdrant.yourdomain.com} {
    encode gzip zstd

    reverse_proxy qdrant:6333 {
        header_up Host {host}
        header_up X-Real-IP {remote}
    }
}

# --- Ollama Inference API (Protected) ---
{$OLLAMA_DOMAIN:ollama.yourdomain.com} {
    encode gzip zstd

    reverse_proxy ollama:11434
}
''')

write_file(f"{bp2_dir}/.env.example", '''# ==============================================================================
# Enterprise Self-Hosted RAG Stack on Vultr - Environment Configuration
# Reference: https://whoisalfaz.me/blog/self-hosted-qdrant-docker-vultr/
# ==============================================================================

# --- Domain & SSL Settings (Caddy) ---
ACME_EMAIL=admin@yourdomain.com
RAG_DOMAIN=rag.yourdomain.com
QDRANT_DOMAIN=qdrant.yourdomain.com
OLLAMA_DOMAIN=ollama.yourdomain.com

# --- Qdrant Vector Database ---
QDRANT_API_KEY=generate_strong_random_32_char_key_here

# --- Dify Enterprise Application ---
DIFY_SECRET_KEY=generate_strong_random_secret_key_here
POSTGRES_USER=dify_admin
POSTGRES_PASSWORD=generate_strong_postgres_password_here
POSTGRES_DB=dify_production
REDIS_PASSWORD=generate_strong_redis_password_here

# --- Hardware / VPS Specifications ---
# Recommended Vultr Instance: High Performance AMD (4 vCPU, 8GB RAM, 150GB NVMe)
# Or Vultr Cloud GPU: NVIDIA A16 / A40 / L40S for GPU accelerated inference
''')

write_file(f"{bp2_dir}/scripts/init-vultr.sh", '''#!/usr/bin/env bash
# ==============================================================================
# Vultr Ubuntu 22.04 / 24.04 Production Provisioning Script
# Enterprise RAG Stack: Qdrant + Dify + Ollama + Caddy
# Reference: https://whoisalfaz.me/blog/self-hosted-qdrant-docker-vultr/
# ==============================================================================

set -euo pipefail

echo "=========================================================="
echo "🚀 Initializing Enterprise RAG Node on Vultr Cloud Compute"
echo "=========================================================="

# 1. Update OS Packages
echo "📦 Updating OS packages..."
apt-get update && apt-get upgrade -y
apt-get install -y curl wget git jq ufw htop ca-certificates gnupg lsb-release

# 2. Configure Firewall (UFW)
echo "🛡️ Configuring Firewall rules..."
ufw default deny incoming
ufw default allow outgoing
ufw allow 22/tcp    # SSH
ufw allow 80/tcp    # HTTP (Caddy ACME)
ufw allow 443/tcp   # HTTPS (Caddy TLS)
ufw allow 443/udp   # HTTP/3 (QUIC)
ufw --force enable

# 3. Install Docker & Docker Compose Plugin
if ! command -v docker &> /dev/null; then
    echo "🐳 Installing Docker Engine..."
    install -m 0755 -d /etc/apt/keyrings
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
    chmod a+r /etc/apt/keyrings/docker.gpg

    echo \\
      "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \\
      $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null

    apt-get update
    apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
    systemctl enable docker
    systemctl start docker
    echo "✅ Docker installed successfully."
fi

# 4. Pull Default Ollama Models
echo "🧠 Pre-pulling embedding & chat models in background..."
docker compose pull
docker compose up -d ollama
sleep 5
docker exec -it ollama-engine ollama pull nomic-embed-text || true
docker exec -it ollama-engine ollama pull llama3.1:8b || true

echo "=========================================================="
echo "✅ Node provisioned! Run: docker compose up -d"
echo "=========================================================="
''')

write_file(f"{bp2_dir}/scripts/backup-qdrant.sh", '''#!/usr/bin/env bash
# ==============================================================================
# Qdrant Automated Snapshot & S3/Vultr Object Storage Backup Script
# Reference: https://whoisalfaz.me/blog/self-hosted-qdrant-docker-vultr/
# ==============================================================================

set -euo pipefail

COLLECTION_NAME="${1:-knowledge_base}"
QDRANT_URL="http://localhost:6333"
SNAPSHOT_DIR="/opt/rag-backups/qdrant"
DATE=$(date +%Y%m%d_%H%M%S)

mkdir -p "${SNAPSHOT_DIR}"

echo "📸 Creating Qdrant snapshot for collection: ${COLLECTION_NAME}..."
RESPONSE=$(curl -s -X POST "${QDRANT_URL}/collections/${COLLECTION_NAME}/snapshots")
SNAPSHOT_NAME=$(echo "${RESPONSE}" | jq -r '.result.name')

if [ -z "${SNAPSHOT_NAME}" ] || [ "${SNAPSHOT_NAME}" == "null" ]; then
    echo "❌ Failed to create snapshot: ${RESPONSE}"
    exit 1
fi

echo "⬇️ Downloading snapshot: ${SNAPSHOT_NAME}..."
curl -s -o "${SNAPSHOT_DIR}/${COLLECTION_NAME}_${DATE}.snapshot" \\
  "${QDRANT_URL}/collections/${COLLECTION_NAME}/snapshots/${SNAPSHOT_NAME}"

echo "✅ Snapshot saved to: ${SNAPSHOT_DIR}/${COLLECTION_NAME}_${DATE}.snapshot"
''')

write_file(f"{bp2_dir}/.gitignore", '''data/
storage/
snapshots/
.env
.env.local
*.log
.DS_Store
''')

write_file(f"{bp2_dir}/README.md", '''# Enterprise RAG on Vultr with Docker & Qdrant 🚀

A battle-tested, production-ready **self-hosted Enterprise Retrieval-Augmented Generation (RAG)** infrastructure blueprint. Orchestrates **Qdrant Vector Database**, **Dify AI Workflow Studio**, **Ollama local LLM inference**, and **Caddy 2 with automatic Let\'s Encrypt SSL** on a high-performance Vultr Cloud Compute instance.

[![Docker Compose](https://img.shields.io/badge/docker--compose-v2-blue.svg)](docker-compose.yml)
[![Qdrant](https://img.shields.io/badge/Qdrant-v1.9.2-red.svg)](https://qdrant.tech)
[![Dify](https://img.shields.io/badge/Dify-v0.6.11-brightgreen.svg)](https://dify.ai)
[![Caddy](https://img.shields.io/badge/Caddy-v2.7.6-black.svg)](https://caddyserver.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

> 📖 **Full Implementation Blueprint & SOP:** Follow the step-by-step sizing, benchmarking, and security hardening guide at [Self-Hosted Qdrant on Docker & Vultr: Enterprise RAG Architecture](https://whoisalfaz.me/blog/self-hosted-qdrant-docker-vultr/).

---

## 🏛️ Stack Architecture

```mermaid
graph TD
    User((Client / AI Agent)) -->|HTTPS 443| Caddy[Caddy 2 Reverse Proxy & TLS]
    
    subgraph "Vultr High-Performance Cloud Node"
        Caddy -->|rag.domain.com| DifyWeb[Dify Frontend Studio]
        Caddy -->|API requests| DifyAPI[Dify Backend API]
        Caddy -->|qdrant.domain.com| Qdrant[(Qdrant Vector DB)]
        
        DifyAPI -->|Vector Ingestion / Search| Qdrant
        DifyAPI -->|Embeddings / Local LLM| Ollama[Ollama Inference Engine]
        DifyAPI -->|Relational Data| PG[(PostgreSQL 15 + pgvector)]
        DifyAPI -->|Queue / Cache| Redis[(Redis 7)]
    end
```

---

## 🖥️ Recommended Vultr VPS Sizing

| Workload | Recommended Vultr Plan | vCPU | RAM | NVMe SSD | Monthly Cost |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Starter / POC** | High Performance AMD | 2 vCPU | 4 GB | 100 GB | ~$24/mo |
| **Production Enterprise (1M-5M vectors)** | High Performance AMD | 4 vCPU | 8 GB | 150 GB | ~$48/mo |
| **High-Throughput GPU Inference** | Vultr Cloud GPU (A16 / L40S) | 4 vCPU | 16 GB | 200 GB + 16GB VRAM | ~$150/mo |

---

## ⚡ Step-by-Step Deployment Guide

### 1. Provision Ubuntu 22.04 / 24.04 on Vultr
Launch a High Performance AMD Compute instance in your preferred Vultr datacenter region.

### 2. Run Automated Provisioning Script
SSH into your server and initialize the host environment:

```bash
git clone https://github.com/AlfazMahmudRizve/enterprise-rag-vultr-docker.git /opt/enterprise-rag
cd /opt/enterprise-rag
chmod +x scripts/*.sh
sudo ./scripts/init-vultr.sh
```

### 3. Configure Environment Variables

```bash
cp .env.example .env
nano .env
```
Set your domains (`rag.yourdomain.com`, `qdrant.yourdomain.com`), email for TLS certificates, and strong passwords.

### 4. Configure DNS Records
Point your DNS A records to your Vultr Instance Public IP:
- `rag.yourdomain.com` -> `<VULTR_SERVER_IP>`
- `qdrant.yourdomain.com` -> `<VULTR_SERVER_IP>`
- `ollama.yourdomain.com` -> `<VULTR_SERVER_IP>`

### 5. Launch the Enterprise Stack

```bash
docker compose up -d
```

### 6. Pull LLM & Embedding Models into Ollama

```bash
# Pull high-speed dense embedding model
docker exec -it ollama-engine ollama pull nomic-embed-text

# Pull compact reasoning model (8B parameter)
docker exec -it ollama-engine ollama pull llama3.1:8b
```

---

## 🔒 Security & Backup Automation

- **Auto-TLS:** Handled transparently by Caddy 2 with HTTP/3 (QUIC) and HSTS security headers.
- **Firewall:** Managed via UFW (ports 22, 80, 443 open; database and internal ports strictly isolated in Docker bridge network).
- **Automated Qdrant Snapshots:** Run `bash scripts/backup-qdrant.sh knowledge_base` or add to crontab for hourly snapshots.

---

## 📚 Complete Guide & Benchmarks

For production RevOps pipelines, embedding evaluations, and enterprise vector storage tuning, read the full engineering deep dive:
👉 [https://whoisalfaz.me/blog/self-hosted-qdrant-docker-vultr/](https://whoisalfaz.me/blog/self-hosted-qdrant-docker-vultr/)

---

## 📄 License

MIT © [Alfaz Mahmud Rizve](https://whoisalfaz.me)
''')


# ==========================================
# 3. BLUEPRINT: headless-nextjs-seo-auditor
# ==========================================
bp3_dir = os.path.abspath("blueprints/headless-nextjs-seo-auditor")

write_file(f"{bp3_dir}/package.json", '''{
  "name": "headless-nextjs-seo-auditor",
  "version": "1.0.0",
  "description": "High-performance CLI and automated SEO auditor tailored for Next.js App Router, SSR, and Headless CMS websites.",
  "main": "src/index.js",
  "bin": {
    "headless-seo": "./bin/cli.js",
    "seo-audit": "./bin/cli.js"
  },
  "keywords": [
    "seo",
    "seo-audit",
    "nextjs",
    "screaming-frog-alternative",
    "headless-cms",
    "technical-seo",
    "json-ld",
    "sitemap",
    "crawler",
    "revops"
  ],
  "author": "Alfaz Mahmud Rizve <contact@whoisalfaz.me> (https://whoisalfaz.me)",
  "license": "MIT",
  "homepage": "https://whoisalfaz.me/audit/",
  "repository": {
    "type": "git",
    "url": "https://github.com/AlfazMahmudRizve/headless-nextjs-seo-auditor.git"
  },
  "dependencies": {
    "chalk": "^4.1.2",
    "cheerio": "^1.0.0-rc.12",
    "cli-table3": "^0.6.5",
    "commander": "^12.0.0",
    "ora": "^5.4.1",
    "xml2js": "^0.6.2"
  },
  "scripts": {
    "audit": "node bin/cli.js",
    "test": "node bin/cli.js --url https://whoisalfaz.me --depth 1"
  }
}
''')

write_file(f"{bp3_dir}/bin/cli.js", '''#!/usr/bin/env node

const { Command } = require('commander');
const { runAudit } = require('../src/index');

const program = new Command();

program
  .name('headless-seo')
  .description('High-performance technical SEO auditor for Next.js App Router and Headless websites')
  .version('1.0.0')
  .option('-u, --url <url>', 'Root URL to crawl and audit')
  .option('-s, --sitemap <sitemapUrl>', 'Sitemap XML URL to audit all indexed pages')
  .option('-d, --depth <number>', 'Maximum crawl depth level', '3')
  .option('-m, --max-pages <number>', 'Maximum number of pages to crawl', '50')
  .option('-c, --concurrency <number>', 'Concurrent HTTP requests', '5')
  .option('-o, --output <format>', 'Output format (terminal, json, html, csv, all)', 'terminal')
  .option('--out-dir <dir>', 'Directory to save generated audit reports', './reports')
  .option('--ci', 'Fail with exit code 1 if critical SEO errors are detected (for CI/CD pipelines)', false)
  .action(async (options) => {
    try {
      await runAudit(options);
    } catch (err) {
      console.error('\\n❌ Fatal SEO Audit Error:', err.message);
      process.exit(1);
    }
  });

program.parse(process.argv);
''')

write_file(f"{bp3_dir}/src/crawler.js", '''const cheerio = require('cheerio');
const xml2js = require('xml2js');

class Crawler {
  constructor(options = {}) {
    this.maxPages = parseInt(options.maxPages || 50, 10);
    this.maxDepth = parseInt(options.depth || 3, 10);
    this.concurrency = parseInt(options.concurrency || 5, 10);
    this.visited = new Set();
    this.queue = [];
    this.results = [];
  }

  async fetchSitemapUrls(sitemapUrl) {
    const res = await fetch(sitemapUrl, {
      headers: { 'User-Agent': 'Headless-NextJS-SEO-Auditor/1.0 (+https://whoisalfaz.me/audit/)' }
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch sitemap: ${res.status} ${res.statusText}`);
    }
    const text = await res.text();
    const parser = new xml2js.Parser();
    const parsed = await parser.parseStringPromise(text);

    const urls = [];
    if (parsed.urlset && parsed.urlset.url) {
      for (const item of parsed.urlset.url) {
        if (item.loc && item.loc[0]) {
          urls.push(item.loc[0].trim());
        }
      }
    } else if (parsed.sitemapindex && parsed.sitemapindex.sitemap) {
      for (const sm of parsed.sitemapindex.sitemap) {
        if (sm.loc && sm.loc[0]) {
          const subUrls = await this.fetchSitemapUrls(sm.loc[0].trim());
          urls.push(...subUrls);
        }
      }
    }
    return urls;
  }

  async crawlUrl(targetUrl, depth = 0, origin) {
    if (this.visited.has(targetUrl) || this.visited.size >= this.maxPages || depth > this.maxDepth) {
      return;
    }
    this.visited.add(targetUrl);

    const startTime = Date.now();
    let status = 0;
    let headers = {};
    let body = '';
    let error = null;

    try {
      const res = await fetch(targetUrl, {
        headers: { 'User-Agent': 'Headless-NextJS-SEO-Auditor/1.0 (+https://whoisalfaz.me/audit/)' },
        redirect: 'follow'
      });
      status = res.status;
      headers = Object.fromEntries(res.headers.entries());
      body = await res.text();
    } catch (e) {
      error = e.message;
    }

    const ttfb = Date.now() - startTime;
    const pageData = {
      url: targetUrl,
      status,
      ttfb,
      headers,
      body,
      error,
      depth
    };

    this.results.push(pageData);

    if (body && status === 200 && depth < this.maxDepth && this.visited.size < this.maxPages) {
      const $ = cheerio.load(body);
      const links = [];
      $('a[href]').each((_, el) => {
        const href = $(el).attr('href');
        if (!href) return;
        try {
          const resolved = new URL(href, targetUrl);
          if (resolved.origin === origin && !resolved.pathname.match(/\\.(png|jpg|jpeg|gif|svg|pdf|zip|css|js)$/i)) {
            const cleanUrl = resolved.origin + resolved.pathname;
            if (!this.visited.has(cleanUrl)) {
              links.push(cleanUrl);
            }
          }
        } catch (_) {}
      });

      for (const link of links) {
        if (this.visited.size >= this.maxPages) break;
        await this.crawlUrl(link, depth + 1, origin);
      }
    }
  }
}

module.exports = { Crawler };
''')

write_file(f"{bp3_dir}/src/auditor.js", '''const cheerio = require('cheerio');

class PageAuditor {
  static audit(page) {
    const issues = [];
    const metrics = {};

    if (page.error) {
      issues.push({ severity: 'critical', message: `Fetch Error: ${page.error}` });
      return { url: page.url, status: page.status, score: 0, issues, metrics };
    }

    if (page.status >= 400) {
      issues.push({ severity: 'critical', message: `HTTP Error Status ${page.status}` });
    } else if (page.status >= 300) {
      issues.push({ severity: 'warning', message: `Redirect Status ${page.status}` });
    }

    metrics.ttfb = page.ttfb;
    if (page.ttfb > 1200) {
      issues.push({ severity: 'warning', message: `High TTFB: ${page.ttfb}ms (> 1200ms threshold)` });
    }

    if (!page.body) {
      return { url: page.url, status: page.status, score: 30, issues, metrics };
    }

    const $ = cheerio.load(page.body);

    // 1. Title Tag
    const title = $('title').text().trim();
    metrics.title = title;
    metrics.titleLength = title.length;
    if (!title) {
      issues.push({ severity: 'critical', message: 'Missing <title> tag' });
    } else if (title.length < 30) {
      issues.push({ severity: 'warning', message: `Title is too short (${title.length} chars, min 30)` });
    } else if (title.length > 65) {
      issues.push({ severity: 'warning', message: `Title is too long (${title.length} chars, max 65)` });
    }

    // 2. Meta Description
    const metaDesc = $('meta[name="description"]').attr('content') || '';
    metrics.metaDescription = metaDesc;
    metrics.metaDescLength = metaDesc.length;
    if (!metaDesc) {
      issues.push({ severity: 'critical', message: 'Missing meta description' });
    } else if (metaDesc.length < 100) {
      issues.push({ severity: 'warning', message: `Meta description too short (${metaDesc.length} chars, min 100)` });
    } else if (metaDesc.length > 165) {
      issues.push({ severity: 'warning', message: `Meta description too long (${metaDesc.length} chars, max 165)` });
    }

    // 3. Headings (H1-H6)
    const h1s = $('h1');
    metrics.h1Count = h1s.length;
    metrics.h1Text = h1s.first().text().trim();
    if (h1s.length === 0) {
      issues.push({ severity: 'critical', message: 'Missing <h1> tag' });
    } else if (h1s.length > 1) {
      issues.push({ severity: 'warning', message: `Multiple <h1> tags found (${h1s.length})` });
    }

    // 4. Canonical Tag
    const canonical = $('link[rel="canonical"]').attr('href');
    metrics.canonical = canonical;
    if (!canonical) {
      issues.push({ severity: 'critical', message: 'Missing rel="canonical" link' });
    } else if (canonical !== page.url && !page.url.endsWith('/') && canonical !== page.url + '/') {
      issues.push({ severity: 'info', message: `Canonical points to different URL: ${canonical}` });
    }

    // 5. OpenGraph & Twitter Cards
    const ogTitle = $('meta[property="og:title"]').attr('content');
    const ogImage = $('meta[property="og:image"]').attr('content');
    metrics.hasOgTitle = !!ogTitle;
    metrics.hasOgImage = !!ogImage;
    if (!ogTitle || !ogImage) {
      issues.push({ severity: 'warning', message: 'Incomplete OpenGraph tags (og:title / og:image missing)' });
    }

    // 6. Structured Data (JSON-LD)
    const jsonLdScripts = $('script[type="application/ld+json"]');
    const schemasFound = [];
    jsonLdScripts.each((_, el) => {
      try {
        const parsed = JSON.parse($(el).html());
        if (parsed['@type']) schemasFound.push(parsed['@type']);
      } catch (_) {
        issues.push({ severity: 'warning', message: 'Invalid JSON-LD syntax detected' });
      }
    });
    metrics.schemas = schemasFound;
    if (schemasFound.length === 0) {
      issues.push({ severity: 'info', message: 'No structured data (JSON-LD) schema detected' });
    }

    // 7. Image Alt Attributes
    const images = $('img');
    let missingAlt = 0;
    images.each((_, el) => {
      const alt = $(el).attr('alt');
      if (alt === undefined || alt === null || alt.trim() === '') {
        missingAlt++;
      }
    });
    metrics.totalImages = images.length;
    metrics.missingAltImages = missingAlt;
    if (missingAlt > 0) {
      issues.push({ severity: 'warning', message: `${missingAlt} image(s) missing alt attributes` });
    }

    let penalty = 0;
    for (const issue of issues) {
      if (issue.severity === 'critical') penalty += 25;
      if (issue.severity === 'warning') penalty += 10;
      if (issue.severity === 'info') penalty += 3;
    }
    const score = Math.max(0, 100 - penalty);

    return {
      url: page.url,
      status: page.status,
      score,
      issues,
      metrics
    };
  }
}

module.exports = { PageAuditor };
''')

write_file(f"{bp3_dir}/src/reporters/terminal.js", '''const chalk = require('chalk');
const Table = require('cli-table3');

function printTerminalReport(results, summary) {
  console.log('\\n' + chalk.bold.cyan('================================================================================'));
  console.log(chalk.bold.green(' 🚀 HEADLESS NEXT.JS TECHNICAL SEO AUDIT REPORT'));
  console.log(chalk.gray(' Free Screaming Frog Alternative: https://whoisalfaz.me/audit/'));
  console.log(chalk.bold.cyan('================================================================================\\n'));

  const scoreColor = summary.averageScore >= 85 ? chalk.green : summary.averageScore >= 70 ? chalk.yellow : chalk.red;
  console.log(chalk.bold('📊 AUDIT SUMMARY:'));
  console.log(` • Pages Audited:    ${chalk.bold.white(summary.totalPages)}`);
  console.log(` • Average Health:   ${scoreColor(summary.averageScore + '/100')}`);
  console.log(` • Critical Errors:  ${summary.criticalIssues > 0 ? chalk.bold.red(summary.criticalIssues) : chalk.green('0')}`);
  console.log(` • Warnings:         ${summary.warnings > 0 ? chalk.bold.yellow(summary.warnings) : chalk.green('0')}`);
  console.log(` • Average TTFB:     ${chalk.cyan(summary.avgTtfb + 'ms')}\\n`);

  const table = new Table({
    head: [
      chalk.white('Status'),
      chalk.white('Score'),
      chalk.white('URL'),
      chalk.white('Title Length'),
      chalk.white('H1 Tag'),
      chalk.white('Issues')
    ],
    colWidths: [8, 8, 40, 14, 16, 30],
    wordWrap: true
  });

  for (const item of results) {
    const statusCol = item.status === 200 ? chalk.green(item.status) : chalk.red(item.status);
    const scoreCol = item.score >= 85 ? chalk.green(item.score) : item.score >= 70 ? chalk.yellow(item.score) : chalk.red(item.score);
    const issuesText = item.issues.map(i => {
      const icon = i.severity === 'critical' ? chalk.red('✖') : i.severity === 'warning' ? chalk.yellow('▲') : chalk.blue('ℹ');
      return `${icon} ${i.message}`;
    }).join('\\n');

    table.push([
      statusCol,
      scoreCol,
      chalk.dim(item.url),
      item.metrics.titleLength ? `${item.metrics.titleLength} ch` : chalk.red('Missing'),
      item.metrics.h1Count === 1 ? chalk.green('1 (OK)') : chalk.red(`${item.metrics.h1Count || 0} found`),
      issuesText || chalk.green('✔ No issues')
    ]);
  }

  console.log(table.toString());
  console.log('\\n' + chalk.bold.magenta('💡 Recommended Next Steps:'));
  console.log(' • Free SEO Tool Comparison: https://whoisalfaz.me/blog/screaming-frog-alternatives-free-seo-audit-tools/');
  console.log(' • Live Free SEO Auditor:    https://whoisalfaz.me/audit/\\n');
}

module.exports = { printTerminalReport };
''')

write_file(f"{bp3_dir}/src/reporters/html.js", '''function generateHtmlReport(results, summary) {
  const scoreClass = summary.averageScore >= 85 ? 'text-emerald-400' : summary.averageScore >= 70 ? 'text-amber-400' : 'text-rose-400';

  const rows = results.map(r => `
    <tr class="border-b border-zinc-800 hover:bg-zinc-800/50 transition">
      <td class="px-4 py-3 font-mono text-sm">
        <span class="px-2 py-0.5 rounded text-xs font-semibold ${r.status === 200 ? 'bg-emerald-950 text-emerald-300' : 'bg-rose-950 text-rose-300'}">
          ${r.status}
        </span>
      </td>
      <td class="px-4 py-3 font-bold ${r.score >= 85 ? 'text-emerald-400' : r.score >= 70 ? 'text-amber-400' : 'text-rose-400'}">
        ${r.score}
      </td>
      <td class="px-4 py-3 text-sm text-zinc-300 font-mono break-all">
        <a href="${r.url}" target="_blank" class="hover:underline text-blue-400">${r.url}</a>
      </td>
      <td class="px-4 py-3 text-xs text-zinc-400">
        ${r.metrics.title || '<span class="text-rose-400">Missing</span>'} (${r.metrics.titleLength || 0} chars)
      </td>
      <td class="px-4 py-3 text-xs">
        <ul class="space-y-1">
          ${r.issues.map(i => `
            <li class="${i.severity === 'critical' ? 'text-rose-400' : i.severity === 'warning' ? 'text-amber-300' : 'text-sky-300'}">
              • ${i.message}
            </li>
          `).join('') || '<li class="text-emerald-400">✔ Clean</li>'}
        </ul>
      </td>
    </tr>
  `).join('');

  return `<!DOCTYPE html>
<html lang="en" class="dark">
<head>
  <meta charset="UTF-8">
  <title>Next.js Technical SEO Audit Report</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>body { background-color: #09090b; color: #f4f4f5; font-family: ui-sans-serif, system-ui, sans-serif; }</style>
</head>
<body class="p-8 max-w-7xl mx-auto">
  <header class="border-b border-zinc-800 pb-6 mb-8 flex justify-between items-center">
    <div>
      <h1 class="text-3xl font-extrabold text-white tracking-tight">Technical SEO Audit Report</h1>
      <p class="text-zinc-400 mt-1">Automated Headless & Next.js Audit Suite | <a href="https://whoisalfaz.me/audit/" class="text-blue-400 hover:underline">whoisalfaz.me/audit</a></p>
    </div>
    <div class="text-right">
      <div class="text-4xl font-black ${scoreClass}">${summary.averageScore}/100</div>
      <div class="text-xs uppercase tracking-wider text-zinc-500 font-semibold">Average SEO Score</div>
    </div>
  </header>

  <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
    <div class="bg-zinc-900 border border-zinc-800 p-4 rounded-xl">
      <div class="text-zinc-400 text-xs font-semibold uppercase">Total Pages</div>
      <div class="text-2xl font-bold text-white mt-1">${summary.totalPages}</div>
    </div>
    <div class="bg-zinc-900 border border-zinc-800 p-4 rounded-xl">
      <div class="text-zinc-400 text-xs font-semibold uppercase">Critical Errors</div>
      <div class="text-2xl font-bold text-rose-400 mt-1">${summary.criticalIssues}</div>
    </div>
    <div class="bg-zinc-900 border border-zinc-800 p-4 rounded-xl">
      <div class="text-zinc-400 text-xs font-semibold uppercase">Warnings</div>
      <div class="text-2xl font-bold text-amber-400 mt-1">${summary.warnings}</div>
    </div>
    <div class="bg-zinc-900 border border-zinc-800 p-4 rounded-xl">
      <div class="text-zinc-400 text-xs font-semibold uppercase">Avg TTFB Latency</div>
      <div class="text-2xl font-bold text-sky-400 mt-1">${summary.avgTtfb}ms</div>
    </div>
  </div>

  <div class="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl">
    <table class="w-full text-left border-collapse">
      <thead class="bg-zinc-950 text-xs font-semibold uppercase text-zinc-400 border-b border-zinc-800">
        <tr>
          <th class="px-4 py-3">Status</th>
          <th class="px-4 py-3">Score</th>
          <th class="px-4 py-3">URL</th>
          <th class="px-4 py-3">Title Tag</th>
          <th class="px-4 py-3">Detected Issues</th>
        </tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>
    </table>
  </div>

  <footer class="mt-12 text-center text-xs text-zinc-500 border-t border-zinc-800 pt-6">
    Generated by <a href="https://whoisalfaz.me" class="text-zinc-300 font-semibold hover:underline">Alfaz Mahmud Rizve</a> • 
    Read the benchmark guide: <a href="https://whoisalfaz.me/blog/screaming-frog-alternatives-free-seo-audit-tools/" class="text-blue-400 hover:underline">Free Screaming Frog Alternatives</a>
  </footer>
</body>
</html>`;
}

module.exports = { generateHtmlReport };
''')

write_file(f"{bp3_dir}/src/index.js", '''const fs = require('fs');
const path = require('path');
const ora = require('ora');
const chalk = require('chalk');

const { Crawler } = require('./crawler');
const { PageAuditor } = require('./auditor');
const { printTerminalReport } = require('./reporters/terminal');
const { generateHtmlReport } = require('./reporters/html');

async function runAudit(options) {
  if (!options.url && !options.sitemap) {
    throw new Error('Please specify a target root URL (--url) or sitemap (--sitemap).');
  }

  const spinner = ora(chalk.cyan('Initializing Headless Next.js SEO Auditor...')).start();
  const crawler = new Crawler(options);

  let targetUrls = [];
  if (options.sitemap) {
    spinner.text = `Fetching and parsing sitemap: ${options.sitemap}...`;
    targetUrls = await crawler.fetchSitemapUrls(options.sitemap);
    spinner.info(`Discovered ${targetUrls.length} URLs in sitemap.`);
    spinner.start('Auditing sitemap URLs...');
    
    for (const u of targetUrls.slice(0, parseInt(options.maxPages || 50, 10))) {
      await crawler.crawlUrl(u, 0, new URL(u).origin);
    }
  } else {
    const rootOrigin = new URL(options.url).origin;
    spinner.text = `Crawling site starting at ${options.url} (max depth: ${options.depth})...`;
    await crawler.crawlUrl(options.url, 0, rootOrigin);
  }

  spinner.text = `Analyzing ${crawler.results.length} pages for SEO quality...`;

  const auditResults = crawler.results.map(page => PageAuditor.audit(page));

  // Compute Summary Metrics
  const totalPages = auditResults.length;
  const totalScore = auditResults.reduce((acc, r) => acc + r.score, 0);
  const averageScore = Math.round(totalScore / (totalPages || 1));
  const criticalIssues = auditResults.reduce((acc, r) => acc + r.issues.filter(i => i.severity === 'critical').length, 0);
  const warnings = auditResults.reduce((acc, r) => acc + r.issues.filter(i => i.severity === 'warning').length, 0);
  const totalTtfb = auditResults.reduce((acc, r) => acc + (r.metrics.ttfb || 0), 0);
  const avgTtfb = Math.round(totalTtfb / (totalPages || 1));

  const summary = {
    totalPages,
    averageScore,
    criticalIssues,
    warnings,
    avgTtfb
  };

  spinner.succeed(chalk.green(`SEO Audit Completed! Processed ${totalPages} pages.`));

  // Output formatting
  const outputFormat = (options.output || 'terminal').toLowerCase();
  const outDir = path.resolve(options.outDir || './reports');
  fs.mkdirSync(outDir, { recursive: true });

  if (outputFormat === 'terminal' || outputFormat === 'all') {
    printTerminalReport(auditResults, summary);
  }

  if (outputFormat === 'json' || outputFormat === 'all') {
    const jsonPath = path.join(outDir, 'seo-audit-report.json');
    fs.writeFileSync(jsonPath, JSON.stringify({ summary, results: auditResults }, null, 2));
    console.log(chalk.gray(`📁 JSON Report written to: ${jsonPath}`));
  }

  if (outputFormat === 'html' || outputFormat === 'all') {
    const htmlPath = path.join(outDir, 'seo-audit-report.html');
    fs.writeFileSync(htmlPath, generateHtmlReport(auditResults, summary));
    console.log(chalk.gray(`📁 HTML Report written to: ${htmlPath}`));
  }

  if (options.ci && criticalIssues > 0) {
    console.error(chalk.bold.red(`\\n❌ CI Check Failed: ${criticalIssues} critical SEO errors detected.`));
    process.exit(1);
  }
}

module.exports = { runAudit };
''')

write_file(f"{bp3_dir}/.gitignore", '''node_modules/
reports/
.DS_Store
*.log
.env
.env.local
''')

write_file(f"{bp3_dir}/README.md", '''# Headless Next.js Technical SEO Auditor 🔍

A high-throughput, modern CLI and programmatic SEO auditor engineered specifically for **Next.js App Router**, **SSR**, and **Headless CMS** architectures. Designed as a zero-cost, open-source alternative to Screaming Frog for modern web developers and RevOps teams.

[![npm version](https://img.shields.io/badge/npm-v1.0.0-cb3837.svg)](https://www.npmjs.com)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-brightgreen.svg)](https://nodejs.org)
[![Next.js Ready](https://img.shields.io/badge/Next.js-App%20Router-black.svg)](https://nextjs.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

> 📖 **Comparative Analysis & Web Tool:**
> - Read the full industry benchmark: [Screaming Frog Alternatives: Free SEO Audit Tools for Headless & Next.js](https://whoisalfaz.me/blog/screaming-frog-alternatives-free-seo-audit-tools/)
> - Try the live cloud auditor: [whoisalfaz.me/audit](https://whoisalfaz.me/audit/)

---

## ✨ Features

- **Next.js App Router Optimized:** Accurately audits SSR hydration, streaming payloads, and dynamic route canonicals.
- **Sitemap & Recursive Crawler:** Ingests standard `sitemap.xml` or recursively traverses internal site links up to configurable depths.
- **Critical Technical Checks:**
  - Status codes (200, 301/308 redirects, 404/500 errors)
  - Time to First Byte (TTFB) server response latency
  - `<title>` and `<meta name="description">` length & pixel constraints
  - `<h1>` to `<h6>` heading structure hierarchy
  - `rel="canonical"` tag validation & self-referencing checks
  - OpenGraph (`og:title`, `og:image`, `og:description`) & Twitter Card metadata
  - Structured Data / JSON-LD validation (`Article`, `Organization`, `BreadcrumbList`, etc.)
  - Images missing `alt` attributes and Next.js `<Image>` optimization checks
- **Multi-Format Reporting:** Generates rich terminal dashboards, standalone responsive HTML reports, and structured JSON output.
- **CI/CD Integration:** Supports `--ci` flag to block pull requests on critical SEO regressions.

---

## 🚀 Quick Start

### Installation

```bash
git clone https://github.com/AlfazMahmudRizve/headless-nextjs-seo-auditor.git
cd headless-nextjs-seo-auditor
npm install
```

### Run an Audit

```bash
# Audit a single website URL with recursive crawling
node bin/cli.js --url https://whoisalfaz.me --depth 2

# Audit an entire sitemap with HTML and JSON reports
node bin/cli.js --sitemap https://whoisalfaz.me/sitemap.xml --output all
```

---

## 🛠️ CLI Options & Flags

```text
Usage: headless-seo [options]

Options:
  -u, --url <url>              Root URL to crawl and audit
  -s, --sitemap <sitemapUrl>   Sitemap XML URL to audit all indexed pages
  -d, --depth <number>         Maximum crawl depth level (default: "3")
  -m, --max-pages <number>     Maximum number of pages to crawl (default: "50")
  -c, --concurrency <number>   Concurrent HTTP requests (default: "5")
  -o, --output <format>        Output format (terminal, json, html, all) (default: "terminal")
  --out-dir <dir>              Directory to save generated audit reports (default: "./reports")
  --ci                         Fail with exit code 1 if critical SEO errors are detected
  -h, --help                   Display help for command
```

---

## 🔄 GitHub Actions CI/CD Pipeline

Add automated SEO checks to your Next.js pull requests by adding `.github/workflows/seo-audit.yml`:

```yaml
name: Technical SEO Audit

on:
  pull_request:
    branches: [main]

jobs:
  audit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm install
      - name: Run SEO Regression Check
        run: npx headless-seo --url https://staging.yourdomain.com --depth 2 --ci
```

---

## 📊 Live Cloud Auditor

Prefer an instant web interface? Use the free cloud scanner at [whoisalfaz.me/audit](https://whoisalfaz.me/audit/).

---

## 📄 License

MIT © [Alfaz Mahmud Rizve](https://whoisalfaz.me)
''')

print("All 3 Blueprint directories and files created successfully!")

