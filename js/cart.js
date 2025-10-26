// ===========================================
// shop page 


document.addEventListener("DOMContentLoaded", () => {
  // সব Add to Cart বাটন সিলেক্ট করছি
  const buttons = document.querySelectorAll(".cart-icon");

  buttons.forEach((btn) => {
    btn.addEventListener("click", function(e) {
      e.preventDefault(); // anchor redirect বন্ধ করলাম

      // পণ্যের কার্ড ধরছি (anchor এর parentElement হচ্ছে .card)
      const card = btn.closest(".card");
      if (!card) return;

      // product info সংগ্রহ
      const image = card.querySelector("img")?.getAttribute("src") || "";
      const name = card.querySelector("h4")?.innerText?.trim() || "Unnamed";
      // h5 এর মধ্যে "$70" আকারে আছে — $ সরিয়ে number নেওয়া হচ্ছে
      const priceText = card.querySelector("h5")?.innerText || "$0";
      const price = Number(priceText.replace(/[^0-9.-]+/g,"")) || 0;

      const product = {
        id: name + "-" + price, // সহজ unique key (optional: ব্যবহার করে দাও data-id ভালো)
        image,
        name,
        price,
        qty: 1
      };

      // localStorage থেকে cart নাও
      const cart = JSON.parse(localStorage.getItem("cart")) || [];

      // একই পণ্য আছে কি খুঁজো (id বা name দিয়ে)
      const existing = cart.find(item => item.id === product.id || item.name === product.name);
      if (existing) {
        existing.qty = (existing.qty || 1) + 1;
      } else {
        cart.push(product);
      }

      // save করো
      localStorage.setItem("cart", JSON.stringify(cart));

      // optional: small UI feedback (নটিফিকেশন/কাউন্টার আপডেট)
      alert(product.name + " added to cart!");
    });
  });
});


// ==============================================
// cart calculation

function loadCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const tbody = document.querySelector("tbody");
  let subtotal = 0;
  tbody.innerHTML = "";

  cart.forEach((item, index) => {
    let totalPrice = item.price * item.qty;
    subtotal += totalPrice;

    tbody.innerHTML += `
      <tr>
        <td><i class="fa-solid fa-xmark" onclick="removeItem(${index})"></i></td>
        <td><img src="${item.image}" width="50"></td>
        <td>${item.name}</td>
        <td>$${item.price}</td>
        <td><input type="number" value="${item.qty}" min="1" onchange="updateQty(${index}, this.value)"></td>
        <td>$${totalPrice}</td>
      </tr>
    `;
  });

  // Update totals
  document.getElementById("subtotal").innerText = '$' + subtotal;
  let shipping = 2;
  let discount = subtotal * 0.1;
  let total = subtotal + shipping - discount;

  document.getElementById("shipping").innerText = '$' + shipping;
  document.getElementById("discount").innerText = '$' + discount.toFixed(2);
  document.getElementById("total").innerText = '$' + total.toFixed(2);
}

function updateQty(index, newQty) {
  let cart = JSON.parse(localStorage.getItem("cart"));
  cart[index].qty = Number(newQty);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem("cart"));
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

// Page Load হলে data show হবে
window.onload = loadCart;

// ===============================================
