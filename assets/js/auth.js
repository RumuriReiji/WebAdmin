/**
 * auth.js — Quản lý xác thực đăng nhập (chưa kết nối Firebase)
 * Dùng sessionStorage để lưu trạng thái đăng nhập.
 *
 * Chức năng:
 * 1. Kiểm tra đăng nhập — nếu chưa login thì redirect về login.html
 * 2. Hiển thị thông tin admin (tên, avatar)
 * 3. Đăng xuất
 */
(function () {
  'use strict';

  var SESSION_KEY = 'adminLoggedIn';
  var ADMIN_NAME_KEY = 'adminName';
  var ADMIN_EMAIL_KEY = 'adminEmail';

  /* ══════════════════════════════════════════
     1. KIỂM TRA ĐĂNG NHẬP
     ══════════════════════════════════════════ */
  var isLoggedIn = sessionStorage.getItem(SESSION_KEY) === 'true';

  /* Xác định đường dẫn tới login.html tuỳ vị trí file hiện tại */
  var isInPages = window.location.pathname.indexOf('/pages/') !== -1;
  var loginPath = isInPages ? '../login.html' : 'login.html';

  /* Nếu chưa đăng nhập → chuyển về trang login */
  if (!isLoggedIn) {
    window.location.href = loginPath;
    return; /* Dừng script, không chạy phần còn lại */
  }

  /* ══════════════════════════════════════════
     2. CẬP NHẬT GIAO DIỆN AVATAR + DROPDOWN
     ══════════════════════════════════════════ */
  var adminName = sessionStorage.getItem(ADMIN_NAME_KEY) || 'Admin';
  var adminEmail = sessionStorage.getItem(ADMIN_EMAIL_KEY) || '';
  var initial = adminName.charAt(0).toUpperCase();

  /* Tìm avatar hiện tại và bọc thêm dropdown */
  document.addEventListener('DOMContentLoaded', function () {
    var avatar = document.querySelector('.header-avatar');
    if (!avatar) return;

    /* Cập nhật nội dung avatar */
    avatar.textContent = initial;
    avatar.title = adminName;
    avatar.style.cursor = 'pointer';
    avatar.style.position = 'relative';

    /* Tạo wrapper cho dropdown */
    var wrapper = document.createElement('div');
    wrapper.className = 'avatar-dropdown-wrapper';
    wrapper.style.cssText = 'position:relative;display:inline-block;';
    avatar.parentNode.insertBefore(wrapper, avatar);
    wrapper.appendChild(avatar);

    /* Tạo dropdown menu */
    var dropdown = document.createElement('div');
    dropdown.className = 'avatar-dropdown';
    dropdown.innerHTML =
      '<div class="avd-header">' +
        '<div class="avd-name">' + adminName + '</div>' +
        '<div class="avd-email">' + adminEmail + '</div>' +
      '</div>' +
      '<div class="avd-divider"></div>' +
      '<button class="avd-item avd-logout" id="btnLogout">' +
        '<i class="bi bi-box-arrow-left"></i> Đăng xuất' +
      '</button>';
    wrapper.appendChild(dropdown);

    /* Inject CSS cho dropdown (nếu chưa có) */
    if (!document.getElementById('auth-dropdown-css')) {
      var style = document.createElement('style');
      style.id = 'auth-dropdown-css';
      style.textContent =
        '.avatar-dropdown{' +
          'position:absolute;right:0;top:calc(100% + 8px);' +
          'min-width:220px;background:#fff;border-radius:10px;' +
          'box-shadow:0 8px 24px rgba(0,0,0,.14);padding:8px 0;' +
          'z-index:9999;display:none;animation:avdIn .15s ease;' +
        '}' +
        '.avatar-dropdown.is-open{display:block}' +
        '@keyframes avdIn{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:translateY(0)}}' +
        '.avd-header{padding:12px 16px}' +
        '.avd-name{font-weight:600;font-size:14px;color:#212121}' +
        '.avd-email{font-size:12px;color:#757575;margin-top:2px}' +
        '.avd-divider{height:1px;background:#E0E0E0;margin:4px 0}' +
        '.avd-item{' +
          'display:flex;align-items:center;gap:8px;width:100%;' +
          'padding:10px 16px;border:none;background:none;' +
          'font-family:inherit;font-size:13px;color:#212121;' +
          'cursor:pointer;transition:background .12s;text-align:left;' +
        '}' +
        '.avd-item:hover{background:#F5F5F5}' +
        '.avd-logout{color:#D32F2F}' +
        '.avd-logout:hover{background:#FFEBEE}';
      document.head.appendChild(style);
    }

    /* Toggle dropdown */
    avatar.addEventListener('click', function (e) {
      e.stopPropagation();
      dropdown.classList.toggle('is-open');
    });

    /* Đóng dropdown khi click ngoài */
    document.addEventListener('click', function () {
      dropdown.classList.remove('is-open');
    });

    /* Nút đăng xuất */
    dropdown.querySelector('#btnLogout').addEventListener('click', function () {
      sessionStorage.removeItem(SESSION_KEY);
      sessionStorage.removeItem(ADMIN_NAME_KEY);
      sessionStorage.removeItem(ADMIN_EMAIL_KEY);
      window.location.href = loginPath;
    });
  });

  /* ══════════════════════════════════════════
     3. PUBLIC API
     ══════════════════════════════════════════ */
  window.AdminAuth = {
    isLoggedIn: function () { return sessionStorage.getItem(SESSION_KEY) === 'true'; },
    getAdminName: function () { return sessionStorage.getItem(ADMIN_NAME_KEY) || 'Admin'; },
    getAdminEmail: function () { return sessionStorage.getItem(ADMIN_EMAIL_KEY) || ''; },
    logout: function () {
      sessionStorage.removeItem(SESSION_KEY);
      sessionStorage.removeItem(ADMIN_NAME_KEY);
      sessionStorage.removeItem(ADMIN_EMAIL_KEY);
      window.location.href = loginPath;
    }
  };

})();
