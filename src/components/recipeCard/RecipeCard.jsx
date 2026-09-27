import { useState } from "react";
import { Button, Card, CardActions, CardContent, Dialog, DialogActions, DialogContent, DialogTitle, Divider, List, ListItem, Rating, Stack, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export default function RecipeCard({ recipe, onEdit, onDelete }) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const ingredients = recipe.recipeIngredients ?? recipe.ingredients?.map(name => ({ name })) ?? [];

  return <>
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6">{recipe.name}</Typography>
        <Typography color="text.secondary">{recipe.style}</Typography>
        <Stack direction="row" spacing={1} sx={{ alignItems: "center", mt: 1 }}>
          <Rating value={recipe.score} readOnly />
          <Typography variant="body2">{recipe.score}/5</Typography>
        </Stack>
        {recipe.review && <Typography sx={{ mt: 2 }}>{recipe.review}</Typography>}
        <Divider sx={{ my: 2 }} />
        <Typography variant="subtitle2">Ingredienser</Typography>
        <List dense disablePadding>
          {ingredients.map((item, index) => <ListItem key={`${item.name}-${index}`} disablePadding>
            <Typography variant="body2">{item.amount ? `${item.amount} ${item.unit} ` : ""}{item.name}</Typography>
          </ListItem>)}
        </List>
      </CardContent>
      <CardActions>
        <Button size="small" startIcon={<EditIcon />} onClick={() => onEdit(recipe.id)}>Redigera</Button>
        <Button size="small" color="error" startIcon={<DeleteIcon />} onClick={() => setConfirmDelete(true)}>Radera</Button>
      </CardActions>
    </Card>
    <Dialog open={confirmDelete} onClose={() => setConfirmDelete(false)}>
      <DialogTitle>Radera “{recipe.name}”?</DialogTitle>
      <DialogContent>Detta går inte att ångra.</DialogContent>
      <DialogActions><Button onClick={() => setConfirmDelete(false)}>Avbryt</Button><Button color="error" variant="contained" onClick={() => { setConfirmDelete(false); onDelete(recipe.id); }}>Radera</Button></DialogActions>
    </Dialog>
  </>;
}
