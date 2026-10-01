# Togedab website

Static site built with HTML, CSS and JavaScript. Open `index.html` in a browser to preview.

## Files

- `index.html`, `about.html`, `services.html`, `filling-station.html`, `contact.html`
- `style.css` for all styles
- `main.js` for the mobile menu, footer year and enquiry form
- `images/` for the logo and photos

## Images

Place these in the `images/` folder:

- `logo.png` (dark logo for the header)
- `logo-light.png` (light logo for the footer)
- `favicon.png`
- Hero band: `field-testing.jpg`, `tank-calibration.jpg`, `station-front.jpg`, `construction.jpg`
- Gallery and sections: `tank-chamber.jpg`, `tank-calibration-site.jpg`, `underground-tanks.jpg`, `excavation.jpg`, `forecourt.jpg`, `completed-building.jpg`

Use lowercase filenames with no spaces, max 1600px wide and under 300 KB.

## Enquiry form

Get an access key from web3forms.com using togedabtea@gmail.com, then add it to `ACCESS_KEY` in `main.js`. Until then, the form opens the visitor's email app.

## Maps

The map on `filling-station.html` and `contact.html` points at Zango, Lokoja. To show the exact station, replace the iframe `src` with the embed link from Google Maps (Share, then Embed a map).
