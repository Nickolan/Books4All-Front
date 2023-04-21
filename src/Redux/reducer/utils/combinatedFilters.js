export const combinatedFilters = (libros, genero, autor) => {
    return libros.filter((libro) => {
        if (genero === "all" && autor === "all") {
            return true;
        } else if (genero === "all" && autor !== "all") {
            return libro.authors?.includes(autor);
        } else if (genero !== "all" && autor === "all") {
            return libro.categories?.includes(genero);
        } else {
            return (
                libro.categories?.includes(genero) && libro.authors?.includes(autor)
            );
        }
    });
};



export default combinatedFilters