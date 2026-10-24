/**
 * notifications.js — Hệ thống thông báo trên Header
 * Thêm dropdown thông báo vào nút chuông ở header.
 * 
 * Tích hợp Use Case 3: Yêu cầu đổi tài xế (tài xế gửi qua App → Admin nhận)
 * 
 * Chức năng:
 * 1. Hiển thị danh sách thông báo (badge đếm số chưa đọc)
 * 2. Đánh dấu đã đọc khi click
 * 3. Mock data thông báo mẫu (bao gồm yêu cầu đổi tài xế)
 */
(function () {
  'use strict';

  /* ══════════════════════════════════════════
     1. DỮ LIỆU THÔNG BÁO MẪU
     ══════════════════════════════════════════ */
  var notifications = [
    {
      id: 'N001',
      type: 'driver_swap',
      icon: 'bi-arrow-repeat',
      color: '#D32F2F',
      title: 'Yêu cầu đổi tài xế',
      body: 'Tài xế Nguyễn Văn An yêu cầu đổi ca cho chuyến CX-001 (Hà Nội → Hải Phòng, 07:00). Lý do: Ốm đau.',
      time: '5 phút trước',
      read: false
    },
    {
      id: 'N002',
      type: 'ticket',
      icon: 'bi-ticket-perforated-fill',
      color: '#1976D2',
      title: 'Vé mới được đặt',
      body: 'Khách hàng Trần Thị Bích đặt 2 vé chuyến CX-003 (TP.HCM → Đà Lạt, 21:00).',
      time: '12 phút trước',
      read: false
    },
    {
      id: 'N003',
      type: 'driver_swap',
      icon: 'bi-arrow-repeat',
      color: '#D32F2F',
      title: 'Yêu cầu đổi tài xế',
      body: 'Tài xế Lê Hoàng Cường yêu cầu đổi ca cho chuyến CX-005 (Đà Nẵng → Huế, 14:00). Lý do: Xe hỏng.',
      time: '30 phút trước',
      read: false
    },
    {
      id: 'N004',
      type: 'payment',
      icon: 'bi-credit-card-fill',
      color: '#2E7D32',
      title: 'Thanh toán thành công',
      body: 'Khách Phạm Minh Đức đã thanh toán vé VE-1015 bằng QR — 280.000đ.',
      time: '1 giờ trước',
      read: true
    },
    {
      id: 'N005',
      type: 'system',
      icon: 'bi-exclamation-triangle-fill',
      color: '#F57C00',
      title: 'Cảnh báo giữ ghế hết hạn',
      body: 'Đơn giữ ghế VE-1018 đã hết thời gian đếm ngược. Ghế A3 chuyến CX-004 đã được giải phóng.',
      time: '2 giờ trước',
      read: true
    }
  ];

  /* ══════════════════════════════════════════
     2. KHỞI TẠO DROPDOWN
     ══════════════════════════════════════════ */
  document.addEventListener('DOMContentLoaded', function () {
    var bellBtn = document.querySelector('.header-icon-btn[title="Thông báo"]');
    if (!bellBtn) return;

    /* Đếm số chưa đọc */
    function countUnread() {
      return notifications.filter(function (n) { return !n.read; }).length;
    }

    /* Cập nhật badge đỏ */
    function updateBadge() {
      var unread = countUnread();
      var dot = bellBtn.querySelector('.badge-dot');
      if (dot) {
        dot.style.display = unread > 0 ? 'block' : 'none';
        dot.textContent = unread > 9 ? '9+' : (unread > 0 ? unread : '');
      }
    }

    /* Tạo wrapper */
    var wrapper = document.createElement('div');
    wrapper.style.cssText = 'position:relative;display:inline-block;';
    bellBtn.parentNode.insertBefore(wrapper, bellBtn);
    wrapper.appendChild(bellBtn);

    /* Tạo dropdown panel */
    var panel = document.createElement('div');
    panel.className = 'notif-panel';
    wrapper.appendChild(panel);

    /* Render danh sách thông báo */
    function renderPanel() {
      var unread = countUnread();
      var html = '<div class="notif-header">' +
        '<span class="notif-title">Thông báo</span>' +
        (unread > 0 ? '<span class="notif-unread-badge">' + unread + ' mới</span>' : '') +
        '</div>';

      if (notifications.length === 0) {
        html += '<div class="notif-empty"><i class="bi bi-bell-slash"></i><br>Không có thông báo</div>';
      } else {
        html += '<div class="notif-list">';
        notifications.forEach(function (n) {
          html += '<div class="notif-item' + (n.read ? '' : ' is-unread') + '" data-id="' + n.id + '">' +
            '<div class="notif-icon" style="color:' + n.color + ';background:' + n.color + '1A">' +
              '<i class="bi ' + n.icon + '"></i>' +
            '</div>' +
            '<div class="notif-content">' +
              '<div class="notif-item-title">' + n.title + '</div>' +
              '<div class="notif-item-body">' + n.body + '</div>' +
              '<div class="notif-item-time"><i class="bi bi-clock"></i> ' + n.time + '</div>' +
            '</div>' +
            (n.read ? '' : '<div class="notif-dot"></div>') +
          '</div>';
        });
        html += '</div>';
      }

      if (unread > 0) {
        html += '<div class="notif-footer"><button class="notif-mark-all" id="markAllRead">Đánh dấu tất cả đã đọc</button></div>';
      }

      panel.innerHTML = html;

      /* Event: click item → đánh dấu đã đọc */
      panel.querySelectorAll('.notif-item').forEach(function (item) {
        item.addEventListener('click', function () {
          var id = this.dataset.id;
          notifications.forEach(function (n) { if (n.id === id) n.read = true; });
          renderPanel();
          updateBadge();
        });
      });

      /* Event: đánh dấu tất cả */
      var markAll = panel.querySelector('#markAllRead');
      if (markAll) {
        markAll.addEventListener('click', function (e) {
          e.stopPropagation();
          notifications.forEach(function (n) { n.read = true; });
          renderPanel();
          updateBadge();
        });
      }
    }

    /* Toggle panel */
    bellBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      renderPanel();
      panel.classList.toggle('is-open');
    });

    document.addEventListener('click', function (e) {
      if (!wrapper.contains(e.target)) {
        panel.classList.remove('is-open');
      }
    });

    updateBadge();

    /* ══════════════════════════════════════════
       3. INJECT CSS
       ══════════════════════════════════════════ */
    if (!document.getElementById('notif-css')) {
      var style = document.createElement('style');
      style.id = 'notif-css';
      style.textContent =
        /* Panel */
        '.notif-panel{' +
          'position:absolute;right:0;top:calc(100% + 8px);' +
          'width:380px;max-height:480px;overflow:hidden;' +
          'background:#fff;border-radius:12px;' +
          'box-shadow:0 8px 32px rgba(0,0,0,.16);' +
          'z-index:9999;display:none;' +
          'animation:notifIn .15s ease;' +
        '}' +
        '.notif-panel.is-open{display:flex;flex-direction:column}' +
        '@keyframes notifIn{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:translateY(0)}}' +

        /* Header */
        '.notif-header{' +
          'display:flex;align-items:center;justify-content:space-between;' +
          'padding:14px 16px;border-bottom:1px solid #E0E0E0;' +
        '}' +
        '.notif-title{font-weight:700;font-size:15px;color:#212121}' +
        '.notif-unread-badge{' +
          'font-size:11px;font-weight:600;color:#fff;' +
          'background:#D32F2F;border-radius:10px;padding:2px 8px;' +
        '}' +

        /* List */
        '.notif-list{overflow-y:auto;max-height:340px;flex:1}' +
        '.notif-item{' +
          'display:flex;align-items:flex-start;gap:12px;' +
          'padding:12px 16px;cursor:pointer;transition:background .12s;' +
          'border-bottom:1px solid #F5F5F5;position:relative;' +
        '}' +
        '.notif-item:hover{background:#F5F5F5}' +
        '.notif-item.is-unread{background:#E3F2FD}' +
        '.notif-item.is-unread:hover{background:#BBDEFB}' +
        '.notif-icon{' +
          'width:36px;height:36px;border-radius:10px;' +
          'display:flex;align-items:center;justify-content:center;' +
          'font-size:16px;flex-shrink:0;' +
        '}' +
        '.notif-content{flex:1;min-width:0}' +
        '.notif-item-title{font-size:13px;font-weight:600;color:#212121;margin-bottom:2px}' +
        '.notif-item-body{font-size:12px;color:#757575;line-height:1.4;' +
          'display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}' +
        '.notif-item-time{font-size:11px;color:#9E9E9E;margin-top:4px;display:flex;align-items:center;gap:4px}' +
        '.notif-dot{' +
          'width:8px;height:8px;background:#1976D2;border-radius:50%;' +
          'flex-shrink:0;margin-top:6px;' +
        '}' +

        /* Footer */
        '.notif-footer{padding:10px 16px;border-top:1px solid #E0E0E0;text-align:center}' +
        '.notif-mark-all{' +
          'border:none;background:none;color:#1976D2;font-size:13px;' +
          'font-weight:600;cursor:pointer;font-family:inherit;' +
        '}' +
        '.notif-mark-all:hover{text-decoration:underline}' +

        /* Empty */
        '.notif-empty{' +
          'padding:40px 16px;text-align:center;color:#BDBDBD;font-size:14px;' +
        '}' +
        '.notif-empty i{font-size:32px;display:block;margin-bottom:8px}' +

        /* Badge dot improvements */
        '.badge-dot{' +
          'position:absolute;top:4px;right:4px;min-width:16px;height:16px;' +
          'background:#D32F2F;border-radius:8px;font-size:10px;font-weight:700;' +
          'color:#fff;display:flex;align-items:center;justify-content:center;' +
          'padding:0 4px;border:2px solid #fff;' +
        '}' +

        /* Responsive */
        '@media(max-width:575.98px){' +
          '.notif-panel{width:calc(100vw - 24px);right:-50px}' +
        '}';
      document.head.appendChild(style);
    }

  });
})();
