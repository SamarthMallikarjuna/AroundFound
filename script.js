// Toggle between Login and Sign Up views + theme handling
const loginTab = document.getElementById('loginTab');
const signupTab = document.getElementById('signupTab');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const toSignup = document.getElementById('toSignup');
const toLogin = document.getElementById('toLogin');
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

function initTheme() {
  const saved = localStorage.getItem('theme');
  const isDark = saved === 'dark' || (!saved && prefersDark);
  if (isDark) {
    body.classList.add('dark');
    if (themeToggle) { themeToggle.checked = true; }
  } else {
    body.classList.remove('dark');
    if (themeToggle) { themeToggle.checked = false; }
  }
}

if (themeToggle) {
  themeToggle.addEventListener('change', () => {
    const isDark = themeToggle.checked;
    if (isDark) {
      body.classList.add('dark');
    } else {
      body.classList.remove('dark');
    }
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
}

initTheme();

function showLogin() {
  loginTab.classList.add('active');
  signupTab.classList.remove('active');
  body.classList.remove('form-signup');
  signupForm.classList.add('exiting');
  setTimeout(() => {
    signupForm.classList.remove('active', 'exiting');
    loginForm.classList.add('active');
  }, 180);
}

function showSignup() {
  signupTab.classList.add('active');
  loginTab.classList.remove('active');
  body.classList.add('form-signup');
  loginForm.classList.add('exiting');
  setTimeout(() => {
    loginForm.classList.remove('active', 'exiting');
    signupForm.classList.add('active');
  }, 180);
}

// === NEW: Choice screen logic ===
const choiceScreen = document.getElementById('choiceScreen');
const findBtn = document.getElementById('findBtn');
const reportBtn = document.getElementById('reportBtn');

function showChoiceScreen() {
  const authPage = document.getElementById('authCard').parentElement;
  authPage.classList.add('hidden'); // hide login/signup
  choiceScreen.classList.remove('hidden'); // show choice screen
}

function showDashboard(theme) {
  choiceScreen.classList.add('hidden');
  const dashboard = document.getElementById('dashboard');
  dashboard.classList.remove('hidden');

  // Apply theme
  body.classList.remove('red-theme', 'blue-theme');

  // Get home page text elements
  const homeTitle = document.querySelector('.home-title');
  const homeSubtitle = document.querySelector('.home-subtitle');

  if (theme === 'red') {
    body.classList.add('red-theme');

    // Set red theme text
    if (homeTitle) homeTitle.textContent = 'Stop the worries.';
    if (homeSubtitle) homeSubtitle.textContent = 'Find your lost things effortlessly!';

    // Show home tab by default for red theme
    const homeTab = document.querySelector('[data-tab="home"]');
    const homeContent = document.getElementById('home-tab');

    // Deselect all tabs
    document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));

    // Activate home tab
    if (homeTab && homeContent) {
      homeTab.classList.add('active');
      homeContent.classList.add('active');
    }
  } else if (theme === 'blue') {
    body.classList.add('blue-theme');

    // Set blue theme text
    if (homeTitle) homeTitle.textContent = 'Help other people.';
    if (homeSubtitle) homeSubtitle.textContent = 'Lead lost things to their owners!';

    // Show home tab by default for blue theme
    const homeTab = document.querySelector('[data-tab="home"]');
    const homeContent = document.getElementById('home-tab');

    // Deselect all tabs
    document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));

    // Activate home tab
    if (homeTab && homeContent) {
      homeTab.classList.add('active');
      homeContent.classList.add('active');
    }
  }
}


function hideDashboard() {
  const authPage = document.getElementById('authCard').parentElement;
  const dashboard = document.getElementById('dashboard');
  authPage.classList.remove('hidden');
  dashboard.classList.add('hidden');
  showLogin();
}

// === Existing form handlers ===
loginTab.addEventListener('click', showLogin);
signupTab.addEventListener('click', showSignup);
toSignup.addEventListener('click', (e) => { e.preventDefault(); showSignup(); });
toLogin.addEventListener('click', (e) => { e.preventDefault(); showLogin(); });

signupForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const pwd = signupForm.password.value;
  const confirm = signupForm.confirm.value;
  if (pwd.length < 8) { alert('Password must be at least 8 characters.'); return }
  if (pwd !== confirm) { alert('Passwords do not match.'); return }
  alert('Sign up successful (demo)');
  signupForm.reset();
  showLogin();
});

loginForm.addEventListener('submit', function (e) {
  e.preventDefault();
  // Instead of directly showing dashboard, show choice screen
  showChoiceScreen();
  loginForm.reset();
});

// === Choice screen button handlers ===
findBtn.addEventListener('click', () => showDashboard('red'));
reportBtn.addEventListener('click', () => showDashboard('blue'));

// Dashboard functionality
const menuToggle = document.getElementById('menuToggle');
const sideMenu = document.getElementById('sideMenu');
const closeMenu = document.getElementById('closeMenu');
const navTabs = document.querySelectorAll('.nav-tab');
const tabContents = document.querySelectorAll('.tab-content');
const logoutLinks = document.querySelectorAll('.menu-item.logout');
const settingsBtn = document.getElementById('settingsBtn');
const settingsPanel = document.getElementById('settingsPanel');
const settingsThemeToggle = document.getElementById('settingsThemeToggle');
const closeSettings = document.getElementById('closeSettings');

// Menu toggle
menuToggle.addEventListener('click', () => {
  sideMenu.classList.add('open');
});

closeMenu.addEventListener('click', () => {
  sideMenu.classList.remove('open');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (!sideMenu.contains(e.target) && e.target !== menuToggle && !menuToggle.contains(e.target)) {
    sideMenu.classList.remove('open');
  }
});

// Tab switching
navTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const tabName = tab.getAttribute('data-tab');
    navTabs.forEach(t => t.classList.remove('active'));
    tabContents.forEach(tc => tc.classList.remove('active'));
    tab.classList.add('active');
    const targetTab = document.getElementById(`${tabName}-tab`);
    if (targetTab) targetTab.classList.add('active');
  });
});

// Logout
logoutLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    hideDashboard();
  });
});

// Settings button opens settings panel
if (settingsBtn) {
  settingsBtn.addEventListener('click', () => {
    if (settingsPanel) {
      settingsPanel.classList.remove('hidden');
      settingsPanel.setAttribute('aria-hidden', 'false');
      if (settingsThemeToggle) settingsThemeToggle.checked = body.classList.contains('dark');
    } else {
      alert('Settings page (coming soon)');
    }
  });
}

// Profile menu item also opens settings panel
const profileMenuItem = document.querySelector('.menu-item.profile-item');
if (profileMenuItem) {
  profileMenuItem.addEventListener('click', (e) => {
    e.preventDefault();

    // Close the sidebar menu
    sideMenu.classList.remove('open');

    // Open the settings panel
    if (settingsPanel) {
      settingsPanel.classList.remove('hidden');
      settingsPanel.setAttribute('aria-hidden', 'false');
      if (settingsThemeToggle) settingsThemeToggle.checked = body.classList.contains('dark');
    }
  });
}


// Close settings
if (closeSettings) {
  closeSettings.addEventListener('click', () => {
    if (settingsPanel) {
      settingsPanel.classList.add('hidden');
      settingsPanel.setAttribute('aria-hidden', 'true');
    }
  });
}

/* Helper: show snackbar message */
function showSnackbar(message) {
  const existing = document.querySelector('.snackbar');
  if (existing) existing.remove();
  const snack = document.createElement('div');
  snack.className = 'snackbar';
  snack.setAttribute('role', 'status');
  snack.setAttribute('aria-live', 'polite');
  snack.textContent = message;
  document.body.appendChild(snack);
  requestAnimationFrame(() => snack.classList.add('show'));
  setTimeout(() => { snack.classList.remove('show'); setTimeout(() => snack.remove(), 300); }, 3000);
}

/* Helper: fetch coordinates from location text */
async function fetchCoordinates(locationText) {
  try {
    // Use Nominatim API (free, no API key required)
    const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(locationText)}`);
    const data = await response.json();

    if (data && data.length > 0) {
      const lat = parseFloat(data[0].lat).toFixed(6);
      const lon = parseFloat(data[0].lon).toFixed(6);

      // Store coordinates globally
      window.currentLocationCoordinates = { lat, lon };

      // Display coordinates
      displayCoordinates(lat, lon);
    } else {
      console.log('No coordinates found for this location');
    }
  } catch (error) {
    console.error('Error fetching coordinates:', error);
  }
}

/* Helper: display coordinates on the page */
function displayCoordinates(lat, lon) {
  // Find or create coordinates display element
  let coordsDisplay = document.getElementById('coordinatesDisplay');

  if (!coordsDisplay) {
    coordsDisplay = document.createElement('div');
    coordsDisplay.id = 'coordinatesDisplay';
    coordsDisplay.className = 'coordinates-display';

    // Insert after the map container
    const mapContainer = document.getElementById('mapContainer');
    if (mapContainer && mapContainer.parentNode) {
      mapContainer.parentNode.insertBefore(coordsDisplay, mapContainer.nextSibling);
    }
  }

  coordsDisplay.innerHTML = `<strong>Coordinates:</strong> ${lat}, ${lon}`;
  coordsDisplay.style.display = 'block';
}

// Open Post Item modal only when on red side
const postItemLinks = document.querySelectorAll('.menu-item.post-item');
const postModal = document.getElementById('postModal');
const closePost = document.getElementById('closePost');
const postForm = document.getElementById('postForm');

postItemLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    // only open if red-theme is active
    if (body.classList.contains('red-theme')) {
      if (postModal) { postModal.classList.remove('hidden'); postModal.setAttribute('aria-hidden', 'false'); }
    } else {
      showSnackbar('Switch to the Find side (red) to post an item.');
    }
  });
});

if (closePost) {
  closePost.addEventListener('click', () => {
    if (postModal) { postModal.classList.add('hidden'); postModal.setAttribute('aria-hidden', 'true'); }
  });
}

// Close modal when clicking outside
document.addEventListener('click', (e) => {
  if (postModal && !postModal.classList.contains('hidden')) {
    if (!postModal.querySelector('.post-card').contains(e.target) && !e.target.classList.contains('menu-item')) {
      postModal.classList.add('hidden'); postModal.setAttribute('aria-hidden', 'true');
    }
  }
});


if (postForm) {
  postForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const sel = postForm.lostItem.value;
    if (!sel) { showSnackbar('Please select an item type.'); return }

    // Store selected item type globally for description panel
    window.selectedLostItem = sel;

    // demo behavior: close modal, show success
    postModal.classList.add('hidden'); postModal.setAttribute('aria-hidden', 'true');
    showSnackbar('Post submitted — thank you!');
    // open follow-up panel sliding in from right asking where it was lost
    const postDetailsPanel = document.getElementById('postDetailsPanel');
    const postDetailsTitle = document.getElementById('postDetailsTitle');
    const lostLocation = document.getElementById('lostLocation');
    if (postDetailsTitle) postDetailsTitle.textContent = `Where did you lose your ${sel}?`;
    if (postDetailsPanel) {
      postDetailsPanel.classList.remove('hidden');
      // small delay to allow CSS transition
      requestAnimationFrame(() => postDetailsPanel.classList.add('open'));
      postDetailsPanel.setAttribute('aria-hidden', 'false');
    }
    if (lostLocation) { lostLocation.focus(); }
    postForm.reset();
  });
}


// Post details panel handlers
const postDetailsPanelEl = document.getElementById('postDetailsPanel');
const closeDetails = document.getElementById('closeDetails');
const cancelDetails = document.getElementById('cancelDetails');
const saveDetails = document.getElementById('saveDetails');

if (closeDetails) {
  closeDetails.addEventListener('click', () => {
    // Reset map and location input
    const mapContainer = document.getElementById('mapContainer');
    const googleMap = document.getElementById('googleMap');
    const lostLocation = document.getElementById('lostLocation');
    const specificAreaLabel = document.getElementById('specificAreaLabel');
    const specificArea = document.getElementById('specificArea');
    const coordsDisplay = document.getElementById('coordinatesDisplay');
    if (mapContainer) mapContainer.classList.add('hidden');
    if (googleMap) googleMap.src = '';
    if (lostLocation) lostLocation.value = '';
    if (specificAreaLabel) specificAreaLabel.classList.add('hidden');
    if (specificArea) specificArea.value = '';
    if (coordsDisplay) coordsDisplay.style.display = 'none';

    if (postDetailsPanelEl) { postDetailsPanelEl.classList.remove('open'); setTimeout(() => { postDetailsPanelEl.classList.add('hidden'); postDetailsPanelEl.setAttribute('aria-hidden', 'true'); }, 300); }
  });
}
if (cancelDetails) {
  cancelDetails.addEventListener('click', () => {
    // Reset map and location input
    const mapContainer = document.getElementById('mapContainer');
    const googleMap = document.getElementById('googleMap');
    const lostLocation = document.getElementById('lostLocation');
    const specificAreaLabel = document.getElementById('specificAreaLabel');
    const specificArea = document.getElementById('specificArea');
    const coordsDisplay = document.getElementById('coordinatesDisplay');
    if (mapContainer) mapContainer.classList.add('hidden');
    if (googleMap) googleMap.src = '';
    if (lostLocation) lostLocation.value = '';
    if (specificAreaLabel) specificAreaLabel.classList.add('hidden');
    if (specificArea) specificArea.value = '';
    if (coordsDisplay) coordsDisplay.style.display = 'none';

    if (postDetailsPanelEl) { postDetailsPanelEl.classList.remove('open'); setTimeout(() => { postDetailsPanelEl.classList.add('hidden'); postDetailsPanelEl.setAttribute('aria-hidden', 'true'); }, 300); }
  });
}
if (saveDetails) {
  saveDetails.addEventListener('click', () => {
    const loc = document.getElementById('lostLocation').value;
    if (!loc) { showSnackbar('Please enter where you lost the item.'); return }

    const mapContainer = document.getElementById('mapContainer');
    const googleMap = document.getElementById('googleMap');

    // Check if map is already visible
    if (mapContainer && !mapContainer.classList.contains('hidden')) {
      // Map is already shown, proceed to date/time panel
      if (postDetailsPanelEl) {
        postDetailsPanelEl.classList.remove('open');
        setTimeout(() => {
          postDetailsPanelEl.classList.add('hidden');
          postDetailsPanelEl.setAttribute('aria-hidden', 'true');
        }, 300);
      }

      // Show date/time panel
      const dateTimePanel = document.getElementById('dateTimePanel');
      const dateTimeTitle = document.getElementById('dateTimeTitle');
      if (dateTimeTitle && window.selectedLostItem) {
        dateTimeTitle.textContent = `When did you lose your ${window.selectedLostItem}?`;
      }
      if (dateTimePanel) {
        dateTimePanel.classList.remove('hidden');
        requestAnimationFrame(() => dateTimePanel.classList.add('open'));
        dateTimePanel.setAttribute('aria-hidden', 'false');
      }
    } else {
      // Show Google Maps with the location (first click)
      if (mapContainer && googleMap) {
        const encodedLocation = encodeURIComponent(loc);
        googleMap.src = `https://maps.google.com/maps?q=${encodedLocation}&output=embed`;
        mapContainer.classList.remove('hidden');

        // Fetch coordinates using Geocoding API
        fetchCoordinates(loc);

        // Show specific area field with dynamic location name
        const specificAreaLabel = document.getElementById('specificAreaLabel');
        const locationName = document.getElementById('locationName');
        if (specificAreaLabel && locationName) {
          locationName.textContent = loc;
          specificAreaLabel.classList.remove('hidden');
        }

        showSnackbar('Map loaded! Click Next again to continue.');
      }
    }
  });
}

// Theme toggle inside settings panel
if (settingsThemeToggle) {
  settingsThemeToggle.addEventListener('change', () => {
    const isDark = settingsThemeToggle.checked;
    if (isDark) body.classList.add('dark'); else body.classList.remove('dark');
    if (themeToggle) themeToggle.checked = isDark;
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
}

// Report/Find switch inside settings panel
const switchToggle = document.getElementById('switchToggle');
if (switchToggle) {
  // initialize switch state from current theme (blue-theme => checked = true => Find)
  if (body.classList.contains('blue-theme')) {
    switchToggle.checked = true;
    const lab = document.querySelector('label[for="switchToggle"]'); if (lab) lab.setAttribute('aria-checked', 'true');
  } else {
    switchToggle.checked = false;
    const lab = document.querySelector('label[for="switchToggle"]'); if (lab) lab.setAttribute('aria-checked', 'false');
  }

  switchToggle.addEventListener('change', () => {
    const isFind = switchToggle.checked; // checked = Find Item (blue side)
    const lab = document.querySelector('label[for="switchToggle"]');
    if (lab) lab.setAttribute('aria-checked', isFind ? 'true' : 'false');

    // Mirror choice-screen mapping: Find => red theme, Report => blue theme
    // (keeps the app behavior consistent with the choice screen buttons)
    if (isFind) {
      body.classList.remove('red-theme');
      body.classList.add('blue-theme');

      // Update home page text for blue theme
      const homeTitle = document.querySelector('.home-title');
      const homeSubtitle = document.querySelector('.home-subtitle');
      if (homeTitle) homeTitle.textContent = 'Help other people.';
      if (homeSubtitle) homeSubtitle.textContent = 'Lead lost things to their owners!';

      // if dashboard visible, switch to the matching theme
      const dashboard = document.getElementById('dashboard');
      if (dashboard && !dashboard.classList.contains('hidden')) {
        // ensure classes updated (blue-theme shows "Help Someone..." title)
        body.classList.remove('red-theme'); body.classList.add('blue-theme');
      }
      // persist preference
      localStorage.setItem('side', 'blue');
    } else {
      body.classList.remove('blue-theme');
      body.classList.add('red-theme');

      // Update home page text for red theme
      const homeTitle = document.querySelector('.home-title');
      const homeSubtitle = document.querySelector('.home-subtitle');
      if (homeTitle) homeTitle.textContent = 'Stop the worries.';
      if (homeSubtitle) homeSubtitle.textContent = 'Find your lost things effortlessly!';

      const dashboard = document.getElementById('dashboard');
      if (dashboard && !dashboard.classList.contains('hidden')) {
        body.classList.remove('blue-theme'); body.classList.add('red-theme');
      }
      localStorage.setItem('side', 'red');
    }

    // Close the settings panel (exit profile page) after 0.6 second delay
    if (settingsPanel) {
      setTimeout(() => {
        settingsPanel.classList.add('hidden');
        settingsPanel.setAttribute('aria-hidden', 'true');
      }, 600);
    }

    // Show a neat, centered snackbar notification at the bottom
    // Visual mapping: unchecked (red track) corresponds to "Find Tab" per request
    const message = switchToggle.checked ? "You're now in the Report Tab!" : "You're now in the Find Tab!";
    // Remove existing snackbar if present
    const existing = document.querySelector('.snackbar');
    if (existing) existing.remove();
    const snack = document.createElement('div');
    snack.className = 'snackbar';
    snack.setAttribute('role', 'status');
    snack.setAttribute('aria-live', 'polite');
    snack.textContent = message;
    document.body.appendChild(snack);
    // animate in
    requestAnimationFrame(() => snack.classList.add('show'));
    // remove after 3s
    setTimeout(() => {
      snack.classList.remove('show');
      setTimeout(() => snack.remove(), 300);
    }, 3000);
  });
}

// Profile Picture Upload Handler
const profilePictureUpload = document.getElementById('profilePictureUpload');
const profilePicture = document.getElementById('profilePicture');
const headerAvatar = settingsBtn ? settingsBtn.querySelector('.icon-img') : null;

if (profilePictureUpload && profilePicture) {
  // Load saved profile picture from localStorage
  const savedPicture = localStorage.getItem('profilePicture');
  if (savedPicture) {
    profilePicture.src = savedPicture;
    // Also update header avatar
    if (headerAvatar) {
      headerAvatar.src = savedPicture;
    }
  }

  profilePictureUpload.addEventListener('change', (e) => {
    const file = e.target.files[0];

    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        showSnackbar('Please select a valid image file');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5242880) {
        showSnackbar('Image size should be less than 5MB');
        return;
      }

      // Read and display the image
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageData = e.target.result;

        // Update profile picture in settings
        profilePicture.src = imageData;

        // Update header avatar icon
        if (headerAvatar) {
          headerAvatar.src = imageData;
        }

        // Save to localStorage
        localStorage.setItem('profilePicture', imageData);

        showSnackbar('Profile picture updated! 🎉');
      };
      reader.readAsDataURL(file);
    }
  });
}

// Typewriter animation completion handler
const homeTitle = document.querySelector('.home-title');
const homeSubtitle = document.querySelector('.home-subtitle');

if (homeTitle) {
  // After typing animation completes (4s), remove cursor and enable glow
  setTimeout(() => {
    homeTitle.classList.add('typing-complete');
  }, 4000); // Match typing animation duration

  // After 2 second pause (4s + 2s = 6s), start second line animation
  if (homeSubtitle) {
    setTimeout(() => {
      homeSubtitle.classList.add('animate');

      // After sweep + typing completes (0.3s + 1s = 1.3s), remove cursor and enable glow
      setTimeout(() => {
        homeSubtitle.classList.add('typing-complete');
        // Keep 'animate' class so subtitle stays visible
      }, 1300);
    }, 6000); // 4s typing + 2s pause
  }
}
