import React from "react";
import { Link } from "react-router-dom";
import noImage from "../../images/icon-image-not-found.webp";
import { FavButton } from "../../components/FavButton/FavButton";

const FavouritesCards = ({ id, name, categories, image }) => {
  return (
    <div
      class="m-3 d-inline-block bg-light "
      style={{ width: "140px", height: "260px", padding: "14px" }}
    >
      <FavButton name={name} book_id={id} isFav={true} />
      <Link style={{ textDecoration: "none" }} to={`/bookDetail/${id}`}>
        <div class="d-flex flex-column bg-light">
          <div style={{ width: "90px", height: "150px", margin: "0 auto" }}>
            {image ? (
              <img
                style={{ width: "90px", height: "150px" }}
                src={image}
                alt="book"
              />
            ) : (
              <img
                style={{ width: "90px", height: "150px" }}
                src={noImage}
                alt="not found"
              />
            )}
          </div>

          <h5
            style={{
              marginTop: "10px",
              marginLeft: "3px",
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
              overflow: "hidden",
              textOverflow: "ellipsis",
              fontSize: "14px",
              color: "black",
            }}
          >
            {name}
          </h5>
        </div>
      </Link>
    </div>
  );
};
export default FavouritesCards;
