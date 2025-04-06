# 🖼️ Product Image Carousel Feature

# Overview
This is my submission for the Product Image Carousel challenge as part of the recruitment process.
It showcases a React and Bootstrap-based web application to add, view and explore product items, each with their own image carousel, description and pricing details with a focus on clean code, UI interactivity and great user experience.

# 🚀 Features

1. Add New Product Modal - Easily add a new a product via a form with inputs for:
- Product Name
- Description
- Price
- Multiple images
  
2. Success Popup - After a product is added, a success popup briefly appears to give instant feedback before disappearing automatically
   
3. Product Carousel Display - Added products are displayed in a responsive horizontal carousel showing:
- A product image
- Name and price
- Interactive hover effects
  
4. Product Details Modal - Clicking a product opens a centred modal showing:
- The product's name and full description
- A Bootstrap carousel to cycle through all the product's images
- A close button to return to the main view
  
5. Responsive Layout: Responsive design using Bootstrap Grid and utility classes. Optimized for both desktop and mobile.
6. Custom Styling - Custom CSS animations and effects for modals, buttons, cards, and image transistions, to ensure a polished and smooth UX.


# 👨🏽‍💻 Tech Stack

- React (Functional Components, JSX) - (front-end)
- Bootstrap 5 (via react-bootstrap) - UI Framework
- Custom CSS, Bootstrap Utility Classes - Styling
- React Hooks (useState) - State Handling
- Bootstrap Carousel (native implementation)
- Custom fade-in-classes, transistions via CSS

# 📝 Developer Notes to Take
- Bootstrap Carousel used instead of third-party libraries like react-slick, in line with the requirement to avoid many dependencies.
- Simple image input format (comma-separated URLs) ensures ease of use without overengineering.
- Carousel image transitions are native and smooth via Bootstrap.
- All modals are styled with subtle fade-in effects for better visual feedback.
- CSS is organized in modular files (App.css, ProductDetailsModal.css) to keep concerns separated.

# 🔧 Known Issues and Approach to Solving Them
✅ Resolved Issues

- Image URL Field Handling
Initially, users could add products without properly filling out the image URL or other fields. 

Solution: Native HTML5 form validation is used to ensure all fields are required before allowing submission. Fields show browser-generated messages like "Please fill out this field" on hover or submit. In future, enhanced validation (e.g., image URL pattern checking or live previews) can be added for robustness.

- Products Not Persisting on Reload
On refresh, all added products were lost.

Solution: Identified need for localStorage or backend integration, which is listed as a future improvement.

⚠️ Unresolved / Stretch Issues
- No Live Form Validation for URLs and Price 

Planned Approach: Use JavaScript regex or URL() constructor for basic validation and error messages.

# ⚙️ How to Run Locally

1. Clone the repository - https://github.com/alexbray45/product-image-carousel.git
2. Navigate into the folder - cd product-carousel-app
3. Install dependencies - npm install
4. Run the app: npm run dev OR npm start


# 💡 Future Improvements (Strech Goals)
- Add form validation for image URL, price and required fields
- Save products to local storage or a database for persistence
- Implement categories or tags for product filtering (search or sort by eg. Product name, Price)
- Improve accessibility with Accessible Rich Internet Applications (ARIA)

  # 📝 Author
  Designed and developed by Alexander Allotey-Bray
  
