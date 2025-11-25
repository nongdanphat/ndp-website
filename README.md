# NDP Website

Website tĩnh cho công ty NDP - Chuyên về nông nghiệp, kết nối việc làm cho chủ vườn, người nông dân và người lao động. Cung cấp mua bán phân bón, hạt giống và các sản phẩm liên quan đến nông nghiệp.

## Cấu trúc thư mục

```
ndp-website/
├── index.html                  # Trang chủ
├── lien-he.html                # Trang liên hệ
├── styles.css                  # File CSS tùy chỉnh (nếu có)
├── assets/
│   └── images/                 # Thư mục chứa hình ảnh
├── tin-tuc/                    # Thư mục tin tức
│   ├── index.html              # Trang danh sách tin tức
│   ├── ho-tro-nong-dan.html    # Ví dụ: Chi tiết tin tức 1
│   └── cong-nghe-moi-2024.html # Ví dụ: Chi tiết tin tức 2
└── tuyen-dung/                 # Thư mục tuyển dụng
    ├── viec-lam/               # Thư mục việc làm
    │   ├── index.html          # Trang danh sách việc làm
    │   └── senior-frontend-developer.html # Ví dụ: Chi tiết việc làm
    ├── moi-tot-nghiep/         # Thư mục mới tốt nghiệp
    │   └── index.html          # Trang danh sách chương trình mới tốt nghiệp
    └── thuc-tap/               # Thư mục thực tập
        └── index.html          # Trang danh sách chương trình thực tập
```

## Cách tạo tin tức mới

1. **Sao chép file mẫu:**
   - Mở thư mục `tin-tuc/`
   - Copy một file tin tức có sẵn (ví dụ: `ho-tro-nong-dan.html`)
   - Đặt tên mới theo định dạng slug (ví dụ: `huong-dan-trong-rau-sach.html`)

2. **Cập nhật nội dung:**
   - Mở file mới vừa tạo
   - Thay đổi tiêu đề trong thẻ `<title>` và `<h1>`
   - Cập nhật ngày tháng trong thẻ `<span class="text-sm text-gray-500">`
   - Thay đổi nội dung trong các thẻ `<p>` và các phần tử khác

3. **Thêm vào danh sách:**
   - Mở file `tin-tuc/index.html`
   - Copy một card tin tức có sẵn
   - Cập nhật:
     - Link `href` trỏ đến file mới (ví dụ: `href="huong-dan-trong-rau-sach.html"`)
     - Tiêu đề tin tức
     - Mô tả ngắn
     - Ngày tháng

4. **Cập nhật trang chủ (tùy chọn):**
   - Mở `index.html`
   - Tìm section "Tin tức"
   - Cập nhật card tin tức đầu tiên với link và nội dung mới

**Lưu ý:** Tên file phải là slug (chữ thường, dấu gạch ngang, không dấu) để URL thân thiện và dễ đọc.

## Cách tạo tin tuyển dụng mới

### Tạo việc làm mới

1. **Sao chép file mẫu:**
   - Mở thư mục `tuyen-dung/viec-lam/`
   - Copy file `senior-frontend-developer.html`
   - Đặt tên mới theo định dạng slug (ví dụ: `lao-dong-nong-nghiep-vuon-cay.html`)

2. **Cập nhật nội dung:**
   - Mở file mới vừa tạo
   - Thay đổi:
     - Tiêu đề công việc trong `<h1>`
     - Địa điểm/phòng ban
     - Mô tả tổng quan
     - Yêu cầu công việc
     - Quyền lợi

3. **Thêm vào danh sách:**
   - Mở file `tuyen-dung/viec-lam/index.html`
   - Copy một job listing card
   - Cập nhật:
     - Link `href` trỏ đến file mới (ví dụ: `href="lao-dong-nong-nghiep-vuon-cay.html"`)
     - Tiêu đề công việc
     - Mô tả ngắn
     - Tags kỹ năng

4. **Cập nhật trang chủ (tùy chọn):**
   - Mở `index.html`
   - Tìm section "Tuyển dụng"
   - Cập nhật nội dung nếu cần

### Tạo chương trình mới tốt nghiệp hoặc thực tập

- Tương tự như trên, nhưng đặt file trong thư mục tương ứng:
  - `tuyen-dung/moi-tot-nghiep/` cho chương trình mới tốt nghiệp
  - `tuyen-dung/thuc-tap/` cho chương trình thực tập

## Cách chạy project

### Yêu cầu
- Visual Studio Code (VS Code)
- Extension Live Server

### Các bước

1. **Mở project trong VS Code:**
   - Mở VS Code
   - Chọn `File` → `Open Folder...`
   - Chọn thư mục `ndp-website`

2. **Cài đặt Extension Live Server:**
   - Nhấn `Ctrl + Shift + X` (hoặc `Cmd + Shift + X` trên Mac) để mở Extensions
   - Tìm kiếm "Live Server"
   - Cài đặt extension "Live Server" của Ritwick Dey

3. **Chạy Live Server:**
   - Mở file `index.html` trong VS Code
   - Click chuột phải vào file `index.html` trong Explorer
   - Chọn `Open with Live Server`
   - Hoặc click vào biểu tượng "Go Live" ở góc dưới bên phải thanh trạng thái

4. **Truy cập website:**
   - Trình duyệt sẽ tự động mở với địa chỉ `http://127.0.0.1:5500/index.html`
   - Website sẽ tự động reload khi bạn thay đổi file

### Lưu ý
- Live Server sẽ tự động reload khi bạn lưu file
- Để dừng server, click vào "Port: 5500" ở thanh trạng thái và chọn "Stop Server"
- Nếu port 5500 đã được sử dụng, Live Server sẽ tự động chọn port khác

## Công nghệ sử dụng

- **HTML5**: Cấu trúc website
- **Tailwind CSS**: Framework CSS (sử dụng CDN)
- **JavaScript**: Xử lý menu mobile và dropdown (vanilla JS)

## Tính năng

- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Navigation menu với dropdown
- ✅ Mobile hamburger menu
- ✅ Folder-based routing cho tin tức và tuyển dụng
- ✅ Modern UI với gradients và shadows
- ✅ Sticky header

## Liên hệ

Nếu có thắc mắc hoặc cần hỗ trợ, vui lòng liên hệ qua trang [Liên hệ](/lien-he.html).
