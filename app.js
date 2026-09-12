const SUPABASE_URL = 'https://yksarutpukvtxdiwhnfz.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_2wlXUZQ_rtiZsK5wSQTDig_x0IUYgwk';
const db = window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

const state = { user: null, profile: null, services: [], vehicles: [], rules: [] };
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

function rupiah(value) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(value || 0);
}

function showToast(message, type = 'info') {
  const toast = $('#toast');
  toast.textContent = message;
  toast.className = `toast show ${type}`;
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => { toast.className = 'toast'; }, 3200);
}

function setLoading(button, loading) {
  button.disabled = loading;
  button.dataset.originalText ||= button.textContent;
  button.textContent = loading ? 'Memproses...' : button.dataset.originalText;
}

function showPage(pageId) {
  const page = document.getElementById(pageId);
  if (!page) return;
  $$('.page').forEach((item) => item.classList.toggle('active-page', item.id === pageId));
  $$('.nav-item').forEach((item) => item.classList.toggle('active', item.dataset.page === pageId));
  $('#pageTitle').textContent = page.querySelector('h3')?.textContent || 'Ringkasan';
}

function applyRoleVisibility() {
  const isOwner = state.profile?.role === 'super_admin';
  $$('.owner-only').forEach((item) => item.classList.toggle('hidden', !isOwner));
}

function renderUser() {
  const email = state.user?.email || '-';
  const role = state.profile?.role === 'super_admin' ? 'Super Admin / Owner' : 'Admin / Kasir';
  $('#userEmail').textContent = email;
  $('#userRole').textContent = role;
  $('#userInitials').textContent = email.slice(0, 2).toUpperCase();
  applyRoleVisibility();
}

async function loadProfile(user) {
  const { data, error } = await db.from('profiles').select('id,full_name,role,is_active').eq('id', user.id).maybeSingle();
  if (error) throw error;
  if (!data) throw new Error('Profil pengguna belum tersedia.');
  if (data.is_active === false) throw new Error('Akun ini sedang dinonaktifkan.');
  state.profile = data;
}

async function loadMasters() {
  const [serviceResult, vehicleResult, ruleResult] = await Promise.all([
    db.from('service_masters').select('*').eq('is_active', true).order('name'),
    db.from('vehicle_masters').select('*').eq('is_active', true).order('brand').order('model'),
    db.from('vehicle_price_rules').select('*').eq('is_active', true)
  ]);
  if (serviceResult.error) throw serviceResult.error;
  if (vehicleResult.error) throw vehicleResult.error;
  if (ruleResult.error) throw ruleResult.error;
  state.services = serviceResult.data || [];
  state.vehicles = vehicleResult.data || [];
  state.rules = ruleResult.data || [];
  renderServiceOptions();
  renderVehicleOptions();
  renderServiceTable();
  renderVehicleTable();
}

function renderServiceOptions() {
  const select = $('#serviceSelect');
  const usable = state.services.filter((service) => service.vehicle_kind !== 'surcharge');
  select.innerHTML = '<option value="">Pilih layanan</option>' + usable.map((service) => `<option value="${service.id}">${service.name} — ${rupiah(service.base_price)}</option>`).join('');
}

function renderVehicleOptions() {
  $('#vehicleSelect').innerHTML = '<option value="">Ketik manual / pilih master kendaraan</option>' + state.vehicles.map((vehicle) => `<option value="${vehicle.id}">${vehicle.brand} ${vehicle.model}${vehicle.variant ? ` — ${vehicle.variant}` : ''}</option>`).join('');
}

function renderServiceTable() {
  $('#serviceTableBody').innerHTML = state.services.map((service) => `<tr><td>${service.code}</td><td>${service.name}</td><td>${service.vehicle_kind}</td><td>${rupiah(service.base_price)}</td><td>${service.stamp_eligible ? 'Ya' : 'Tidak'}</td><td>${service.is_active ? 'Aktif' : 'Nonaktif'}</td></tr>`).join('') || '<tr><td colspan="6" class="empty-cell">Belum ada data layanan.</td></tr>';
}

function renderVehicleTable() {
  $('#vehicleTableBody').innerHTML = state.vehicles.map((vehicle) => `<tr><td>${vehicle.brand}</td><td>${vehicle.model}</td><td>${vehicle.vehicle_type || '-'}</td><td>${vehicle.energy_type || '-'}</td><td>${vehicle.price_category || '-'}</td><td>${vehicle.robotic_status || '-'}</td></tr>`).join('') || '<tr><td colspan="6" class="empty-cell">Belum ada data kendaraan.</td></tr>';
}

function updateRecommendation() {
  const service = state.services.find((item) => item.id === $('#serviceSelect').value);
  const vehicle = state.vehicles.find((item) => item.id === $('#vehicleSelect').value);
  const dirty = $('#conditionSelect').value === 'extra_dirty';
  if (!service) {
    $('#priceRecommendation').textContent = 'Pilih kendaraan dan layanan untuk melihat rekomendasi harga.';
    return;
  }
  let recommended = service.base_price;
  let label = 'Harga dasar';
  if (vehicle && service.vehicle_kind === 'car') {
    const rule = state.rules.find((item) => item.service_id === service.id && item.vehicle_category === vehicle.price_category);
    if (rule) {
      recommended = rule.recommended_price;
      label = `Rekomendasi ${vehicle.price_category.replaceAll('_', ' ')}`;
    }
  }
  const surcharge = dirty ? (state.services.find((item) => item.code === 'EXTRA_DIRTY')?.base_price || 0) : 0;
  const total = recommended + surcharge;
  $('#priceRecommendation').innerHTML = `${label}: <strong>${rupiah(recommended)}</strong>${surcharge ? ` + Extra Dirty ${rupiah(surcharge)} = <strong>${rupiah(total)}</strong>` : ''}<br><small>Harga bersifat rekomendasi dan masih dapat disesuaikan kasir.</small>`;
}

async function enterApp(user) {
  state.user = user;
  try {
    await loadProfile(user);
    await loadMasters();
    renderUser();
    $('#loginView').classList.add('hidden');
    $('#appView').classList.remove('hidden');
  } catch (error) {
    console.error(error);
    await db.auth.signOut();
    $('#loginError').textContent = error.message || 'Gagal memuat data aplikasi.';
    showToast(error.message || 'Gagal memuat data aplikasi.', 'error');
  }
}

async function init() {
  $$('.nav-item').forEach((button) => button.addEventListener('click', () => showPage(button.dataset.page)));
  $$('[data-page-jump]').forEach((button) => button.addEventListener('click', () => showPage(button.dataset.pageJump)));
  $('#vehicleSelect').addEventListener('change', updateRecommendation);
  $('#serviceSelect').addEventListener('change', updateRecommendation);
  $('#conditionSelect').addEventListener('change', updateRecommendation);
  $('#loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const button = event.submitter;
    $('#loginError').textContent = '';
    setLoading(button, true);
    const { data, error } = await db.auth.signInWithPassword({ email: $('#emailInput').value.trim(), password: $('#passwordInput').value });
    setLoading(button, false);
    if (error) {
      $('#loginError').textContent = error.message;
      return;
    }
    await enterApp(data.user);
  });
  $('#logoutButton').addEventListener('click', () => db.auth.signOut());
  $('#transactionForm').addEventListener('submit', (event) => {
    event.preventDefault();
    showToast('Form transaksi siap. Penyimpanan akan diaktifkan pada tahap berikutnya.', 'info');
  });
  db.auth.onAuthStateChange(async (_event, session) => {
    if (session?.user && $('#appView').classList.contains('hidden')) await enterApp(session.user);
    if (!session) {
      state.user = null;
      state.profile = null;
      $('#appView').classList.add('hidden');
      $('#loginView').classList.remove('hidden');
    }
  });
  const { data } = await db.auth.getSession();
  if (data.session) await enterApp(data.session.user);
}

init();
