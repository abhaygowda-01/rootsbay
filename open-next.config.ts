import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

// Every page is prerendered at build time and nothing revalidates, so the read-only cache served
// from the Worker's static assets is enough: no R2 bucket, KV, queue or tag cache to set up.
// Cache interception stays off because it does not work with Partial Prerendering (cacheComponents).
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
});
