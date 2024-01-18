productA = {
  name: "Product-A",

  price: 20,
  quantity: 0,
  total: 0,
  isGift: false,
};
productB = {
  name: "Product-B",
  price: 40,
  quantity: 0,
  total: 0,
  isGift: false,
};
productC = {
  name: "Product-C",
  price: 50,
  quantity: 0,
  total: 0,
  isGift: false,
};
discountSchemes = {
  flat_10_discount: 0,
  bulk_5_discount: 0,
  bulk_10_discount: 0,
  tiered_50_discount: 0,
};
fees = {
  giftWrap: 0,
  shipping: 0,
};

//enter the quantities
productA.quantity = 20;
productB.quantity = 10;
productC.quantity = 10;

//enter if product is to be giftwrapped
productA.isGift = true;
productB.isGift = true;
productC.isGift = true;

productA.total = productA.quantity * productA.price;
if (productA.isGift) {
  fees.giftWrap += productA.quantity;
}

productB.total = productB.quantity * productB.price;
if (productB.isGift) {
  fees.giftWrap += productB.quantity;
}

productC.total = productC.quantity * productC.price;
if (productC.isGift) {
  fees.giftWrap += productC.quantity;
}
//Calculating the discounted prices acc. to schemes
let total = productA.total + productB.total + productC.total;
// console.log(total, "its total");
let totalQuantity = productA.quantity + productB.quantity + productC.quantity;
if (total > 200) discountSchemes.flat_10_discount = total - 10;
{
  let tempTotal = 0;
  if (productA.quantity > 10) {
    let discountedProductTotal = productA.quantity * productA.price * 0.95;
    tempTotal += discountedProductTotal;
  } else tempTotal += productA.total;
  if (productB.quantity > 10) {
    let discountedProductTotal = productB.quantity * productB.price * 0.95;
    tempTotal += discountedProductTotal;
  } else tempTotal += productB.total;
  if (productC.quantity > 10) {
    let discountedProductTotal = productC.quantity * productC.price * 0.95;
    tempTotal += discountedProductTotal;
  } else tempTotal += productC.total;

  discountSchemes.bulk_5_discount = tempTotal;
}

if (totalQuantity > 20) {
  discountSchemes.bulk_10_discount = total * 0.9;
}

if (totalQuantity > 30) {
  let tempTotal = 0;
  if (productA.quantity > 15) {
    // apply 50% discount on product price after 15 quantity
    tempTotal +=
      productA.price * 15 + productA.price * 0.5 * (productA.quantity - 15);
  } else tempTotal += productA.total;
  if (productB.quantity > 15) {
    // apply 50% discount on product price after 15 quantity
    tempTotal +=
      productB.price * 15 + productB.price * 0.5 * (productB.quantity - 15);
  } else tempTotal += productB.total;
  if (productC.quantity > 15) {
    // apply 50% discount on product price after 15 quantity
    tempTotal +=
      productC.price * 15 + productC.price * 0.5 * (productC.quantity - 15);
  } else tempTotal += productC.total;
  if (tempTotal < total) discountSchemes.tiered_50_discount = tempTotal;
}

// console.log(discountSchemes.flat_10_discount);
// console.log(discountSchemes.bulk_5_discount);
// console.log(discountSchemes.bulk_10_discount);
// console.log(discountSchemes.tiered_50_discount);

// calc shipping fee
arr = [productA, productB, productC];

arr.map((product) => {
  let packages = product["quantity"] / 10;
  if (product["quantity"] % 10 == 0) {
    fees.shipping += packages * 5;
  } else {
    packages = Math.ceil(packages);
    fees.shipping += packages * 5;
  }
});

// console.log(fees.shipping);
// console.log(fees.giftWrap);

arr.map((product) => {
  console.log(
    `Name:${product["name"]}\tQuantity:${product["quantity"]}\tAmount:${product["total"]}`
  );
});
console.log(`Subtotal:${total}`);

let keys = Object.keys(discountSchemes);
let min = Number.MAX_VALUE;
let discountName = "";
for (let i = 0; i < keys.length; i++) {
  if (discountSchemes[keys[i]] < min) {
    min = discountSchemes[keys[i]];
    discountName = keys[i];
  }
}
console.log(
  `Discount code: ${discountName} is applied,After discount,The total is ${discountSchemes[discountName]}`
);
console.log(`Shipping fee:${fees.shipping}\nGiftWrap fee:${fees.giftWrap}`);
console.log(`Total: ${discountSchemes[discountName]+fees.shipping+fees.giftWrap}`);