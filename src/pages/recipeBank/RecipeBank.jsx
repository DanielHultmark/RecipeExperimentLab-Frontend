import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RecipeCard from "../../components/recipeCard/RecipeCard";
import { recipeService } from "../../services/RecipeService";

const RecipeBank = ({ user, onNavigate, onEdit }) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const loadRecipes = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await recipeService.getAll();
        setRecipes(data);
      } catch (error) {
        setError(
          error.response?.data ||
          "Kunde inte hämta recepten från servern."
        );
      } finally {
        setLoading(false);
      }
    };

    loadRecipes();
  }, [user]);

  if (!user) {
    return (
      <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>
          Logga in för att se receptbanken
        </Typography>

        <Button
          variant="contained"
          onClick={() => onNavigate("login")}
          sx={{ mt: 2 }}
        >
          Logga in
        </Button>
      </Paper>
    );
  }

  async function handleDelete(recipeId) {
    try {
      setError("");

      await recipeService.remove(recipeId);

      setRecipes((currentRecipes) =>
        currentRecipes.filter((recipe) => recipe.id !== recipeId)
      );
    } catch (error) {
      setError(
        error.response?.data ||
        "Kunde inte radera receptet."
      );
    }
  }

  return (
    <Box>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={{
          mb: 4,
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
        }}
      >
        <Box>
          <Typography variant="h4" component="h1">
            Receptbanken
          </Typography>

          <Typography color="text.secondary">
            Utforska och spara dina receptexperiment.
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => onNavigate("create")}
        >
          Skapa recept
        </Button>
      </Stack>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {typeof error === "string"
            ? error
            : "Kunde inte hämta recepten."}
        </Alert>
      )}

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress />
        </Box>
      ) : recipes.length === 0 ? (
        <Paper elevation={1} sx={{ p: 5, textAlign: "center" }}>
          <Typography variant="h6">Inga recept ännu</Typography>

          <Typography color="text.secondary" sx={{ mt: 1, mb: 3 }}>
            Skapa ditt första receptexperiment.
          </Typography>

          <Button variant="outlined" onClick={() => onNavigate("create")}>
            Skapa recept
          </Button>
        </Paper>
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
            },
            gap: 3,
          }}
        >
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onEdit={onEdit}
              onDelete={handleDelete}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default RecipeBank;