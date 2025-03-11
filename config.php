<?php
// Bật hiển thị lỗi PHP trong môi trường phát triển
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Cấu hình thông tin kết nối database
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "242perfume_store";

try {
    // Bật chế độ báo lỗi cho MySQLi
    mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

    // Kết nối MySQL
    $conn = new mysqli($servername, $username, $password, $dbname);
    $conn->set_charset("utf8mb4"); // Thiết lập bảng mã UTF-8

} catch (Exception $e) {
    // Ghi log lỗi ra file (tránh hiển thị lỗi trực tiếp ra trình duyệt)
    error_log("Lỗi kết nối MySQL: " . $e->getMessage());
    die("Lỗi kết nối đến database. Vui lòng thử lại sau.");
}
?>
