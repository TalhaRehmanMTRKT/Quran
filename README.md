# Quran Daily Recite

A personal web application for daily Quran reading, including Surah pages and Dua collections.

## Files

- **index.html** - Main page structure with header, sidebar navigation, content area, and modal.
- **styles.css** - Stylesheet with CSS custom properties for light and dark themes, layout, and responsive design.
- **scripts.js** - Application logic: theme toggling (persisted in localStorage), time and date display (Gregorian and Islamic/Hijri), sidebar navigation, Surah image loading, Dua grid and modal viewer.
- **Data/Surah/** - Contains folders numbered by Surah (e.g., 36, 55, 56, 67, 73), each holding page images named `page-1.jpg`, `page-2.jpg`, etc.
- **Data/Duaas/** - Contains Dua images numbered `1.jpg` through `10.jpg`.

## Features

- Sidebar navigation for selecting Surahs and Duas.
- Light and dark mode toggle with preference saved across sessions.
- Live clock with Gregorian and Islamic (Hijri) date display.
- Image-based Surah viewer with automatic page detection.
- Dua card grid with full-screen modal viewer.
- Responsive layout for desktop and mobile.

## Usage

Open `index.html` in a web browser. No build tools or server required.
