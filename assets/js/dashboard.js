/**
 * dashboard.js — KPI data, Charts (Chart.js), recent bookings table
 * Uses mock data; will be replaced with Firestore queries.
 */
(function () {
  'use strict';

  /* ================================================================
     1. MOCK DATA
     ================================================================ */
  const MOCK = {
    kpi: {
      revenue:    { value: 1285600000, trend: 12.5, direction: 'up' },
      tickets:    { value: 3842,       trend: 8.3,  direction: 'up' },
      trips:      { value: 256,        trend: -3.2, direction: 'down' },
      customers:  { value: 1520,       trend: 15.7, direction: 'up' },
    },

    revenueChart: {
      daily: {
        labels: ['28/09','29/09','30/09','01/10','02/10','03/10','04/10','05/10'],
        data:   [42000000, 38000000, 45000000, 52000000, 48000000, 55000000, 60000000, 53000000],
      },
      weekly: {
        labels: ['Tuần 36','Tuần 37','Tuần 38','Tuần 39','Tuần 40'],
        data:   [280000000, 310000000, 295000000, 340000000, 360000000],
      },
      monthly: {
        labels: ['T4/2026','T5/2026','T6/2026','T7/2026','T8/2026','T9/2026','T10/2026'],
        data:   [980000000,1050000000,1120000000,1280000000,1150000000,1340000000,1285600000],
      },
    },

    ticketStatus: {
      labels: ['Chờ xác nhận', 'Đã xác nhận', 'Đã thanh toán', 'Đã hủy'],
      data:   [245, 518, 2876, 203],
      colors: ['#F57C00', '#0288D1', '#2E7D32', '#D32F2F'],
    },

    recentBookings: [
      { id: 'VE-1005-001', customer: 'Nguyễn Văn An',     trip: 'Hà Nội → Hải Phòng',    status: 'paid',      date: '05/10/2026' },
      { id: 'VE-1005-002', customer: 'Trần Thị Bích',     trip: 'TP.HCM → Đà Lạt',       status: 'confirmed', date: '05/10/2026' },
      { id: 'VE-1005-003', customer: 'Lê Hoàng Cường',    trip: 'Đà Nẵng → Huế',          status: 'pending',   date: '05/10/2026' },
      { id: 'VE-1005-004', customer: 'Phạm Minh Đức',     trip: 'Hà Nội → Vinh',           status: 'cancelled', date: '04/10/2026' },
      { id: 'VE-1005-005', customer: 'Võ Thị Em',         trip: 'TP.HCM → Nha Trang',     status: 'paid',      date: '04/10/2026' },
      { id: 'VE-1005-006', customer: 'Hoàng Văn Phúc',    trip: 'Hà Nội → Thanh Hóa',     status: 'paid',      date: '04/10/2026' },
      { id: 'VE-1005-007', customer: 'Đỗ Thị Giang',      trip: 'TP.HCM → Cần Thơ',       status: 'confirmed', date: '04/10/2026' },
      { id: 'VE-1005-008', customer: 'Bùi Quang Huy',     trip: 'Đà Nẵng → Quảng Ngãi',   status: 'pending',   date: '03/10/2026' },
      { id: 'VE-1005-009', customer: 'Ngô Thanh Lan',     trip: 'Hà Nội → Lào Cai',        status: 'paid',      date: '03/10/2026' },
      { id: 'VE-1005-010', customer: 'Phan Văn Khoa',     trip: 'TP.HCM → Vũng Tàu',      status: 'cancelled', date: '03/10/2026' },
    ],
  };

  /* ================================================================
     2. HELPERS
     ================================================================ */
  function formatCurrency(num) {
    if (num >= 1e9) return (num / 1e9).toFixed(1).replace('.0', '') + ' tỷ';
    if (num >= 1e6) return (num / 1e6).toFixed(0) + ' triệu';
    return num.toLocaleString('vi-VN') + 'đ';
  }

  function formatNumber(num) {
    return num.toLocaleString('vi-VN');
  }

  const STATUS_MAP = {
    pending:   { label: 'Chờ xác nhận',  badge: 'c-badge--warning', icon: 'bi-clock-fill' },
    confirmed: { label: 'Đã xác nhận',   badge: 'c-badge--info',    icon: 'bi-check-circle-fill' },
    paid:      { label: 'Đã thanh toán', badge: 'c-badge--success', icon: 'bi-check-circle-fill' },
    cancelled: { label: 'Đã hủy',        badge: 'c-badge--danger',  icon: 'bi-x-circle-fill' },
  };

  /* ================================================================
     3. RENDER KPI CARDS
     ================================================================ */
  function renderKPI() {
    const { kpi } = MOCK;

    document.getElementById('kpiRevenue').textContent    = formatCurrency(kpi.revenue.value);
    document.getElementById('kpiTickets').textContent     = formatNumber(kpi.tickets.value);
    document.getElementById('kpiTrips').textContent       = formatNumber(kpi.trips.value);
    document.getElementById('kpiCustomers').textContent   = formatNumber(kpi.customers.value);

    // Trends
    renderTrend('trendRevenue',   kpi.revenue);
    renderTrend('trendTickets',   kpi.tickets);
    renderTrend('trendTrips',     kpi.trips);
    renderTrend('trendCustomers', kpi.customers);
  }

  function renderTrend(elId, data) {
    const el = document.getElementById(elId);
    if (!el) return;
    const isUp = data.direction === 'up';
    el.className = 'c-kpi-trend ' + (isUp ? 'c-kpi-trend--up' : 'c-kpi-trend--down');
    el.innerHTML = `<i class="bi ${isUp ? 'bi-arrow-up-short' : 'bi-arrow-down-short'}"></i> ${Math.abs(data.trend)}% so với kỳ trước`;
  }

  /* ================================================================
     4. REVENUE LINE CHART
     ================================================================ */
  let revenueChart = null;

  function createRevenueChart(period) {
    const ctx = document.getElementById('revenueChart').getContext('2d');
    const dataset = MOCK.revenueChart[period];

    if (revenueChart) {
      revenueChart.data.labels = dataset.labels;
      revenueChart.data.datasets[0].data = dataset.data;
      revenueChart.update('active');
      return;
    }

    revenueChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: dataset.labels,
        datasets: [{
          label: 'Doanh thu',
          data: dataset.data,
          borderColor: '#1976D2',
          backgroundColor: 'rgba(25, 118, 210, 0.08)',
          borderWidth: 2.5,
          pointRadius: 4,
          pointHoverRadius: 6,
          pointBackgroundColor: '#1976D2',
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          tension: 0.35,
          fill: true,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          intersect: false,
          mode: 'index',
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#212121',
            titleFont: { family: "'Inter', sans-serif", size: 13 },
            bodyFont:  { family: "'Inter', sans-serif", size: 13 },
            padding: 12,
            cornerRadius: 8,
            callbacks: {
              label: function (ctx) {
                return ' ' + ctx.dataset.label + ': ' + formatCurrency(ctx.parsed.y);
              },
            },
          },
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: {
              font: { family: "'Inter', sans-serif", size: 12 },
              color: '#757575',
            },
          },
          y: {
            beginAtZero: true,
            grid: { color: 'rgba(0,0,0,0.04)' },
            ticks: {
              font: { family: "'Inter', sans-serif", size: 12 },
              color: '#757575',
              callback: function (value) {
                return formatCurrency(value);
              },
            },
          },
        },
      },
    });
  }

  // Tab pill switching
  function initRevenueTabs() {
    const pills = document.querySelectorAll('.js-revenue-tab');
    pills.forEach(function (pill) {
      pill.addEventListener('click', function () {
        pills.forEach(function (p) { p.classList.remove('is-active'); });
        this.classList.add('is-active');
        createRevenueChart(this.dataset.period);
      });
    });
  }

  /* ================================================================
     5. TICKET STATUS DONUT CHART
     ================================================================ */
  function createTicketDonutChart() {
    const ctx = document.getElementById('ticketDonutChart').getContext('2d');
    const { labels, data, colors } = MOCK.ticketStatus;
    const total = data.reduce(function (a, b) { return a + b; }, 0);

    // Display total in center label
    const totalEl = document.getElementById('donutCenterTotal');
    if (totalEl) totalEl.textContent = formatNumber(total);

    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: colors,
          borderColor: '#fff',
          borderWidth: 3,
          hoverOffset: 6,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '68%',
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              padding: 16,
              usePointStyle: true,
              pointStyle: 'circle',
              font: { family: "'Inter', sans-serif", size: 13 },
              color: '#212121',
            },
          },
          tooltip: {
            backgroundColor: '#212121',
            titleFont: { family: "'Inter', sans-serif", size: 13 },
            bodyFont:  { family: "'Inter', sans-serif", size: 13 },
            padding: 12,
            cornerRadius: 8,
            callbacks: {
              label: function (ctx) {
                const pct = ((ctx.parsed / total) * 100).toFixed(1);
                return ' ' + ctx.label + ': ' + formatNumber(ctx.parsed) + ' (' + pct + '%)';
              },
            },
          },
        },
      },
    });
  }

  /* ================================================================
     6. RECENT BOOKINGS TABLE
     ================================================================ */
  function renderRecentBookings() {
    const tbody = document.getElementById('recentBookingsBody');
    if (!tbody) return;

    tbody.innerHTML = MOCK.recentBookings.map(function (b, i) {
      const st = STATUS_MAP[b.status] || STATUS_MAP.pending;
      return `
        <tr>
          <td><strong>${b.id}</strong></td>
          <td>${b.customer}</td>
          <td>${b.trip}</td>
          <td><span class="c-badge ${st.badge}"><i class="bi ${st.icon}"></i> ${st.label}</span></td>
          <td>${b.date}</td>
          <td class="cell-actions" style="text-align:center">
            <button class="c-btn c-btn--ghost c-btn--icon c-btn--sm" title="Xem chi tiết"><i class="bi bi-eye"></i></button>
          </td>
        </tr>`;
    }).join('');
  }

  /* ================================================================
     7. INIT
     ================================================================ */
  document.addEventListener('DOMContentLoaded', function () {
    renderKPI();
    initRevenueTabs();
    createRevenueChart('daily');
    createTicketDonutChart();
    renderRecentBookings();
  });
})();
