/**
 * nhan-vien.js — Employee Management Page
 * Tab 1: Phân công nhân sự (Staff Assignment)
 * Tab 2: Tài khoản nhân viên (Employee Accounts)
 */
(function () {
  'use strict';

  /* ================================================================
     1. MOCK DATA
     ================================================================ */
  const EMPLOYEES = [
    { id: 'NV-001', name: 'Nguyễn Văn An',     phone: '0901 234 567', role: 'Tài xế',            assigned: 'Tuyến Hà Nội → Hải Phòng' },
    { id: 'NV-002', name: 'Trần Thị Bích',     phone: '0912 345 678', role: 'Phụ xe',             assigned: '' },
    { id: 'NV-003', name: 'Lê Hoàng Cường',    phone: '0923 456 789', role: 'Tài xế',            assigned: 'Tuyến TP.HCM → Đà Lạt' },
    { id: 'NV-004', name: 'Phạm Minh Đức',     phone: '0934 567 890', role: 'Phụ xe',            assigned: 'Tuyến Hà Nội → Hải Phòng' },
    { id: 'NV-005', name: 'Võ Thị Em',         phone: '0945 678 901', role: 'Quản lý',            assigned: 'Bến xe Miền Đông' },
    { id: 'NV-006', name: 'Hoàng Văn Phúc',    phone: '0956 789 012', role: 'Tài xế',            assigned: '' },
    { id: 'NV-007', name: 'Đỗ Thị Giang',      phone: '0967 890 123', role: 'Quản lý',            assigned: 'Bến xe Mỹ Đình' },
    { id: 'NV-008', name: 'Bùi Quang Huy',     phone: '0978 901 234', role: 'Phụ xe',            assigned: 'Tuyến Đà Nẵng → Huế' },
    { id: 'NV-009', name: 'Ngô Thanh Lan',     phone: '0989 012 345', role: 'Tài xế',            assigned: 'Tuyến TP.HCM → Nha Trang' },
    { id: 'NV-010', name: 'Phan Văn Khoa',     phone: '0990 123 456', role: 'Tài xế',             assigned: '' },
  ];

  const ACCOUNTS = [
    { empId: 'NV-001', username: 'nguyenvanan',    status: 'active',  lastLogin: '05/10/2026 08:30' },
    { empId: 'NV-002', username: 'tranthibich',    status: 'active',  lastLogin: '05/10/2026 09:15' },
    { empId: 'NV-003', username: 'lehoangcuong',   status: 'locked',  lastLogin: '01/10/2026 14:22' },
    { empId: 'NV-004', username: 'phammminhduc',   status: 'active',  lastLogin: '04/10/2026 16:45' },
    { empId: 'NV-005', username: 'vothiem',        status: 'active',  lastLogin: '05/10/2026 07:50' },
    { empId: 'NV-007', username: 'doThiGiang',     status: 'active',  lastLogin: '05/10/2026 10:00' },
    { empId: 'NV-009', username: 'ngothanhlan',    status: 'locked',  lastLogin: '28/09/2026 11:30' },
  ];

  const TRIPS = [
    'Tuyến Hà Nội → Hải Phòng',
    'Tuyến TP.HCM → Đà Lạt',
    'Tuyến Đà Nẵng → Huế',
    'Tuyến TP.HCM → Nha Trang',
    'Tuyến Hà Nội → Vinh',
    'Tuyến Hà Nội → Thanh Hóa',
    'Tuyến TP.HCM → Cần Thơ',
    'Tuyến TP.HCM → Vũng Tàu',
    'Tuyến Hà Nội → Lào Cai',
  ];

  const LOCATIONS = [
    'Bến xe Mỹ Đình',
    'Bến xe Giáp Bát',
    'Bến xe Miền Đông',
    'Bến xe Miền Tây',
    'Bến xe Đà Nẵng',
  ];

  /* ================================================================
     2. HELPERS
     ================================================================ */
  function getEmployeeById(id) {
    return EMPLOYEES.find(function (e) { return e.id === id; });
  }

  function getAccountByEmpId(empId) {
    return ACCOUNTS.find(function (a) { return a.empId === empId; });
  }

  function showToast(message, type) {
    var toast = document.getElementById('toast');
    if (!toast) return;
    var iconMap = {
      success: 'bi-check-circle-fill',
      danger:  'bi-x-circle-fill',
      warning: 'bi-exclamation-triangle-fill',
      info:    'bi-info-circle-fill',
    };
    toast.className = 'c-toast c-toast--' + (type || 'success');
    toast.innerHTML = '<i class="bi ' + (iconMap[type] || iconMap.success) + '"></i> ' + message;
    toast.classList.add('is-visible');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(function () {
      toast.classList.remove('is-visible');
    }, 3000);
  }

  /* ================================================================
     3. TAB SWITCHING
     ================================================================ */
  function initTabs() {
    var tabs = document.querySelectorAll('.js-page-tab');
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        var target = this.dataset.tab;

        // Toggle tab buttons
        tabs.forEach(function (t) { t.classList.remove('is-active'); });
        this.classList.add('is-active');

        // Toggle panels
        document.querySelectorAll('.c-tab-panel').forEach(function (p) {
          p.classList.remove('is-active');
        });
        document.getElementById(target).classList.add('is-active');
      });
    });
  }

  /* ================================================================
     4. TAB 1 — PHÂN CÔNG NHÂN SỰ
     ================================================================ */
  var assignFilterRole = '';
  var assignSearchTerm = '';

  function getFilteredEmployees() {
    return EMPLOYEES.filter(function (e) {
      var matchRole = !assignFilterRole || e.role === assignFilterRole;
      var matchSearch = !assignSearchTerm ||
        e.name.toLowerCase().indexOf(assignSearchTerm) !== -1 ||
        e.id.toLowerCase().indexOf(assignSearchTerm) !== -1 ||
        e.phone.replace(/\s/g, '').indexOf(assignSearchTerm.replace(/\s/g, '')) !== -1;
      return matchRole && matchSearch;
    });
  }

  function renderAssignmentTable() {
    var tbody = document.getElementById('assignTableBody');
    if (!tbody) return;

    var rows = getFilteredEmployees();
    var countEl = document.getElementById('assignCount');
    if (countEl) countEl.textContent = rows.length;

    if (rows.length === 0) {
      tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:40px 16px;color:var(--clr-text-secondary)"><i class="bi bi-inbox" style="font-size:32px;display:block;margin-bottom:8px;opacity:0.4"></i>Không tìm thấy nhân viên nào.</td></tr>';
      return;
    }

    tbody.innerHTML = rows.map(function (emp) {
      var assignLabel = emp.assigned
        ? '<span class="c-badge c-badge--success"><i class="bi bi-check-circle-fill"></i> ' + emp.assigned + '</span>'
        : '<span class="c-badge c-badge--warning"><i class="bi bi-clock-fill"></i> Chưa phân công</span>';

      return '<tr>' +
        '<td><strong>' + emp.id + '</strong></td>' +
        '<td>' + emp.name + '</td>' +
        '<td>' + emp.phone + '</td>' +
        '<td>' + emp.role + '</td>' +
        '<td>' + assignLabel + '</td>' +
        '<td class="cell-actions" style="text-align:center">' +
          '<button class="c-btn c-btn--primary c-btn--sm js-assign-btn" data-id="' + emp.id + '">' +
            '<i class="bi bi-person-check"></i> Phân công' +
          '</button>' +
        '</td>' +
      '</tr>';
    }).join('');

    // Attach assign button events
    tbody.querySelectorAll('.js-assign-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        openAssignModal(this.dataset.id);
      });
    });
  }

  function initAssignFilters() {
    var searchInput = document.getElementById('assignSearch');
    var roleSelect  = document.getElementById('assignRoleFilter');

    if (searchInput) {
      searchInput.addEventListener('input', function () {
        assignSearchTerm = this.value.toLowerCase().trim();
        renderAssignmentTable();
      });
    }
    if (roleSelect) {
      roleSelect.addEventListener('change', function () {
        assignFilterRole = this.value;
        renderAssignmentTable();
      });
    }
  }

  /* ---- Assignment Modal ---- */
  function openAssignModal(empId) {
    var emp = getEmployeeById(empId);
    if (!emp) return;

    document.getElementById('assignModalTitle').textContent = 'Phân công — ' + emp.name;
    document.getElementById('assignEmpId').value   = emp.id;
    document.getElementById('assignEmpName').value = emp.name;
    document.getElementById('assignEmpRole').value = emp.role;

    // Populate trip dropdown
    var tripSelect = document.getElementById('assignTrip');
    tripSelect.innerHTML = '<option value="">— Chọn tuyến / bến xe —</option>';

    if (emp.role === 'Tài xế' || emp.role === 'Phụ xe') {
      TRIPS.forEach(function (t) {
        var sel = t === emp.assigned ? ' selected' : '';
        tripSelect.innerHTML += '<option value="' + t + '"' + sel + '>' + t + '</option>';
      });
    } else {
      LOCATIONS.forEach(function (l) {
        var sel = l === emp.assigned ? ' selected' : '';
        tripSelect.innerHTML += '<option value="' + l + '"' + sel + '>' + l + '</option>';
      });
    }

    // Notes
    document.getElementById('assignNotes').value = '';

    openModal('assignModal');
  }

  function saveAssignment() {
    var empId = document.getElementById('assignEmpId').value;
    var trip  = document.getElementById('assignTrip').value;
    var notes = document.getElementById('assignNotes').value;

    if (!trip) {
      showToast('Vui lòng chọn tuyến xe / bến xe để phân công.', 'warning');
      return;
    }

    // Update mock data
    var emp = getEmployeeById(empId);
    if (emp) emp.assigned = trip;

    closeModal('assignModal');
    renderAssignmentTable();
    showToast('Đã phân công ' + emp.name + ' thành công!', 'success');
  }

  /* ================================================================
     5. TAB 2 — TÀI KHOẢN NHÂN VIÊN
     ================================================================ */
  var accSearchTerm = '';
  var accFilterStatus = '';

  function getFilteredAccounts() {
    return ACCOUNTS.filter(function (a) {
      var emp = getEmployeeById(a.empId);
      var empName = emp ? emp.name.toLowerCase() : '';
      var matchSearch = !accSearchTerm ||
        empName.indexOf(accSearchTerm) !== -1 ||
        a.username.toLowerCase().indexOf(accSearchTerm) !== -1 ||
        a.empId.toLowerCase().indexOf(accSearchTerm) !== -1;
      var matchStatus = !accFilterStatus || a.status === accFilterStatus;
      return matchSearch && matchStatus;
    });
  }

  function renderAccountsTable() {
    var tbody = document.getElementById('accountTableBody');
    if (!tbody) return;

    var rows = getFilteredAccounts();
    var countEl = document.getElementById('accountCount');
    if (countEl) countEl.textContent = rows.length;

    if (rows.length === 0) {
      tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:40px 16px;color:var(--clr-text-secondary)"><i class="bi bi-inbox" style="font-size:32px;display:block;margin-bottom:8px;opacity:0.4"></i>Không tìm thấy tài khoản nào.</td></tr>';
      return;
    }

    tbody.innerHTML = rows.map(function (acc) {
      var emp = getEmployeeById(acc.empId);
      var empName = emp ? emp.name : '—';
      var isActive = acc.status === 'active';
      var statusBadge = isActive
        ? '<span class="c-badge c-badge--success"><i class="bi bi-check-circle-fill"></i> Hoạt động</span>'
        : '<span class="c-badge c-badge--danger"><i class="bi bi-lock-fill"></i> Khóa</span>';
      var toggleLabel = isActive ? 'Khóa' : 'Mở khóa';
      var toggleIcon  = isActive ? 'bi-lock' : 'bi-unlock';
      var toggleClass = isActive ? 'c-btn--danger' : 'c-btn--success';

      return '<tr>' +
        '<td><strong>' + acc.empId + '</strong></td>' +
        '<td>' + empName + '</td>' +
        '<td><code>' + acc.username + '</code></td>' +
        '<td>' + statusBadge + '</td>' +
        '<td>' + acc.lastLogin + '</td>' +
        '<td class="cell-actions" style="text-align:center">' +
          '<button class="c-btn c-btn--ghost c-btn--icon c-btn--sm js-edit-acc-btn" data-empid="' + acc.empId + '" title="Cập nhật"><i class="bi bi-pencil"></i></button> ' +
          '<button class="c-btn ' + toggleClass + ' c-btn--sm js-toggle-acc-btn" data-empid="' + acc.empId + '" data-action="' + (isActive ? 'lock' : 'unlock') + '">' +
            '<i class="bi ' + toggleIcon + '"></i> ' + toggleLabel +
          '</button>' +
        '</td>' +
      '</tr>';
    }).join('');

    // Edit buttons
    tbody.querySelectorAll('.js-edit-acc-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        openEditAccountModal(this.dataset.empid);
      });
    });

    // Lock/Unlock buttons
    tbody.querySelectorAll('.js-toggle-acc-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        openToggleConfirm(this.dataset.empid, this.dataset.action);
      });
    });
  }

  function initAccountFilters() {
    var searchInput  = document.getElementById('accSearch');
    var statusSelect = document.getElementById('accStatusFilter');

    if (searchInput) {
      searchInput.addEventListener('input', function () {
        accSearchTerm = this.value.toLowerCase().trim();
        renderAccountsTable();
      });
    }
    if (statusSelect) {
      statusSelect.addEventListener('change', function () {
        accFilterStatus = this.value;
        renderAccountsTable();
      });
    }
  }

  /* ---- Add Account Modal ---- */
  function openAddAccountModal() {
    document.getElementById('accModalTitle').textContent = 'Thêm tài khoản mới';
    document.getElementById('accModalSaveBtn').textContent = ' Tạo tài khoản';

    // Populate employee dropdown (those without accounts)
    var empSelect = document.getElementById('accEmpSelect');
    empSelect.innerHTML = '<option value="">— Chọn nhân viên —</option>';
    empSelect.disabled = false;

    EMPLOYEES.forEach(function (emp) {
      var hasAcc = ACCOUNTS.some(function (a) { return a.empId === emp.id; });
      if (!hasAcc) {
        empSelect.innerHTML += '<option value="' + emp.id + '">' + emp.id + ' — ' + emp.name + '</option>';
      }
    });

    document.getElementById('accUsername').value = '';
    document.getElementById('accPassword').value = '';
    document.getElementById('accPassword').placeholder = 'Nhập mật khẩu...';
    document.getElementById('accModalMode').value = 'add';
    document.getElementById('accEditEmpId').value = '';

    openModal('accountModal');
  }

  /* ---- Edit Account Modal ---- */
  function openEditAccountModal(empId) {
    var acc = getAccountByEmpId(empId);
    var emp = getEmployeeById(empId);
    if (!acc || !emp) return;

    document.getElementById('accModalTitle').textContent = 'Cập nhật tài khoản — ' + emp.name;
    document.getElementById('accModalSaveBtn').innerHTML = '<i class="bi bi-check-lg"></i> Cập nhật';

    var empSelect = document.getElementById('accEmpSelect');
    empSelect.innerHTML = '<option value="' + emp.id + '">' + emp.id + ' — ' + emp.name + '</option>';
    empSelect.disabled = true;

    document.getElementById('accUsername').value = acc.username;
    document.getElementById('accPassword').value = '';
    document.getElementById('accPassword').placeholder = 'Để trống nếu không đổi...';
    document.getElementById('accModalMode').value = 'edit';
    document.getElementById('accEditEmpId').value = empId;

    openModal('accountModal');
  }

  function saveAccount() {
    var mode     = document.getElementById('accModalMode').value;
    var empId    = mode === 'edit'
      ? document.getElementById('accEditEmpId').value
      : document.getElementById('accEmpSelect').value;
    var username = document.getElementById('accUsername').value.trim();
    var password = document.getElementById('accPassword').value.trim();

    if (!empId) {
      showToast('Vui lòng chọn nhân viên.', 'warning');
      return;
    }
    if (!username) {
      showToast('Vui lòng nhập tên đăng nhập.', 'warning');
      return;
    }
    if (mode === 'add' && !password) {
      showToast('Vui lòng nhập mật khẩu.', 'warning');
      return;
    }

    if (mode === 'add') {
      ACCOUNTS.push({
        empId: empId,
        username: username,
        status: 'active',
        lastLogin: '—',
      });
      showToast('Đã tạo tài khoản thành công!', 'success');
    } else {
      var acc = getAccountByEmpId(empId);
      if (acc) {
        acc.username = username;
      }
      showToast('Đã cập nhật tài khoản thành công!', 'success');
    }

    closeModal('accountModal');
    renderAccountsTable();

    // Update tab count
    var countEl = document.getElementById('accountCount');
    if (countEl) countEl.textContent = ACCOUNTS.length;
  }

  /* ---- Lock/Unlock Confirm ---- */
  var pendingToggle = { empId: '', action: '' };

  function openToggleConfirm(empId, action) {
    var emp = getEmployeeById(empId);
    if (!emp) return;
    pendingToggle = { empId: empId, action: action };

    var isLock = action === 'lock';
    var icon  = document.getElementById('confirmIcon');
    var title = document.getElementById('confirmText');
    var sub   = document.getElementById('confirmSubtext');
    var btn   = document.getElementById('confirmActionBtn');

    icon.className = 'c-confirm-icon ' + (isLock ? 'c-confirm-icon--danger' : 'c-confirm-icon--success');
    icon.innerHTML = '<i class="bi ' + (isLock ? 'bi-lock-fill' : 'bi-unlock-fill') + '"></i>';

    title.textContent = (isLock ? 'Khóa' : 'Mở khóa') + ' tài khoản ' + emp.name + '?';
    sub.textContent = isLock
      ? 'Nhân viên sẽ không thể đăng nhập vào hệ thống sau khi bị khóa.'
      : 'Nhân viên sẽ có thể đăng nhập lại vào hệ thống.';

    btn.className = 'c-btn ' + (isLock ? 'c-btn--danger' : 'c-btn--success');
    btn.innerHTML = '<i class="bi ' + (isLock ? 'bi-lock' : 'bi-unlock') + '"></i> ' + (isLock ? 'Khóa tài khoản' : 'Mở khóa');

    openModal('confirmModal');
  }

  function confirmToggleAccount() {
    var acc = getAccountByEmpId(pendingToggle.empId);
    var emp = getEmployeeById(pendingToggle.empId);
    if (!acc) return;

    acc.status = pendingToggle.action === 'lock' ? 'locked' : 'active';

    closeModal('confirmModal');
    renderAccountsTable();

    var msg = pendingToggle.action === 'lock'
      ? 'Đã khóa tài khoản ' + (emp ? emp.name : '') + '.'
      : 'Đã mở khóa tài khoản ' + (emp ? emp.name : '') + '.';
    showToast(msg, pendingToggle.action === 'lock' ? 'danger' : 'success');
  }

  /* ================================================================
     6. MODAL HELPERS
     ================================================================ */
  function openModal(id) {
    var el = document.getElementById(id);
    if (el) {
      el.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModal(id) {
    var el = document.getElementById(id);
    if (el) {
      el.classList.remove('is-open');
      document.body.style.overflow = '';
    }
  }

  // Close on overlay click
  document.querySelectorAll('.c-modal-overlay').forEach(function (overlay) {
    overlay.addEventListener('click', function (e) {
      if (e.target === this) {
        this.classList.remove('is-open');
        document.body.style.overflow = '';
      }
    });
  });

  // Close on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      document.querySelectorAll('.c-modal-overlay.is-open').forEach(function (m) {
        m.classList.remove('is-open');
      });
      document.body.style.overflow = '';
    }
  });

  /* ================================================================
     7. GLOBAL EVENT BINDINGS
     ================================================================ */
  // Expose to inline onclick handlers
  window.openAddAccountModal   = openAddAccountModal;
  window.saveAssignment        = saveAssignment;
  window.saveAccount           = saveAccount;
  window.confirmToggleAccount  = confirmToggleAccount;
  window.openModal             = openModal;
  window.closeModal            = closeModal;

  /* ================================================================
     8. INIT
     ================================================================ */
  document.addEventListener('DOMContentLoaded', function () {
    initTabs();

    // Tab 1
    renderAssignmentTable();
    initAssignFilters();

    // Tab 2
    renderAccountsTable();
    initAccountFilters();
  });
})();
