import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const Message = (props) => {
  return (
    <Grid container justifyContent="center" spacing={2}>
      <Grid item xs={12} md={8}>
        <Paper sx={{ p: 2 }}>
          <Grid container alignItems="center" spacing={2}>
            {props.speaks === "bot" && (
              <Grid item>
                <Button
                  variant="contained"
                  size="large"
                  sx={{ backgroundColor: "#66BB6A" }}
                >
                  <Typography variant="body1" fontWeight="bold">
                    {props.speaks}
                  </Typography>
                </Button>
              </Grid>
            )}
            <Grid item xs>
              <Typography variant="body1" fontWeight="bold">
                {props.text}
              </Typography>
            </Grid>
            {props.speaks === "me" && (
              <Grid item>
                <Button
                  variant="contained"
                  size="large"
                  sx={{ backgroundColor: "#66BB6A" }}
                >
                  <Typography variant="body1" fontWeight="bold">
                    {props.speaks}
                  </Typography>
                </Button>
              </Grid>
            )}
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Message;
