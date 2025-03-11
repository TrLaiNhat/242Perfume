// Show cart sidebar when clicking on cart icon
document.getElementById('cart-icon').addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('cart-sidebar').classList.add('active');
    document.getElementById('overlay').classList.add('active');
});

// Hide cart sidebar when clicking on close button or overlay
document.getElementById('close-cart').addEventListener('click', function() {
    document.getElementById('cart-sidebar').classList.remove('active');
    document.getElementById('overlay').classList.remove('active');
});

document.getElementById('overlay').addEventListener('click', function() {
    document.getElementById('cart-sidebar').classList.remove('active');
    document.getElementById('overlay').classList.remove('active');
});

// Add to cart functionality
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartCount = document.querySelector('.cart-count');
let count = 0;

addToCartButtons.forEach(button => {
    button.addEventListener('click', function() {
        count++;
        cartCount.textContent = count;
        
// Here you would typically add the product to the cart
// For this demo, we're just updating the count
    alert('Đã thêm sản phẩm vào giỏ hàng!');
});
});
fetch("http://localhost/242Perfume-website/get_products.php")
.then(response => response.json())
.then(data => {
    let productList = document.getElementById("product-list");
    data.forEach(product => {
        let productDiv = document.createElement("div");
        productDiv.innerHTML = `
            <h3>${product.product_name}</h3>
            <p>Giá: ${product.price.toLocaleString()} VND</p>
            <img src="${product.image}" alt="${product.product_name}" width="150">
        `;
        productList.appendChild(productDiv);
    });
})
.catch(error => console.error("Lỗi khi tải sản phẩm:", error));

function goToCheckout() {
    window.location.href = 'checkout.html';
}


document.addEventListener("DOMContentLoaded", function () {
    const productGrid = document.querySelector(".product-grid");
    const sortSelect = document.getElementById("sort-by");

    if (!productGrid || !sortSelect) {
        console.error("Không tìm thấy phần tử cần thiết trong DOM.");
        return;
    }

    // Lấy tất cả sản phẩm từ .product-grid
    let products = Array.from(productGrid.children);

    // Hàm trích xuất giá từ chuỗi "Giá: 600.000 đ"
    function extractPrice(product) {
        let priceText = product.querySelector(".product-price").innerText;
        return parseInt(priceText.replace(/\D+/g, ""), 10); // Chuyển thành số
    }

    // Hàm sắp xếp và cập nhật giao diện
    function sortProducts(criteria) {
        let sortedProducts = [...products]; // Tạo bản sao để sắp xếp

        if (criteria === "price-low") {
            sortedProducts.sort((a, b) => extractPrice(a) - extractPrice(b));
        } else if (criteria === "price-high") {
            sortedProducts.sort((a, b) => extractPrice(b) - extractPrice(a));
        }

        // Xóa sản phẩm cũ & thêm sản phẩm đã sắp xếp vào giao diện
        productGrid.innerHTML = "";
        sortedProducts.forEach(product => productGrid.appendChild(product));
    }

    // Thêm sự kiện khi chọn kiểu sắp xếp
    sortSelect.addEventListener("change", function () {
        sortProducts(this.value);
    });

    // Khởi động sắp xếp theo mặc định
    sortProducts("price");
});

fetch("http://localhost/242Perfume-website/get_products.php")
    .then(response => response.json())
    .then(products => {
        const productGrid = document.querySelector(".product-grid");
        productGrid.innerHTML = ""; // Xóa sản phẩm cũ

        products.forEach(product => {
            const productCard = `
                <div class="product-card">
                    <div class="product-image">
                        <img src="${product.image}" alt="${product.product_name}">
                    </div>
                    <div class="product-info">
                        <div class="product-name">${product.product_name}</div>
                        <div class="product-brand">${product.brand}</div>
                        <div class="product-price">Giá: ${product.price.toLocaleString()} đ</div>
                        <button class="add-to-cart">Thêm vào giỏ hàng</button>
                    </div>
                </div>
            `;
            productGrid.innerHTML += productCard;
        });
    })
    .catch(error => console.error("Lỗi khi tải sản phẩm:", error));

    document.addEventListener("DOMContentLoaded", function () {
        // Kiểm tra xem phần tử có tồn tại trước khi thêm sự kiện
        const cartIcon = document.getElementById('cart-icon');
        const cartSidebar = document.getElementById('cart-sidebar');
        const overlay = document.getElementById('overlay');
        const closeCart = document.getElementById('close-cart');
    
        if (cartIcon && cartSidebar && overlay) {
            cartIcon.addEventListener('click', function (e) {
                e.preventDefault();
                cartSidebar.classList.add('active');
                overlay.classList.add('active');
            });
    
            overlay.addEventListener('click', function () {
                cartSidebar.classList.remove('active');
                overlay.classList.remove('active');
            });
    
            if (closeCart) {
                closeCart.addEventListener('click', function () {
                    cartSidebar.classList.remove('active');
                    overlay.classList.remove('active');
                });
            }
        } else {
            console.error("Không tìm thấy phần tử giỏ hàng trong DOM!");
        }
    });
    
        
    
        // Gọi API lấy sản phẩm
        fetch("http://localhost/242Perfume-website/get_products.php")
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Lỗi HTTP: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                let productList = document.getElementById("product-list");
                if (productList) {
                    data.forEach(product => {
                        let productDiv = document.createElement("div");
                        productDiv.innerHTML = `
                            <h3>${product.product_name}</h3>
                            <p>Giá: ${product.price.toLocaleString()} VND</p>
                            <img src="${product.image}" alt="${product.product_name}" width="150">
                        `;
                        productList.appendChild(productDiv);
                    });
                }
            })
            .catch(error => console.error("Lỗi khi tải sản phẩm:", error));
    
        // Chuyển đến trang thanh toán
        window.goToCheckout = function () {
            window.location.href = 'checkout.html';
        };
    
        // Sắp xếp sản phẩm theo giá
        document.addEventListener('DOMContentLoaded', () => {
            // Sort functionality
            const sortSelect = document.getElementById('sort-by');
            const productContainer = document.querySelector('.product-container'); // Assuming you have a container for products
        
            sortSelect.addEventListener('change', (event) => {
                const sortValue = event.target.value;
                const products = Array.from(productContainer.querySelectorAll('.product-item')); // Assuming each product has a class 'product-item'
        
                products.sort((a, b) => {
                    const priceA = parseFloat(a.querySelector('.product-price').textContent.replace(/[^0-9.-]+/g,""));
                    const priceB = parseFloat(b.querySelector('.product-price').textContent.replace(/[^0-9.-]+/g,""));
                    const ratingA = parseFloat(a.querySelector('.product-rating').textContent) || 0;
                    const ratingB = parseFloat(b.querySelector('.product-rating').textContent) || 0;
        
                    switch(sortValue) {
                        case 'product-price-low':
                            return priceA - priceB;
                        case 'product-price-high':
                            return priceB - priceA;
                        case 'product-rating':
                            return ratingB - ratingA;
                        default:
                            return 0;
                    }
                });
        
                // Re-append sorted products to container
                products.forEach(product => productContainer.appendChild(product));
            });
        
            // Price range filter
            const priceRangeInput = document.querySelector('.price-range input[type="range"]');
            const priceRangeValue = document.createElement('div');
            priceRangeValue.id = 'price-range-value';
            priceRangeValue.style.marginBottom = '10px';
            priceRangeInput.parentNode.insertBefore(priceRangeValue, priceRangeInput);
        
            priceRangeInput.addEventListener('input', (event) => {
                const maxPrice = event.target.value;
                priceRangeValue.textContent = `Giá: 0 - ${new Intl.NumberFormat('vi-VN').format(maxPrice)} VNĐ`;
        
                const products = document.querySelectorAll('.product-item');
                products.forEach(product => {
                    const productPrice = parseFloat(product.querySelector('.product-price').textContent.replace(/[^0-9.-]+/g,""));
                    
                    if (productPrice <= maxPrice) {
                        product.style.display = 'block';
                    } else {
                        product.style.display = 'none';
                    }
                });
            });
        });

        
    document.addEventListener("DOMContentLoaded", function () {
        // Kiểm tra xem phần tử có tồn tại trước khi thêm sự kiện
        const cartIcon = document.getElementById('cart-icon');
        const cartSidebar = document.getElementById('cart-sidebar');
        const overlay = document.getElementById('overlay');
        const closeCart = document.getElementById('close-cart');
    
        if (cartIcon && cartSidebar && overlay) {
            cartIcon.addEventListener('click', function (e) {
                e.preventDefault();
                cartSidebar.classList.add('active');
                overlay.classList.add('active');
            });
    
            overlay.addEventListener('click', function () {
                cartSidebar.classList.remove('active');
                overlay.classList.remove('active');
            });
    
            if (closeCart) {
                closeCart.addEventListener('click', function () {
                    cartSidebar.classList.remove('active');
                    overlay.classList.remove('active');
                });
            }
        } else {
            console.error("Không tìm thấy phần tử giỏ hàng trong DOM!");
        }
    
        // Xử lý thêm vào giỏ hàng
        const addToCartButtons = document.querySelectorAll('.add-to-cart');
        const cartCount = document.querySelector('.cart-count');
        let count = 0;
    
        addToCartButtons.forEach(button => {
            button.addEventListener('click', function () {
                count++;
                if (cartCount) {
                    cartCount.textContent = count;
                }
                alert('Đã thêm sản phẩm vào giỏ hàng!');
            });
        });
    
        // Gọi API lấy sản phẩm
        fetch("http://localhost/242Perfume-website/get_products.php")
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Lỗi HTTP: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                let productList = document.getElementById("product-list");
                if (productList) {
                    data.forEach(product => {
                        let productDiv = document.createElement("div");
                        productDiv.innerHTML = `
                            <h3>${product.product_name}</h3>
                            <p>Giá: ${product.price.toLocaleString()} VND</p>
                            <img src="${product.image}" alt="${product.product_name}" width="150">
                        `;
                        productList.appendChild(productDiv);
                    });
                }
            })
            .catch(error => console.error("Lỗi khi tải sản phẩm:", error));
    
        // Chuyển đến trang thanh toán
        window.goToCheckout = function () {
            window.location.href = 'checkout.html';
        };
    
        // Sắp xếp sản phẩm theo giá
        const productGrid = document.querySelector(".product-grid");
        const sortSelect = document.getElementById("sort-by");
    
        if (productGrid && sortSelect) {
            let products = Array.from(document.querySelectorAll(".product-card"));
    
            function extractPrice(product) {
                let priceText = product.querySelector(".product-price").innerText;
                return parseInt(priceText.replace(/\D+/g, "")); // Lọc bỏ ký tự không phải số
            }
    
            function sortProducts(criteria) {
                let sortedProducts = [...products];
                switch (criteria) {
                    case "price-low":
                        sortedProducts.sort((a, b) => extractPrice(a) - extractPrice(b));
                        break;
                    case "price-high":
                        sortedProducts.sort((a, b) => extractPrice(b) - extractPrice(a));
                        break;
                }
                productGrid.innerHTML = "";
                sortedProducts.forEach(product => productGrid.appendChild(product));
            }
    
            sortSelect.addEventListener("change", function () {
                sortProducts(this.value);
            });
    
            sortProducts("price-low");
        }
    });
   
    async function fetchProducts() {
        try {
            let response = await fetch("http://localhost/242Perfume-website/get_products.php");
            
            if (!response.ok) {
                throw new Error(`Lỗi HTTP: ${response.status}`);
            }
    
            let products = await response.json();
            console.log("Dữ liệu sản phẩm đã tải:", products);
        } catch (error) {
            console.error("Lỗi khi tải sản phẩm:", error);
        }
    }
    
    // Gọi API để lấy danh sách sản phẩm
    fetchProducts();
    
//chatbot
// Lấy các phần tử DOM
const chatbotIcon = document.getElementById('chatbot-icon');
const chatbotPanel = document.getElementById('chatbot-panel');
const closeChat = document.getElementById('close-chat');
const chatInput = document.getElementById('chat-input');
const sendBtn = document.getElementById('send-btn');
const chatMessages = document.getElementById('chat-messages');

// Sự kiện mở/đóng chatbot
chatbotIcon.addEventListener('click', () => {
    chatbotPanel.classList.toggle('open');
});

closeChat.addEventListener('click', () => {
    chatbotPanel.classList.remove('open');
});

// Sự kiện gửi tin nhắn
sendBtn.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const message = chatInput.value.trim();
    if (message) {
        // Hiển thị tin nhắn người dùng
        const userMessageEl = document.createElement('div');
        userMessageEl.textContent = `Bạn: ${message}`;
        userMessageEl.style.marginBottom = '10px';
        userMessageEl.style.textAlign = 'right';
        chatMessages.appendChild(userMessageEl);

        // Giả lập trả lời AI (bạn có thể thay thế bằng API thực)
        const aiMessageEl = document.createElement('div');
        aiMessageEl.textContent = `AI: Cảm ơn tin nhắn của bạn. Đây là phản hồi mẫu.`;
        aiMessageEl.style.marginBottom = '10px';
        aiMessageEl.style.color = '#3b82f6';
        chatMessages.appendChild(aiMessageEl);

        // Cuộn xuống dưới cùng
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // Xóa nội dung input
        chatInput.value = '';
    }
};
document.addEventListener('DOMContentLoaded', function() {
    // Xử lý dropdown menu
    const userDropdown = document.getElementById('userDropdown');
    const dropdownMenu = document.getElementById('dropdownMenu');
    
    userDropdown.addEventListener('click', function() {
        dropdownMenu.classList.toggle('active');
    });
    
    // Đóng dropdown khi nhấp ra ngoài
    document.addEventListener('click', function(event) {
        if (!userDropdown.contains(event.target) && !dropdownMenu.contains(event.target)) {
            dropdownMenu.classList.remove('active');
        }
    });
});