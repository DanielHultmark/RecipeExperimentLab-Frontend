import { useEffect, useState } from "react";
import { Alert, Box, Button, Card, CardContent, CircularProgress, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import StarIcon from "@mui/icons-material/Star";
import CategoryIcon from "@mui/icons-material/Category";
import { recipeService } from "../../services/RecipeService";

function SummaryCard({ icon, label, value }) {
  return <Card><CardContent><Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
    {icon}<Box><Typography color="text.secondary" variant="body2">{label}</Typography><Typography variant="h4">{value}</Typography></Box>
  </Stack></CardContent></Card>;
}

export default function Dashboard({ user, onNavigate }) {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    recipeService.getAll().then(setRecipes).catch(() => setError("Kunde inte hämta din sammanställning.")).finally(() => setLoading(false));
  }, []);

  if (loading) return <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}><CircularProgress /></Box>;
  if (error) return <Alert severity="error">{error}</Alert>;

  const averageScore = recipes.length ? (recipes.reduce((sum, recipe) => sum + recipe.score, 0) / recipes.length).toFixed(1) : "–";
  const styles = recipes.reduce((result, recipe) => ({ ...result, [recipe.style]: (result[recipe.style] ?? 0) + 1 }), {});
  const favouriteStyle = Object.entries(styles).sort(([, left], [, right]) => right - left)[0]?.[0] ?? "–";

  return <Box>
    <Stack direction={{ xs: "column", sm: "row" }} sx={{ justifyContent: "space-between", alignItems: { xs: "flex-start", sm: "center" }, mb: 4 }}>
      <Box><Typography variant="h4">Hej {user.fullName}!</Typography><Typography color="text.secondary">Här är din receptöversikt.</Typography></Box>
      <Button variant="contained" startIcon={<AddIcon />} onClick={() => onNavigate("create")}>Nytt recept</Button>
    </Stack>
    <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" }, gap: 2, mb: 4 }}>
      <SummaryCard icon={<RestaurantMenuIcon color="primary" />} label="Mina recept" value={recipes.length} />
      <SummaryCard icon={<StarIcon color="warning" />} label="Genomsnittligt betyg" value={averageScore} />
      <SummaryCard icon={<CategoryIcon color="secondary" />} label="Vanligaste stil" value={favouriteStyle} />
    </Box>
    <Typography variant="h5" sx={{ mb: 2 }}>Senaste recept</Typography>
    {recipes.length === 0 ? <Typography color="text.secondary">Du har inga recept ännu.</Typography> : <Stack spacing={1}>
      {recipes.slice(-3).reverse().map(recipe => <Card key={recipe.id}><CardContent><Typography variant="h6">{recipe.name}</Typography><Typography color="text.secondary">{recipe.style} · {recipe.score}/5</Typography></CardContent></Card>)}
    </Stack>}
  </Box>;
}
