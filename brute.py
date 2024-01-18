import math,sys
productA = {
  "name": "Product-A",

  "price": 20,
  "quantity": 0,
  "total": 0,
  "isGift": False,
};
productB = {
  "name": "Product-B",
  "price": 40,
  "quantity": 0,
  "total": 0,
  "isGift": False,
};
productC = {
  "name": "Product-C",
  "price": 50,
  "quantity": 0,
  "total": 0,
  "isGift": False,
};
discountSchemes = {
  "flat_10_discount": 0,
  "bulk_5_discount": 0,
  "bulk_10_discount": 0,
  "tiered_50_discount": 0,
};
fees = {
  "giftWrap": 0,
  "shipping": 0,
};
products = [productA,productB,productC]
#enter the quantities
productA["quantity"] = int(input("enter quantity of %s\t"%(productA.get("name"))));
productB["quantity"] = int(input("enter quantity of %s\t"%(productB.get("name"))));
productC["quantity"] = int(input("enter quantity of %s\t"%(productC.get("name"))));

#enter if product is to be giftwrapped
# productA.isGift = True;
productA["isGift"] = input('Do you want %s to be gift wrapped? Enter "yes" or "no" :\n'%(productA.get("name")));
productB["isGift"] = input('Do you want %s to be gift wrapped? Enter "yes" or "no" :\n'%(productB.get("name")));
productC["isGift"] = input('Do you want %s to be gift wrapped? Enter "yes" or "no" :\n'%(productC.get("name")));

total = 0;
totalQuantity = 0
for product in products:
    product["total"] = product["quantity"] * product["price"]
    total += product["total"]
    totalQuantity += product["quantity"]
    if product["isGift"] == "yes":
        fees["giftWrap"] += product["quantity"];
    packages = product["quantity"] / 10;
    if product["quantity"] % 10 == 0:
        fees["shipping"] += packages * 5;
    else:
        packages = math.ceil(packages);
        fees["shipping"] += packages * 5;
print(total, totalQuantity)

#calculating Discounts
if total > 200 : #give flat $10 discount on total
    discountSchemes["flat_10_discount"] = total - 10;
tempTotal = 0
for product in products:
    if product["quantity"] > 10: #give 5% discount on product's price
        discountedProductTotal = product["quantity"] * product["price"] * 0.95;
        tempTotal += discountedProductTotal;
    else: tempTotal += product["total"]
discountSchemes["bulk_5_discount"] = tempTotal;

if totalQuantity > 20: #give 10% discount on the total
    discountSchemes["bulk_10_discount"] = total * 0.9;

tempTotal = 0
if totalQuantity > 30:
    for product in products:
        if product["quantity"] > 15: #apply 50% discount on product price after 15 quantity
            tempTotal += product["price"] * 15 + product["price"] * 0.5 * (product["quantity"] - 15);
        else: tempTotal += product["total"]
    discountSchemes["tiered_50_discount"] = tempTotal

for product in products:
    print('Name:%s\tQuantity:%s\tAmount:%s'%(product["name"],product["quantity"],product["total"]))
print('Subtotal: %s'%(total))

#Picking the best Discount for customer
discountCodes = discountSchemes.keys()
min = sys.maxsize
discountName = ""
for discountCode in discountCodes:
    if discountSchemes[discountCode] < min:
        min = discountSchemes[discountCode]
        discountName = discountCode

# Final Output
print('Discount code: %s is applied,the total is %s'%(discountName,discountSchemes[discountName]))
print('Shipping fee: %s \n GiftWrap fee: %s'%(str(fees["shipping"]),str(fees["giftWrap"])))
print("Total: %s"%(discountSchemes[discountName]+fees["shipping"]+fees["giftWrap"]))