# 🎨 Design System — Hệ thống Quản lý bán vé xe khách (Web Admin)

> Phiên bản: **1.0** · Cập nhật: 2026-10-05
> Tech stack: HTML5 · CSS3 · JavaScript ES6 · Bootstrap 5.3 · Chart.js 4.x
> Backend: Firebase (Firestore, Authentication, Storage)

---

## 1. Bảng màu (Color Palette)

| Token              | Hex       | Vai trò                                |
| ------------------- | --------- | -------------------------------------- |
| `--clr-primary`     | `#1976D2` | Nút chính, link, sidebar active        |
| `--clr-primary-dark`| `#1565C0` | Hover nút chính                        |
| `--clr-primary-light`| `#BBDEFB`| Badge nhẹ, row highlight              |
| `--clr-success`     | `#2E7D32` | Trạng thái thành công, tăng trưởng     |
| `--clr-warning`     | `#F57C00` | Cảnh báo, chờ xử lý                   |
| `--clr-danger`      | `#D32F2F` | Lỗi, xóa, giảm sút                   |
| `--clr-info`        | `#0288D1` | Thông tin phụ                          |
| `--clr-bg`          | `#F5F5F5` | Background toàn trang                  |
| `--clr-surface`     | `#FFFFFF` | Card, Modal, Sidebar                   |
| `--clr-text`        | `#212121` | Văn bản chính                          |
| `--clr-text-secondary`| `#757575`| Văn bản phụ, placeholder             |
| `--clr-border`      | `#E0E0E0` | Viền input, table, card                |
| `--clr-sidebar-bg`  | `#0D47A1` | Nền sidebar                            |
| `--clr-sidebar-text`| `#FFFFFF` | Chữ trong sidebar                      |

---

## 2. Typography

| Phần tử        | Font                  | Cỡ     | Weight | Line-height |
| -------------- | --------------------- | ------ | ------ | ----------- |
| Heading h1     | Inter / Roboto        | 28px   | 700    | 1.3         |
| Heading h2     | Inter / Roboto        | 24px   | 700    | 1.3         |
| Heading h3     | Inter / Roboto        | 20px   | 600    | 1.4         |
| Heading h4     | Inter / Roboto        | 16px   | 600    | 1.4         |
| Body           | Inter / Roboto        | 14px   | 400    | 1.6         |
| Small / Caption| Inter / Roboto        | 12px   | 400    | 1.5         |
| Monospace      | JetBrains Mono / mono | 13px   | 400    | 1.5         |

---

## 3. Spacing & Border Radius

- **Spacing scale (rem):** 0.25 · 0.5 · 0.75 · 1 · 1.25 · 1.5 · 2 · 3
- **Card border-radius:** `12px`
- **Button border-radius:** `8px`
- **Input border-radius:** `8px`
- **Modal border-radius:** `16px`

---

## 4. Shadow / Elevation

| Level        | CSS box-shadow                                   | Sử dụng          |
| ------------ | ------------------------------------------------ | ----------------- |
| `--shadow-sm`| `0 1px 3px rgba(0,0,0,0.08)`                    | Card, Input focus |
| `--shadow-md`| `0 4px 12px rgba(0,0,0,0.10)`                   | Dropdown, Tooltip |
| `--shadow-lg`| `0 8px 24px rgba(0,0,0,0.14)`                   | Modal             |

---

## 5. Layout

### 5.1 Tổng quan

```
┌──────────────────────────────────────────────────┐
│                   Header (56px)                  │
├────────────┬─────────────────────────────────────┤
│            │                                     │
│  Sidebar   │            Main Content             │
│  (260px)   │         (padding: 24px)             │
│            │                                     │
│            │                                     │
└────────────┴─────────────────────────────────────┘
```

### 5.2 Sidebar (bên trái)

- Chiều rộng: **260px** (desktop), **0px** (mobile, slide-in khi toggle)
- Nền: `--clr-sidebar-bg` (#0D47A1)
- Logo/Tên hệ thống ở trên cùng (height 56px, đồng bộ header)
- Các mục menu:
  1. 📊 Tổng quan (Dashboard)
  2. 👤 Nhân viên
  3. 🧑‍💼 Khách hàng
  4. 🚌 Chuyến xe
  5. 🎫 Vé xe
  6. 🚐 Xe
  7. 💰 Doanh thu
- Menu item: padding `12px 20px`, font-size 14px, icon + text
- Active item: background `rgba(255,255,255,0.15)`, border-left 3px solid white
- Hover: background `rgba(255,255,255,0.08)`

### 5.3 Header (phía trên)

- Chiều cao: **56px**
- Nền: `--clr-surface` (#FFFFFF)
- Shadow: `--shadow-sm`
- Bố cục (flex):
  - **Trái:** Nút toggle sidebar (hamburger) + Breadcrumb
  - **Phải:** Thanh Search (min-width 240px) · Chuông thông báo (có badge đỏ) · Avatar + dropdown

---

## 6. Components

### 6.1 Button

| Variant        | Background            | Text color | Border           |
| -------------- | --------------------- | ---------- | ---------------- |
| Primary        | `--clr-primary`       | #FFFFFF    | none             |
| Secondary      | transparent           | `--clr-primary` | 1px solid primary |
| Success        | `--clr-success`       | #FFFFFF    | none             |
| Danger         | `--clr-danger`        | #FFFFFF    | none             |
| Ghost          | transparent           | `--clr-text` | none           |

- **Size:** Small (30px h), Default (38px h), Large (46px h)
- **Border-radius:** 8px
- **Hover:** darken 8%, cursor pointer
- **Disabled:** opacity 0.5, cursor not-allowed
- **Icon button:** vuông, cùng height, padding đều 4 phía

### 6.2 Input / Form Control

- Height: **38px** (default), 46px (large)
- Border: 1px solid `--clr-border`
- Border-radius: 8px
- Focus: border-color `--clr-primary`, box-shadow `0 0 0 3px rgba(25,118,210,0.15)`
- Placeholder: color `--clr-text-secondary`
- Label: font-size 13px, font-weight 500, margin-bottom 4px
- Error state: border-color `--clr-danger`, helper text màu danger bên dưới

### 6.3 Table

- Header: background `#F5F5F5`, font-weight 600, text-transform uppercase, font-size 12px
- Row: border-bottom 1px solid `--clr-border`
- Row hover: background `--clr-primary-light` (nhạt)
- Cell padding: `12px 16px`
- **Phân trang:** Hiển thị "Trang X / Y" + nút Prev / Next + select số dòng/trang (10, 20, 50)

### 6.4 Modal

- Overlay: background `rgba(0,0,0,0.5)`
- Content: max-width 560px, border-radius 16px, background `--clr-surface`
- Header: border-bottom 1px, có nút close (×)
- Footer: border-top 1px, nút hành động căn phải
- Animation: fade + slide-up 200ms

### 6.5 Card KPI

- Border-radius: 12px
- Padding: 20px 24px
- Background: `--clr-surface`
- Shadow: `--shadow-sm`
- Cấu trúc:
  - **Icon** (40×40, nền nhạt tương ứng + icon màu đậm)
  - **Label** (font 13px, color `--clr-text-secondary`)
  - **Value** (font 28px, weight 700, color `--clr-text`)
  - **Trend** (nhỏ, hiển thị % tăng/giảm kèm mũi tên)

### 6.6 Badge / Status

| Trạng thái   | Background          | Text color       |
| ------------- | ------------------- | ---------------- |
| Hoạt động     | `#E8F5E9`          | `--clr-success`  |
| Chờ xử lý    | `#FFF3E0`          | `--clr-warning`  |
| Đã hủy       | `#FFEBEE`          | `--clr-danger`   |
| Thông tin     | `#E3F2FD`          | `--clr-info`     |

- Border-radius: 20px (pill)
- Padding: 4px 12px
- Font-size: 12px, font-weight 500

---

## 7. Iconography

- Thư viện: **Bootstrap Icons** (CDN)
- Size mặc định: 18px (inline), 20px (menu), 40px (KPI card)
- Color: inherit từ parent

---

## 8. Breakpoints (Responsive)

| Breakpoint | Min-width | Hành vi                         |
| ---------- | --------- | ------------------------------- |
| Mobile     | < 768px   | Sidebar ẩn, hamburger toggle    |
| Tablet     | ≥ 768px   | Sidebar thu nhỏ (icon-only 72px)|
| Desktop    | ≥ 1200px  | Sidebar đầy đủ 260px           |

---

## 9. Quy tắc đặt tên CSS Class

- **Layout:** `.layout-*` → `.layout-sidebar`, `.layout-header`, `.layout-main`
- **Component:** `.c-*` → `.c-btn`, `.c-input`, `.c-table`, `.c-modal`, `.c-kpi-card`
- **Utility:** `.u-*` → `.u-text-center`, `.u-mt-1`
- **State:** `.is-*` / `.has-*` → `.is-active`, `.is-loading`, `.has-error`
- **Page-specific:** `.page-*` → `.page-dashboard`, `.page-nhan-vien`

---

## 10. File Structure (khuyến nghị)

```
WebAdmin/
├── index.html                  # Dashboard
├── pages/
│   ├── nhan-vien.html
│   ├── khach-hang.html
│   ├── chuyen-xe.html
│   ├── ve-xe.html
│   ├── xe.html
│   └── doanh-thu.html
├── assets/
│   ├── css/
│   │   ├── variables.css       # CSS custom properties
│   │   ├── layout.css          # Sidebar, Header, Main
│   │   ├── components.css      # Buttons, Inputs, Tables, Modals, Cards
│   │   └── utilities.css       # Spacing, text helpers
│   ├── js/
│   │   ├── firebase-config.js
│   │   ├── auth.js
│   │   ├── sidebar.js
│   │   ├── table-pagination.js
│   │   └── utils.js
│   └── img/
│       └── logo.svg
├── style-guide.html            # Preview tất cả components
└── design_system.md            # Tài liệu này
```
