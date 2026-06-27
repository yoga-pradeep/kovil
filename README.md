# அருள்மிகு ஸ்ரீ புங்கமரத்து ஐய்யன் — அருள்மிகு ஸ்ரீ அண்ணமார், கன்னிமார் கருப்பராயன் சுவாமி திருக்கோவில்
## Arulmigu Sri Pungamarathu Ayyan — Arulmigu Sri Annamar, Kannimar Karupparayan Swamy Thirukovil

### Prerequisites
- Python 3.8+
- pip

### Setup & Run

1. **Install dependencies:**
   ```
   pip install -r requirements.txt
   ```

2. **Run the Flask app:**
   ```
   python app.py
   ```

3. **Open in browser:**
   ```
   http://localhost:5000
   ```

### Project Structure
```
pungamarathu_ayyan/
├── app.py                          # Flask application
├── requirements.txt                # Python dependencies
├── templates/
│   └── index.html                  # Main HTML template
└── static/
    ├── css/
    │   └── style.css               # All styles
    ├── js/
    │   └── main.js                 # JS: language switch, countdown, fireworks, photo carousel
    └── images/
        ├── new1.png                # ⬅ PUT HERE: Sri Ulagalandha Perumal (left banner image)
        ├── new3.png                # ⬅ PUT HERE: Sri Kannimar (middle banner image)
        ├── new4.png                # ⬅ PUT HERE: Sri Karupparayan Swamy (right banner image)
        └── gallery/
            ├── 1.jpg                # ⬅ PUT HERE: gallery photos (1.jpg to 12.jpg, then 14.jpg)
            ├── 2.jpg
            ├── ...
            ├── 12.jpg
            └── 14.jpg
```

### Where to put your photos

1. **Top deity banner (3 images):** Save your three deity images as `new1.png`, `new3.png`, `new4.png` directly inside `static/images/`.
   - `new1.png` → shows on the **left**, captioned "Sri Ulagalandha Perumal Thunai"
   - `new3.png` → shows in the **middle**, captioned "Sri Kannimar Thunai"
   - `new4.png` → shows on the **right**, captioned "Sri Karupparayan Swamy Thunai"

2. **Photo gallery (stacked swipe cards):** Save your temple/festival photos inside `static/images/gallery/`, named exactly: `1.jpg`, `2.jpg`, `3.jpg`, `4.jpg`, `5.jpg`, `6.jpg`, `7.jpg`, `8.jpg`, `9.jpg`, `10.jpg`, `11.jpg`, `12.jpg`, `14.jpg` (13.jpg is skipped on purpose). These appear as the swipeable stacked-card gallery — one photo on top, two peeking behind, swipe or use the arrows to cycle through (it loops continuously).

Placeholder `.txt` files are left in those two folders explaining this — just drop your real images in and delete the `.txt` files (optional).

### Language Switching
The website supports Tamil (default) and English. Toggle using the language bar at the top — every section, including the new event timeline and the temple guidelines section, is fully bilingual.

### What's included in this update
- Top banner strip with the 3 deity images (new1/new3/new4) and Tamil/English captions.
- Full festival event timeline (நிகழ்ச்சி நிரல்) across all 4 days, taken from the official schedule banner (15.06.2026, 30.06.2026, 01.07.2026, 04.07.2026), fully bilingual.
- Updated temple name & address (Kolathuppalayam, Vellangovil, Gobi Taluk, Erode District) in Tamil and English.
- New "Temple Guidelines" section before the footer: dustbin/waste disposal, outside parking, no smoking — bilingual, with icons.
- Gallery simplified to a single "Photos" section — videos and the extra category placeholders removed.
- Photo gallery is now a stacked swipeable card carousel (drag/swipe or use arrow buttons), looping continuously, showing 3 cards at a time.
- More red fire-ember droplets added to the background animation alongside the existing fireworks/crackers.

### Contact
Yoga Pradeep | +91 9994057621

© 2026 Yoga Pradeep. All rights reserved.
