import { useState } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { accountService } from "../../services/AccountService";

const RegisterForm = ({ onLogin }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Lösenordet måste bestå av minst åtta tecken.");
      return;
    }

    setLoading(true);

    try {
      const user = await accountService.register(fullName, email, password);
      onLogin(user);
    } catch (error) {
      const apiError = error.response?.data;

      if (typeof apiError === "string") {
        setError(apiError);
      } else {
        setError("Kunde inte skapa kontot. Försök igen.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ maxWidth: 440, mx: "auto", p: 4 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Skapa konto
      </Typography>

      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Registrera dig för att börja samla dina recept.
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          required
          label="Fullständigt namn"
          value={fullName}
          onChange={(event) => setFullName(event.target.value)}
          margin="normal"
        />

        <TextField
          fullWidth
          required
          type="email"
          label="E-postadress"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          margin="normal"
        />

        <TextField
          fullWidth
          required
          type="password"
          label="Lösenord"
          helperText="Minst åtta tecken"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          margin="normal"
        />

        <Button
          fullWidth
          type="submit"
          variant="contained"
          size="large"
          disabled={loading}
          sx={{ mt: 3 }}
        >
          {loading
            ? <CircularProgress size={24} color="inherit" />
            : "Skapa konto"}
        </Button>
      </Box>
    </Paper>
  );
};

export default RegisterForm;