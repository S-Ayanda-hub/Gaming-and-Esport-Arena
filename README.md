# Next Level Arena

A responsive, multi-page website for a fictional competitive gaming arena —
built to match a Figma design as part of the XHAW5112 (Work Integrated
Learning) module.

---

## About the Project

Next Level Arena is a gaming/esports arena booking site offering gaming
packages, VR experiences, esports training, and birthday party bookings.
The site includes a live fee calculator that estimates a quote based on
package choice, squad size, booking discounts, and promo codes.

## Pages

| Page | File | Description |
|---|---|---|
| Home | `index.html` | Hero section, featured packages, testimonials |
| About Us | `about.html` | Mission statement, stats, leadership team |
| Packages | `packages.html` | Filterable pricing table of all packages |
| Package Detail | `packageDetails.html` | Single package breakdown with gallery |
| Fee Calculator | `feeCalc.html` | Live-updating quote calculator |
| Contact Us | `contact.html` | Contact form, location info, FAQ accordion |

## Features

- Fully responsive layout (desktop and mobile breakpoints)
- Mobile hamburger navigation and bottom tab bar
- Filterable package pricing table
- Live fee calculator with squad-size stepper, discount tiers, and promo codes
- FAQ accordion built with native `<details>`/`<summary>` elements
- Font Awesome icons throughout (no image assets required)

## Tech Stack

- HTML5
- CSS3 (custom properties, Flexbox, Grid)
- Vanilla JavaScript (no frameworks)
- [Font Awesome](https://fontawesome.com/) (icons, via CDN)
- [Google Fonts](https://fonts.google.com/) — Poppins & Inter

## Project Structure

```
next-level-arena/
├── index.html
├── about.html
├── packages.html
├── packageDetails.html
├── feeCalc.html
├── contact.html
├── css/
│   └── all.css
├── js/
│   └── all.js
└── README.md
```

## Running the Project

No build step or dependencies required. Clone the repo and open
`index.html` in a browser, or serve the folder with any static server
(e.g. VS Code's Live Server extension).

## Acknowledgements

- Design reference: Figma mockup provided for the XHAW5112 module
- Icons: [Font Awesome](https://fontawesome.com/)
