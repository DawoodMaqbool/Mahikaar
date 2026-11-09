import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    // Keep non-public utility responses out of search without changing their behaviour.
    return ["/api/:path*", "/enquiry-files/:path*"].map((source) => ({
      source,
      headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
    }));
  },
};

export default nextConfig;
