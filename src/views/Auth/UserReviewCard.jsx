import { AiFillStar } from 'react-icons/ai';
import { Card, CardHeader, CardContent, Typography, CardMedia } from "@mui/material";

const UserReviewCard = ({ body, rating, user_name, book}) => {



    return (
        <Card>
        <CardHeader title={book.title} />
        <CardContent>
          <Typography variant="h6" color="textSecondary">
            Rating: {rating}
            <AiFillStar color='#ffc107' style={{ marginBottom: 3, marginLeft: 5 }} />
          </Typography>
          <Typography variant="body1" component="p">
            {body}
          </Typography>
          <CardMedia
            style={{ height: 200, width: 150, margin: 'auto', marginTop: 20 }}
            image={book.image}
            title={book.title}
          />
        </CardContent>
      </Card>
    )
}

export default UserReviewCard;