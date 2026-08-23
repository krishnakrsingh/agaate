-- Newsletter / waitlist signups (e.g. Kisaan Mall coming-soon page)
CREATE TABLE IF NOT EXISTS newsletter_signups (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  contact VARCHAR(160) NOT NULL,
  contact_type ENUM('email', 'phone') NOT NULL,
  source_page VARCHAR(255) NOT NULL DEFAULT '/kisaan-mall',
  ip_hash CHAR(64) NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_newsletter_source_created (source_page, created_at),
  INDEX idx_newsletter_contact (contact, source_page)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
