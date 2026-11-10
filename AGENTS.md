# Architecture rules

- Apply domain-aware search headers at the existing server fetch boundary using the incoming request URL; custom-domain SEO and response bodies must remain unchanged.
- Static HTML exports bypass the server search policy and require a hostname-aware serving-edge rule before claiming platform-domain noindex coverage.