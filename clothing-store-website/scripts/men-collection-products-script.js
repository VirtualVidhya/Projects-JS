// document.addEventListener("DOMContentLoaded", () => {
//   const productsContainer = document.getElementById("product-grid");

//   fetch("/clothing-store-website/assets/data/men-collection-products-data.json")
//     .then((response) => response.json())
//     .then((data) => {
//       const productsHTML = data.products
//         .map(
//           (product) => `
//                   <a href="#" class="product-card">
//                       <div class="product-img-holder">
//                           <div class="product-img"></div>
//                       </div>
//                       <p class="product-name">
//                           ${product.name}
//                       </p>
//                       <p class="product-desc">${product.description}</p>
//                       <p class="product-price">rs. ${product.price}</p>
//                   </a>
//               `
//         )
//         .join("");

//       productsContainer.innerHTML = productsHTML;

//       const productImages = document.querySelectorAll(".product-img");
//       productImages.forEach((img, index) => {
//         img.style.backgroundImage = `url('${data.products[index].image}')`;
//       });
//     });
// });

document.addEventListener("DOMContentLoaded", () => {
  const productsContainer = document.getElementById("product-grid");
  const categoryFilter = document.getElementById("category-filter");
  const colorFilters = document.querySelectorAll("input[name='color']");
  const priceFilters = document.querySelectorAll("input[name='price']");
  const applyFiltersBtn = document.getElementById("apply-filters-btn");

  let allProducts = [];

  // Fetch Products from JSON
  fetch("../../assets/data/men-collection-products-data.json")
    .then((response) => response.json())
    .then((data) => {
      allProducts = data.products; // Store all products globally
      renderProducts(allProducts); // Initial render of all products
    });

  // Render Products
  function renderProducts(products) {
    const productsHTML = products
      .map(
        (product) => `
                <a href="#" class="product-card">
                    <div class="product-img-holder">
                        <div class="product-img" style="background-image: url('${product.image}')"></div>
                    </div>
                    <p class="product-name">${product.name}</p>
                    <p class="product-desc">${product.description}</p>
                    <p class="product-price">Rs. ${product.price}</p>
                </a>
            `
      )
      .join("");

    productsContainer.innerHTML = productsHTML;
  }

  // Get Selected Filters
  function getSelectedFilters() {
    const selectedCategory = categoryFilter.value;

    const selectedColors = Array.from(colorFilters)
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.value);

    const selectedPrice =
      Array.from(priceFilters).find((radio) => radio.checked)?.value || "all";

    return { selectedCategory, selectedColors, selectedPrice };
  }

  // Filter Products
  function filterProducts() {
    const { selectedCategory, selectedColors, selectedPrice } =
      getSelectedFilters();

    const filteredProducts = allProducts.filter((product) => {
      // CATEGORY FILTER
      if (
        selectedCategory !== "all" &&
        product.category.toLowerCase() !== selectedCategory.toLowerCase()
      )
        return false;

      // COLOR FILTER
      if (selectedColors.length > 0 && !selectedColors.includes(product.color))
        return false;

      // PRICE FILTER
      if (selectedPrice !== "all") {
        const [min, max] = selectedPrice.split("-").map(Number);
        if (product.price < min || product.price > max) return false;
      }

      return true;
    });

    renderProducts(filteredProducts);
  }

  // Apply Filters on Button Click
  applyFiltersBtn.addEventListener("click", filterProducts);
});
