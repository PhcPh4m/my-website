# Bài thi thực hành Lập trình Web - 14113015

## Thông tin
- Họ và tên: Phạm Minh Phúc
- MSSV: 23150349
- Lớp: 14113015

## Cấu trúc thư mục
```text
my-website/
├── index.html
├── css/
│   ├── style.scss
│   └── style.css
├── js/
│   ├── script.js
│   └── data.json
└── README.md
```

## Tính năng đã làm
- **Phần 1 (HTML5):** Thẻ semantic (header, nav, main, section, article, footer), form liên hệ với `required` và `pattern`, bảng quá trình học tập (thead, tbody, th, td), thuộc tính `alt` và `label for`.
- **Phần 2 (SCSS/CSS):** Biến SCSS, nesting, `@mixin` và `@include`, mobile-first với 2 breakpoint (768px, 1024px), Flexbox cho navbar, CSS Grid cho lưới kỹ năng và dự án, `box-sizing: border-box` toàn cục.
- **Phần 3 (JS cơ bản):** Mảng object kỹ năng tĩnh, render bằng `map`/`filter`, validate form bằng JS với thông báo lỗi và thành công, có hàm arrow function.
- **Phần 4 (JS nâng cao):** `fetch()` với `async/await` đọc `js/data.json`, render dự án lên DOM, `try/catch` có log console và thông báo cho người dùng, dark mode lưu bằng `localStorage`.

## Cách chạy
1. Mở thư mục `my-website` bằng VS Code.
2. Chuột phải `index.html` và chọn "Open with Live Server".
3. Mở F12 và kiểm tra tab Console không có lỗi đỏ.

Lưu ý: không mở `index.html` bằng cách nhấp đúp trực tiếp (`file://`), vì trình duyệt sẽ chặn `fetch()` đọc `data.json`.