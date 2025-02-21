document.addEventListener("DOMContentLoaded", () => {
  const productsContainer = document.getElementById("product-grid");

  fetch("/assets/data/landing-page-products-data.json")
    .then((response) => response.json())
    .then((data) => {
      const productsHTML = data.products
        .map(
          (product) => `
                <a href="#" class="product-card">
                    <div class="product-img-holder">
                        <div class="product-img"></div>
                    </div>
                    <p class="product-name">
                        ${product.name}
                    </p>
                    <p class="product-desc">${product.description}</p>
                    <p class="product-price">rs. ${product.price}</p>
                </a>
            `
        )
        .join("");

      productsContainer.innerHTML = productsHTML;

      const productImages = document.querySelectorAll(".product-img");
      productImages.forEach((img, index) => {
        img.style.backgroundImage = `url('${data.products[index].image}')`;
      });
    });
});
