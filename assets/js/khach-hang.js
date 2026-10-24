/**
 * khach-hang.js — Customer Management Page
 * Search, filter, customer table, detail drawer with booking history
 */
(function () {
  'use strict';

  /* ================================================================
     1. MOCK DATA
     ================================================================ */
  const CUSTOMERS = [
    { id: 'KH-001', name: 'Nguyễn Văn An',    phone: '0901 234 567', email: 'an.nguyen@gmail.com',    gender: 'Nam',  dob: '15/03/1990', address: '12 Trần Phú, Hà Nội',         joined: '12/01/2026' },
    { id: 'KH-002', name: 'Trần Thị Bích',    phone: '0912 345 678', email: 'bich.tran@gmail.com',    gender: 'Nữ',   dob: '22/07/1995', address: '45 Nguyễn Huệ, TP.HCM',       joined: '18/02/2026' },
    { id: 'KH-003', name: 'Lê Hoàng Cường',   phone: '0923 456 789', email: 'cuong.le@yahoo.com',     gender: 'Nam',  dob: '08/11/1988', address: '78 Lê Lợi, Đà Nẵng',           joined: '05/03/2026' },
    { id: 'KH-004', name: 'Phạm Minh Đức',    phone: '0934 567 890', email: 'duc.pham@outlook.com',   gender: 'Nam',  dob: '30/05/1992', address: '23 Hùng Vương, Huế',           joined: '22/03/2026' },
    { id: 'KH-005', name: 'Võ Thị Em',        phone: '0945 678 901', email: 'em.vo@gmail.com',        gender: 'Nữ',   dob: '14/09/1997', address: '56 Phan Đình Phùng, Nha Trang', joined: '10/04/2026' },
    { id: 'KH-006', name: 'Hoàng Văn Phúc',   phone: '0956 789 012', email: 'phuc.hoang@gmail.com',   gender: 'Nam',  dob: '03/12/1985', address: '89 Bà Triệu, Hà Nội',          joined: '28/04/2026' },
    { id: 'KH-007', name: 'Đỗ Thị Giang',     phone: '0967 890 123', email: 'giang.do@gmail.com',     gender: 'Nữ',   dob: '19/01/1993', address: '34 Điện Biên Phủ, TP.HCM',     joined: '15/05/2026' },
    { id: 'KH-008', name: 'Bùi Quang Huy',    phone: '0978 901 234', email: 'huy.bui@gmail.com',      gender: 'Nam',  dob: '27/06/1991', address: '67 Trưng Trắc, Cần Thơ',       joined: '03/06/2026' },
    { id: 'KH-009', name: 'Ngô Thanh Lan',    phone: '0989 012 345', email: 'lan.ngo@yahoo.com',      gender: 'Nữ',   dob: '11/04/1996', address: '90 Lý Thường Kiệt, Đà Lạt',   joined: '20/07/2026' },
    { id: 'KH-010', name: 'Phan Văn Khoa',    phone: '0990 123 456', email: 'khoa.phan@gmail.com',    gender: 'Nam',  dob: '06/08/1989', address: '15 Nguyễn Trãi, Vũng Tàu',     joined: '08/08/2026' },
    { id: 'KH-011', name: 'Lý Thị Mận',       phone: '0901 111 222', email: 'man.ly@gmail.com',       gender: 'Nữ',   dob: '25/02/1994', address: '41 Hai Bà Trưng, Hà Nội',      joined: '14/08/2026' },
    { id: 'KH-012', name: 'Dương Quốc Nam',   phone: '0912 222 333', email: 'nam.duong@outlook.com',  gender: 'Nam',  dob: '17/10/1987', address: '73 Võ Văn Tần, TP.HCM',        joined: '01/09/2026' },
  ];

  const BOOKINGS = [
    { customerId: 'KH-001', ticketId: 'VE-0901-001', trip: 'Hà Nội → Hải Phòng',    date: '01/09/2026', departure: '06:00', seat: 'A3',  price: 150000,  status: 'paid' },
    { customerId: 'KH-001', ticketId: 'VE-0915-012', trip: 'Hải Phòng → Hà Nội',    date: '15/09/2026', departure: '14:30', seat: 'B1',  price: 150000,  status: 'paid' },
    { customerId: 'KH-001', ticketId: 'VE-1005-001', trip: 'Hà Nội → Hải Phòng',    date: '05/10/2026', departure: '07:00', seat: 'A5',  price: 150000,  status: 'confirmed' },
    { customerId: 'KH-002', ticketId: 'VE-0820-005', trip: 'TP.HCM → Đà Lạt',       date: '20/08/2026', departure: '08:00', seat: 'C2',  price: 280000,  status: 'paid' },
    { customerId: 'KH-002', ticketId: 'VE-1005-002', trip: 'TP.HCM → Đà Lạt',       date: '05/10/2026', departure: '22:00', seat: 'A1',  price: 280000,  status: 'pending' },
    { customerId: 'KH-003', ticketId: 'VE-0710-008', trip: 'Đà Nẵng → Huế',          date: '10/07/2026', departure: '09:00', seat: 'B4',  price: 120000,  status: 'paid' },
    { customerId: 'KH-003', ticketId: 'VE-0905-003', trip: 'Huế → Đà Nẵng',          date: '05/09/2026', departure: '15:00', seat: 'A2',  price: 120000,  status: 'cancelled' },
    { customerId: 'KH-003', ticketId: 'VE-1005-003', trip: 'Đà Nẵng → Huế',          date: '05/10/2026', departure: '10:30', seat: 'C1',  price: 120000,  status: 'paid' },
    { customerId: 'KH-003', ticketId: 'VE-1010-019', trip: 'Đà Nẵng → Quảng Ngãi',   date: '10/10/2026', departure: '06:30', seat: 'B2',  price: 95000,   status: 'confirmed' },
    { customerId: 'KH-004', ticketId: 'VE-0930-007', trip: 'Hà Nội → Vinh',           date: '30/09/2026', departure: '05:30', seat: 'A4',  price: 220000,  status: 'cancelled' },
    { customerId: 'KH-005', ticketId: 'VE-0825-009', trip: 'TP.HCM → Nha Trang',     date: '25/08/2026', departure: '20:00', seat: 'B3',  price: 350000,  status: 'paid' },
    { customerId: 'KH-005', ticketId: 'VE-1008-011', trip: 'Nha Trang → TP.HCM',     date: '08/10/2026', departure: '21:00', seat: 'A6',  price: 350000,  status: 'pending' },
    { customerId: 'KH-006', ticketId: 'VE-0815-002', trip: 'Hà Nội → Thanh Hóa',     date: '15/08/2026', departure: '07:00', seat: 'C3',  price: 180000,  status: 'paid' },
    { customerId: 'KH-006', ticketId: 'VE-0920-014', trip: 'Thanh Hóa → Hà Nội',     date: '20/09/2026', departure: '13:00', seat: 'B5',  price: 180000,  status: 'paid' },
    { customerId: 'KH-006', ticketId: 'VE-1003-016', trip: 'Hà Nội → Lào Cai',        date: '03/10/2026', departure: '19:30', seat: 'A1',  price: 320000,  status: 'paid' },
    { customerId: 'KH-007', ticketId: 'VE-0901-010', trip: 'TP.HCM → Cần Thơ',       date: '01/09/2026', departure: '08:30', seat: 'B2',  price: 160000,  status: 'paid' },
    { customerId: 'KH-008', ticketId: 'VE-0910-006', trip: 'Cần Thơ → TP.HCM',       date: '10/09/2026', departure: '16:00', seat: 'A3',  price: 160000,  status: 'paid' },
    { customerId: 'KH-008', ticketId: 'VE-1001-018', trip: 'TP.HCM → Cần Thơ',       date: '01/10/2026', departure: '09:00', seat: 'C4',  price: 160000,  status: 'paid' },
    { customerId: 'KH-009', ticketId: 'VE-1005-009', trip: 'Hà Nội → Lào Cai',        date: '05/10/2026', departure: '20:00', seat: 'B1',  price: 320000,  status: 'pending' },
    { customerId: 'KH-010', ticketId: 'VE-0905-015', trip: 'TP.HCM → Vũng Tàu',      date: '05/09/2026', departure: '10:00', seat: 'A2',  price: 120000,  status: 'paid' },
    { customerId: 'KH-010', ticketId: 'VE-1005-010', trip: 'TP.HCM → Vũng Tàu',      date: '05/10/2026', departure: '11:00', seat: 'B4',  price: 120000,  status: 'cancelled' },
    { customerId: 'KH-011', ticketId: 'VE-0928-020', trip: 'Hà Nội → Hải Phòng',     date: '28/09/2026', departure: '06:30', seat: 'A1',  price: 150000,  status: 'paid' },
    { customerId: 'KH-012', ticketId: 'VE-1002-021', trip: 'TP.HCM → Đà Lạt',        date: '02/10/2026', departure: '23:00', seat: 'C2',  price: 280000,  status: 'paid' },
    { customerId: 'KH-012', ticketId: 'VE-1004-022', trip: 'Đà Lạt → TP.HCM',        date: '04/10/2026', departure: '08:00', seat: 'B3',  price: 280000,  status: 'paid' },
    { customerId: 'KH-012', ticketId: 'VE-1012-023', trip: 'TP.HCM → Nha Trang',     date: '12/10/2026', departure: '21:30', seat: 'A4',  price: 350000,  status: 'confirmed' },
  ];

  const STATUS_MAP = {
    pending:   { label: 'Chờ xác nhận',  badge: 'c-badge--warning', icon: 'bi-clock-fill' },
    confirmed: { label: 'Đã xác nhận',   badge: 'c-badge--info',    icon: 'bi-check-circle-fill' },
    paid:      { label: 'Đã thanh toán', badge: 'c-badge--success', icon: 'bi-check-circle-fill' },
    cancelled: { label: 'Đã hủy',        badge: 'c-badge--danger',  icon: 'bi-x-circle-fill' },
  };

  /* ================================================================
     2. HELPERS
     ================================================================ */
  function getBookingsForCustomer(customerId) {
    return BOOKINGS.filter(function (b) { return b.customerId === customerId; });
  }

  function getBookingCount(customerId) {
    return getBookingsForCustomer(customerId).length;
  }

  function getTotalSpent(customerId) {
    return getBookingsForCustomer(customerId).reduce(function (sum, b) {
      return b.status !== 'cancelled' ? sum + b.price : sum;
    }, 0);
  }

  function formatCurrency(num) {
    return num.toLocaleString('vi-VN') + 'đ';
  }

  function getInitials(name) {
    var parts = name.trim().split(/\s+/);
    if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    return name.substring(0, 2).toUpperCase();
  }

  var AVATAR_COLORS = ['#1976D2', '#2E7D32', '#F57C00', '#D32F2F', '#7B1FA2', '#0288D1', '#00838F', '#4E342E', '#455A64', '#C62828', '#1565C0', '#6A1B9A'];

  function getAvatarColor(index) {
    return AVATAR_COLORS[index % AVATAR_COLORS.length];
  }

  function showToast(message, type) {
    var toast = document.getElementById('toast');
    if (!toast) return;
    var iconMap = { success: 'bi-check-circle-fill', danger: 'bi-x-circle-fill', warning: 'bi-exclamation-triangle-fill', info: 'bi-info-circle-fill' };
    toast.className = 'c-toast c-toast--' + (type || 'info');
    toast.innerHTML = '<i class="bi ' + (iconMap[type] || iconMap.info) + '"></i> ' + message;
    toast.classList.add('is-visible');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(function () { toast.classList.remove('is-visible'); }, 3000);
  }

  /* ================================================================
     3. CUSTOMER TABLE
     ================================================================ */
  var searchTerm = '';
  var currentPage = 1;
  var rowsPerPage = 10;

  function getFilteredCustomers() {
    return CUSTOMERS.filter(function (c) {
      if (!searchTerm) return true;
      var q = searchTerm;
      return c.name.toLowerCase().indexOf(q) !== -1 ||
        c.id.toLowerCase().indexOf(q) !== -1 ||
        c.phone.replace(/\s/g, '').indexOf(q.replace(/\s/g, '')) !== -1 ||
        c.email.toLowerCase().indexOf(q) !== -1;
    });
  }

  function renderCustomerTable() {
    var tbody = document.getElementById('customerTableBody');
    if (!tbody) return;

    var filtered = getFilteredCustomers();
    var totalPages = Math.max(1, Math.ceil(filtered.length / rowsPerPage));
    if (currentPage > totalPages) currentPage = totalPages;

    var start = (currentPage - 1) * rowsPerPage;
    var paged = filtered.slice(start, start + rowsPerPage);

    // Summary
    document.getElementById('tableSummary').textContent =
      'Hiển thị ' + (filtered.length ? start + 1 : 0) + '–' + Math.min(start + rowsPerPage, filtered.length) + ' / ' + filtered.length + ' khách hàng';

    if (paged.length === 0) {
      tbody.innerHTML = '<tr><td colspan="7" class="empty-state">' +
        '<i class="bi bi-person-slash"></i>' +
        '<span>Không tìm thấy khách hàng nào.</span>' +
        '</td></tr>';
      renderPagination(0, 0);
      return;
    }

    tbody.innerHTML = paged.map(function (c, i) {
      var idx = CUSTOMERS.indexOf(c);
      var count = getBookingCount(c.id);
      var color = getAvatarColor(idx);

      return '<tr>' +
        '<td><strong>' + c.id + '</strong></td>' +
        '<td>' +
          '<div class="customer-name">' +
            '<span class="avatar-sm" style="background:' + color + '">' + getInitials(c.name) + '</span>' +
            '<span>' + c.name + '</span>' +
          '</div>' +
        '</td>' +
        '<td>' + c.phone + '</td>' +
        '<td><a href="mailto:' + c.email + '" class="email-link">' + c.email + '</a></td>' +
        '<td><span class="ticket-count">' + count + ' vé</span></td>' +
        '<td class="cell-actions" style="text-align:center">' +
          '<button class="c-btn c-btn--primary c-btn--sm js-detail-btn" data-id="' + c.id + '">' +
            '<i class="bi bi-eye"></i> Xem chi tiết' +
          '</button>' +
        '</td>' +
      '</tr>';
    }).join('');

    // Attach events
    tbody.querySelectorAll('.js-detail-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        openDetailDrawer(this.dataset.id);
      });
    });

    renderPagination(currentPage, totalPages);
  }

  /* ================================================================
     4. PAGINATION
     ================================================================ */
  function renderPagination(current, total) {
    var nav = document.getElementById('paginationNav');
    if (!nav) return;

    if (total <= 1) {
      nav.innerHTML = '';
      return;
    }

    var html = '';
    // Prev
    html += '<button class="c-pagination-btn js-page-btn" data-page="' + (current - 1) + '"' + (current <= 1 ? ' disabled' : '') + '><i class="bi bi-chevron-left"></i></button>';

    // Page numbers
    for (var p = 1; p <= total; p++) {
      if (total > 7) {
        if (p === 1 || p === total || (p >= current - 1 && p <= current + 1)) {
          html += '<button class="c-pagination-btn js-page-btn' + (p === current ? ' is-active' : '') + '" data-page="' + p + '">' + p + '</button>';
        } else if (p === current - 2 || p === current + 2) {
          html += '<span style="padding:0 4px;color:var(--clr-text-secondary)">…</span>';
        }
      } else {
        html += '<button class="c-pagination-btn js-page-btn' + (p === current ? ' is-active' : '') + '" data-page="' + p + '">' + p + '</button>';
      }
    }

    // Next
    html += '<button class="c-pagination-btn js-page-btn" data-page="' + (current + 1) + '"' + (current >= total ? ' disabled' : '') + '><i class="bi bi-chevron-right"></i></button>';

    nav.innerHTML = html;

    nav.querySelectorAll('.js-page-btn:not(:disabled)').forEach(function (btn) {
      btn.addEventListener('click', function () {
        currentPage = parseInt(this.dataset.page);
        renderCustomerTable();
      });
    });
  }

  /* ================================================================
     5. DETAIL DRAWER
     ================================================================ */
  function openDetailDrawer(customerId) {
    var customer = CUSTOMERS.find(function (c) { return c.id === customerId; });
    if (!customer) return;

    var idx = CUSTOMERS.indexOf(customer);
    var bookings = getBookingsForCustomer(customerId);
    var totalSpent = getTotalSpent(customerId);
    var color = getAvatarColor(idx);

    // Fill customer info
    document.getElementById('drawerAvatar').style.background = color;
    document.getElementById('drawerAvatar').textContent = getInitials(customer.name);
    document.getElementById('drawerName').textContent = customer.name;
    document.getElementById('drawerIdBadge').textContent = customer.id;

    var infoHTML =
      '<div class="info-row"><span class="info-label"><i class="bi bi-telephone-fill"></i> Điện thoại</span><span class="info-value">' + customer.phone + '</span></div>' +
      '<div class="info-row"><span class="info-label"><i class="bi bi-envelope-fill"></i> Email</span><span class="info-value">' + customer.email + '</span></div>' +
      '<div class="info-row"><span class="info-label"><i class="bi bi-gender-ambiguous"></i> Giới tính</span><span class="info-value">' + customer.gender + '</span></div>' +
      '<div class="info-row"><span class="info-label"><i class="bi bi-cake2-fill"></i> Ngày sinh</span><span class="info-value">' + customer.dob + '</span></div>' +
      '<div class="info-row"><span class="info-label"><i class="bi bi-geo-alt-fill"></i> Địa chỉ</span><span class="info-value">' + customer.address + '</span></div>' +
      '<div class="info-row"><span class="info-label"><i class="bi bi-calendar-check-fill"></i> Ngày tham gia</span><span class="info-value">' + customer.joined + '</span></div>';
    document.getElementById('drawerInfo').innerHTML = infoHTML;

    // Stats
    document.getElementById('drawerStatTickets').textContent = bookings.length;
    document.getElementById('drawerStatSpent').textContent = formatCurrency(totalSpent);
    var cancelledCount = bookings.filter(function (b) { return b.status === 'cancelled'; }).length;
    document.getElementById('drawerStatCancelled').textContent = cancelledCount;

    // Booking history
    var historyHTML = '';
    if (bookings.length === 0) {
      historyHTML = '<div class="history-empty"><i class="bi bi-ticket-perforated"></i><p>Chưa có lịch sử đặt vé.</p></div>';
    } else {
      historyHTML = bookings.map(function (b) {
        var st = STATUS_MAP[b.status] || STATUS_MAP.pending;
        return '<div class="history-card">' +
          '<div class="history-card-top">' +
            '<span class="history-ticket-id"><i class="bi bi-ticket-perforated-fill"></i> ' + b.ticketId + '</span>' +
            '<span class="c-badge ' + st.badge + '"><i class="bi ' + st.icon + '"></i> ' + st.label + '</span>' +
          '</div>' +
          '<div class="history-card-body">' +
            '<div class="history-trip"><i class="bi bi-signpost-split"></i> ' + b.trip + '</div>' +
            '<div class="history-meta">' +
              '<span><i class="bi bi-calendar3"></i> ' + b.date + '</span>' +
              '<span><i class="bi bi-clock"></i> ' + b.departure + '</span>' +
              '<span><i class="bi bi-person-workspace"></i> Ghế ' + b.seat + '</span>' +
              '<span class="history-price"><i class="bi bi-cash-stack"></i> ' + formatCurrency(b.price) + '</span>' +
            '</div>' +
          '</div>' +
        '</div>';
      }).join('');
    }
    document.getElementById('drawerHistory').innerHTML = historyHTML;

    // Show drawer
    var drawer = document.getElementById('detailDrawer');
    var overlay = document.getElementById('drawerOverlay');
    drawer.classList.add('is-open');
    overlay.classList.add('is-visible');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    document.getElementById('detailDrawer').classList.remove('is-open');
    document.getElementById('drawerOverlay').classList.remove('is-visible');
    document.body.style.overflow = '';
  }

  /* ================================================================
     6. INIT
     ================================================================ */
  document.addEventListener('DOMContentLoaded', function () {
    renderCustomerTable();

    // Search
    var searchInput = document.getElementById('customerSearch');
    if (searchInput) {
      searchInput.addEventListener('input', function () {
        searchTerm = this.value.toLowerCase().trim();
        currentPage = 1;
        renderCustomerTable();
      });
    }

    // Rows per page
    var rppSelect = document.getElementById('rowsPerPage');
    if (rppSelect) {
      rppSelect.addEventListener('change', function () {
        rowsPerPage = parseInt(this.value);
        currentPage = 1;
        renderCustomerTable();
      });
    }

    // Drawer overlay close
    document.getElementById('drawerOverlay').addEventListener('click', closeDrawer);

    // Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeDrawer();
    });
  });

  // Expose
  window.closeDrawer = closeDrawer;
})();
