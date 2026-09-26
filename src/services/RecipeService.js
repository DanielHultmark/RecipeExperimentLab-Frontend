import {
  Card,
  CardContent,
  Chip,
  Divider,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";

const RecipeCard = ({ recipe }) => {
  return (
    <Card
      elevation={3}
      sx={{
        height: "100%",
        borderRadius: 3,
        transition: "0.2s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 8,
        },
      }}
    >
      <CardContent>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
          spacing={2}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <RestaurantMenuIcon color="primary" />
            <Typography variant="h6" component="h2">
              {recipe.name}
            </Typography>
          </Stack>

          <Chip label={recipe.style} color="secondary" size="small" />
        </Stack>

        <Rating
          value={recipe.score}
          readOnly
          sx={{ mt: 2 }}
          aria-label={`Betyg: ${recipe.score} av 5`}
        />

        <Typography color="text.secondary" sx={{ mt: 2, minHeight: 48 }}>
          {recipe.review || "Ingen recension har lagts till ännu."}
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography variant="subtitle2" gutterBottom>
          Ingredienser
        </Typography>

        <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
          {recipe.ingredients?.length > 0 ? (
            recipe.ingredients.map((ingredient) => (
              <Chip
                key={ingredient}
                label={ingredient}
                variant="outlined"
                size="small"
              />
            ))
          ) : (
            <Typography variant="body2" color="text.secondary">
              Inga ingredienser angivna.
            </Typography>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default RecipeCard;