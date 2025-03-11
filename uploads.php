<?php
include "config.php"; // Kết nối database

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $target_dir = "uploads/"; // Thư mục lưu ảnh
    $target_file = $target_dir . basename($_FILES["product_image"]["name"]);
    $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));

    // Kiểm tra ảnh hợp lệ
    $check = getimagesize($_FILES["product_image"]["tmp_name"]);
    if ($check === false) {
        die("File không phải là ảnh.");
    }

    // Chỉ cho phép JPG, JPEG, PNG
    if (!in_array($imageFileType, ["jpg", "jpeg", "png"])) {
        die("Chỉ cho phép JPG, JPEG, PNG.");
    }

    // Di chuyển ảnh vào thư mục
    if (move_uploaded_file($_FILES["product_image"]["tmp_name"], $target_file)) {
        // Lưu đường dẫn ảnh vào database
        $product_name = $_POST["product_name"];
        $brand = $_POST["brand"];
        $price = $_POST["price"];
        $image_path = $target_file; // Lưu đường dẫn ảnh

        $sql = "INSERT INTO products (product_name, brand, price, image) 
                VALUES (?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ssis", $product_name, $brand, $price, $image_path);

        if ($stmt->execute()) {
            echo "Sản phẩm đã được tải lên thành công!";
        } else {
            echo "Lỗi khi tải lên: " . $stmt->error;
        }

        $stmt->close();
    } else {
        echo "Lỗi khi tải ảnh lên.";
    }
}
$conn->close();
?>
