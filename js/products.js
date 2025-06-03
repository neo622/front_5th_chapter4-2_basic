async function loadProducts() {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    if (!response.ok) {
      throw new Error(`error status: ${response.status}`);
    }
    const products = await response.json();
    displayProducts(products);
  } catch (error) {
    console.error("Failed to load products:", error);
    // 에러 발생 시 빈 배열로 처리하여 앱이 계속 동작하도록 함
    displayProducts([]);
  }
}

function displayProducts(products) {
  const container = document.querySelector("#all-products .container");
  if (!container) return;

  // DocumentFragment를 사용하여 DOM 조작 최적화
  const fragment = document.createDocumentFragment();

  products.forEach((product) => {
    const productElement = document.createElement("div");
    productElement.classList.add("product");

    const pictureDiv = document.createElement("div");
    pictureDiv.classList.add("product-picture");

    // 이미지 최적화
    const img = document.createElement("img");
    img.src = product.image;
    img.alt = `product: ${product.title}`;
    img.width = 128;
    img.height = 128;
    img.loading = "lazy";
    img.decoding = "async";

    // 이미지 로드 에러 처리
    img.onerror = () => {
      img.src = "images/fallback.webp"; // 대체 이미지
      img.onerror = null; // 무한 루프 방지
    };

    pictureDiv.appendChild(img);

    const infoDiv = document.createElement("div");
    infoDiv.classList.add("product-info");

    const category = document.createElement("h5");
    category.classList.add("categories");
    category.textContent = product.category;

    const title = document.createElement("h4");
    title.classList.add("title");
    title.textContent = product.title;

    const price = document.createElement("h3");
    price.classList.add("price");
    const priceSpan = document.createElement("span");
    priceSpan.textContent = `US$ ${product.price}`;
    price.appendChild(priceSpan);

    const button = document.createElement("button");
    button.textContent = "Add to bag";

    infoDiv.appendChild(category);
    infoDiv.appendChild(title);
    infoDiv.appendChild(price);
    infoDiv.appendChild(button);

    productElement.appendChild(pictureDiv);
    productElement.appendChild(infoDiv);

    fragment.appendChild(productElement);
  });

  container.appendChild(fragment);
}

loadProducts();

// Simulate heavy operation. It could be a complex price calculation.
// for (let i = 0; i < 10000000; i++) {
//     const temp = Math.sqrt(i) * Math.sqrt(i);
// }
