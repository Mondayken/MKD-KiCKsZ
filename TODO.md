# TODO: Enhance Cart Functionality

- [x] Fix product loading in app.js to flatten products.json into an array
- [x] Add updateQuantity(id, delta) function to increase/decrease quantity
- [x] Add removeFromCart(id) function to delete item from cart
- [x] Modify renderCart() to include quantity controls (-, qty, +, remove button) per item
- [x] Ensure renderCart() is called after quantity changes
- [x] Optionally add clear cart button in summary
- [x] Test cart functionality on cart.html

# TODO: Payment Integration and Deployment

- [x] Add submitOrderToServer function to app.js for order submission
- [x] Integrate Stripe payment option in checkout.html
- [x] Integrate Payfast payment option in checkout.html
- [x] Install Netlify CLI
- [x] Deploy website to Netlify
- [ ] Set environment variables for payment keys and secrets
- [ ] Test payment integrations
- [x] Update README.txt with deployment and payment setup instructions
