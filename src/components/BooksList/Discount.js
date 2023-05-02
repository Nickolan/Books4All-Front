export const resultDiscount = (discount, originalPrice) => {
    const descuento = 100 - discount;   // 100 - 10 = 90
    let total = (descuento * originalPrice) / 100;  // (90 * 16) / 100 = 
    return Math.floor(total);
}