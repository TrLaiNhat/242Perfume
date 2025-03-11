<?php
// Kết nối MySQL
include "config.php"; 

// Nhận từ khóa tìm kiếm từ URL hoặc form
$searchQuery = isset($_GET['query']) ? trim($_GET['query']) : '';
?>

<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kết quả tìm kiếm</title>
    <link rel="stylesheet" href="css/page.css">
</head>
<body>

<h1>Tìm kiếm sản phẩm</h1>

<!-- Form nhập từ khóa -->
<form method="GET" id="search-form">
    <input type="text" name="query" id="search-input" placeholder="Nhập từ khóa..." value="<?php echo htmlspecialchars($searchQuery); ?>">
    <button type="submit">Tìm kiếm</button>
</form>

<?php
if ($searchQuery !== '') {
    // Chuẩn bị truy vấn an toàn để tránh SQL Injection
    $sql = $conn->prepare("SELECT * FROM products WHERE product_name LIKE ?");
    $searchTerm = "%$searchQuery%";
    $sql->bind_param("s", $searchTerm);
    $sql->execute();
    $result = $sql->get_result();

    echo "<h2>Kết quả tìm kiếm cho: \"" . htmlspecialchars($searchQuery) . "\"</h2>";

    if ($result->num_rows > 0) {
        echo "<ul>";
        while ($row = $result->fetch_assoc()) {
            echo "<li class='product'>";
            echo "<img src='" . htmlspecialchars($row['image']) . "' alt='" . htmlspecialchars($row['product_name']) . "' width='150'>";
            echo "<h2>" . htmlspecialchars($row['product_name']) . "</h2>";
            echo "<p>Giá: " . number_format($row["price"], 0, ',', '.') . " VND</p>";
            echo "<button onclick=\"addToCart(" . $row['id'] . ", '" . htmlspecialchars($row['product_name']) . "', " . $row['price'] . ", '" . htmlspecialchars($row['image']) . "')\">Thêm vào giỏ hàng</button>";
            echo "</li>";
        }
        echo "</ul>";
    } else {
        echo "<p>Không tìm thấy sản phẩm nào.</p>";
    }
}

$conn->close();
?>

<a href="index.html">Quay lại trang chủ</a>

<script>
    // Kiểm tra nếu ô tìm kiếm trống, ngăn chặn form gửi đi
    document.getElementById("search-form").addEventListener("submit", function(event) {
        let searchValue = document.getElementById("search-input").value.trim();
        if (searchValue === "") {
            event.preventDefault();
            alert("Vui lòng nhập từ khóa!");
        }
    });

    // Hàm thêm sản phẩm vào giỏ hàng
    function addToCart(productId, productName, productPrice, productImage) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        let existingProduct = cart.find(item => item.id === productId);
        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.push({
                id: productId,
                name: productName,
                price: productPrice,
                image: productImage,
                quantity: 1
            });
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        alert("Đã thêm sản phẩm vào giỏ hàng!");
    }
</script>

</body>
</html>
