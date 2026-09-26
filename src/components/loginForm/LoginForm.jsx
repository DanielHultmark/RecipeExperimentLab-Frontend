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
import { accountService } from "../../services/accountService";

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const user = await accountService.login(email, password);
      onLogin(user);
    } catch (error) {
      setError(
        error.response?.data ||
          "Kunde inte logga in. Kontrollera e-post och lösenord."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ maxWidth: 440, mx: "auto", p: 4 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Logga in
      </Typography>

      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Logga in för att se och skapa recept.
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {typeof error === "string" ? error : "Inloggningen misslyckades."}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit}>
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
          {loading ? <CircularProgress size={24} color="inherit" /> : "Logga in"}
        </Button>
      </Box>
    </Paper>
  );
};

export default LoginForm;