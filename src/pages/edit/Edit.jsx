import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import RecipeForm from "../../components/recipeForm/RecipeForm";
import { recipeService } from "../../services/RecipeService";

export default function Edit({ recipeId, onNavigate }) {
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadRecipe() {
      try {
        const data = await recipeService.getById(recipeId);
        setRecipe(data);
      } catch (requestError) {
        setError(
          requestError.response?.data ||
            "Kunde inte hämta receptet."
        );
      }
    }

    loadRecipe();
  }, [recipeId]);

  if (error) {
    return (
      <Container maxWidth="md">
        <Alert severity="error" sx={{ mb: 2 }}>
          {typeof error === "string" ? error : "Kunde inte hämta receptet."}
        </Alert>

        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => onNavigate("recipes")}
        >
          Tillbaka till recepten
        </Button>
      </Container>
    );
  }

  if (!recipe) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="md">
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => onNavigate("recipes")}
        sx={{ mb: 2 }}
      >
        Tillbaka till recepten
      </Button>

      <Typography variant="h4" sx={{ mb: 3 }}>
        Redigera recept
      </Typography>

      <RecipeForm
        initialRecipe={recipe}
        onSaved={() => onNavigate("recipes")}
      />
    </Container>
  );
}