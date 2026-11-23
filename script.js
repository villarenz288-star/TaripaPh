 /* ==========================================================================
   1. DATA STORAGE LAYER (localStorage + sessionStorage)
   ========================================================================== */

const STORAGE_KEYS = {
  DB: 'taripaph_demo_db_v1',
  SESSION: 'taripaph_active_session_v1',
  PREFS: 'taripaph_user_prefs_v1'
};

const SEED_DATA = {
  // Configurable Sample Tariffs (Clearly labeled as demo reference schedules)
  tricycleTariffs: [
    {
      id: 'toda-vimtoda',
      todaCode: 'VIMTODA',
      todaName: 'Villa Isla - Muñoz Tricycle Operators & Drivers Assoc.',
      municipality: 'Science City of Muñoz (Sample Demo)',
      ordinanceRef: 'Sample Municipal Ordinance Schedule A',
      effectiveDate: '2026-01-15',
      pakyawanCap: 120.00,
      midRouteSurcharge: 5.00,
      discountRate: 0.20,
      routes: [
        { origin: 'Poblacion / Public Market', destination: 'Brgy. Villa Isla (Purok 1-4)', sharedFare: 25.00, pakyawanFare: 100.00, distanceKm: 3.8 },
        { origin: 'Poblacion / Public Market', destination: 'Brgy. Villa Isla (Boundary)', sharedFare: 30.00, pakyawanFare: 120.00, distanceKm: 4.5 },
        { origin: 'Brgy. Villa Isla', destination: 'CLSU Main Gate', sharedFare: 35.00, pakyawanFare: 120.00, distanceKm: 5.2 },
        { origin: 'Poblacion / Public Market', destination: 'Poblacion Proper (Short Trip)', sharedFare: 15.00, pakyawanFare: 60.00, distanceKm: 1.5 }
      ]
    },
    {
      id: 'toda-bictoda',
      todaCode: 'BICTODA',
      todaName: 'Bical - Poblacion Tricycle Operators & Drivers Assoc.',
      municipality: 'Science City of Muñoz (Sample Demo)',
      ordinanceRef: 'Sample Municipal Ordinance Schedule B',
      effectiveDate: '2026-01-15',
      pakyawanCap: 120.00,
      midRouteSurcharge: 5.00,
      discountRate: 0.20,
      routes: [
        { origin: 'Poblacion / Public Market', destination: 'Brgy. Bical Proper', sharedFare: 25.00, pakyawanFare: 100.00, distanceKm: 3.5 },
        { origin: 'Poblacion / Public Market', destination: 'Brgy. Bical (Dulo)', sharedFare: 30.00, pakyawanFare: 120.00, distanceKm: 4.4 },
        { origin: 'Brgy. Bical', destination: 'Poblacion / Public Market', sharedFare: 25.00, pakyawanFare: 100.00, distanceKm: 3.5 }
      ]
    },
    {
      id: 'toda-clsu',
      todaCode: 'CJTODA',
      todaName: 'CLSU Junction - Bantug Tricycle Assoc.',
      municipality: 'Science City of Muñoz (Sample Demo)',
      ordinanceRef: 'Sample Municipal Ordinance Schedule C',
      effectiveDate: '2026-02-01',
      pakyawanCap: 100.00,
      midRouteSurcharge: 5.00,
      discountRate: 0.20,
      routes: [
        { origin: 'CLSU Main Gate', destination: 'Brgy. Bantug Proper', sharedFare: 15.00, pakyawanFare: 60.00, distanceKm: 1.8 },
        { origin: 'CLSU Main Gate', destination: 'Poblacion / Public Market', sharedFare: 25.00, pakyawanFare: 100.00, distanceKm: 3.6 }
      ]
    }
  ],

  busJeepTariffs: [
    {
      id: 'puj-trad',
      className: 'Traditional Public Utility Jeepney (PUJ)',
      regulatorRef: 'Sample Provincial PUJ Matrix',
      effectiveDate: '2026-01-10',
      discountRate: 0.20,
      routes: [
        { origin: 'Muñoz Terminal', destination: 'San Jose City Proper', regularFare: 28.00, distanceKm: 13.5 },
        { origin: 'Muñoz Terminal', destination: 'Talavera Town Proper', regularFare: 36.00, distanceKm: 18.0 },
        { origin: 'Muñoz Terminal', destination: 'Cabanatuan Central Terminal', regularFare: 58.00, distanceKm: 31.0 },
        { origin: 'San Jose City Proper', destination: 'Cabanatuan Central Terminal', regularFare: 82.00, distanceKm: 44.5 }
      ]
    },
    {
      id: 'bus-aircon',
      className: 'Provincial Aircon Bus',
      regulatorRef: 'Sample Provincial Bus Matrix',
      effectiveDate: '2026-01-10',
      discountRate: 0.20,
      routes: [
        { origin: 'Muñoz Highway', destination: 'San Jose City Terminal', regularFare: 35.00, distanceKm: 13.5 },
        { origin: 'Muñoz Highway', destination: 'Cabanatuan Central Terminal', regularFare: 72.00, distanceKm: 31.0 },
        { origin: 'San Jose City Terminal', destination: 'Cabanatuan Central Terminal', regularFare: 105.00, distanceKm: 44.5 }
      ]
    }
  ],

  todas: [
    {
      id: 'toda-vimtoda',
      code: 'VIMTODA',
      name: 'Villa Isla - Muñoz TODA',
      terminal: 'Muñoz Public Market South Terminal',
      president: 'Rolando M. Bautista',
      verified: true,
      activeUnits: 42
    },
    {
      id: 'toda-bictoda',
      code: 'BICTODA',
      name: 'Bical - Poblacion TODA',
      terminal: 'Muñoz Public Market East Bay',
      president: 'Ernesto S. Navarro',
      verified: true,
      activeUnits: 35
    },
    {
      id: 'toda-clsu',
      code: 'CJTODA',
      name: 'CLSU Junction - Bantug TODA',
      terminal: 'CLSU Gate 1 Waiting Shed',
      president: 'Danilo P. Reyes',
      verified: true,
      activeUnits: 50
    }
  ],

  units: [
    {
      id: 'unit-101',
      bodyNumber: '0142',
      plateNumber: 'AB-4821',
      todaId: 'toda-vimtoda',
      driverName: 'Roberto "Bert" Mendoza',
      driverUserEmail: 'driver@taripaph.demo',
      franchiseNo: 'MTOP-2026-0142',
      franchiseExpiry: '2026-12-31',
      verified: true,
      vehicleModel: 'Honda TMX 125 Alpha (Blue Sidecar)'
    },
    {
      id: 'unit-102',
      bodyNumber: '0089',
      plateNumber: 'CD-9104',
      todaId: 'toda-vimtoda',
      driverName: 'Mario L. Santos',
      driverUserEmail: '',
      franchiseNo: 'MTOP-2026-0089',
      franchiseExpiry: '2026-12-31',
      verified: true,
      vehicleModel: 'Kawasaki Barako II (Yellow Canopy)'
    },
    {
      id: 'unit-103',
      bodyNumber: '0215',
      plateNumber: 'EF-3319',
      todaId: 'toda-bictoda',
      driverName: 'Joelito R. Aquino',
      driverUserEmail: '',
      franchiseNo: 'MTOP-2026-0215',
      franchiseExpiry: '2026-11-30',
      verified: true,
      vehicleModel: 'Honda TMX Supremo'
    },
    {
      id: 'unit-104',
      bodyNumber: '0307',
      plateNumber: 'GH-7720',
      todaId: 'toda-clsu',
      driverName: 'Ferdinand C. Cruz',
      driverUserEmail: '',
      franchiseNo: 'MTOP-2025-0307',
      franchiseExpiry: '2026-06-30',
      verified: false,
      vehicleModel: 'Bajaj RE Three-Wheeler'
    }
  ],
    reviews: [
    {
      id: 'rev-1',
      unitId: 'unit-101',
      passengerEmail: 'passenger@taripaph.demo',
      passengerName: 'Andrea G. Reyes',
      route: 'Public Market to Brgy. Villa Isla',
      stars: 5,
      expectedFare: 25,
      actualFare: 25,
      tags: ['Exact Taripa', 'Polite Driver', 'Clean Unit'],
      comment: 'Followed the exact ₱25 shared taripa and waited safely for passengers to alight.',
      createdAt: '2026-11-18T08:15:00'
    },
    {
      id: 'rev-2',
      unitId: 'unit-103',
      passengerEmail: 'demo.student@taripaph.demo',
      passengerName: 'Carlito M. Dizon',
      route: 'Public Market to Brgy. Bical Proper',
      stars: 5,
      expectedFare: 20,
      actualFare: 20,
      tags: ['Honored 20% Discount', 'Exact Taripa'],
      comment: 'Automatically applied my 20% student discount upon seeing my school ID.',
      createdAt: '2026-11-19T16:40:00'
    },
    {
      id: 'rev-3',
      unitId: 'unit-104',
      passengerEmail: 'demo.rider2@taripaph.demo',
      passengerName: 'Maricel V. Soriano',
      route: 'CLSU Main Gate to Bantug',
      stars: 2,
      expectedFare: 15,
      actualFare: 25,
      tags: ['Overcharged'],
      comment: 'Charged ₱25 even though it was a shared ride with two other passengers.',
      createdAt: '2026-11-20T12:10:00'
    }
  ],

  announcements: [
    {
      id: 'ann-1',
      category: 'Official Notice',
      title: '20% Student, Senior & PWD Discount Reminder',
      body: 'All PUV and tricycle drivers are reminded to honor the mandatory 20% fare discount for Students, Senior Citizens, and PWDs upon presentation of valid ID.',
      date: '2026-11-15',
      pinned: true
    },
    {
      id: 'ann-2',
      category: 'Important Announcement',
      title: 'Pakyawan Fare Cap Enforcement',
      body: 'Special/pakyawan trips within designated barangay zones must not exceed the published LGU maximum cap shown in the Official Taripa.',
      date: '2026-11-10',
      pinned: true
    },
    {
      id: 'ann-3',
      category: 'Community Announcement',
      title: 'Verify Body Numbers Before Boarding at Night',
      body: 'Commuters are encouraged to check the painted TODA body number and laminated taripa card inside the sidecar before starting a trip.',
      date: '2026-11-05',
      pinned: false
    }
  ],

  externalLinks: [
    { id: 'ext-1', title: 'LTFRB Official Portal', url: 'https://ltfrb.gov.ph' },
    { id: 'ext-2', title: 'Land Transportation Office (LTO)', url: 'https://lto.gov.ph' },
    { id: 'ext-3', title: 'Department of Transportation (DOTr)', url: 'https://dotr.gov.ph' }
  ],

  users: [
    {
      email: 'passenger@taripaph.demo',
      password: 'password123',
      name: 'Andrea G. Reyes',
      role: 'passenger',
      passengerCategory: 'student'
    },
    {
      email: 'driver@taripaph.demo',
      password: 'password123',
      name: 'Roberto "Bert" Mendoza',
      role: 'driver',
      unitId: 'unit-101'
    },
    {
      email: 'toda@taripaph.demo',
      password: 'password123',
      name: 'Rolando M. Bautista (VIMTODA Pres.)',
      role: 'toda_official',
      todaId: 'toda-vimtoda'
    },
    {
      email: 'admin@taripaph.demo',
      password: 'password123',
      name: 'TaripaPH System Admin',
      role: 'admin'
    }
  ],

  tripHistory: [
    {
      id: 'trip-seed-1',
      userEmail: 'passenger@taripaph.demo',
      mode: 'Tricycle',
      route: 'Poblacion / Public Market → Brgy. Villa Isla (Purok 1-4)',
      arrangement: 'Shared (1 pax, Student 20% off)',
      totalFare: 20.00,
      perPassenger: 20.00,
      savedAt: '2026-11-20 07:30 AM'
    }
  ]
};

const DataStore = {
  init() {
    if (!localStorage.getItem(STORAGE_KEYS.DB)) {
      localStorage.setItem(STORAGE_KEYS.DB, JSON.stringify(SEED_DATA));
    }
    if (!localStorage.getItem(STORAGE_KEYS.PREFS)) {
      localStorage.setItem(STORAGE_KEYS.PREFS, JSON.stringify({
        notifTariff: true,
        notifAdvisory: true,
        autoDiscount: false
      }));
    }
  },

  getDB() {
    this.init();
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.DB));
  },

  saveDB(db) {
    localStorage.setItem(STORAGE_KEYS.DB, JSON.stringify(db));
  },

  resetDB() {
    localStorage.setItem(STORAGE_KEYS.DB, JSON.stringify(SEED_DATA));
    sessionStorage.removeItem(STORAGE_KEYS.SESSION);
  },

  getPrefs() {
    this.init();
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.PREFS));
  },

  savePrefs(prefs) {
    localStorage.setItem(STORAGE_KEYS.PREFS, JSON.stringify(prefs));
  }
};

/* ==========================================================================
   2. AUTHENTICATION & ROLE PERMISSIONS SERVICE
   ========================================================================== */

const AuthService = {
  getCurrentUser() {
    const raw = sessionStorage.getItem(STORAGE_KEYS.SESSION);
    return raw ? JSON.parse(raw) : null;
  },

  login(email, password) {
    const db = DataStore.getDB();
    const cleanEmail = email.trim().toLowerCase();
    const user = db.users.find(
      u => u.email.toLowerCase() === cleanEmail && u.password === password
    );
    if (!user) {
      return { ok: false, message: 'Invalid credentials. Try one of the demo role accounts below.' };
    }
    const safeSession = { ...user };
    delete safeSession.password;
    sessionStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(safeSession));
    return { ok: true, user: safeSession };
  },

  registerPassenger({ name, email, category, password }) {
    const db = DataStore.getDB();
    const cleanEmail = email.trim().toLowerCase();
    if (!name.trim() || !cleanEmail || password.length < 6) {
      return { ok: false, message: 'Please complete all fields (password minimum 6 characters).' };
    }
    if (db.users.some(u => u.email.toLowerCase() === cleanEmail)) {
      return { ok: false, message: 'An account with this email already exists.' };
    }
    const newUser = {
      email: cleanEmail,
      password,
      name: name.trim(),
      role: 'passenger',
      passengerCategory: category
    };
    db.users.push(newUser);
    DataStore.saveDB(db);

    const safeSession = { ...newUser };
    delete safeSession.password;
    sessionStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(safeSession));
    return { ok: true, user: safeSession };
  },

  logout() {
    sessionStorage.removeItem(STORAGE_KEYS.SESSION);
  },

  updateCurrentUserProfile({ name, passengerCategory }) {
    const current = this.getCurrentUser();
    if (!current) return;
    const db = DataStore.getDB();
    const idx = db.users.findIndex(u => u.email === current.email);
    if (idx !== -1) {
      db.users[idx].name = name.trim();
      if (passengerCategory) db.users[idx].passengerCategory = passengerCategory;
      DataStore.saveDB(db);
      const updated = { ...db.users[idx] };
      delete updated.password;
      sessionStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(updated));
    }
  }
};
/* ==========================================================================
   3. TARIFF & FARE CALCULATION ENGINE
   ========================================================================== */

const TariffEngine = {
  calculateTricycle({ todaId, origin, destination, rideType, midRoute, passengers, discountedCount }) {
    const db = DataStore.getDB();
    const tariff = db.tricycleTariffs.find(t => t.id === todaId);
    if (!tariff) return { ok: false, error: 'Selected TODA tariff not found.' };

    const route = tariff.routes.find(r => r.origin === origin && r.destination === destination);
    if (!route) return { ok: false, error: 'Please select a valid origin and destination pair.' };

    if (passengers < 1 || discountedCount < 0 || discountedCount > passengers) {
      return { ok: false, error: 'Discounted passengers cannot exceed total passengers.' };
    }

    const regularCount = passengers - discountedCount;
    const breakdown = [];
    let totalFare = 0;

    if (rideType === 'shared') {
      const basePerPax = route.sharedFare;
      const discountedPerPax = +(basePerPax * (1 - tariff.discountRate)).toFixed(2);
      const regSubtotal = +(regularCount * basePerPax).toFixed(2);
      const discSubtotal = +(discountedCount * discountedPerPax).toFixed(2);

      if (regularCount > 0) {
        breakdown.push({ label: `Regular Passengers (${regularCount} × ₱${basePerPax.toFixed(2)})`, amount: regSubtotal });
      }
      if (discountedCount > 0) {
        breakdown.push({ label: `20% Discounted Pax (${discountedCount} × ₱${discountedPerPax.toFixed(2)})`, amount: discSubtotal });
      }
      totalFare = regSubtotal + discSubtotal;

      if (midRoute) {
        const surchargeTotal = +(tariff.midRouteSurcharge * passengers).toFixed(2);
        breakdown.push({ label: `Mid-Route Pickup Surcharge (${passengers} × ₱${tariff.midRouteSurcharge.toFixed(2)})`, amount: surchargeTotal });
        totalFare += surchargeTotal;
      }
    } else {
      // Pakyawan (Special / Exclusive Trip)
      let basePakyawan = route.pakyawanFare;
      breakdown.push({ label: `Base Pakyawan Trip Rate`, amount: basePakyawan });

      if (midRoute) {
        basePakyawan += tariff.midRouteSurcharge;
        breakdown.push({ label: `Off-Terminal / Mid-Route Pickup`, amount: tariff.midRouteSurcharge });
      }

      if (basePakyawan > tariff.pakyawanCap) {
        breakdown.push({ label: `Ordinance Fare Cap Applied (Max ₱${tariff.pakyawanCap.toFixed(2)})`, amount: tariff.pakyawanCap - basePakyawan });
        basePakyawan = tariff.pakyawanCap;
      }
      totalFare = basePakyawan;
    }

    totalFare = +totalFare.toFixed(2);
    const perPassenger = +(totalFare / passengers).toFixed(2);

    return {
      ok: true,
      mode: 'Tricycle',
      todaCode: tariff.todaCode,
      origin,
      destination,
      distanceKm: route.distanceKm,
      rideType,
      passengers,
      discountedCount,
      totalFare,
      perPassenger,
      breakdown,
      tariffRef: `${tariff.todaCode} • ${tariff.ordinanceRef} (Effective ${tariff.effectiveDate}) • Pakyawan Cap: ₱${tariff.pakyawanCap.toFixed(2)}`
    };
  },

  calculateBusJeep({ classId, origin, destination, passengers, discountedCount }) {
    const db = DataStore.getDB();
    const tariff = db.busJeepTariffs.find(t => t.id === classId);
    if (!tariff) return { ok: false, error: 'Vehicle classification not found.' };

    const route = tariff.routes.find(r => r.origin === origin && r.destination === destination);
    if (!route) return { ok: false, error: 'Please select a valid origin and destination pair.' };

    if (passengers < 1 || discountedCount < 0 || discountedCount > passengers) {
      return { ok: false, error: 'Discounted passengers cannot exceed total passengers.' };
    }

    const regularCount = passengers - discountedCount;
    const baseFare = route.regularFare;
    const discountedFare = +(baseFare * (1 - tariff.discountRate)).toFixed(2);

    const regSubtotal = +(regularCount * baseFare).toFixed(2);
    const discSubtotal = +(discountedCount * discountedFare).toFixed(2);
    const totalFare = +(regSubtotal + discSubtotal).toFixed(2);
    const perPassenger = +(totalFare / passengers).toFixed(2);

    const breakdown = [];
    if (regularCount > 0) {
      breakdown.push({ label: `Regular Passengers (${regularCount} × ₱${baseFare.toFixed(2)})`, amount: regSubtotal });
    }
    if (discountedCount > 0) {
      breakdown.push({ label: `Student/Senior/PWD 20% Off (${discountedCount} × ₱${discountedFare.toFixed(2)})`, amount: discSubtotal });
    }

    return {
      ok: true,
      mode: tariff.className,
      origin,
      destination,
      distanceKm: route.distanceKm,
      rideType: 'regular',
      passengers,
      discountedCount,
      totalFare,
      perPassenger,
      breakdown,
      tariffRef: `${tariff.className} • ${tariff.regulatorRef} (Effective ${tariff.effectiveDate})`
    };
  }
};

/* ==========================================================================
   4. UI CONTROLLER & APPLICATION LOGIC
   ========================================================================== */

const App = {
  currentView: 'home',
  calcMode: 'tricycle',
  taripaTab: 'tricycle',
  lastComputedTrip: null,
  selectedTags: new Set(),

  init() {
    DataStore.init();
    this.bindNavigation();
    this.bindAuthEvents();
    this.bindCalculatorEvents();
    this.bindTodaEvents();
    this.bindReviewEvents();
    this.bindTaripaEvents();
    this.bindHistoryEvents();
    this.bindSettingsEvents();
    this.bindAboutEvents();

    this.syncAuthUI();
    this.renderHome();
    this.populateCalculatorSelectors();
    this.renderTodaDirectory();
    this.renderReviews();
    this.renderTaripa();
    this.renderAbout();
  },

  /* -------------------- Utilities -------------------- */
  showToast(message) {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    container.appendChild(toast);
    setTimeout(() => {
      toast.remove();
    }, 3200);
  },

  escapeHTML(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  },

  getUnitRatingStats(unitId) {
    const db = DataStore.getDB();
    const list = db.reviews.filter(r => r.unitId === unitId);
    if (!list.length) return { avg: 'No ratings', count: 0 };
    const sum = list.reduce((acc, r) => acc + r.stars, 0);
    return { avg: (sum / list.length).toFixed(1), count: list.length };
  },

  getTodaRatingStats(todaId) {
    const db = DataStore.getDB();
    const unitIds = db.units.filter(u => u.todaId === todaId).map(u => u.id);
    const list = db.reviews.filter(r => unitIds.includes(r.unitId));
    if (!list.length) return { avg: 'N/A', count: 0 };
    const sum = list.reduce((acc, r) => acc + r.stars, 0);
    return { avg: (sum / list.length).toFixed(1), count: list.length };
  },

  /* -------------------- Navigation & Drawer -------------------- */
  bindNavigation() {
    const drawer = document.getElementById('sideDrawer');
    const backdrop = document.getElementById('drawerBackdrop');

    const openDrawer = () => {
      drawer.classList.add('open');
      backdrop.classList.add('open');
    };
    const closeDrawer = () => {
      drawer.classList.remove('open');
      backdrop.classList.remove('open');
    };

    document.getElementById('btnOpenDrawer').addEventListener('click', openDrawer);
    document.getElementById('btnCloseDrawer').addEventListener('click', closeDrawer);
    backdrop.addEventListener('click', closeDrawer);

    document.querySelectorAll('[data-nav]').forEach(el => {
      el.addEventListener('click', () => {
        const target = el.getAttribute('data-nav');
        closeDrawer();
        this.navigateTo(target);
      });
    });

    document.getElementById('btnCloseDetailModal').addEventListener('click', () => {
      document.getElementById('detailModal').classList.add('hidden');
    });
  },

  navigateTo(viewId) {
    const user = AuthService.getCurrentUser();

    // Role protection for specialized dashboards
    if (viewId === 'driver-dash' && (!user || user.role !== 'driver')) {
      this.showToast('Driver authentication required.');
      this.openAuthModal('login');
      return;
    }
    if (viewId === 'toda-dash' && (!user || user.role !== 'toda_official')) {
      this.showToast('TODA Official authentication required.');
      this.openAuthModal('login');
      return;
    }
    if (viewId === 'admin-dash' && (!user || user.role !== 'admin')) {
      this.showToast('Administrator authentication required.');
      this.openAuthModal('login');
      return;
    }

    this.currentView = viewId;
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    const targetView = document.getElementById(`view-${viewId}`);
    if (targetView) targetView.classList.add('active');

    document.querySelectorAll('.drawer-link, .bottom-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-nav') === viewId);
    });

    // Refresh view data on entry
    if (viewId === 'home') this.renderHome();
    if (viewId === 'toda') this.renderTodaDirectory();
    if (viewId === 'ratings') this.renderReviews();
    if (viewId === 'taripa') this.renderTaripa();
    if (viewId === 'history') this.renderHistory();
    if (viewId === 'settings') this.renderSettings();
    if (viewId === 'about') this.renderAbout();
    if (viewId === 'driver-dash') this.renderDriverDashboard();
    if (viewId === 'toda-dash') this.renderTodaDashboard();
    if (viewId === 'admin-dash') this.renderAdminDashboard();

    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  /* -------------------- Authentication & Role Sync -------------------- */
  bindAuthEvents() {
    const modal = document.getElementById('authModal');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    document.getElementById('btnHeaderAuth').addEventListener('click', () => {
      const user = AuthService.getCurrentUser();
      if (user) {
        this.navigateTo('settings');
      } else {
        this.openAuthModal('login');
      }
    });

    document.getElementById('btnDrawerAuthAction').addEventListener('click', () => {
      document.getElementById('sideDrawer').classList.remove('open');
      document.getElementById('drawerBackdrop').classList.remove('open');
      const user = AuthService.getCurrentUser();
      if (user) {
        AuthService.logout();
        this.syncAuthUI();
        this.navigateTo('home');
        this.showToast('Signed out. Switched to Guest Mode.');
      } else {
        this.openAuthModal('login');
      }
    });

    document.getElementById('btnCloseAuthModal').addEventListener('click', () => {
      modal.classList.add('hidden');
    });

    document.getElementById('tabLogin').addEventListener('click', () => this.openAuthModal('login'));
    document.getElementById('tabRegister').addEventListener('click', () => this.openAuthModal('register'));

    // Quick-fill demo role pills
    document.querySelectorAll('.role-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        document.getElementById('loginEmail').value = pill.getAttribute('data-demo-user');
        document.getElementById('loginPassword').value = 'password123';
      });
    });

    loginForm.addEventListener('submit', e => {
      e.preventDefault();
      const errBox = document.getElementById('loginError');
      errBox.classList.add('hidden');
      const email = document.getElementById('loginEmail').value;
      const password = document.getElementById('loginPassword').value;
      const res = AuthService.login(email, password);
      if (!res.ok) {
        errBox.textContent = res.message;
        errBox.classList.remove('hidden');
        return;
      }
      modal.classList.add('hidden');
      this.syncAuthUI();
      this.showToast(`Welcome back, ${res.user.name}!`);

      if (res.user.role === 'driver') this.navigateTo('driver-dash');
      else if (res.user.role === 'toda_official') this.navigateTo('toda-dash');
      else if (res.user.role === 'admin') this.navigateTo('admin-dash');
      else this.navigateTo(this.currentView);
    });

    registerForm.addEventListener('submit', e => {
      e.preventDefault();
      const errBox = document.getElementById('regError');
      errBox.classList.add('hidden');
      const res = AuthService.registerPassenger({
        name: document.getElementById('regName').value,
        email: document.getElementById('regEmail').value,
        category: document.getElementById('regCategory').value,
        password: document.getElementById('regPassword').value
      });
      if (!res.ok) {
        errBox.textContent = res.message;
        errBox.classList.remove('hidden');
        return;
      }
      modal.classList.add('hidden');
      this.syncAuthUI();
      this.showToast(`Passenger account created for ${res.user.name}!`);
      this.navigateTo(this.currentView);
    });
  },

  openAuthModal(tab = 'login') {
    const modal = document.getElementById('authModal');
    const isLogin = tab === 'login';
    document.getElementById('authModalTitle').textContent = isLogin ? 'Sign In to TaripaPH' : 'Passenger Registration';
    document.getElementById('tabLogin').classList.toggle('active', isLogin);
    document.getElementById('tabRegister').classList.toggle('active', !isLogin);
    document.getElementById('loginForm').classList.toggle('hidden', !isLogin);
    document.getElementById('registerForm').classList.toggle('hidden', isLogin);
    document.getElementById('loginError').classList.add('hidden');
    document.getElementById('regError').classList.add('hidden');
    modal.classList.remove('hidden');
  },

  syncAuthUI() {
    const user = AuthService.getCurrentUser();
    const headerBtn = document.getElementById('btnHeaderAuth');
    const drawerName = document.getElementById('drawerUserName');
    const drawerRole = document.getElementById('drawerUserRole');
    const drawerAvatar = document.getElementById('drawerAvatar');
    const drawerActionBtn = document.getElementById('btnDrawerAuthAction');
    const lockHistory = document.getElementById('lockHistory');

    const roleGroup = document.getElementById('roleDashboardSection');
    const navDriver = document.getElementById('navDriverDash');
    const navToda = document.getElementById('navTodaDash');
    const navAdmin = document.getElementById('navAdminDash');

    roleGroup.classList.add('hidden');
    navDriver.classList.add('hidden');
    navToda.classList.add('hidden');
    navAdmin.classList.add('hidden');

    if (!user) {
      headerBtn.textContent = 'Sign In / Guest';
      drawerName.textContent = 'Guest Commuter';
      drawerRole.textContent = 'Public Access';
      drawerAvatar.textContent = 'G';
      drawerActionBtn.textContent = 'Sign In / Register';
      lockHistory.classList.remove('hidden');
    } else {
      const roleLabels = {
        passenger: 'Verified Passenger',
        driver: 'Registered Driver',
        toda_official: 'TODA Official',
        admin: 'System Administrator'
      };
      headerBtn.textContent = user.name.split(' ')[0];
      drawerName.textContent = user.name;
      drawerRole.textContent = roleLabels[user.role] || user.role;
      drawerAvatar.textContent = user.name.charAt(0).toUpperCase();
      drawerActionBtn.textContent = 'Log Out';
      lockHistory.classList.add('hidden');

      if (user.role === 'driver') {
        roleGroup.classList.remove('hidden');
        navDriver.classList.remove('hidden');
      } else if (user.role === 'toda_official') {
        roleGroup.classList.remove('hidden');
        navToda.classList.remove('hidden');
      } else if (user.role === 'admin') {
        roleGroup.classList.remove('hidden');
        navAdmin.classList.remove('hidden');
      }
    }
  },
    /* -------------------- 1. Home Module -------------------- */
  renderHome() {
    const db = DataStore.getDB();
    document.getElementById('statTodaCount').textContent = db.todas.length;
    document.getElementById('statUnitCount').textContent = db.units.length;
    document.getElementById('statReviewCount').textContent = db.reviews.length;

    const listEl = document.getElementById('homeAnnouncementsList');
    const topNotices = db.announcements.slice(0, 2);
    listEl.innerHTML = topNotices.map(a => `
      <div class="card">
        <div class="card-title-row">
          <span class="badge ${a.category === 'Official Notice' ? 'badge-blue' : 'badge-yellow'}">${this.escapeHTML(a.category)}</span>
          <small class="muted">${this.escapeHTML(a.date)}</small>
        </div>
        <h2>${this.escapeHTML(a.title)}</h2>
        <p class="muted">${this.escapeHTML(a.body)}</p>
      </div>
    `).join('');
  },

  /* -------------------- 2. Compute Fare Module -------------------- */
  bindCalculatorEvents() {
    document.getElementById('modeTricycle').addEventListener('click', () => this.switchCalcMode('tricycle'));
    document.getElementById('modeBusJeep').addEventListener('click', () => this.switchCalcMode('bus_jeep'));

    document.getElementById('calcTodaSelect').addEventListener('change', () => this.updateOriginDestinationOptions());
    document.getElementById('calcVehicleClass').addEventListener('change', () => this.updateOriginDestinationOptions());
    document.getElementById('calcOrigin').addEventListener('change', () => this.syncDestinationOptions());

    document.getElementById('fareCalcForm').addEventListener('submit', e => {
      e.preventDefault();
      this.handleFareCalculation();
    });

    document.getElementById('btnResetCalc').addEventListener('click', () => {
      document.getElementById('fareCalcForm').reset();
      document.getElementById('fareResultCard').classList.add('hidden');
      document.getElementById('calcValidationMsg').classList.add('hidden');
      this.populateCalculatorSelectors();
    });

    document.getElementById('btnSaveTrip').addEventListener('click', () => {
      if (!this.lastComputedTrip) return;
      const user = AuthService.getCurrentUser();
      if (!user) {
        this.showToast('Please sign in to save trips to your personal history.');
        this.openAuthModal('login');
        return;
      }
      const db = DataStore.getDB();
      db.tripHistory.unshift({
        id: 'trip-' + Date.now(),
        userEmail: user.email,
        mode: this.lastComputedTrip.mode,
        route: `${this.lastComputedTrip.origin} → ${this.lastComputedTrip.destination}`,
        arrangement: `${this.lastComputedTrip.rideType === 'pakyawan' ? 'Pakyawan' : 'Shared'} (${this.lastComputedTrip.passengers} pax, ${this.lastComputedTrip.discountedCount} discounted)`,
        totalFare: this.lastComputedTrip.totalFare,
        perPassenger: this.lastComputedTrip.perPassenger,
        savedAt: new Date().toLocaleString()
      });
      DataStore.saveDB(db);
      this.showToast('Trip saved to your Trip History!');
    });

    document.getElementById('btnRateThisRoute').addEventListener('click', () => {
      if (this.lastComputedTrip) {
        document.getElementById('revRouteInput').value = `${this.lastComputedTrip.origin} to ${this.lastComputedTrip.destination}`;
        document.getElementById('revExpectedFare').value = this.lastComputedTrip.totalFare;
      }
      this.navigateTo('ratings');
    });
  },

  switchCalcMode(mode) {
    this.calcMode = mode;
    document.getElementById('modeTricycle').classList.toggle('active', mode === 'tricycle');
    document.getElementById('modeBusJeep').classList.toggle('active', mode === 'bus_jeep');
    document.getElementById('tricycleTodaGroup').classList.toggle('hidden', mode !== 'tricycle');
    document.getElementById('tricycleOptionsGroup').classList.toggle('hidden', mode !== 'tricycle');
    document.getElementById('busJeepTypeGroup').classList.toggle('hidden', mode !== 'bus_jeep');
    document.getElementById('fareResultCard').classList.add('hidden');
    this.populateCalculatorSelectors();
  },

  populateCalculatorSelectors() {
    const db = DataStore.getDB();
    const todaSel = document.getElementById('calcTodaSelect');
    const classSel = document.getElementById('calcVehicleClass');

    todaSel.innerHTML = db.tricycleTariffs.map(t =>
      `<option value="${t.id}">${this.escapeHTML(t.todaCode)} — ${this.escapeHTML(t.todaName)}</option>`
    ).join('');

    classSel.innerHTML = db.busJeepTariffs.map(c =>
      `<option value="${c.id}">${this.escapeHTML(c.className)}</option>`
    ).join('');

    // Apply auto-discount preference if enabled
    const prefs = DataStore.getPrefs();
    const user = AuthService.getCurrentUser();
    if (prefs.autoDiscount && user && user.passengerCategory && user.passengerCategory !== 'regular') {
      document.getElementById('calcDiscountedCount').value = 1;
    }

    this.updateOriginDestinationOptions();
  },

  getActiveRoutesList() {
    const db = DataStore.getDB();
    if (this.calcMode === 'tricycle') {
      const todaId = document.getElementById('calcTodaSelect').value;
      const tariff = db.tricycleTariffs.find(t => t.id === todaId);
      return tariff ? tariff.routes : [];
    } else {
      const classId = document.getElementById('calcVehicleClass').value;
      const tariff = db.busJeepTariffs.find(t => t.id === classId);
      return tariff ? tariff.routes : [];
    }
  },

  updateOriginDestinationOptions() {
    const routes = this.getActiveRoutesList();
    const origins = [...new Set(routes.map(r => r.origin))];
    const originSel = document.getElementById('calcOrigin');
    originSel.innerHTML = origins.map(o => `<option value="${this.escapeHTML(o)}">${this.escapeHTML(o)}</option>`).join('');
    this.syncDestinationOptions();
  },

  syncDestinationOptions() {
    const routes = this.getActiveRoutesList();
    const selectedOrigin = document.getElementById('calcOrigin').value;
    const destinations = routes.filter(r => r.origin === selectedOrigin).map(r => r.destination);
    const destSel = document.getElementById('calcDestination');
    destSel.innerHTML = destinations.map(d => `<option value="${this.escapeHTML(d)}">${this.escapeHTML(d)}</option>`).join('');
  },

  handleFareCalculation() {
    const errEl = document.getElementById('calcValidationMsg');
    errEl.classList.add('hidden');

    const origin = document.getElementById('calcOrigin').value;
    const destination = document.getElementById('calcDestination').value;
    const passengers = parseInt(document.getElementById('calcPassengers').value, 10) || 0;
    const discountedCount = parseInt(document.getElementById('calcDiscountedCount').value, 10) || 0;

    let result;
    if (this.calcMode === 'tricycle') {
      const rideType = document.querySelector('input[name="rideType"]:checked').value;
      const midRoute = document.getElementById('calcMidRoute').checked;
      result = TariffEngine.calculateTricycle({
        todaId: document.getElementById('calcTodaSelect').value,
        origin,
        destination,
        rideType,
        midRoute,
        passengers,
        discountedCount
      });
    } else {
      result = TariffEngine.calculateBusJeep({
        classId: document.getElementById('calcVehicleClass').value,
        origin,
        destination,
        passengers,
        discountedCount
      });
    }

    if (!result.ok) {
      errEl.textContent = result.error;
      errEl.classList.remove('hidden');
      document.getElementById('fareResultCard').classList.add('hidden');
      return;
    }

    this.lastComputedTrip = result;

    document.getElementById('resModeBadge').textContent =
      result.mode === 'Tricycle'
        ? `TRICYCLE • ${result.todaCode} (${result.rideType.toUpperCase()})`
        : result.mode.toUpperCase();
    document.getElementById('resRouteTitle').textContent = `${result.origin} → ${result.destination} (${result.distanceKm} km)`;
    document.getElementById('resTotalFare').textContent = `₱${result.totalFare.toFixed(2)}`;
    document.getElementById('resPerPassenger').textContent = `₱${result.perPassenger.toFixed(2)} / pax`;

    document.getElementById('resBreakdownList').innerHTML = result.breakdown.map(item => `
      <div class="breakdown-row">
        <span>${this.escapeHTML(item.label)}</span>
        <strong>₱${item.amount.toFixed(2)}</strong>
      </div>
    `).join('');

    document.getElementById('resTariffNote').textContent = `Reference: ${result.tariffRef}`;
    document.getElementById('fareResultCard').classList.remove('hidden');
  },

  /* -------------------- 3. TODA & Units Module -------------------- */
  bindTodaEvents() {
    document.getElementById('todaSearchInput').addEventListener('input', () => this.renderTodaDirectory());
    document.getElementById('todaFilterOrg').addEventListener('change', () => this.renderTodaDirectory());
    document.getElementById('todaFilterStatus').addEventListener('change', () => this.renderTodaDirectory());
  },

  renderTodaDirectory() {
    const db = DataStore.getDB();
    const orgSelect = document.getElementById('todaFilterOrg');
    const prevOrg = orgSelect.value;
    orgSelect.innerHTML = `<option value="all">All TODAs</option>` + db.todas.map(t =>
      `<option value="${t.id}">${this.escapeHTML(t.code)} — ${this.escapeHTML(t.name)}</option>`
    ).join('');
    if ([...orgSelect.options].some(o => o.value === prevOrg)) orgSelect.value = prevOrg;

    // Render TODA Org cards
    document.getElementById('todaOrgCards').innerHTML = db.todas.map(t => {
      const rating = this.getTodaRatingStats(t.id);
      return `
        <div class="card">
          <div class="card-title-row">
            <div>
              <span class="badge badge-navy">${this.escapeHTML(t.code)}</span>
              ${t.verified ? '<span class="badge badge-green">✓ LGU Verified TODA</span>' : '<span class="badge badge-yellow">Verification Pending</span>'}
            </div>
            <strong>⭐ ${rating.avg} (${rating.count})</strong>
          </div>
          <h2>${this.escapeHTML(t.name)}</h2>
          <p class="muted">Terminal: ${this.escapeHTML(t.terminal)} • President: ${this.escapeHTML(t.president)}</p>
        </div>
      `;
    }).join('');

    // Filter Units
    const query = document.getElementById('todaSearchInput').value.trim().toLowerCase();
    const filterOrg = orgSelect.value;
    const filterStatus = document.getElementById('todaFilterStatus').value;

    const filteredUnits = db.units.filter(u => {
      const toda = db.todas.find(t => t.id === u.todaId);
      const matchesOrg = filterOrg === 'all' || u.todaId === filterOrg;
      const matchesStatus =
        filterStatus === 'all' ||
        (filterStatus === 'verified' && u.verified) ||
        (filterStatus === 'pending' && !u.verified);
      const haystack = `${u.bodyNumber} ${u.plateNumber} ${u.driverName} ${toda ? toda.code + ' ' + toda.name : ''}`.toLowerCase();
      return matchesOrg && matchesStatus && haystack.includes(query);
    });

    document.getElementById('unitResultCount').textContent = filteredUnits.length;

    const unitsListEl = document.getElementById('unitsList');
    if (!filteredUnits.length) {
      unitsListEl.innerHTML = `<div class="card"><p class="muted">No tricycle units matched your search filters.</p></div>`;
      return;
    }

    unitsListEl.innerHTML = filteredUnits.map(u => {
      const toda = db.todas.find(t => t.id === u.todaId);
      const rating = this.getUnitRatingStats(u.id);
      return `
        <div class="card">
          <div class="card-title-row">
            <div>
              <span class="badge badge-yellow">BODY #${this.escapeHTML(u.bodyNumber)}</span>
              <span class="badge badge-blue">${this.escapeHTML(toda ? toda.code : 'TODA')}</span>
              ${u.verified ? '<span class="badge badge-green">✓ Verified Franchise</span>' : '<span class="badge badge-red">Renewal Due</span>'}
            </div>
            <strong>⭐ ${rating.avg} (${rating.count})</strong>
          </div>
          <h2>Driver: ${this.escapeHTML(u.driverName)}</h2>
          <p class="muted">Plate: ${this.escapeHTML(u.plateNumber)} • MTOP: ${this.escapeHTML(u.franchiseNo)} • ${this.escapeHTML(u.vehicleModel)}</p>
          <div class="btn-row mt-12">
            <button type="button" class="btn btn-outline btn-sm" data-view-unit="${u.id}">View Driver Profile &amp; Reviews</button>
            <button type="button" class="btn btn-yellow btn-sm" data-rate-unit="${u.id}">Rate Unit</button>
          </div>
        </div>
      `;
    }).join('');

    unitsListEl.querySelectorAll('[data-view-unit]').forEach(btn => {
      btn.addEventListener('click', () => this.openUnitDetailModal(btn.getAttribute('data-view-unit')));
    });

    unitsListEl.querySelectorAll('[data-rate-unit]').forEach(btn => {
      btn.addEventListener('click', () => {
        const unitId = btn.getAttribute('data-rate-unit');
        this.navigateTo('ratings');
        document.getElementById('revUnitSelect').value = unitId;
      });
    });
  },

  openUnitDetailModal(unitId) {
    const db = DataStore.getDB();
    const unit = db.units.find(u => u.id === unitId);
    if (!unit) return;
    const toda = db.todas.find(t => t.id === unit.todaId);
    const reviews = db.reviews.filter(r => r.unitId === unit.id);
    const rating = this.getUnitRatingStats(unit.id);

    document.getElementById('detailModalTitle').textContent = `Body #${unit.bodyNumber} — Driver Profile`;
    document.getElementById('detailModalBody').innerHTML = `
      <div class="form-stack">
        <div>
          <span class="badge badge-navy">${this.escapeHTML(toda ? toda.code : '')}</span>
          ${unit.verified ? '<span class="badge badge-green">✓ Active Verified Unit</span>' : '<span class="badge badge-red">Franchise Renewal Needed</span>'}
        </div>
        <p><strong>Driver Name:</strong> ${this.escapeHTML(unit.driverName)}</p>
        <p><strong>TODA Organization:</strong> ${this.escapeHTML(toda ? toda.name : 'N/A')}</p>
        <p><strong>Plate Number:</strong> ${this.escapeHTML(unit.plateNumber)}</p>
        <p><strong>Franchise / MTOP No.:</strong> ${this.escapeHTML(unit.franchiseNo)} (Valid until ${this.escapeHTML(unit.franchiseExpiry)})</p>
        <p><strong>Vehicle Unit:</strong> ${this.escapeHTML(unit.vehicleModel)}</p>
        <p><strong>Driver Rating:</strong> ⭐ ${rating.avg} based on ${rating.count} review(s)</p>
        <hr />
        <h3>Passenger Reviews</h3>
        ${reviews.length ? reviews.map(r => `
          <div class="card">
            <div class="card-title-row">
              <strong>${'★'.repeat(r.stars)}${'☆'.repeat(5 - r.stars)}</strong>
              <small class="muted">${this.escapeHTML(r.passengerName)}</small>
            </div>
            <p class="muted">Route: ${this.escapeHTML(r.route)} • Paid ₱${r.actualFare} (Expected ₱${r.expectedFare})</p>
            <p>${this.escapeHTML(r.comment || 'No comment provided.')}</p>
          </div>
        `).join('') : '<p class="muted">No reviews recorded for this unit yet.</p>'}
      </div>
    `;
    document.getElementById('detailModal').classList.remove('hidden');
  },

 /* -------------------- 4. Ratings & Reviews Module -------------------- */
  bindReviewEvents() {
    document.getElementById('btnReviewLoginTrigger').addEventListener('click', () => this.openAuthModal('login'));

    document.querySelectorAll('#starPicker .star-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const val = parseInt(btn.getAttribute('data-star'), 10);
        document.getElementById('revStarValue').value = val;
        document.querySelectorAll('#starPicker .star-btn').forEach(s => {
          s.classList.toggle('active', parseInt(s.getAttribute('data-star'), 10) <= val);
        });
      });
    });

    document.querySelectorAll('#feedbackTagChips .chip-toggle').forEach(chip => {
      chip.addEventListener('click', () => {
        const tag = chip.getAttribute('data-tag');
        if (this.selectedTags.has(tag)) {
          this.selectedTags.delete(tag);
          chip.classList.remove('selected');
        } else {
          this.selectedTags.add(tag);
          chip.classList.add('selected');
        }
      });
    });

    document.getElementById('reviewFilterSelect').addEventListener('change', () => this.renderReviews());

    document.getElementById('reviewForm').addEventListener('submit', e => {
      e.preventDefault();
      this.handleReviewSubmission();
    });
  },

  handleReviewSubmission() {
    const user = AuthService.getCurrentUser();
    const errBox = document.getElementById('revFormError');
    errBox.classList.add('hidden');

    if (!user) {
      this.openAuthModal('login');
      return;
    }

    const db = DataStore.getDB();
    const unitId = document.getElementById('revUnitSelect').value;
    const route = document.getElementById('revRouteInput').value.trim();
    const stars = parseInt(document.getElementById('revStarValue').value, 10);
    const expectedFare = parseFloat(document.getElementById('revExpectedFare').value);
    const actualFare = parseFloat(document.getElementById('revActualFare').value);
    const comment = document.getElementById('revComment').value.trim();

    if (!unitId || !route || isNaN(expectedFare) || isNaN(actualFare) || expectedFare <= 0 || actualFare <= 0) {
      errBox.textContent = 'Please fill in unit, route, expected fare, and actual fare with valid numbers.';
      errBox.classList.remove('hidden');
      return;
    }

    // Duplicate submission prevention (same user, same unit, same route within 24 hours)
    const now = Date.now();
    const isDuplicate = db.reviews.some(r =>
      r.passengerEmail === user.email &&
      r.unitId === unitId &&
      r.route.toLowerCase() === route.toLowerCase() &&
      (now - new Date(r.createdAt).getTime()) < 24 * 60 * 60 * 1000
    );

    if (isDuplicate) {
      errBox.textContent = 'Duplicate protection: You already submitted a rating for this unit and route within the last 24 hours.';
      errBox.classList.remove('hidden');
      return;
    }

    db.reviews.unshift({
      id: 'rev-' + Date.now(),
      unitId,
      passengerEmail: user.email,
      passengerName: user.name,
      route,
      stars,
      expectedFare,
      actualFare,
      tags: Array.from(this.selectedTags),
      comment,
      createdAt: new Date().toISOString()
    });

    DataStore.saveDB(db);
    document.getElementById('reviewForm').reset();
    document.getElementById('revStarValue').value = 5;
    document.querySelectorAll('#starPicker .star-btn').forEach(s => s.classList.add('active'));
    this.selectedTags.clear();
    document.querySelectorAll('#feedbackTagChips .chip-toggle').forEach(c => c.classList.remove('selected'));

    this.showToast('Thank you! Your commuter rating has been published.');
    this.renderReviews();
  },

  renderReviews() {
    const db = DataStore.getDB();
    const user = AuthService.getCurrentUser();

    // Populate unit dropdown
    const unitSel = document.getElementById('revUnitSelect');
    const prevVal = unitSel.value;
    unitSel.innerHTML = db.units.map(u => {
      const toda = db.todas.find(t => t.id === u.todaId);
      return `<option value="${u.id}">Body #${this.escapeHTML(u.bodyNumber)} (${this.escapeHTML(toda ? toda.code : '')}) — ${this.escapeHTML(u.driverName)}</option>`;
    }).join('');
    if ([...unitSel.options].some(o => o.value === prevVal)) unitSel.value = prevVal;

    // Toggle auth gate
    const promptBox = document.getElementById('reviewLoginPrompt');
    const formBox = document.getElementById('reviewForm');
    const badge = document.getElementById('reviewAuthBadge');

    if (user) {
      promptBox.classList.add('hidden');
      formBox.classList.remove('hidden');
      badge.textContent = `Posting as ${user.name}`;
      badge.className = 'badge badge-green';
    } else {
      promptBox.classList.remove('hidden');
      formBox.classList.add('hidden');
      badge.textContent = 'Passenger Login Required';
      badge.className = 'badge badge-navy';
    }

    // Filter feed
    const filter = document.getElementById('reviewFilterSelect').value;
    const filtered = db.reviews.filter(r => {
      if (filter === '5') return r.stars === 5;
      if (filter === '4') return r.stars === 4;
      if (filter === 'low') return r.stars <= 3;
      return true;
    });

    document.getElementById('reviewsTotalLabel').textContent = filtered.length;
    const feedEl = document.getElementById('reviewsFeed');

    if (!filtered.length) {
      feedEl.innerHTML = `<div class="card"><p class="muted">No reviews match this rating filter.</p></div>`;
      return;
    }

    feedEl.innerHTML = filtered.map(r => {
      const unit = db.units.find(u => u.id === r.unitId);
      const toda = unit ? db.todas.find(t => t.id === unit.todaId) : null;
      const diff = +(r.actualFare - r.expectedFare).toFixed(2);
      const fareStatusBadge = diff > 0
        ? `<span class="badge badge-red">Overcharged +₱${diff.toFixed(2)}</span>`
        : `<span class="badge badge-green">Exact Taripa (₱${r.actualFare.toFixed(2)})</span>`;
        
        return `
        <div class="card">
          <div class="card-title-row">
            <div>
              <span class="badge badge-yellow">Body #${unit ? this.escapeHTML(unit.bodyNumber) : 'N/A'}</span>
              <span class="badge badge-blue">${toda ? this.escapeHTML(toda.code) : ''}</span>
              ${fareStatusBadge}
            </div>
            <strong>${'★'.repeat(r.stars)}${'☆'.repeat(5 - r.stars)}</strong>
          </div>
          <p><strong>${this.escapeHTML(r.route)}</strong></p>
          <p class="muted">Expected: ₱${r.expectedFare.toFixed(2)} • Paid: ₱${r.actualFare.toFixed(2)} • By ${this.escapeHTML(r.passengerName)}</p>
          ${r.tags && r.tags.length ? `<div class="tag-chips mt-12">${r.tags.map(t => `<span class="badge badge-blue">${this.escapeHTML(t)}</span>`).join('')}</div>` : ''}
          ${r.comment ? `<p class="mt-12">${this.escapeHTML(r.comment)}</p>` : ''}
        </div>
      `;
    }).join('');
  },
  
    /* -------------------- 5. Official Taripa Module -------------------- */
  bindTaripaEvents() {
    document.getElementById('tabTaripaTrike').addEventListener('click', () => {
      this.taripaTab = 'tricycle';
      document.getElementById('tabTaripaTrike').classList.add('active');
      document.getElementById('tabTaripaBus').classList.remove('active');
      this.renderTaripa();
    });
    document.getElementById('tabTaripaBus').addEventListener('click', () => {
      this.taripaTab = 'bus_jeep';
      document.getElementById('tabTaripaBus').classList.add('active');
      document.getElementById('tabTaripaTrike').classList.remove('active');
      this.renderTaripa();
    });
  },

  renderTaripa() {
    const db = DataStore.getDB();
    const container = document.getElementById('taripaContentArea');

    if (this.taripaTab === 'tricycle') {
      container.innerHTML = db.tricycleTariffs.map(t => `
        <div class="card">
          <div class="card-title-row">
            <span class="badge badge-navy">${this.escapeHTML(t.todaCode)}</span>
            <span class="badge badge-yellow">Pakyawan Cap: ₱${t.pakyawanCap.toFixed(2)}</span>
          </div>
          <h2>${this.escapeHTML(t.todaName)}</h2>
          <p class="muted mb-12">${this.escapeHTML(t.ordinanceRef)} • Effective: ${this.escapeHTML(t.effectiveDate)}</p>
          <div class="table-wrap">
            <table class="taripa-table">
              <thead>
                <tr>
                  <th>Origin → Destination</th>
                  <th>Dist.</th>
                  <th>Shared</th>
                  <th>20% Disc.</th>
                  <th>Pakyawan</th>
                </tr>
              </thead>
              <tbody>
                ${t.routes.map(r => `
                  <tr>
                    <td>${this.escapeHTML(r.origin)} → ${this.escapeHTML(r.destination)}</td>
                    <td>${r.distanceKm} km</td>
                    <td><strong>₱${r.sharedFare.toFixed(2)}</strong></td>
                    <td>₱${(r.sharedFare * (1 - t.discountRate)).toFixed(2)}</td>
                    <td>₱${r.pakyawanFare.toFixed(2)}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `).join('');
    } else {
      container.innerHTML = db.busJeepTariffs.map(c => `
        <div class="card">
          <div class="card-title-row">
            <span class="badge badge-blue">PUV MATRIX</span>
            <small class="muted">Effective: ${this.escapeHTML(c.effectiveDate)}</small>
          </div>
          <h2>${this.escapeHTML(c.className)}</h2>
          <p class="muted mb-12">${this.escapeHTML(c.regulatorRef)}</p>
          <div class="table-wrap">
            <table class="taripa-table">
              <thead>
                <tr>
                  <th>Route</th>
                  <th>Distance</th>
                  <th>Regular Fare</th>
                  <th>Student / Senior / PWD (20% Off)</th>
                </tr>
              </thead>
              <tbody>
                ${c.routes.map(r => `
                  <tr>
                    <td>${this.escapeHTML(r.origin)} → ${this.escapeHTML(r.destination)}</td>
                    <td>${r.distanceKm} km</td>
                    <td><strong>₱${r.regularFare.toFixed(2)}</strong></td>
                    <td>₱${(r.regularFare * (1 - c.discountRate)).toFixed(2)}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `).join('');
    }
  },

  /* -------------------- 6. Trip History Module -------------------- */
  bindHistoryEvents() {
    document.getElementById('btnHistoryLogin').addEventListener('click', () => this.openAuthModal('login'));
    document.getElementById('btnClearHistory').addEventListener('click', () => {
      const user = AuthService.getCurrentUser();
      if (!user) return;
      const db = DataStore.getDB();
      db.tripHistory = db.tripHistory.filter(t => t.userEmail !== user.email);
      DataStore.saveDB(db);
      this.renderHistory();
      this.showToast('Your trip history has been cleared.');
    });
  },

  renderHistory() {
    const user = AuthService.getCurrentUser();
    const gate = document.getElementById('historyAuthGate');
    const authArea = document.getElementById('historyAuthenticatedArea');

    if (!user) {
      gate.classList.remove('hidden');
      authArea.classList.add('hidden');
      return;
    }

    gate.classList.add('hidden');
    authArea.classList.remove('hidden');

    const db = DataStore.getDB();
    const myTrips = db.tripHistory.filter(t => t.userEmail === user.email);
    document.getElementById('historyCount').textContent = myTrips.length;

    const listEl = document.getElementById('tripHistoryList');
    if (!myTrips.length) {
      listEl.innerHTML = `<div class="card"><p class="muted">No saved trips yet. Use <strong>Compute Fare</strong> and click <strong>Save to Trip History</strong>.</p></div>`;
      return;
    }

    listEl.innerHTML = myTrips.map(t => `
      <div class="card">
        <div class="card-title-row">
          <span class="badge badge-blue">${this.escapeHTML(t.mode)}</span>
          <small class="muted">${this.escapeHTML(t.savedAt)}</small>
        </div>
        <h2>${this.escapeHTML(t.route)}</h2>
        <p class="muted">${this.escapeHTML(t.arrangement)}</p>
        <div class="per-pax-strip">
          <span>Total: <strong>₱${t.totalFare.toFixed(2)}</strong></span>
          <span>Per Pax: <strong>₱${t.perPassenger.toFixed(2)}</strong></span>
        </div>
      </div>
    `).join('');
  },

  /* -------------------- 7. Settings Module -------------------- */
  bindSettingsEvents() {
    document.getElementById('btnSettingsSignIn').addEventListener('click', () => this.openAuthModal('login'));

    document.getElementById('accountSettingsForm').addEventListener('submit', e => {
      e.preventDefault();
      AuthService.updateCurrentUserProfile({
        name: document.getElementById('setFullName').value,
        passengerCategory: document.getElementById('setPassengerCategory').value
      });
      this.syncAuthUI();
      this.showToast('Account profile updated.');
    });

    ['prefNotifTariff', 'prefNotifAdvisory', 'prefAutoDiscount'].forEach(id => {
      document.getElementById(id).addEventListener('change', () => {
        DataStore.savePrefs({
          notifTariff: document.getElementById('prefNotifTariff').checked,
          notifAdvisory: document.getElementById('prefNotifAdvisory').checked,
          autoDiscount: document.getElementById('prefAutoDiscount').checked
        });
        this.showToast('App preferences saved.');
      });
    });

    document.getElementById('btnResetDemoData').addEventListener('click', () => {
      DataStore.resetDB();
      this.syncAuthUI();
      this.renderHome();
      this.populateCalculatorSelectors();
      this.renderTodaDirectory();
      this.renderReviews();
      this.renderTaripa();
      this.renderAbout();
      this.renderSettings();
      this.showToast('Demo data restored to initial sample state.');
    });

    document.getElementById('btnSettingsLogout').addEventListener('click', () => {
      AuthService.logout();
      this.syncAuthUI();
      this.renderSettings();
      this.showToast('Logged out successfully.');
    });
  },

  renderSettings() {
    const user = AuthService.getCurrentUser();
    const prefs = DataStore.getPrefs();

    document.getElementById('prefNotifTariff').checked = !!prefs.notifTariff;
    document.getElementById('prefNotifAdvisory').checked = !!prefs.notifAdvisory;
    document.getElementById('prefAutoDiscount').checked = !!prefs.autoDiscount;

    const guestState = document.getElementById('settingsGuestState');
    const form = document.getElementById('accountSettingsForm');
    const logoutBtn = document.getElementById('btnSettingsLogout');

    if (!user) {
      guestState.classList.remove('hidden');
      form.classList.add('hidden');
      logoutBtn.classList.add('hidden');
    } else {
      guestState.classList.add('hidden');
      form.classList.remove('hidden');
      logoutBtn.classList.remove('hidden');
      document.getElementById('setFullName').value = user.name;
      document.getElementById('setEmail').value = user.email;
      document.getElementById('setPassengerCategory').value = user.passengerCategory || 'regular';
    }
  },

  /* -------------------- 8. About & Announcements Module -------------------- */
  bindAboutEvents() {
    document.getElementById('btnAdminManageAnnouncements').addEventListener('click', () => {
      this.navigateTo('admin-dash');
    });
    document.getElementById('btnAdminAddLink').addEventListener('click', () => {
      this.navigateTo('admin-dash');
    });
  },

  renderAbout() {
    const db = DataStore.getDB();
    const user = AuthService.getCurrentUser();
    const isAdmin = user && user.role === 'admin';

    document.getElementById('btnAdminManageAnnouncements').classList.toggle('hidden', !isAdmin);
    document.getElementById('btnAdminAddLink').classList.toggle('hidden', !isAdmin);

    document.getElementById('aboutAnnouncementsList').innerHTML = db.announcements.map(a => `
      <div class="card">
        <div class="card-title-row">
          <span class="badge ${a.category === 'Official Notice' ? 'badge-blue' : 'badge-yellow'}">${this.escapeHTML(a.category)}</span>
          <small class="muted">${this.escapeHTML(a.date)}</small>
        </div>
        <h2>${this.escapeHTML(a.title)}</h2>
        <p class="muted">${this.escapeHTML(a.body)}</p>
      </div>
    `).join('');

    document.getElementById('externalLinksList').innerHTML = db.externalLinks.map(link => `
      <a class="ext-link-item" href="${this.escapeHTML(link.url)}" target="_blank" rel="noopener noreferrer">
        <span>${this.escapeHTML(link.title)}</span>
        <span>Open ↗</span>
      </a>
    `).join('');
  },

  /* -------------------- 9. Driver Dashboard -------------------- */
  renderDriverDashboard() {
    const user = AuthService.getCurrentUser();
    const db = DataStore.getDB();
    const unit = db.units.find(u => u.id === user.unitId) || db.units[0];
    const toda = db.todas.find(t => t.id === unit.todaId);
    const rating = this.getUnitRatingStats(unit.id);
    const reviews = db.reviews.filter(r => r.unitId === unit.id);

    const container = document.getElementById('driverDashContent');
    container.innerHTML = `
      <div class="card">
        <div class="card-title-row">
          <span class="badge badge-yellow">BODY #${this.escapeHTML(unit.bodyNumber)}</span>
          <span class="badge badge-green">⭐ ${rating.avg} (${rating.count} reviews)</span>
        </div>
        <h2>${this.escapeHTML(unit.driverName)}</h2>
        <p class="muted mb-12">${this.escapeHTML(toda ? toda.name : '')} • Plate: ${this.escapeHTML(unit.plateNumber)} • MTOP: ${this.escapeHTML(unit.franchiseNo)}</p>

        <form id="driverUnitForm" class="form-stack">
          <div class="form-group">
            <label for="drvVehicleModel">Vehicle &amp; Sidecar Description</label>
            <input type="text" id="drvVehicleModel" class="form-control" value="${this.escapeHTML(unit.vehicleModel)}" required />
          </div>
          <button type="submit" class="btn btn-primary">Update Unit Details</button>
        </form>
      </div>

      <div class="section-header">
        <h2>Recent Commuter Feedback on Your Unit</h2>
      </div>
      <div class="stack-list">
        ${reviews.length ? reviews.map(r => `
          <div class="card">
            <div class="card-title-row">
              <strong>${'★'.repeat(r.stars)}${'☆'.repeat(5 - r.stars)}</strong>
              <small class="muted">${this.escapeHTML(r.route)}</small>
            </div>
            <p>${this.escapeHTML(r.comment || 'No comment.')}</p>
          </div>
        `).join('') : '<div class="card"><p class="muted">No reviews yet.</p></div>'}
      </div>
    `;

    document.getElementById('driverUnitForm').addEventListener('submit', e => {
      e.preventDefault();
      const freshDb = DataStore.getDB();
      const idx = freshDb.units.findIndex(u => u.id === unit.id);
      if (idx !== -1) {
        freshDb.units[idx].vehicleModel = document.getElementById('drvVehicleModel').value.trim();
        DataStore.saveDB(freshDb);
        this.showToast('Driver unit profile updated.');
      }
    });
  },

  /* -------------------- 10. TODA Official Dashboard -------------------- */
  renderTodaDashboard() {
    const user = AuthService.getCurrentUser();
    const db = DataStore.getDB();
    const toda = db.todas.find(t => t.id === user.todaId) || db.todas[0];
    const orgUnits = db.units.filter(u => u.todaId === toda.id);
    const rating = this.getTodaRatingStats(toda.id);

    const container = document.getElementById('todaDashContent');
    container.innerHTML = `
      <div class="card">
        <div class="card-title-row">
          <span class="badge badge-navy">${this.escapeHTML(toda.code)}</span>
          <strong>Org Rating: ⭐ ${rating.avg} (${rating.count})</strong>
        </div>
        <h2>${this.escapeHTML(toda.name)}</h2>
        <p class="muted">Terminal: ${this.escapeHTML(toda.terminal)} • Managed Units: ${orgUnits.length}</p>
      </div>

      <div class="section-header">
        <h2>Organization Units &amp; Verification</h2>
      </div>
      <div class="stack-list">
        ${orgUnits.map(u => `
          <div class="card">
            <div class="card-title-row">
              <strong>Body #${this.escapeHTML(u.bodyNumber)} — ${this.escapeHTML(u.driverName)}</strong>
              <span class="badge ${u.verified ? 'badge-green' : 'badge-red'}">${u.verified ? 'Verified' : 'Unverified'}</span>
            </div>
            <p class="muted">MTOP: ${this.escapeHTML(u.franchiseNo)} • Plate: ${this.escapeHTML(u.plateNumber)}</p>
            <button type="button" class="btn btn-outline btn-sm mt-12" data-toggle-verify="${u.id}">
              ${u.verified ? 'Mark Renewal Pending' : 'Verify Unit Franchise'}
            </button>
          </div>
        `).join('')}
      </div>
    `;

    container.querySelectorAll('[data-toggle-verify]').forEach(btn => {
      btn.addEventListener('click', () => {
        const uid = btn.getAttribute('data-toggle-verify');
        const freshDb = DataStore.getDB();
        const uIdx = freshDb.units.findIndex(x => x.id === uid);
        if (uIdx !== -1) {
          freshDb.units[uIdx].verified = !freshDb.units[uIdx].verified;
          DataStore.saveDB(freshDb);
          this.showToast('Unit verification status updated.');
          this.renderTodaDashboard();
        }
      });
    });
  },

  /* -------------------- 11. Administrator Dashboard -------------------- */
  renderAdminDashboard() {
    const db = DataStore.getDB();
    const container = document.getElementById('adminDashContent');

    container.innerHTML = `
      <!-- Tariff Management -->
      <div class="card">
        <h2>Tariff Management (Sample Tricycle Pakyawan Caps)</h2>
        <p class="muted mb-12">Adjust maximum pakyawan fare caps for registered TODA schedules.</p>
        <div class="form-stack">
          ${db.tricycleTariffs.map(t => `
            <div class="form-row-2">
              <div>
                <strong>${this.escapeHTML(t.todaCode)}</strong>
                <div class="muted">${this.escapeHTML(t.ordinanceRef)}</div>
              </div>
              <div class="btn-row">
                <input type="number" class="form-control" id="cap-${t.id}" value="${t.pakyawanCap}" step="5" min="20" />
                <button type="button" class="btn btn-primary btn-sm" data-save-cap="${t.id}">Save Cap</button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Announcement Management -->
      <div class="card">
        <h2>Publish Official Announcement</h2>
        <form id="adminAnnouncementForm" class="form-stack">
          <div class="form-row-2">
            <div class="form-group">
              <label for="annCategory">Category</label>
              <select id="annCategory" class="form-control">
                <option value="Official Notice">Official Notice</option>
                <option value="Important Announcement">Important Announcement</option>
                <option value="Community Announcement">Community Announcement</option>
              </select>
            </div>
            <div class="form-group">
              <label for="annTitle">Headline</label>
              <input type="text" id="annTitle" class="form-control" placeholder="Announcement headline" required />
            </div>
          </div>
          <div class="form-group">
            <label for="annBody">Message Details</label>
            <textarea id="annBody" class="form-control" rows="2" placeholder="Enter official notice content..." required></textarea>
          </div>
          <button type="submit" class="btn btn-yellow">Publish Notice</button>
        </form>

        <div class="stack-list mt-12">
          ${db.announcements.map(a => `
            <div class="breakdown-row">
              <span><strong>[${this.escapeHTML(a.category)}]</strong> ${this.escapeHTML(a.title)}</span>
              <button type="button" class="link-btn" data-del-ann="${a.id}">Delete</button>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- External Website Links Management -->
      <div class="card">
        <h2>Manage External Websites</h2>
        <form id="adminLinkForm" class="form-stack">
          <div class="form-row-2">
            <input type="text" id="extLinkTitle" class="form-control" placeholder="Agency / Website Name" required />
            <input type="url" id="extLinkUrl" class="form-control" placeholder="https://example.gov.ph" required />
          </div>
          <button type="submit" class="btn btn-primary btn-sm">Add External Link</button>
        </form>
        <div class="stack-list mt-12">
          ${db.externalLinks.map(l => `
            <div class="breakdown-row">
              <span>${this.escapeHTML(l.title)} (${this.escapeHTML(l.url)})</span>
              <button type="button" class="link-btn" data-del-link="${l.id}">Remove</button>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    // Save Pakyawan Cap
    container.querySelectorAll('[data-save-cap]').forEach(btn => {
      btn.addEventListener('click', () => {
        const tid = btn.getAttribute('data-save-cap');
        const newVal = parseFloat(document.getElementById(`cap-${tid}`).value);
        if (isNaN(newVal) || newVal < 20) {
          this.showToast('Please enter a valid fare cap amount.');
          return;
        }
        const freshDb = DataStore.getDB();
        const idx = freshDb.tricycleTariffs.findIndex(t => t.id === tid);
        if (idx !== -1) {
          freshDb.tricycleTariffs[idx].pakyawanCap = newVal;
          DataStore.saveDB(freshDb);
          this.showToast(`Updated pakyawan cap to ₱${newVal.toFixed(2)}.`);
        }
      });
    });

    // Publish Announcement
    document.getElementById('adminAnnouncementForm').addEventListener('submit', e => {
      e.preventDefault();
      const freshDb = DataStore.getDB();
      freshDb.announcements.unshift({
        id: 'ann-' + Date.now(),
        category: document.getElementById('annCategory').value,
        title: document.getElementById('annTitle').value.trim(),
        body: document.getElementById('annBody').value.trim(),
        date: new Date().toISOString().slice(0, 10),
        pinned: true
      });
      DataStore.saveDB(freshDb);
      this.showToast('Announcement published.');
      this.renderAdminDashboard();
    });

    // Delete Announcement
    container.querySelectorAll('[data-del-ann]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-del-ann');
        const freshDb = DataStore.getDB();
        freshDb.announcements = freshDb.announcements.filter(a => a.id !== id);
        DataStore.saveDB(freshDb);
        this.showToast('Announcement deleted.');
        this.renderAdminDashboard();
      });
    });

    // Add External Link
    document.getElementById('adminLinkForm').addEventListener('submit', e => {
      e.preventDefault();
      const freshDb = DataStore.getDB();
      freshDb.externalLinks.push({
        id: 'ext-' + Date.now(),
        title: document.getElementById('extLinkTitle').value.trim(),
        url: document.getElementById('extLinkUrl').value.trim()
      });
      DataStore.saveDB(freshDb);
      this.showToast('External website link added.');
      this.renderAdminDashboard();
    });

    // Delete External Link
    container.querySelectorAll('[data-del-link]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-del-link');
        const freshDb = DataStore.getDB();
        freshDb.externalLinks = freshDb.externalLinks.filter(l => l.id !== id);
        DataStore.saveDB(freshDb);
        this.showToast('External link removed.');
        this.renderAdminDashboard();
      });
    });
  }
};

document.addEventListener('DOMContentLoaded', () => App.init());

async function loadDataFromSupabase() {
  const result = await window.fetchByaheGoData();

  if (result.success && result.barangays.length > 0) {
    barangaysList = result.barangays;
    const statusBadge = document.getElementById('db-status');
    if (statusBadge) statusBadge.textContent = '🟢 Live Supabase';
  }

  if (result.success && result.fareRates.length > 0) {
    fareRatesList = result.fareRates;
  }

  populateDropdowns();
  calculateFare();
}