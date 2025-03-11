<?php
include "config.php";

header("Access-Control-Allow-Origin: *"); // Cho phép mọi nguồn truy cập
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");


header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

$result = $conn->query("SELECT * FROM products");

$products = $result->fetch_all(MYSQLI_ASSOC);

echo json_encode($products, JSON_UNESCAPED_UNICODE);

$conn->close();
?>
