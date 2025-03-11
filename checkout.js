        // Giả lập dữ liệu giỏ hàng từ localStorage
        function loadCartFromStorage() {
            // Trong thực tế, dữ liệu này sẽ được lưu trong localStorage hoặc sessionStorage
            // Ở đây chúng ta sẽ giả lập dữ liệu mẫu
            return [
                {
                    id: 1,
                    name: "Sản phẩm mẫu 1",
                    price: 350000,
                    quantity: 2,
                    image: "product1.jpg"
                },
                {
                    id: 2,
                    name: "Sản phẩm mẫu 2",
                    price: 420000,
                    quantity: 1,
                    image: "product2.jpg"
                }
            ];
        }

        // Format số tiền VND
        function formatCurrency(amount) {
            return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
                .format(amount)
                .replace('₫', '₫');
        }

        // Hiển thị sản phẩm trong giỏ hàng
        function displayCartItems() {
            const cart = loadCartFromStorage();
            const cartItemsContainer = document.getElementById('cart-items');
            let subtotal = 0;
            
            cartItemsContainer.innerHTML = '';
            
            cart.forEach(item => {
                const itemTotal = item.price * item.quantity;
                subtotal += itemTotal;
                
                const cartItemElement = document.createElement('div');
                cartItemElement.className = 'cart-item';
                cartItemElement.innerHTML = `
                    <div class="item-image">Ảnh</div>
                    <div class="item-details">
                        <div class="item-name">${item.name}</div>
                        <div class="item-price">${formatCurrency(item.price)}</div>
                        <div class="item-quantity">Số lượng: ${item.quantity}</div>
                    </div>
                    <div class="item-total">${formatCurrency(itemTotal)}</div>
                `;
                
                cartItemsContainer.appendChild(cartItemElement);
            });
            
            // Cập nhật tóm tắt đơn hàng
            const shipping = 30000; // Phí vận chuyển mặc định
            const discount = 0; // Giảm giá mặc định
            
            document.getElementById('subtotal').textContent = formatCurrency(subtotal);
            document.getElementById('shipping').textContent = formatCurrency(shipping);
            document.getElementById('discount').textContent = formatCurrency(discount);
            document.getElementById('total').textContent = formatCurrency(subtotal + shipping - discount);
        }

        // Xử lý việc chọn phương thức thanh toán
        function setupPaymentMethods() {
            const paymentMethods = document.querySelectorAll('.payment-method');
            const creditCardForm = document.querySelector('.credit-card-form');
            
            paymentMethods.forEach(method => {
                method.addEventListener('click', () => {
                    // Loại bỏ class active từ tất cả các phương thức
                    paymentMethods.forEach(m => m.classList.remove('active'));
                    
                    // Thêm class active cho phương thức được chọn
                    method.classList.add('active');
                    
                    // Hiển thị form thẻ tín dụng nếu phương thức thanh toán là thẻ
                    if (method.dataset.method === 'card') {
                        creditCardForm.style.display = 'block';
                    } else {
                        creditCardForm.style.display = 'none';
                    }
                });
            });
        }

        // Xử lý nút đặt hàng
        function setupCheckoutButton() {
            const checkoutBtn = document.getElementById('checkout-btn');
            
            checkoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Kiểm tra form trước khi gửi
                const name = document.getElementById('name').value;
                const email = document.getElementById('email').value;
                const phone = document.getElementById('phone').value;
                const address = document.getElementById('address').value;
                
                if (!name || !email || !phone || !address) {
                    alert('Vui lòng điền đầy đủ thông tin thanh toán và địa chỉ giao hàng');
                    return;
                }
                
                // Xác nhận đơn hàng (trong thực tế sẽ gửi dữ liệu đến máy chủ)
                alert('Đặt hàng thành công! Cảm ơn bạn đã mua sắm.');
                
                // Xóa giỏ hàng sau khi đặt hàng thành công
                // localStorage.removeItem('cart');
                
                // Chuyển hướng đến trang xác nhận
                // window.location.href = 'confirmation.html';
            });
        }

        // Xử lý nút quay lại giỏ hàng
        function setupBackButton() {
            const backBtn = document.getElementById('back-to-cart');
            
            backBtn.addEventListener('click', (e) => {
                e.preventDefault();
                // Chuyển hướng về trang giỏ hàng
                // window.location.href = 'cart.html';
                alert('Quay lại giỏ hàng');
            });
        }

        // Khởi tạo trang
        window.addEventListener('DOMContentLoaded', () => {
            displayCartItems();
            setupPaymentMethods();
            setupCheckoutButton();
            setupBackButton();
        });