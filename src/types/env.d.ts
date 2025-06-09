/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_SITE_URL: string;
  readonly PUBLIC_CONTACT_EMAIL: string;
  readonly PUBLIC_GITHUB_URL: string;
  readonly PUBLIC_LINKEDIN_URL: string;
  readonly PUBLIC_BLOG_URL: string;
  readonly PUBLIC_GOOGLE_ANALYTICS_ID: string;
  readonly PUBLIC_SITE_NAME: string;
  readonly PUBLIC_SITE_DESCRIPTION: string;
  readonly PUBLIC_SITE_AUTHOR: string;
  readonly PUBLIC_SITE_TWITTER: string;
  readonly PUBLIC_SITE_IMAGE: string;
  readonly PUBLIC_SITE_IMAGE_ALT: string;
  readonly PUBLIC_SITE_IMAGE_WIDTH: string;
  readonly PUBLIC_SITE_IMAGE_HEIGHT: string;
  readonly PUBLIC_SITE_IMAGE_TYPE: string;
  readonly PUBLIC_SITE_IMAGE_TWITTER: string;
  readonly PUBLIC_SITE_IMAGE_TWITTER_ALT: string;
  readonly PUBLIC_SITE_IMAGE_TWITTER_WIDTH: string;
  readonly PUBLIC_SITE_IMAGE_TWITTER_HEIGHT: string;
  readonly PUBLIC_SITE_IMAGE_TWITTER_TYPE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
} 