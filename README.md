# Quai Trust Experiment

A zero-build static page for the meta-experiment:

**Proof routes trust in. Burn routes value out.**

The page introduces three existing proof paths:

1. Jay / expert proof
2. Canonical direct offer / mechanism proof
3. Essay / longitudinal proof

Then it explains the Quai experiment as the second half of the trust loop:

**Proof → Trust → Transaction → Value → Burn → Network**

## Configure

Edit `config.js`:

```js
window.TRUST_EXPERIMENT_CONFIG = {
  jayUrl: "https://your-domain.com/jay",
  canonicalUrl: "https://your-domain.com/direct",
  essayUrl: "https://your-domain.com/essay",
  calUrl: "https://cal.com/YOUR-BOOKING-LINK",
  eventEndpoint: ""
};
```

Incoming query params are preserved. The page adds:
- `trust_path_source=quai`
- `trust_path=jay|direct|essay|quai`

## Track

- visitors
- route clicks
- $1,000 purchases
- customer leverage created
- revenue collected
- Quai burned
- originating trust path

## Deploy

Upload the files to a GitHub repo and enable GitHub Pages from `main` / root.

No build step required.
