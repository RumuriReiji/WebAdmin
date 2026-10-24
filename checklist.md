# ✅ Bảng đối chiếu yêu cầu chức năng Admin

> **Dự án**: Web Admin — Hệ thống Quản lý bán vé xe khách (Nhà xe Trác Truyệt)  
> **Ngày kiểm tra**: 24/10/2026 (cập nhật)  
> **Tổng**: 16 chức năng | ✅ Đạt: 14 | ⚠️ Đạt 1 phần: 1 | ❌ Chưa có: 1

---

## Bảng đối chiếu AD-01 → AD-16

| Mã | Chức năng | File | Trạng thái | Ghi chú |
|----|-----------|------|------------|---------|
| AD-01 | Đăng nhập | `login.html` | ✅ Đạt | Trang login 2 cột (branding + form). Demo: `admin@nhaxe.vn / admin123`. Session guard trên tất cả trang. Nút đăng xuất ở avatar dropdown. |
| AD-02 | Phân công nhân sự | `pages/nhan-vien.html` Tab 1 | ✅ Đạt | Bảng nhân viên, nút phân công, modal chọn tuyến/bến. Chức vụ: Tài xế, Phụ xe, Quản lý. |
| AD-03 | Quản lý tài khoản tài xế | `pages/nhan-vien.html` Tab 2 | ⚠️ Đạt 1 phần | ✅ Tạo tài khoản, khóa/mở khóa. ❌ Thiếu: Đặt lại mật khẩu. |
| AD-04 | Quản lý thông tin KH | `pages/khach-hang.html` | ✅ Đạt | Bảng 8 cột, tìm kiếm, modal chi tiết, khóa/mở khóa. |
| AD-05 | Xem lịch sử đặt vé KH | `pages/khach-hang.html` Modal Tab 2 | ✅ Đạt | Tab "Lịch sử đặt vé" trong modal chi tiết. |
| AD-06 | Quản lý lịch trình | `pages/chuyen-xe.html` Tab 1 | ✅ Đạt | CRUD đầy đủ 15 chuyến. |
| AD-07 | Phân công xe | `pages/chuyen-xe.html` Tab 2 | ✅ Đạt | Gán xe cho chuyến, check trạng thái xe. |
| AD-08 | Quản lý điểm đón/trả | `pages/chuyen-xe.html` Tab 4 | ✅ Đạt | Dropdown chọn điểm đón/trả. |
| AD-09 | Xem danh sách vé | `pages/ve-xe.html` | ✅ Đạt | 20 vé mẫu, lọc theo trạng thái + chuyến xe, phân trang. |
| AD-10 | Kiểm tra trạng thái vé | `pages/ve-xe.html` Modal | ✅ Đạt | 5 trạng thái theo kịch bản: Đang giữ chỗ → Chờ thanh toán → Đã xác nhận → Đã thanh toán / Đã hủy. |
| AD-11 | Thêm/sửa/xóa xe | `pages/quan-ly-xe.html` Tab 1 | ✅ Đạt | CRUD 15 xe. |
| AD-12 | Quản lý loại xe | `pages/quan-ly-xe.html` Tab 2 | ✅ Đạt | 3 loại xe. |
| AD-13 | Quản lý trạng thái xe | `pages/quan-ly-xe.html` Tab 3 | ✅ Đạt | 3 stat cards, modal cập nhật. |
| AD-14 | Thống kê doanh thu | `pages/doanh-thu.html` Tab 1 | ✅ Đạt | Line Chart + KPI cards + bảng chi tiết. |
| AD-15 | Thống kê vé | `pages/doanh-thu.html` Tab 2 | ✅ Đạt | Bar + Donut charts. |
| AD-16 | Thống kê theo chuyến xe | `pages/doanh-thu.html` Tab 3 | ✅ Đạt | Bảng sortable, progress bar. |

---

## Tích hợp kịch bản Use Case

| Use Case | Tác nhân | Ảnh hưởng Web Admin | Đã tích hợp? |
|----------|----------|---------------------|--------------|
| UC1: Xác nhận thời gian ca lái | Tài xế (App) | Admin xem trạng thái tài xế | ⚠️ Chờ kết nối Firebase |
| UC2: Ghi nhận thời gian nghỉ | Tài xế (App) | Admin xem dữ liệu giờ làm | ⚠️ Chờ kết nối Firebase |
| UC3: Yêu cầu đổi tài xế | Tài xế → Admin | ✅ Thông báo khẩn cấp trên header | ✅ Đã thêm vào `notifications.js` |
| UC4: Đặt vé (KH-05) | Khách hàng (App) | Trạng thái vé: Đang giữ chỗ, Chờ thanh toán | ✅ Đã cập nhật `ve-xe.html` |
| UC5: Thanh toán QR (KH-10) | Khách hàng (App) | Trạng thái vé: Đã thanh toán | ✅ Đã có sẵn |

---

## 📁 Cấu trúc file hiện tại

```
d:\WebAdmin\
├── login.html                    ← Đăng nhập Admin (AD-01) ★
├── index.html                    ← Dashboard (Tổng quan)
├── checklist.md                  ← Bảng đối chiếu (file này)
├── design_system.md              ← Quy chuẩn thiết kế
├── style-guide.html              ← Preview components
├── assets/
│   ├── css/
│   │   ├── variables.css
│   │   ├── layout.css
│   │   ├── components.css
│   │   └── utilities.css
│   └── js/
│       ├── auth.js               ← Session guard + avatar dropdown ★
│       ├── notifications.js      ← Hệ thống thông báo header ★
│       ├── sidebar.js
│       ├── dashboard.js
│       └── nhan-vien.js
└── pages/
    ├── nhan-vien.html            ← Quản lý nhân viên (AD-02, AD-03)
    ├── khach-hang.html           ← Quản lý khách hàng (AD-04, AD-05)
    ├── chuyen-xe.html            ← Quản lý chuyến xe (AD-06, AD-07, AD-08)
    ├── ve-xe.html                ← Quản lý vé xe (AD-09, AD-10)
    ├── quan-ly-xe.html           ← Quản lý xe (AD-11, AD-12, AD-13)
    └── doanh-thu.html            ← Doanh thu (AD-14, AD-15, AD-16)
```

★ = File mới tạo/cập nhật trong phiên này

---

## 🔧 Hạng mục cần bổ sung

| # | Hạng mục | Mức ưu tiên |
|---|----------|-------------|
| 1 | **Đặt lại mật khẩu (AD-03)** — Thêm nút reset password trong tab Tài khoản nhân viên | 🔴 Cao |
| 2 | Kết nối Firebase Auth — Thay tài khoản demo bằng Firebase Authentication | 🟡 Trung bình |
| 3 | Kết nối Firestore — Thay dữ liệu mẫu bằng Firestore real-time | 🟡 Trung bình |
| 4 | UC1/UC2 — Hiển thị trạng thái ca lái + giờ làm việc tài xế từ Firestore | 🟡 Trung bình |
| 5 | UC3 — Xử lý yêu cầu đổi tài xế (chấp nhận/từ chối, phân công lại) | 🟡 Trung bình |
