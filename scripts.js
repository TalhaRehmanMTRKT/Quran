// Global variables
let counter = 0;
let sidebarOpen = false;
let counterVisible = false;

// Initialize
document.addEventListener('DOMContentLoaded', function () {
    updateTimeDisplay();
    setInterval(updateTimeDisplay, 1000);
    updateCounterDisplay();
});

// Time display
function updateTimeDisplay() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', {
        hour12: true,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    document.getElementById('timeDisplay').textContent = timeString;
}

// Sidebar functions
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebarOpen = !sidebarOpen;
    sidebar.classList.toggle('closed', !sidebarOpen);
}

// Counter toggle function
function toggleCounter() {
    const rightSidebar = document.getElementById('rightSidebar');
    const toggleIcon = document.getElementById('toggleIcon');
    const toggleButton = document.getElementById('counterToggle');

    counterVisible = !counterVisible;
    rightSidebar.classList.toggle('hidden', !counterVisible);

    // Update button icon and title
    if (counterVisible) {
        toggleIcon.textContent = '×';
        toggleButton.title = 'Hide Counter';
    } else {
        toggleIcon.textContent = '+';
        toggleButton.title = 'Show Counter';
    }
}

// Counter functions
function updateCounterDisplay() {
    document.getElementById('counterDisplay').textContent = counter;
}

function incrementCounter() {
    counter++;
    updateCounterDisplay();
}

function decrementCounter() {
    if (counter > 0) {
        counter--;
        updateCounterDisplay();
    }
}

function resetCounter() {
    counter = 0;
    updateCounterDisplay();
}

function setCounter() {
    const input = document.getElementById('setCounterInput');
    const value = parseInt(input.value);
    if (value >= 0 && !isNaN(value)) {
        counter = value;
        updateCounterDisplay();
        input.value = '';
    }
}


// Surah functions
function loadSurah(surahName) {
    // Remove active class from all menu items
    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('active');
    });

    // Add active class to clicked item
    event.target.classList.add('active');

    const contentArea = document.getElementById('contentArea');
    const folderName = surahName.toLowerCase().replace(/\s+/g, '-');

    // Try to load images from the surah folder
    loadSurahImages(folderName, surahName, contentArea);
}

function loadSurahImages(folderName, surahName, contentArea) {
    // Simulate loading images from folder
    // In a real implementation, you would need to have your images accessible
    // and use fetch or similar to check if files exist

    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif'];
    const maxPages = 20; // Assume maximum 20 pages per surah
    let imagesHtml = `<h2 style="text-align: center; margin-bottom: 30px; color: #2c3e50;">${surahName}</h2>`;
    let hasImages = false;

    // Create a container for images
    imagesHtml += '<div class="images-container">';

    // Try different page numbers
    for (let i = 1; i <= maxPages; i++) {
        const imagePath = `Data/Surah/${folderName}/page-${i}.jpg`;
        imagesHtml += `
            <img src="${imagePath}" 
                    alt="${surahName} - Page ${i}" 
                    class="page-image"
                    onerror="this.style.display='none'"
                    onload="this.style.display='block'; markImageAsLoaded()">
        `;
    }

    imagesHtml += '</div>';
    imagesHtml += '</div><div style="height: 100px;"></div>';  // Add scrollable space at bottom


    contentArea.innerHTML = imagesHtml;

    // Check if any images loaded after a short delay
    setTimeout(() => {
        const visibleImages = contentArea.querySelectorAll('.page-image[style*="block"]');
        if (visibleImages.length === 0) {
            contentArea.innerHTML = `
                <h2 style="text-align: center; margin-bottom: 30px; color: #2c3e50;">${surahName}</h2>
                <div class="not-available">
                    <h3>Not Available Currently</h3>
                    <p>Images for ${surahName} are not available at the moment.</p>
                    <p>Please add images to the folder: <strong>${folderName}/</strong></p>
                </div>
            `;
        }
    }, 4000);
}

function markImageAsLoaded() {
    // This function is called when an image successfully loads
    // You can use it to track which images are available
}

function addSurah() {
    // This function has been removed as per user request
}

// Dua functions
function loadDuas() {
    // Remove active class from all menu items
    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('active');
    });

    // Add active class to Dua'as menu item
    event.target.classList.add('active');

    const contentArea = document.getElementById('contentArea');

    // Map dua names to their numeric image filenames
    const duaList = [
        { name: 'Dua For Parents', number: 1 },
        { name: 'Forgiveness Dua', number: 2 },
        { name: 'Dua of Istikhara', number: 3 },
        { name: 'After Eating', number: 4 },
        { name: 'Before Sleep', number: 5 },
        { name: 'Entering Mosque', number: 6 },
        { name: 'Leaving Home', number: 7 },
        { name: 'Travel Dua', number: 8 },
        { name: 'Rain Dua', number: 9 },
        { name: 'Forgiveness Dua', number: 10 }
    ];

    let duasHtml = `
        <h2 style="text-align: center; margin-bottom: 30px; color: #2c3e50;">Dua'as</h2>
        <div class="dua-grid">
    `;

    duaList.forEach(dua => {
        const imagePath = `Data/Duaas/${dua.number}.jpg`;
        duasHtml += `
            <div class="dua-card" onclick="openDuaModal('${imagePath}', '${dua.name}')">
                <img src="${imagePath}" alt="${dua.name}" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjhmOWZhIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzZjNzU3ZCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg=='">
                <div class="title">${dua.name}</div>
            </div>
        `;
    });

    duasHtml += '</div>';
    contentArea.innerHTML = duasHtml;
}

function openDuaModal(imagePath, duaName) {
    const modal = document.getElementById('duaModal');
    const modalContent = document.getElementById('modalContent');

    modalContent.innerHTML = `
        <h3 style="margin-bottom: 20px; color: #2c3e50;">${duaName}</h3>
        <img src="${imagePath}" alt="${duaName}" style="max-width: 100%; height: auto;">
    `;

    modal.classList.add('active');
}

function closeModal() {
    document.getElementById('duaModal').classList.remove('active');
}

function showInfo() {
    alert('Website For Daily Use - Talha Rehman\n\nThis website is designed for daily Quran reading and dhikr counting.');
}

// Close modal when clicking outside
document.getElementById('duaModal').addEventListener('click', function (e) {
    if (e.target === this) {
        closeModal();
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});