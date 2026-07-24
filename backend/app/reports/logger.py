"""
CampusFlow AI - Structured Event Logger
Provides JSON-structured logging for optimization states, API requests, and audit trails.
"""

import logging
import json
from datetime import datetime
from typing import Dict, Any, Optional

logger = logging.getLogger("CampusFlowLogger")
logger.setLevel(logging.INFO)

if not logger.handlers:
    handler = logging.StreamHandler()
    formatter = logging.Formatter('%(message)s')
    handler.setFormatter(formatter)
    logger.addHandler(handler)

def log_event(event_type: str, details: Dict[str, Any], level: str = "INFO", request_id: Optional[str] = None):
    log_entry = {
        "timestamp": datetime.now().isoformat(),
        "system": "CampusFlow-v2.0",
        "event_type": event_type,
        "level": level,
        "request_id": request_id,
        "details": details
    }
    log_json = json.dumps(log_entry)
    if level == "ERROR":
        logger.error(log_json)
    elif level == "WARNING":
        logger.warning(log_json)
    else:
        logger.info(log_json)
