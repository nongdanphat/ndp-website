# Google Apps Scripts

Thư mục này chứa các Google Apps Script để xử lý form trên website.

## Cấu trúc

- `application-form.gs` - Script xử lý form ứng tuyển công việc
- `contact-form.gs` - Script xử lý form liên hệ

## Hướng dẫn sử dụng

### 1. Form ứng tuyển (`application-form.gs`)

**Setup:**
1. Tạo Google Sheet mới với các cột: `Timestamp`, `Họ tên`, `Email`, `SĐT`, `Nơi làm việc`, `Vị trí quan tâm`, `Kinh nghiệm`, `fileUrl`
2. Lấy Sheet ID từ URL (phần giữa `/d/` và `/edit`)
3. Tạo Google Drive folder để lưu CV
4. Lấy Folder ID từ URL (phần cuối sau `/folders/`)
5. Mở Google Apps Script Editor, tạo project mới
6. Copy nội dung file `application-form.gs` vào editor
7. Thay `YOUR_GOOGLE_SHEET_ID` và `YOUR_GOOGLE_DRIVE_FOLDER_ID`
8. Deploy as Web App với quyền "Anyone" và "Execute as me"
9. Copy Web App URL và thay vào `ung-tuyen-cong-viec.html` (biến `SCRIPT_URL`)

### 2. Form liên hệ (`contact-form.gs`)

**Setup:**
1. Tạo Google Sheet mới với các cột: `Timestamp`, `Họ tên`, `Email`, `Số điện thoại`, `Tin nhắn`
2. Lấy Sheet ID từ URL (phần giữa `/d/` và `/edit`)
3. Mở Google Apps Script Editor, tạo project mới
4. Copy nội dung file `contact-form.gs` vào editor
5. Thay `YOUR_GOOGLE_SHEET_ID`
6. Deploy as Web App với quyền "Anyone" và "Execute as me"
7. Copy Web App URL và thay vào `lien-he.html` (biến `CONTACT_SCRIPT_URL`)

## Lưu ý

- Mỗi script cần được deploy riêng biệt
- Sau khi deploy, URL sẽ có dạng: `https://script.google.com/macros/s/.../exec`
- Nếu thay đổi code, cần deploy lại (chọn "New version" hoặc "Update")
- Số điện thoại được format là text để giữ số 0 ở đầu

