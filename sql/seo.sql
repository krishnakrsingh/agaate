-- SEO management tables for Agaate CMS
-- Safe to run multiple times (CREATE TABLE IF NOT EXISTS)

CREATE TABLE IF NOT EXISTS seo_global_settings (
  id INT NOT NULL PRIMARY KEY DEFAULT 1,
  payload JSON NOT NULL,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS seo_metadata (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  entity_type VARCHAR(64) NOT NULL,
  entity_key VARCHAR(255) NOT NULL,
  locale VARCHAR(8) NOT NULL DEFAULT 'en',
  seo_title VARCHAR(255) NULL,
  meta_description TEXT NULL,
  meta_keywords VARCHAR(512) NULL,
  canonical_url VARCHAR(512) NULL,
  slug VARCHAR(255) NULL,
  robots_directive VARCHAR(128) NULL,
  noindex TINYINT(1) NOT NULL DEFAULT 0,
  nofollow TINYINT(1) NOT NULL DEFAULT 0,
  og_title VARCHAR(255) NULL,
  og_description TEXT NULL,
  og_image VARCHAR(512) NULL,
  twitter_title VARCHAR(255) NULL,
  twitter_description TEXT NULL,
  twitter_image VARCHAR(512) NULL,
  focus_keyword VARCHAR(128) NULL,
  secondary_keywords TEXT NULL,
  schema_json MEDIUMTEXT NULL,
  custom_head TEXT NULL,
  seo_status ENUM('draft','optimized','needs_review') NOT NULL DEFAULT 'needs_review',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uq_seo_entity (entity_type, entity_key, locale),
  KEY idx_seo_entity_type (entity_type),
  KEY idx_seo_noindex (noindex)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS seo_redirects (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  source_path VARCHAR(512) NOT NULL,
  destination_path VARCHAR(512) NOT NULL,
  redirect_type SMALLINT NOT NULL DEFAULT 301,
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uq_redirect_source (source_path),
  KEY idx_redirect_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT IGNORE INTO seo_global_settings (id, payload) VALUES (1, JSON_OBJECT(
  'websiteName', 'Agaate',
  'websiteUrl', 'https://agaate.in',
  'defaultTitle', 'Agaate — Integrated Seed-to-Market Agri Business',
  'titleSuffix', ' | Agaate',
  'defaultDescription', 'Agaate is an integrated agricultural enterprise combining Bio-Boosted seedling infrastructure, input commerce, on-ground field advisory, market linkage, and carbon monetization.',
  'defaultOgImage', '/logo.png',
  'defaultTwitterImage', '/logo.png',
  'defaultRobots', 'index, follow',
  'trailingSlash', false,
  'organizationName', 'Agaate',
  'organizationLegalName', 'Anzix Farm Technologies Pvt Ltd',
  'organizationLogo', '/logo.png',
  'organizationEmail', 'hello@agaate.in',
  'organizationPhone', '+91-124-000-0000',
  'organizationAddress', 'Gurugram, Haryana',
  'organizationCity', 'Gurugram',
  'organizationRegion', 'Haryana',
  'organizationCountry', 'IN',
  'organizationPostalCode', '122001',
  'socialProfiles', JSON_OBJECT('twitter', '@AgaateAgri'),
  'sitemapEnabled', true
));
