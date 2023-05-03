import { AiFillStar } from 'react-icons/ai';
import { Card, CardHeader, CardContent, Typography, CardMedia, Grid, Box } from "@mui/material";

const UserReviewCard = ({ body, rating, user_name, book}) => {
    return (
      <Card>
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
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
              <Typography variant="h6" color="textSecondary" sx={{ mr: 1 }}>
                Rating: {rating}
              </Typography>
              <AiFillStar color='#ffc107' sx={{ marginBottom: 3, marginLeft: 1 }} />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5" component="p" align="center">
              {body}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
    )
}

export default UserReviewCard;