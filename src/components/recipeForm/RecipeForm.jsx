import { useEffect, useState } from "react";
import {
  Alert, Box, Button, CircularProgress, Dialog, DialogActions, DialogContent,
  DialogTitle, FormControl, IconButton, InputLabel, List, ListItem, ListItemText,
  MenuItem, Paper, Select, Stack, TextField, Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import { recipeService } from "../../services/RecipeService";

export default function RecipeForm({ initialRecipe = null, onSaved }) {
  const editing = initialRecipe !== null;
  const [form, setForm] = useState({
    name: initialRecipe?.name ?? "", review: initialRecipe?.review ?? "",
    styleId: initialRecipe?.styleId ?? "", scoreId: initialRecipe?.scoreId ?? "",
    ingredients: initialRecipe?.recipeIngredients ?? [],
  });
  const [options, setOptions] = useState({ styles: [], scores: [] });
  const [ingredientDialogOpen, setIngredientDialogOpen] = useState(false);
  const [styleDialogOpen, setStyleDialogOpen] = useState(false);
  const [newIngredient, setNewIngredient] = useState({ name: "", amount: "", unit: "" });
  const [newStyle, setNewStyle] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    recipeService.getFormOptions()
      .then(setOptions)
      .catch(() => setError("Kunde inte hämta formulärdata."))
      .finally(() => setLoading(false));
  }, []);

  function change(event) {
    setForm(current => ({ ...current, [event.target.name]: event.target.value }));
  }

  function addIngredient() {
    const name = newIngredient.name.trim();
    const amount = Number(newIngredient.amount);
    const unit = newIngredient.unit.trim();
    if (!name || !amount || amount <= 0 || !unit) {
      setError("Ingrediensen måste ha namn, mängd och enhet.");
      return;
    }
    if (form.ingredients.some(item => item.name.toLowerCase() === name.toLowerCase())) {
      setError("Ingrediensen är redan tillagd.");
      return;
    }
    setForm(current => ({ ...current, ingredients: [...current.ingredients, { name, amount, unit }] }));
    setNewIngredient({ name: "", amount: "", unit: "" });
    setError("");
    setIngredientDialogOpen(false);
  }

  async function addStyle() {
    if (!newStyle.trim()) return;
    try {
      const style = await recipeService.createStyle(newStyle.trim());
      setOptions(current => ({ ...current, styles: [...current.styles.filter(item => item.id !== style.id), style] }));
      setForm(current => ({ ...current, styleId: style.id }));
      setNewStyle("");
      setStyleDialogOpen(false);
    } catch {
      setError("Kunde inte skapa matlagningsstilen.");
    }
  }

  async function submit(event) {
    event.preventDefault();
    setError("");
    if (!form.name.trim() || !form.styleId || !form.scoreId || form.ingredients.length === 0) {
      setError("Fyll i namn, stil, betyg och minst en ingrediens.");
      return;
    }
    const recipe = {
      name: form.name.trim(), review: form.review.trim(), styleId: Number(form.styleId),
      scoreId: Number(form.scoreId), ingredients: form.ingredients.map(({ name, amount, unit }) => ({ name, amount: Number(amount), unit })),
    };
    try {
      setSubmitting(true);
      if (editing) await recipeService.update(initialRecipe.id, recipe);
      else await recipeService.create(recipe);
      onSaved?.();
    } catch (requestError) {
      setError(requestError.response?.data || "Receptet kunde inte sparas.");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) return <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}><CircularProgress /></Box>;

  return (
    <Paper component="form" onSubmit={submit} sx={{ p: 3 }}>
      <Stack spacing={3}>
        <Typography variant="h5">{editing ? "Redigera recept" : "Skapa ett nytt recept"}</Typography>
        {error && <Alert severity="error">{typeof error === "string" ? error : "Något gick fel."}</Alert>}
        <TextField label="Receptets namn" name="name" value={form.name} onChange={change} required fullWidth />
        <TextField label="Beskrivning eller recension" name="review" value={form.review} onChange={change} multiline minRows={4} fullWidth />

        <Stack direction="row" spacing={1} sx={{ alignItems: "flex-start" }}>
          <FormControl fullWidth required>
            <InputLabel id="style-label">Matlagningsstil</InputLabel>
            <Select labelId="style-label" label="Matlagningsstil" name="styleId" value={form.styleId} onChange={change}>
              {options.styles.map(style => <MenuItem key={style.id} value={style.id}>{style.name}</MenuItem>)}
            </Select>
          </FormControl>
          <Button variant="outlined" onClick={() => setStyleDialogOpen(true)} sx={{ whiteSpace: "nowrap", height: 56 }}>Ny stil</Button>
        </Stack>

        <FormControl fullWidth required>
          <InputLabel id="score-label">Betyg</InputLabel>
          <Select labelId="score-label" label="Betyg" name="scoreId" value={form.scoreId} onChange={change}>
            {options.scores.map(score => <MenuItem key={score.id} value={score.id}>{score.name}</MenuItem>)}
          </Select>
        </FormControl>

        <Box>
          <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center", mb: 1 }}>
            <Typography variant="subtitle1">Ingredienser</Typography>
            <Button startIcon={<AddIcon />} onClick={() => setIngredientDialogOpen(true)}>Lägg till ingrediens</Button>
          </Stack>
          {form.ingredients.length === 0 ? <Typography color="text.secondary">Inga ingredienser tillagda.</Typography> : (
            <List dense>
              {form.ingredients.map((item, index) => <ListItem key={`${item.name}-${index}`} secondaryAction={<IconButton edge="end" aria-label="Radera ingrediens" onClick={() => setForm(current => ({ ...current, ingredients: current.ingredients.filter((_, itemIndex) => itemIndex !== index) }))}><DeleteIcon /></IconButton>}>
                <ListItemText primary={`${item.amount} ${item.unit} ${item.name}`} />
              </ListItem>)}
            </List>
          )}
        </Box>
        <Button type="submit" variant="contained" startIcon={<SaveIcon />} disabled={submitting}>{submitting ? "Sparar..." : editing ? "Spara ändringar" : "Spara recept"}</Button>
      </Stack>

      <Dialog open={ingredientDialogOpen} onClose={() => setIngredientDialogOpen(false)} fullWidth maxWidth="xs">
        <DialogTitle>Lägg till ingrediens</DialogTitle>
        <DialogContent><Stack spacing={2} sx={{ pt: 1 }}>
          <TextField autoFocus label="Ingrediensnamn" value={newIngredient.name} onChange={event => setNewIngredient(current => ({ ...current, name: event.target.value }))} />
          <TextField label="Mängd" type="number" inputProps={{ min: 0.01, step: 0.01 }} value={newIngredient.amount} onChange={event => setNewIngredient(current => ({ ...current, amount: event.target.value }))} />
          <TextField label="Enhet, exempelvis g, dl eller st" value={newIngredient.unit} onChange={event => setNewIngredient(current => ({ ...current, unit: event.target.value }))} />
        </Stack></DialogContent>
        <DialogActions><Button onClick={() => setIngredientDialogOpen(false)}>Avbryt</Button><Button variant="contained" onClick={addIngredient}>Lägg till</Button></DialogActions>
      </Dialog>

      <Dialog open={styleDialogOpen} onClose={() => setStyleDialogOpen(false)} fullWidth maxWidth="xs">
        <DialogTitle>Ny matlagningsstil</DialogTitle>
        <DialogContent><TextField autoFocus fullWidth sx={{ mt: 1 }} label="Exempelvis Italienskt" value={newStyle} onChange={event => setNewStyle(event.target.value)} /></DialogContent>
        <DialogActions><Button onClick={() => setStyleDialogOpen(false)}>Avbryt</Button><Button variant="contained" onClick={addStyle}>Spara stil</Button></DialogActions>
      </Dialog>
    </Paper>
  );
}
