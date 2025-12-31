/**
 * Google Apps Script để xử lý form liên hệ
 * Ghi dữ liệu liên hệ vào Google Sheet
 *
 * HƯỚNG DẪN SETUP:
 * 1. Tạo Google Sheet mới với các cột: Timestamp, Họ tên, Email, Số điện thoại, Nội dung liên hệ, Nội dung ý kiến
 * 2. Lấy Sheet ID từ URL (phần giữa /d/ và /edit)
 * 3. Thay YOUR_GOOGLE_SHEET_ID trong code
 * 4. Deploy as Web App với quyền "Anyone" và "Execute as me"
 * 5. Copy Web App URL và thay vào các file HTML
 */

// ============================================
// CẤU HÌNH - Thay đổi các giá trị bên dưới
// ============================================
const sheetId = "YOUR_GOOGLE_SHEET_ID";

/**
 * Hàm doGet để xử lý CORS preflight request
 */
function doGet(e) {
  return ContentService.createTextOutput(
    JSON.stringify({ status: "ok" })
  ).setMimeType(ContentService.MimeType.JSON);
}

/**
 * Hàm doPost xử lý POST request từ form liên hệ
 * Hỗ trợ cả JSON và form data
 */
function doPost(e) {
  try {
    // Kiểm tra cấu hình
    if (sheetId === "YOUR_GOOGLE_SHEET_ID") {
      throw new Error("Vui lòng cấu hình sheetId trong code");
    }

    let data;

    // Xử lý cả JSON và form data
    if (e.postData && e.postData.type === "application/json") {
      data = JSON.parse(e.postData.contents);
    } else if (e.parameter) {
      // Form data
      data = {
        name: e.parameter.name || "",
        email: e.parameter.email || "",
        phone: e.parameter.phone || "",
        message: e.parameter.message || "",
        formType: e.parameter.formType || "contact", // Mặc định là "contact"
      };
    } else {
      throw new Error("Không có dữ liệu được gửi");
    }

    // Gọi hàm saveContact
    const result = saveContact(data);

    // Trả về JSON
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
 * Hàm saveContact ghi dữ liệu liên hệ vào Google Sheet
 * @param {Object} data - Dữ liệu form { name, email, phone, message, formType }
 * @returns {Object} Kết quả { success: true/false }
 */
function saveContact(data) {
  try {
    const sheet = SpreadsheetApp.openById(sheetId).getActiveSheet();

    // Xác định formType (mặc định là "contact")
    const formType = (data.formType || "contact").toLowerCase();

    // Phân biệt nội dung theo loại form
    let contactContent = ""; // Cột 5: Nội dung liên hệ
    let feedbackContent = ""; // Cột 6: Nội dung ý kiến

    if (formType === "insights") {
      feedbackContent = data.message || "";
    } else {
      contactContent = data.message || "";
    }

    // Ghi vào Google Sheet
    const timestamp = new Date();
    const row = [
      timestamp,
      data.name || "",
      data.email || "",
      data.phone || "",
      contactContent, // Cột 5: Nội dung liên hệ
      feedbackContent, // Cột 6: Nội dung ý kiến
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
