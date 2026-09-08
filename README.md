# Meccha Japan Support

A fan-support section built in the visual language of the Meccha Japan store
(https://meccha-japan.com/en/): black e-commerce header, red/cyan accents,
Luckiest Guy display headings over Noto Sans, thin neutral borders and
flip-card style community tiles.

## Running

```bash
npm install
npm run dev     # http://localhost:3900
```

## Structure

```
src/app/                  routes
  page.tsx                home (promo banner, featured, categories, ranking, steps)
  studios/                collection page with sidebar filters
  support/[slug]/         community detail + support panel
  my-support/             support history
  favorites/              saved communities
  search/                 client-side search results
  how-it-works/           steps, payment methods, FAQ, policy
src/components/           Header, Footer, cards, grids, support panel, modal
src/data/communities.ts   25 communities (content, imagery, support destinations)
src/data/categories.ts    category tiles and studio/publisher groupings
src/data/payments.ts      payment methods and supported coins
src/lib/storage.ts        favorites + support history
public/img/               product and franchise imagery
```

## Payments

The front end is complete: amount selection, six payment methods, per-chain
crypto addresses (BTC / ETH / SOL), confirmation dialog and support history.
There is no payment backend wired up yet — confirming records the contribution
locally. The values a provider needs to replace live in
`src/data/communities.ts` (`supportId`, `destination`, `walletAddresses`).

## Imagery

`public/img/cards` holds the transparent franchise cut-outs used on community
cards; `public/img/products` holds product photography used in galleries and
the weekly ranking.
