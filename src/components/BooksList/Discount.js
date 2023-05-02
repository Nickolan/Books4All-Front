const resultDiscount = (discount, originalPrice) => {
    const descuento = 100 - discount;   // 100 - 10 = 90
    let total = (descuento * originalPrice) / 100;
    return total;
}