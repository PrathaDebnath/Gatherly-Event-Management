# Gatherly — Event Management Website

A responsive event discovery and registration website built for the K Explore Web Designing assignment.

## Features
- Responsive landing page for mobile, tablet and desktop
- Six sample events with date, venue, category, image and description
- Search by event name, category, venue or description
- Category filters
- Event detail dialog and registration form
- JavaScript validation for name, email and 10-digit phone number
- Registration confirmation and Local Storage persistence
- Dark/light mode with saved preference
- Mobile navigation and newsletter interaction

## Tech stack
HTML5, CSS3 and vanilla JavaScript. No build tools or framework required.

## Run locally
1. Download and extract the project.
2. Open `index.html` in a modern browser.

For a local development server, you can use the VS Code Live Server extension.

## Customize
Edit the `events` array near the top of `script.js` to change event names, dates, venues, descriptions, categories and images. The current events are sample/demo content.

## Deploy
### GitHub Pages
1. Create a GitHub repository and upload all project files.
2. Open **Settings → Pages**.
3. Select **Deploy from a branch**, choose `main` and `/root`, then save.
4. Wait for GitHub Pages to provide your website URL.

### Netlify
Drag the extracted project folder into Netlify's deploy area, or connect the GitHub repository.

## Registration data note
This student demo stores registrations in the visitor's browser using Local Storage. It does not send registrations to a server, email inbox, or shared database. A production registration system needs a backend and privacy/security measures.

## Git commands
```bash
git init
git add .
git commit -m "Build Gatherly event management website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git push -u origin main
```
