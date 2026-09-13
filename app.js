const SUPABASE_URL = 'https://yksarutpukvtxdiwhnfz.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_2wlXUZQ_rtiZsK5wSQTDig_x0IUYgwk';
const db = window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

const state = { user: null, profile: null, services: [], vehicles: [], rules: [], transactions: [], members: [], selectedTransaction: null };
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const escapeHtml = (value) => String(value ?? '').replace(/[&<>\"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[char]));

function rupiah(value) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(value || 0);
}

function localDateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function formatDateTime(value) {
  if (!value) return '-';
  return new Intl.DateTimeFormat('id-ID', { dateStyle: 'short', timeStyle: 'short' }).format(new Date(value));
}

function statusLabel(status) {
  const labels = { menunggu_dicuci: 'Menunggu Dicuci', sedang_dicuci: 'Sedang Dicuci', selesai_dicuci: 'Selesai Dicuci', menunggu_pembayaran: 'Menunggu Pembayaran', lunas: 'Lunas', dibatalkan: 'Dibatalkan' };
  return labels[status] || status || '-';
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

async function loadMembers() {
  const { data, error } = await db.from('members').select('id,full_name,phone,is_active,created_at').eq('is_active', true).order('full_name');
  if (error) throw error;
  state.members = data || [];
  const ids = state.members.map((member) => member.id);
  const [{ data: vehicles }, { data: ledger }] = ids.length ? await Promise.all([
    db.from('member_vehicles').select('member_id').in('member_id', ids).eq('is_active', true),
    db.from('loyalty_ledger').select('member_id,stamp_delta,reward_delta').in('member_id', ids)
  ]) : [{ data: [] }, { data: [] }];
  const select = $('#memberSelect');
  if (select) select.innerHTML = '<option value="">Bukan member</option>' + state.members.map((member) => `<option value="${member.id}">${escapeHtml(member.full_name)} — ${escapeHtml(member.phone)}</option>`).join('');
  const vehicleMemberSelect = $('#vehicleMemberInput');
  if (vehicleMemberSelect) vehicleMemberSelect.innerHTML = '<option value="">Pilih member</option>' + state.members.map((member) => `<option value="${member.id}">${escapeHtml(member.full_name)} — ${escapeHtml(member.phone)}</option>`).join('');
  const body = $('#memberTableBody');
  state.memberStats = { vehicles: vehicles || [], ledger: ledger || [] };
  renderMemberTable();
}

function renderMemberTable() {
  const body = $('#memberTableBody');
  if (!body) return;
  const search = ($('#memberSearchInput')?.value || '').trim().toLowerCase();
  const { vehicles = [], ledger = [] } = state.memberStats || {};
  const rows = state.members.filter((member) => !search || `${member.full_name} ${member.phone}`.toLowerCase().includes(search));
  body.innerHTML = rows.map((member) => { const memberVehicles = vehicles.filter((vehicle) => vehicle.member_id === member.id).length; const memberLedger = ledger.filter((entry) => entry.member_id === member.id); const stamps = memberLedger.reduce((sum, entry) => sum + Number(entry.stamp_delta || 0), 0); const rewards = memberLedger.reduce((sum, entry) => sum + Number(entry.reward_delta || 0), 0); return `<tr><td>${escapeHtml(member.full_name)}</td><td>${escapeHtml(member.phone)}</td><td>${memberVehicles}</td><td>${stamps} / 10</td><td>${rewards}</td><td>Aktif</td></tr>`; }).join('') || '<tr><td colspan="6" class="empty-cell">Belum ada member yang sesuai.</td></tr>';
}

async function loadMemberVehicles(memberId) {
  const select = $('#memberVehicleSelect');
  if (!select) return;
  select.innerHTML = '<option value="">Pilih kendaraan member</option>';
  if (!memberId) return;
  const { data, error } = await db.from('member_vehicles').select('id,plate_number,brand,model,vehicle_master_id').eq('member_id', memberId).eq('is_active', true).order('plate_number');
  if (error) return showToast(error.message || 'Kendaraan member gagal dimuat.', 'error');
  select.innerHTML += (data || []).map((vehicle) => `<option value="${vehicle.id}" data-plate="${escapeHtml(vehicle.plate_number)}" data-master="${escapeHtml(vehicle.vehicle_master_id || '')}">${escapeHtml(vehicle.plate_number)}${vehicle.brand ? ` — ${escapeHtml(vehicle.brand)} ${escapeHtml(vehicle.model || '')}` : ''}</option>`).join('');
}

async function findMemberByPlate() {
  const plateInput = $('#plateInput');
  const lookupButton = $('#lookupMemberButton');
  const lookupNote = $('#memberLookupNote');
  const plate = plateInput?.value.trim().toUpperCase().replace(/\s+/g, ' ');
  if (!plate) return showToast('Masukkan nomor plat terlebih dahulu.', 'error');
  if (lookupButton) setLoading(lookupButton, true);
  if (lookupNote) lookupNote.textContent = 'Mencari member...';
  try {
    const { data: vehicles, error: vehicleError } = await db.from('member_vehicles')
      .select('id,member_id,plate_number,brand,model,vehicle_master_id,created_at')
      .eq('plate_number', plate)
      .eq('is_active', true)
      .order('created_at', { ascending: false })
      .limit(1);
    if (vehicleError) throw vehicleError;
    const vehicle = vehicles?.[0];
    if (!vehicle) {
      if (lookupNote) lookupNote.textContent = 'Plat ini belum terdaftar sebagai kendaraan member.';
      return showToast('Member dengan plat tersebut belum ditemukan.', 'info');
    }
    const member = state.members.find((item) => item.id === vehicle.member_id);
    if (!member) {
      if (lookupNote) lookupNote.textContent = 'Member tidak aktif atau tidak ditemukan.';
      return showToast('Data member untuk plat ini tidak tersedia.', 'error');
    }
    const memberSelect = $('#memberSelect');
    if (memberSelect) memberSelect.value = member.id;
    await loadMemberVehicles(member.id);
    const memberVehicleSelect = $('#memberVehicleSelect');
    if (memberVehicleSelect) memberVehicleSelect.value = vehicle.id;
    if ($('#vehicleSelect')) $('#vehicleSelect').value = vehicle.vehicle_master_id || '';
    plateInput.value = vehicle.plate_number;
    updateRecommendation();
    const vehicleLabel = [vehicle.brand, vehicle.model].filter(Boolean).join(' ');
    if (lookupNote) lookupNote.textContent = `Member ditemukan: ${member.full_name}${vehicleLabel ? ` • ${vehicleLabel}` : ''}`;
    showToast(`Member ${member.full_name} berhasil dipilih.`, 'success');
  } catch (error) {
    console.error(error);
    if (lookupNote) lookupNote.textContent = 'Pencarian member gagal.';
    showToast(error.message || 'Pencarian member gagal.', 'error');
  } finally {
    if (lookupButton) setLoading(lookupButton, false);
  }
}

async function saveMember(event) {
  event.preventDefault();
  const name = $('#memberNameInput').value.trim();
  const phone = $('#memberPhoneInput').value.trim();
  if (!name || !phone) return showToast('Nama dan nomor telepon wajib diisi.', 'error');
  const { error } = await db.from('members').insert({ full_name: name, phone, is_active: true });
  if (error) return showToast(error.message || 'Member gagal disimpan.', 'error');
  $('#memberForm').reset();
  await loadMembers();
  showToast('Member berhasil ditambahkan.', 'success');
}

async function saveMemberVehicle(event) {
  event.preventDefault();
  const memberId = $('#vehicleMemberInput').value;
  const plate = $('#memberVehiclePlateInput').value.trim().toUpperCase().replace(/\s+/g, ' ');
  const brand = $('#memberVehicleBrandInput').value.trim() || null;
  const model = $('#memberVehicleModelInput').value.trim() || null;
  if (!memberId || !plate) return showToast('Member dan nomor plat wajib diisi.', 'error');
  const { error } = await db.from('member_vehicles').insert({ member_id: memberId, plate_number: plate, brand, model, is_active: true });
  if (error) return showToast(error.message || 'Kendaraan member gagal disimpan.', 'error');
  $('#memberVehicleForm').reset();
  await loadMembers();
  showToast('Kendaraan member berhasil ditambahkan.', 'success');
}

async function loadTransactions() {
  const { data, error } = await db.from('transactions').select('id,transaction_no,plate_number,member_id,vehicle_brand,vehicle_model,vehicle_category,status,recommended_total,final_total,created_at').order('created_at', { ascending: false }).limit(100);
  if (error) throw error;
  state.transactions = data || [];
  renderTransactions();
  renderDashboardStats();
  if ($('#reportTableBody')) renderReport();
}

function renderDashboardStats() {
  const today = localDateKey();
  const todayRows = state.transactions.filter((item) => localDateKey(new Date(item.created_at)) === today);
  const paidRows = todayRows.filter((item) => item.status === 'lunas');
  const revenue = paidRows.reduce((sum, item) => sum + Number(item.final_total || 0), 0);
  $('#todayTransactionCount').textContent = todayRows.length;
  $('#todayTransactionNote').textContent = todayRows.length ? 'Transaksi tersimpan hari ini' : 'Belum ada transaksi hari ini';
  $('#todayRevenue').textContent = rupiah(revenue);
  $('#todayRevenueNote').textContent = paidRows.length ? 'Berdasarkan transaksi lunas' : 'Belum ada pembayaran';
}

function renderTransactions() {
  const search = ($('#transactionSearchInput')?.value || '').trim().toUpperCase();
  const status = $('#transactionStatusFilter')?.value || '';
  const rows = state.transactions.filter((item) => {
    const haystack = `${item.plate_number || ''} ${item.transaction_no || ''}`.toUpperCase();
    return (!search || haystack.includes(search)) && (!status || item.status === status);
  });
  $('#transactionTableBody').innerHTML = rows.map((item) => {
    const statusClass = item.status === 'lunas' ? 'paid' : (item.status === 'selesai_dicuci' ? 'done' : 'waiting');
    const vehicle = [item.vehicle_brand, item.vehicle_model].filter(Boolean).join(' ') || '-';
    return `<tr><td>${formatDateTime(item.created_at)}</td><td>${escapeHtml(item.transaction_no || '-')}</td><td><strong>${escapeHtml(item.plate_number)}</strong></td><td>${escapeHtml(vehicle)}</td><td><span class="status-badge ${statusClass}">${escapeHtml(statusLabel(item.status))}</span></td><td>${rupiah(item.final_total)}</td><td><button class="table-action" data-transaction-id="${item.id}">Kelola</button></td></tr>`;
  }).join('') || '<tr><td colspan="7" class="empty-cell">Belum ada transaksi yang sesuai.</td></tr>';
}

function reportRows() {
  const start = $('#reportStartDate')?.value || localDateKey();
  const end = $('#reportEndDate')?.value || start;
  return state.transactions.filter((item) => {
    const date = localDateKey(new Date(item.created_at));
    return date >= start && date <= end;
  });
}

function renderReport() {
  const rows = reportRows();
  const paidRows = rows.filter((item) => item.status === 'lunas');
  $('#reportTransactionCount').textContent = rows.length;
  $('#reportPaidCount').textContent = paidRows.length;
  $('#reportRevenue').textContent = rupiah(paidRows.reduce((sum, item) => sum + Number(item.final_total || 0), 0));
  $('#reportTableBody').innerHTML = rows.map((item) => `<tr><td>${formatDateTime(item.created_at)}</td><td>${escapeHtml(item.transaction_no)}</td><td><strong>${escapeHtml(item.plate_number)}</strong></td><td><span class="status-badge ${item.status === 'lunas' ? 'paid' : item.status === 'selesai_dicuci' ? 'done' : 'waiting'}">${escapeHtml(statusLabel(item.status))}</span></td><td>${rupiah(item.final_total)}</td></tr>`).join('') || '<tr><td colspan="5" class="empty-cell">Tidak ada transaksi pada periode ini.</td></tr>';
}

function exportReportCsv() {
  const rows = reportRows();
  const header = ['Waktu', 'No Transaksi', 'Plat', 'Status', 'Total'];
  const csv = [header, ...rows.map((item) => [formatDateTime(item.created_at), item.transaction_no, item.plate_number, statusLabel(item.status), item.final_total])].map((row) => row.map((value) => `"${String(value ?? '').replaceAll('"', '""')}"`).join(',')).join('\n');
  const blob = new Blob([`\ufeff${csv}`], { type: 'text/csv;charset=utf-8' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `laporan-transaksi-${$('#reportStartDate').value}-${$('#reportEndDate').value}.csv`;
  link.click();
  URL.revokeObjectURL(link.href);
}

async function selectTransaction(id) {
  const transaction = state.transactions.find((item) => item.id === id);
  if (!transaction) return;
  state.selectedTransaction = transaction;
  if (transaction.member_id) {
    const { data: member } = await db.from('members').select('full_name,phone').eq('id', transaction.member_id).maybeSingle();
    if (member) $('#detailTransactionMeta').textContent = `${transaction.transaction_no} • ${formatDateTime(transaction.created_at)} • Member: ${member.full_name} (${member.phone})`;
    const { data: loyalty } = await db.from('loyalty_ledger').select('stamp_delta,reward_delta').eq('member_id', transaction.member_id);
    const stamps = (loyalty || []).reduce((sum, entry) => sum + Number(entry.stamp_delta || 0), 0);
    const rewards = (loyalty || []).reduce((sum, entry) => sum + Number(entry.reward_delta || 0), 0);
    $('#detailTransactionMeta').textContent += ` • Stamp ${stamps}/10 • Reward ${rewards}`;
  }
  const { data: items, error: itemError } = await db.from('transaction_items').select('service_name_snapshot,final_price,notes').eq('transaction_id', id).order('created_at');
  if (itemError) return showToast(itemError.message || 'Detail layanan gagal dimuat.', 'error');
  $('#transactionDetailPanel').classList.remove('hidden');
  $('#detailTransactionTitle').textContent = `${transaction.plate_number} — ${rupiah(transaction.final_total)}`;
  $('#detailTransactionMeta').textContent = `${transaction.transaction_no} • ${formatDateTime(transaction.created_at)}${transaction.vehicle_brand ? ` • ${transaction.vehicle_brand} ${transaction.vehicle_model || ''}` : ''}`;
  $('#detailTransactionStatus').textContent = statusLabel(transaction.status);
  $('#detailTransactionStatus').className = `status-badge ${transaction.status === 'lunas' ? 'paid' : transaction.status === 'selesai_dicuci' ? 'done' : 'waiting'}`;
  $('#detailItems').innerHTML = (items || []).map((item) => `<div class="detail-item"><span>${escapeHtml(item.service_name_snapshot)}${item.notes ? `<small>${escapeHtml(item.notes)}</small>` : ''}</span><strong>${rupiah(item.final_price)}</strong></div>`).join('') || '<p class="muted">Tidak ada item layanan.</p>';
  $('#amountReceived').value = transaction.status === 'lunas' ? '' : transaction.final_total;
  $('#paymentButton').disabled = !['selesai_dicuci', 'menunggu_pembayaran'].includes(transaction.status);
  $$('[data-status-action]').forEach((button) => { button.disabled = transaction.status === 'lunas' || transaction.status === 'dibatalkan' || button.dataset.statusAction === transaction.status || (transaction.status === 'selesai_dicuci' && button.dataset.statusAction === 'sedang_dicuci'); });
  updateChangeAmount();
}

function printReceipt() {
  const transaction = state.selectedTransaction;
  if (!transaction) return showToast('Pilih transaksi terlebih dahulu.', 'error');
  const itemText = escapeHtml($('#detailItems').innerText || '-');
  const transactionNo = escapeHtml(transaction.transaction_no || '-');
  const plate = escapeHtml(transaction.plate_number || '-');
  const dateTime = escapeHtml(formatDateTime(transaction.created_at));
  const receipt = window.open('', '_blank', 'width=380,height=700');
  if (!receipt) return showToast('Pop-up nota diblokir browser.', 'error');
  receipt.document.write(`<html><head><title>Nota ${transactionNo}</title><style>@page{size:80mm auto;margin:0}*{box-sizing:border-box}html,body{width:80mm;margin:0;padding:0;background:#fff;color:#111}body{font:12px Arial,sans-serif;padding:4mm 4mm 5mm}h2{text-align:center;font-size:17px;line-height:1.1;margin:0 0 3px}p{margin:4px 0;line-height:1.25}.line{border-top:1px dashed #111;margin:8px 0}.items{white-space:pre-line;line-height:1.35}.total{font-size:15px;font-weight:700;text-align:right;margin-top:8px}.thanks{text-align:center;margin-top:10px}@media print{html,body{width:80mm!important}body{padding:4mm 4mm 5mm}}</style></head><body><h2>BANGKA GARAGE</h2><p style="text-align:center">ROBOTIC CARWASH</p><div class="line"></div><p>No: ${transactionNo}</p><p>Plat: <b>${plate}</b></p><p>Waktu: ${dateTime}</p><div class="line"></div><div class="items">${itemText}</div><div class="line"></div><p class="total">TOTAL ${rupiah(transaction.final_total)}</p><p class="thanks">Terima kasih</p><script>window.onload=()=>window.print()<\/script></body></html>`);
  receipt.document.close();
}

function updateChangeAmount() {
  const transaction = state.selectedTransaction;
  const received = Number($('#amountReceived')?.value || 0);
  const total = Number(transaction?.final_total || 0);
  $('#changeAmount').textContent = `Kembalian: ${rupiah(Math.max(0, received - total))}`;
}

async function awardLoyaltyStamp(transaction) {
  if (!transaction.member_id) return;
  const { data: existing, error: existingError } = await db.from('loyalty_ledger').select('id').eq('transaction_id', transaction.id).eq('entry_type', 'stamp_earned').maybeSingle();
  if (existingError) throw existingError;
  if (existing) return;
  const { data: ledger, error: ledgerError } = await db.from('loyalty_ledger').select('stamp_delta,reward_delta,entry_type').eq('member_id', transaction.member_id);
  if (ledgerError) throw ledgerError;
  const stamps = (ledger || []).reduce((sum, row) => sum + Number(row.stamp_delta || 0), 0) + 1;
  const { error: stampError } = await db.from('loyalty_ledger').insert({ member_id: transaction.member_id, transaction_id: transaction.id, entry_type: 'stamp_earned', stamp_delta: 1, reward_delta: 0, notes: 'Stamp dari transaksi lunas', created_by: state.user.id });
  if (stampError) throw stampError;
  if (stamps % 10 === 0) {
    const { error: rewardError } = await db.from('loyalty_ledger').insert({ member_id: transaction.member_id, transaction_id: transaction.id, entry_type: 'reward_earned', stamp_delta: 0, reward_delta: 1, notes: 'Reward 1 kali cuci gratis setelah 10 cuci berbayar', created_by: state.user.id });
    if (rewardError) throw rewardError;
    showToast('Member mencapai 10 stamp dan mendapat 1 reward cuci gratis.', 'success');
  }
}

async function updateTransactionStatus(status) {
  const transaction = state.selectedTransaction;
  if (!transaction || transaction.status === 'lunas' || transaction.status === 'dibatalkan') return;
  const allowed = { menunggu_dicuci: ['sedang_dicuci'], sedang_dicuci: ['selesai_dicuci'], selesai_dicuci: [], menunggu_pembayaran: [] };
  if (!(allowed[transaction.status] || []).includes(status)) return showToast('Urutan status transaksi tidak valid.', 'error');
  try {
    const payload = { status };
    if (status === 'selesai_dicuci') payload.washed_at = new Date().toISOString();
    const { error } = await db.from('transactions').update(payload).eq('id', transaction.id);
    if (error) throw error;
    showToast(`Status transaksi diubah menjadi ${statusLabel(status)}.`, 'success');
    await loadTransactions();
    selectTransaction(transaction.id);
  } catch (error) {
    console.error(error);
    showToast(error.message || 'Status transaksi gagal diubah.', 'error');
  }
}

async function savePayment() {
  const transaction = state.selectedTransaction;
  if (!transaction) return showToast('Pilih transaksi terlebih dahulu.', 'error');
  if (transaction.status === 'lunas') return showToast('Transaksi ini sudah lunas.', 'info');
  if (!['selesai_dicuci', 'menunggu_pembayaran'].includes(transaction.status)) return showToast('Pembayaran hanya dapat diproses setelah kendaraan selesai dicuci.', 'error');
  const received = Number($('#amountReceived').value || 0);
  const total = Number(transaction.final_total || 0);
  if (received < total) return showToast(`Jumlah diterima kurang ${rupiah(total - received)}.`, 'error');
  const button = $('#paymentButton');
  setLoading(button, true);
  try {
    const paymentPayload = { transaction_id: transaction.id, payment_method: $('#paymentMethod').value, amount_received: received, change_amount: received - total, paid_by: state.user.id };
    const { error: paymentError } = await db.from('payments').upsert(paymentPayload, { onConflict: 'transaction_id' });
    if (paymentError) throw paymentError;
    const { error: transactionError } = await db.from('transactions').update({ status: 'lunas', paid_at: new Date().toISOString() }).eq('id', transaction.id);
    if (transactionError) throw transactionError;
    await awardLoyaltyStamp(transaction);
    showToast(`Pembayaran ${transaction.transaction_no} berhasil.`, 'success');
    await loadTransactions();
    selectTransaction(transaction.id);
  } catch (error) {
    console.error(error);
    showToast(error.message || 'Pembayaran gagal disimpan.', 'error');
  } finally {
    setLoading(button, false);
  }
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

function calculateRecommendation() {
  const service = state.services.find((item) => item.id === $('#serviceSelect').value);
  const vehicle = state.vehicles.find((item) => item.id === $('#vehicleSelect').value);
  const dirty = $('#conditionSelect').value === 'extra_dirty';
  if (!service) return null;
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
  return { service, vehicle, label, baseRecommended: Number(recommended), surcharge: Number(surcharge), total: Number(recommended) + Number(surcharge) };
}

function updateRecommendation() {
  const result = calculateRecommendation();
  if (!result) {
    $('#priceRecommendation').textContent = 'Pilih kendaraan dan layanan untuk melihat rekomendasi harga.';
    return;
  }
  const { label, baseRecommended, surcharge, total } = result;
  if (!$('#finalPriceInput').dataset.edited) $('#finalPriceInput').value = total;
  $('#priceRecommendation').innerHTML = `${label}: <strong>${rupiah(baseRecommended)}</strong>${surcharge ? ` + Extra Dirty ${rupiah(surcharge)} = <strong>${rupiah(total)}</strong>` : ''}<br><small>Harga bersifat rekomendasi dan masih dapat disesuaikan kasir.</small>`;
}

async function saveTransaction(event) {
  event.preventDefault();
  const submitButton = event.submitter;
  const plate = $('#plateInput').value.trim().toUpperCase().replace(/\s+/g, ' ');
  const result = calculateRecommendation();
  if (!plate) return showToast('Nomor kendaraan wajib diisi.', 'error');
  if (!result) return showToast('Pilih layanan terlebih dahulu.', 'error');
  const finalTotal = Number($('#finalPriceInput').value || result.total);
  const reason = $('#priceReasonInput').value.trim();
  if (!Number.isFinite(finalTotal) || finalTotal < 0) return showToast('Harga final tidak valid.', 'error');
  if (finalTotal !== result.total && !reason) return showToast('Alasan perubahan harga wajib diisi.', 'error');
  if (finalTotal < result.surcharge) return showToast('Harga final tidak boleh lebih kecil dari Extra Dirty.', 'error');
  setLoading(submitButton, true);
  try {
    const vehicle = result.vehicle;
      const transactionPayload = {
      plate_number: plate,
      member_id: null,
      vehicle_master_id: vehicle?.id || null,
      vehicle_brand: vehicle?.brand || null,
      vehicle_model: vehicle?.model || null,
      vehicle_category: vehicle?.price_category || null,
      vehicle_condition: $('#conditionSelect').value,
      recommended_total: result.total,
      final_total: finalTotal,
      price_adjustment_reason: finalTotal !== result.total ? reason : null,
        created_by: state.user.id
      };
    transactionPayload.member_id = $('#memberSelect')?.value || null;
    const { data: transaction, error: transactionError } = await db.from('transactions').insert(transactionPayload).select('id,transaction_no,status').single();
    if (transactionError) throw transactionError;
    const baseFinal = finalTotal - result.surcharge;
    const items = [{
      transaction_id: transaction.id,
      service_id: result.service.id,
      service_name_snapshot: result.service.name,
      recommended_price: result.baseRecommended,
      final_price: baseFinal,
      stamp_eligible: result.service.stamp_eligible,
      notes: null
    }];
    if (result.surcharge > 0) {
      const extraDirty = state.services.find((item) => item.code === 'EXTRA_DIRTY');
      items.push({
        transaction_id: transaction.id,
        service_id: extraDirty?.id || null,
        service_name_snapshot: extraDirty?.name || 'Extra Dirty',
        recommended_price: result.surcharge,
        final_price: result.surcharge,
        stamp_eligible: false,
        notes: 'Tambahan kondisi kendaraan sangat kotor'
      });
    }
    const { error: itemError } = await db.from('transaction_items').insert(items);
    if (itemError) throw itemError;
    $('#transactionForm').reset();
    $('#finalPriceInput').dataset.edited = '';
    $('#priceRecommendation').textContent = 'Pilih kendaraan dan layanan untuk melihat rekomendasi harga.';
    await loadTransactions();
    showPage('dashboardPage');
    showToast(`Transaksi ${transaction.transaction_no} berhasil disimpan.`, 'success');
  } catch (error) {
    console.error(error);
    showToast(error.message || 'Transaksi gagal disimpan.', 'error');
  } finally {
    setLoading(submitButton, false);
  }
}

async function enterApp(user) {
  state.user = user;
  try {
    await loadProfile(user);
    await loadMasters();
    await loadMembers();
    await loadTransactions();
    const today = localDateKey();
    $('#reportStartDate').value = today;
    $('#reportEndDate').value = today;
    renderReport();
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
  const nav = $('.side-nav');
  if (nav && !document.querySelector('[data-page="memberPage"]')) nav.insertAdjacentHTML('beforeend', '<button class="nav-item" data-page="memberPage">Member</button>');
  const main = $('.main-content');
  if (main && !$('#memberPage')) main.insertAdjacentHTML('beforeend', '<section id="memberPage" class="page"><div class="page-intro"><div><p class="eyebrow">MASTER DATA</p><h3>Member</h3><p class="muted">Daftar member dan kendaraan yang terhubung.</p></div></div><div class="panel"><form id="memberForm" class="form-grid"><label>Nama lengkap *<input id="memberNameInput" required /></label><label>Nomor telepon *<input id="memberPhoneInput" required /></label><button class="primary-button" type="submit">Tambah member</button></form></div><div class="panel"><form id="memberVehicleForm" class="form-grid"><label>Member<select id="vehicleMemberInput" required><option value="">Pilih member</option></select></label><label>Nomor plat *<input id="memberVehiclePlateInput" required placeholder="BN 1234 XX" /></label><label>Merek<input id="memberVehicleBrandInput" /></label><label>Model<input id="memberVehicleModelInput" /></label><button class="primary-button" type="submit">Tambah kendaraan</button></form></div><div class="panel"><input id="memberSearchInput" placeholder="Cari nama atau nomor telepon..." /><div class="table-wrap"><table><thead><tr><th>Nama</th><th>Telepon</th><th>Kendaraan</th><th>Stamp</th><th>Reward</th><th>Status</th></tr></thead><tbody id="memberTableBody"><tr><td colspan="6" class="empty-cell">Memuat member...</td></tr></tbody></table></div></div></section>');
  const customerLabel = $('#customerInput')?.parentElement;
  if (customerLabel && !$('#memberSelect')) { const memberLabel = document.createElement('label'); memberLabel.innerHTML = 'Member<select id="memberSelect"><option value="">Bukan member</option></select>'; customerLabel.after(memberLabel); }
  const memberSelect = $('#memberSelect');
  if (memberSelect && !$('#memberVehicleSelect')) { const vehicleLabel = document.createElement('label'); vehicleLabel.innerHTML = 'Kendaraan member<select id="memberVehicleSelect"><option value="">Pilih member terlebih dahulu</option></select>'; memberSelect.parentElement.after(vehicleLabel); }
  const plateLabel = $('#plateInput')?.parentElement;
  if (plateLabel && !$('#lookupMemberButton')) {
    plateLabel.insertAdjacentHTML('beforeend', '<div class="plate-lookup"><button id="lookupMemberButton" class="secondary-button compact" type="button">Cari member dari plat</button><span id="memberLookupNote" class="lookup-note">Opsional untuk member terdaftar</span></div>');
  }
  $('#memberSelect')?.addEventListener('change', (event) => loadMemberVehicles(event.target.value));
  $('#memberVehicleSelect')?.addEventListener('change', (event) => { const option = event.target.selectedOptions[0]; if (option?.dataset.plate) $('#plateInput').value = option.dataset.plate; if ($('#vehicleSelect')) $('#vehicleSelect').value = option?.dataset.master || ''; updateRecommendation(); });
  $('#lookupMemberButton')?.addEventListener('click', findMemberByPlate);
  $('#plateInput')?.addEventListener('input', () => { if ($('#memberLookupNote')) $('#memberLookupNote').textContent = 'Opsional untuk member terdaftar'; });
  $$('.nav-item').forEach((button) => button.addEventListener('click', () => showPage(button.dataset.page)));
  $$('[data-page-jump]').forEach((button) => button.addEventListener('click', () => showPage(button.dataset.pageJump)));
  $('#vehicleSelect').addEventListener('change', updateRecommendation);
  $('#serviceSelect').addEventListener('change', updateRecommendation);
  $('#conditionSelect').addEventListener('change', updateRecommendation);
  $('#finalPriceInput').addEventListener('input', () => { $('#finalPriceInput').dataset.edited = 'true'; });
  $('#transactionSearchInput').addEventListener('input', renderTransactions);
  $('#transactionStatusFilter').addEventListener('change', renderTransactions);
  $('#transactionTableBody').addEventListener('click', (event) => { const button = event.target.closest('[data-transaction-id]'); if (button) selectTransaction(button.dataset.transactionId); });
  $('#amountReceived').addEventListener('input', updateChangeAmount);
  $$('[data-status-action]').forEach((button) => button.addEventListener('click', () => updateTransactionStatus(button.dataset.statusAction)));
  $('#paymentButton').addEventListener('click', savePayment);
  $('#memberForm')?.addEventListener('submit', saveMember);
  $('#memberVehicleForm')?.addEventListener('submit', saveMemberVehicle);
  $('#memberSearchInput')?.addEventListener('input', renderMemberTable);
  $('#printReceiptButton').addEventListener('click', printReceipt);
  $('#applyReportButton').addEventListener('click', renderReport);
  $('#exportReportButton').addEventListener('click', exportReportCsv);
  $('#refreshTransactionsButton').addEventListener('click', async () => {
    try {
      await loadTransactions();
      showToast('Daftar transaksi diperbarui.', 'info');
    } catch (error) {
      showToast(error.message || 'Gagal memuat transaksi.', 'error');
    }
  });
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
  $('#transactionForm').addEventListener('submit', saveTransaction);
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
