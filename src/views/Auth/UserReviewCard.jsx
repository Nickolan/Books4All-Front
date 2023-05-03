import { AiFillStar } from "react-icons/ai";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  CardMedia,
  Grid,
  Box,
} from "@mui/material";
import { useSelector } from "react-redux";
import { MdOutlineModeEdit } from "react-icons/md";
import { useState } from "react";
import { ReviewEditForm } from "../../components/ReviewEditForm/ReviewEditForm";

const UserReviewCard = ({ id, body, rating, user_name, book }) => {
  const user = useSelector((state) => state.dbUser);
  const [showEditForm, setShowEditForm] = useState(false);
  const handleChange = (e) => {
    e.preventDefault();
    setShowEditForm(true);
  };
  return (
    <Card>
            <div>
              {user.name === user_name ? (
                <button
                  onClick={handleChange}
                  style={{ border: "none", backgroundColor: "transparent" }}
                >
                  {" "}
                  <MdOutlineModeEdit />{" "}
                </button>
              ) : null}
            </div>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <CardMedia
              style={{ height: 80, width: 60, margin: 0 }}
              image={book.image}
              title={book.title}
            />
          </Grid>
          <Grid item xs={12} sm={8}>
            <Typography variant="h6" component="h2">
              {book.title}
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <Typography variant="h6" color="textSecondary" sx={{ mr: 1 }}>
                Rating: {rating}
              </Typography>
              <AiFillStar
                color="#ffc107"
                sx={{ marginBottom: 3, marginLeft: 1 }}
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5" component="p" align="center">
              {body}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <div>
    {showEditForm && <ReviewEditForm userName={user.name} setShowEditForm={setShowEditForm} showEditForm={showEditForm} id={id} rating={rating} body={body} bookId={book.id} />}
      </div>
    </Card>
  );
};

export default UserReviewCard;
