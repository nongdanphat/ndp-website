/**
 * Google Apps Script để xử lý form ứng tuyển
 * Hàm uploadFile xử lý upload file CV và ghi dữ liệu vào Google Sheet
 *
 * HƯỚNG DẪN SETUP:
 * 1. Tạo Google Sheet mới với các cột: Timestamp, Họ tên, Email, SĐT, Nơi làm việc, Vị trí quan tâm, Kinh nghiệm, fileUrl
 * 2. Lấy Sheet ID từ URL (phần giữa /d/ và /edit)
 * 3. Tạo Google Drive folder để lưu CV
 * 4. Lấy Folder ID từ URL (phần cuối sau /folders/)
 * 5. Thay YOUR_GOOGLE_SHEET_ID và YOUR_GOOGLE_DRIVE_FOLDER_ID trong code
 * 6. Deploy as Web App với quyền "Anyone" và "Execute as me"
 * 7. Copy Web App URL và thay vào ung-tuyen-cong-viec.html
 */

// ============================================
// CẤU HÌNH - Thay đổi các giá trị bên dưới
// ============================================
const sheetId = "YOUR_GOOGLE_SHEET_ID";
const folderId = "YOUR_GOOGLE_DRIVE_FOLDER_ID";

/**
 * Hàm doGet để xử lý CORS preflight request và JSONP callback
 */
function doGet(e) {
  const callback = e.parameter.callback;
  const data = e.parameter.data;

  if (callback && data) {
    // JSONP response
    return ContentService.createTextOutput(
      callback + "(" + JSON.stringify(JSON.parse(data)) + ");"
    ).setMimeType(ContentService.MimeType.JAVASCRIPT);
  }

  return ContentService.createTextOutput(
    JSON.stringify({ status: "ok" })
  ).setMimeType(ContentService.MimeType.JSON);
}

/**
 * Hàm doPost xử lý POST request từ form
 * Hỗ trợ cả JSON và form data
 */
function doPost(e) {
  try {
    // Kiểm tra cấu hình
    if (
      sheetId === "YOUR_GOOGLE_SHEET_ID" ||
      folderId === "YOUR_GOOGLE_DRIVE_FOLDER_ID"
    ) {
      throw new Error("Vui lòng cấu hình sheetId và folderId trong code");
    }

    let data;

    // Xử lý cả JSON và form data
    if (e.postData && e.postData.type === "application/json") {
      data = JSON.parse(e.postData.contents);
    } else if (e.parameter) {
      // Form data
      data = {
        fullName: e.parameter.fullName || "",
        email: e.parameter.email || "",
        phone: e.parameter.phone || "",
        location: e.parameter.location || "",
        position: e.parameter.position || "",
        experience: e.parameter.experience || "",
        base64: e.parameter.base64 || "",
        fileName: e.parameter.fileName || "",
        mimeType: e.parameter.mimeType || "",
      };
    } else {
      throw new Error("Không có dữ liệu được gửi");
    }

    // Gọi hàm uploadFile
    const result = uploadFile(
      data.base64 || "",
      data.fileName || "",
      data.mimeType || "",
      data
    );

    // Trả về JSON (Google Apps Script sẽ tự động xử lý CORS khi deploy đúng cách)
    return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(
      ContentService.MimeType.JSON
    );
  } catch (error) {
    Logger.log("doPost Error: " + error.toString());
    Logger.log("Error stack: " + error.stack);

    return ContentService.createTextOutput(
      JSON.stringify({ success: false, error: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Hàm uploadFile xử lý upload file CV và ghi dữ liệu vào Google Sheet
 * @param {string} base64 - Base64 string của file
 * @param {string} fileName - Tên file
 * @param {string} mimeType - MIME type của file
 * @param {Object} data - Dữ liệu form
 * @returns {Object} Kết quả { success: true/false }
 */
function uploadFile(base64, fileName, mimeType, data) {
  try {
    const sheet = SpreadsheetApp.openById(sheetId).getActiveSheet();
    const folder = DriveApp.getFolderById(folderId);

    let fileUrl = "";

    // Nếu có file
    if (base64 && fileName && mimeType) {
      // Decode Base64
      const fileBlob = Utilities.newBlob(
        Utilities.base64Decode(base64),
        mimeType,
        fileName
      );

      // Check size <= 5MB
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (fileBlob.getBytes().length > maxSize) {
        throw new Error("File size exceeds 5MB limit");
      }

      // Upload vào Google Drive
      const file = folder.createFile(fileBlob);
      fileUrl = file.getUrl();
    }

    // Ghi vào Google Sheet
    const timestamp = new Date();
    const row = [
      timestamp,
      data.fullName || "",
      data.email || "",
      data.phone || "",
      data.location || "",
      data.position || "",
      data.experience || "",
      fileUrl,
    ];

    // Thêm row
    const lastRow = sheet.getLastRow() + 1;
    sheet.appendRow(row);

    // Format số điện thoại là text để giữ số 0 ở đầu
    const phoneCell = sheet.getRange(lastRow, 4); // Cột 4 là số điện thoại
    phoneCell.setNumberFormat("@"); // Format là text
    // Nếu số điện thoại có dấu nháy đơn ở đầu, loại bỏ và set lại
    let phoneValue = data.phone || "";
    if (phoneValue.startsWith("'")) {
      phoneValue = phoneValue.substring(1);
    }
    phoneCell.setValue(phoneValue);

    return { success: true };
  } catch (error) {
    Logger.log("Error: " + error.toString());
    return { success: false, error: error.toString() };
  }
}

