CREATE TABLE IF NOT EXISTS career_applications (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  job_slug VARCHAR(64) NOT NULL,
  job_title VARCHAR(200) NOT NULL,
  name VARCHAR(160) NOT NULL,
  phone VARCHAR(32) NOT NULL,
  email VARCHAR(160) NOT NULL,
  experience_band VARCHAR(80) NOT NULL DEFAULT '',
  crop_experience VARCHAR(500) NOT NULL DEFAULT '',
  resume_url VARCHAR(512) NOT NULL,
  ip_hash CHAR(64) NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_career_apps_created (created_at),
  INDEX idx_career_apps_job (job_slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
