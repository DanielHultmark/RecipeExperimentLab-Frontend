import { Paper, Typography } from "@mui/material";

const AdminPage = () => {
  return (
    <Paper elevation={3} sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Administratör
      </Typography>

      <Typography color="text.secondary">
        Här kommer du kunna hantera användare och roller.
      </Typography>
    </Paper>
  );
};

export default AdminPage;