import { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Container,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import "./App.css";
import { accountService } from "./services/accountService";
import LandingPage from "./pages/landingPage/LandingPage";
import Login from "./pages/login/Login";
import RegisterPage from "./pages/registerPage/RegisterPage";
import RecipeBank from "./pages/recipeBank/RecipeBank";
import Create from "./pages/create/Create";
import AdminPage from "./pages/admin/AdminPage";

function App() {
  const [page, setPage] = useState("home");
  const [user, setUser] = useState(null);

  useEffect(() => {
    accountService
      .getCurrentUser()
      .then(setUser)
      .catch(() => setUser(null));
  }, []);

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
    setPage("recipes");
  };

  const handleLogout = async () => {
    try {
      await accountService.logout();
    } finally {
      setUser(null);
      setPage("home");
    }
  };

  const isAdmin = user?.roles?.includes("Admin");

  const showPage = () => {
    switch (page) {
      case "login":
        return <Login onLogin={handleLogin} onNavigate={setPage} />;

      case "register":
        return <RegisterPage onLogin={handleLogin} onNavigate={setPage} />;

      case "recipes":
        return <RecipeBank user={user} onNavigate={setPage} />;

      case "create":
        return user
          ? <Create onNavigate={setPage} />
          : <Login onLogin={handleLogin} onNavigate={setPage} />;

      case "admin":
        return isAdmin
          ? <AdminPage />
          : <RecipeBank user={user} onNavigate={setPage} />;

      default:
        return <LandingPage onNavigate={setPage} />;
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "grey.100" }}>
      <AppBar position="sticky">
        <Toolbar>
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, fontWeight: 700, cursor: "pointer" }}
            onClick={() => setPage("home")}
          >
            Recipe Experiments Lab
          </Typography>

          <Stack direction="row" spacing={1} alignItems="center">
            <Button color="inherit" onClick={() => setPage("recipes")}>
              Recept
            </Button>

            {user && (
              <Button color="inherit" onClick={() => setPage("create")}>
                Skapa
              </Button>
            )}

            {isAdmin && (
              <Button color="inherit" onClick={() => setPage("admin")}>
                Admin
              </Button>
            )}

            {user ? (
              <>
                <Typography variant="body2">{user.fullName}</Typography>
                <Button color="inherit" onClick={handleLogout}>
                  Logga ut
                </Button>
              </>
            ) : (
              <>
                <Button color="inherit" onClick={() => setPage("login")}>
                  Logga in
                </Button>
                <Button color="inherit" onClick={() => setPage("register")}>
                  Registrera
                </Button>
              </>
            )}
          </Stack>
        </Toolbar>
      </AppBar>

      <Container component="main" maxWidth="lg" sx={{ py: 5 }}>
        {showPage()}
      </Container>
    </Box>
  );
}

export default App;