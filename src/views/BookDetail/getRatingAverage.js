export const handleRating = (reviews) => {
    if (reviews.length > 0) {
        const allRatings = reviews.map(rev => {
            return rev.rating;
        });
        let suma = 0;
        for (let i = 0; i < allRatings.length; i++) {
            suma += allRatings[i];
        }
        const rating = suma / allRatings.length;
        return rating;
    }
    return 0;
};