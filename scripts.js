// ===== State =====
let sidebarOpen = false;

// ===== Initialization =====
document.addEventListener('DOMContentLoaded', function () {
    initTheme();
    updateTimeDisplay();
    updateDateDisplay();
    setInterval(updateTimeDisplay, 1000);

    // Update date at midnight
    setInterval(updateDateDisplay, 60000);

    // Close modal on Escape
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeModal();
    });

    // Close modal on backdrop click
    document.getElementById('duaModal').addEventListener('click', function (e) {
        if (e.target === this) closeModal();
    });
});

// ===== Theme =====
function initTheme() {
    const saved = localStorage.getItem('quran-theme');
    const theme = saved || 'light';
    applyTheme(theme);
}

function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem('quran-theme', next);
}

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const icon = document.getElementById('themeIcon');
    if (theme === 'dark') {
        icon.className = 'bi bi-sun';
        document.getElementById('themeToggle').title = 'Switch to Light Mode';
    } else {
        icon.className = 'bi bi-moon';
        document.getElementById('themeToggle').title = 'Switch to Dark Mode';
    }
}

// ===== Time Display =====
function updateTimeDisplay() {
    const now = new Date();
    const time = now.toLocaleTimeString('en-US', {
        hour12: true,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    document.getElementById('timeDisplay').textContent = time;
}

// ===== Date Display (Gregorian + Islamic) =====
function updateDateDisplay() {
    const now = new Date();

    // Gregorian date
    const gregorian = now.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // Islamic (Hijri) date using Intl API with islamic-umalqura calendar
    let hijri = '';
    try {
        const hijriFormatter = new Intl.DateTimeFormat('en-US-u-ca-islamic-umalqura', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
        hijri = hijriFormatter.format(now);
    } catch (e) {
        // Fallback if islamic-umalqura not supported
        try {
            const hijriFallback = new Intl.DateTimeFormat('en-US-u-ca-islamic', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            });
            hijri = hijriFallback.format(now);
        } catch (e2) {
            hijri = '';
        }
    }

    const dateEl = document.getElementById('dateDisplay');
    let display = gregorian;
    if (hijri) {
        display += ' | ' + hijri;
    }
    dateEl.textContent = display;
}

// ===== Sidebar =====
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebarOpen = !sidebarOpen;
    sidebar.classList.toggle('closed', !sidebarOpen);
}

// ===== Surah Loading =====
function loadSurah(surahNumber, clickedItem) {
    setActiveMenuItem(clickedItem);

    const contentArea = document.getElementById('contentArea');
    const surahNames = {
        '36': 'Surah Ya-Sin',
        '55': 'Surah Ar-Rahman',
        '56': "Surah Al-Waqi'ah",
        '67': 'Surah Al-Mulk',
        '73': 'Surah Al-Muzzammil'
    };
    const surahName = surahNames[surahNumber] || 'Surah ' + surahNumber;

    const maxPages = 20;
    let html = '<h2 class="content-heading">' + surahName + '</h2>';
    html += '<div class="images-container">';

    for (let i = 1; i <= maxPages; i++) {
        html += '<img src="Data/Surah/' + surahNumber + '/page-' + i + '.jpg" '
            + 'alt="' + surahName + ' - Page ' + i + '" '
            + 'class="page-image" '
            + 'onerror="this.style.display=\'none\'" '
            + 'onload="this.style.display=\'block\'">';
    }

    html += '</div><div style="height:80px"></div>';
    contentArea.innerHTML = html;

    // Check if any images loaded
    setTimeout(function () {
        const visible = contentArea.querySelectorAll('.page-image[style*="block"]');
        if (visible.length === 0) {
            contentArea.innerHTML =
                '<h2 class="content-heading">' + surahName + '</h2>'
                + '<div class="not-available">'
                + '<h3>Not Available</h3>'
                + '<p>Images for ' + surahName + ' are not available at the moment.</p>'
                + '<p>Add images to: <strong>Data/Surah/' + surahNumber + '/</strong></p>'
                + '</div>';
        }
    }, 4000);

    // Close sidebar on mobile
    if (window.innerWidth <= 768) {
        sidebarOpen = false;
        document.getElementById('sidebar').classList.add('closed');
    }
}

// ===== Dua Loading =====
function loadDuas(clickedItem) {
    setActiveMenuItem(clickedItem);

    const duaList = [
        { name: 'Dua For Parents', number: 1 },
        { name: 'Forgiveness Dua', number: 2 },
        { name: 'Dua of Istikhara', number: 3 },
        { name: 'Darood-Qabristan', number: 4 },
        { name: 'Darood-e-Tunajjina', number: 5 },
        { name: 'For Spouse', number: 6 },
        { name: 'Ayat-e-Kareema', number: 7 },
        { name: 'Forgiveness Dua', number: 8 },
        { name: 'Forgiveness Dua', number: 9 },
        { name: 'Forgiveness Dua', number: 10 }
    ];

    let html = '<h2 class="content-heading">Dua\'as</h2><div class="dua-grid">';

    duaList.forEach(function (dua) {
        const path = 'Data/Duaas/' + dua.number + '.jpg';
        html += '<div class="dua-card" onclick="openDuaModal(\'' + path + '\', \'' + dua.name + '\')">'
            + '<img src="' + path + '" alt="' + dua.name + '" '
            + 'onerror="this.src=\'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjhmOWZhIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzZjNzU3ZCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg==\'">'
            + '<div class="title">' + dua.name + '</div></div>';
    });

    html += '</div>';
    document.getElementById('contentArea').innerHTML = html;

    if (window.innerWidth <= 768) {
        sidebarOpen = false;
        document.getElementById('sidebar').classList.add('closed');
    }
}

// ===== Modal =====
function openDuaModal(imagePath, duaName) {
    const modal = document.getElementById('duaModal');
    document.getElementById('modalContent').innerHTML =
        '<h3>' + duaName + '</h3>'
        + '<img src="' + imagePath + '" alt="' + duaName + '" style="max-width:100%;height:auto">';
    modal.classList.add('active');
}

function closeModal() {
    document.getElementById('duaModal').classList.remove('active');
}

// ===== Helpers =====
function setActiveMenuItem(item) {
    document.querySelectorAll('.menu-item').forEach(function (el) {
        el.classList.remove('active');
    });
    if (item) item.classList.add('active');
}

function showInfo() {
    alert('Quran Daily Recite\nDesigned for daily Quran reading.\nTalha Rehman');
}
