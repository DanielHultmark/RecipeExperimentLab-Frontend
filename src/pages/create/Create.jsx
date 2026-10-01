import { Alert, Box, Container, Typography } from "@mui/material";
import RecipeForm from "../../components/recipeForm/RecipeForm";

export default function Create({ user, onNavigate }) {
  if (!user) {
    return (
      <Container maxWidth="sm" sx={{ py: 5 }}>
        <Alert severity="info">
          Du behöver vara inloggad för att kunna skapa ett recept.
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4">Nytt recept</Typography>
        <Typography color="text.secondary">
          Lägg till ett recept i din receptbank.
        </Typography>
      </Box>

      <RecipeForm onSaved={() => onNavigate("recipes")} />
    </Container>
  );
}
