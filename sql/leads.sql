-- Agaate contact leads table
CREATE TABLE IF NOT EXISTS leads (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  ticket_id VARCHAR(32) NOT NULL UNIQUE,
  name VARCHAR(120) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(160) NULL,
  topic VARCHAR(64) NOT NULL,
  acreage VARCHAR(64) NULL,
  crop VARCHAR(64) NULL,
  district VARCHAR(120) NULL,
  channel VARCHAR(32) NULL,
  message TEXT NULL,
  consent TINYINT(1) NOT NULL DEFAULT 0,
  consent_at DATETIME NULL,
  source_page VARCHAR(255) NULL,
  ip_hash CHAR(64) NULL,
  user_agent VARCHAR(512) NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_leads_created (created_at),
  INDEX idx_leads_phone (phone),
  INDEX idx_leads_topic (topic)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
