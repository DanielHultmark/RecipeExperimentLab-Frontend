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
import { accountService } from "./services/AccountService";
import LandingPage from "./pages/landingPage/LandingPage";
import Login from "./pages/login/Login";
import RegisterPage from "./pages/registerPage/RegisterPage";
import RecipeBank from "./pages/recipeBank/RecipeBank";
import Create from "./pages/create/Create";
import AdminPage from "./pages/admin/AdminPage";
import Edit from "./pages/edit/Edit";
import Dashboard from "./pages/dashboard/Dashboard";

function App() {
  const [page, setPage] = useState("home");
  const [user, setUser] = useState(null);
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);

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

  const handleEditRecipe = (recipeId) => {
    setSelectedRecipeId(recipeId);
    setPage("edit");
  };

  const showPage = () => {
    switch (page) {
      case "login":
        return <Login onLogin={handleLogin} onNavigate={setPage} />;

      case "register":
        return <RegisterPage onLogin={handleLogin} onNavigate={setPage} />;

      case "recipes":
        return <RecipeBank user={user} onNavigate={setPage} onEdit={handleEditRecipe} />;

      case "create":
        return user
          ? <Create user={user} onNavigate={setPage} />
          : <Login onLogin={handleLogin} onNavigate={setPage} />;

      case "admin":
        return isAdmin
          ? <AdminPage />
          : <RecipeBank user={user} onNavigate={setPage} />;

      case "dashboard":
        return user
          ? <Dashboard user={user} onNavigate={setPage} />
          : <Login onLogin={handleLogin} onNavigate={setPage} />;

      case "edit":
        return user
          ? <Edit recipeId={selectedRecipeId} onNavigate={setPage} />
          : <Login onLogin={handleLogin} onNavigate={setPage} />;

      default:
        return user
          ? <Dashboard user={user} onNavigate={setPage} />
          : <LandingPage onNavigate={setPage} />;
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#F3F7F1" }}>
      <AppBar position="sticky"
        sx={{
          bgcolor: "#1F4D36",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.12)",
        }}>
        <Toolbar>
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, fontWeight: 700, cursor: "pointer" }}
            onClick={() => setPage("home")}
          >
            Recipe Experiments Lab
          </Typography>

          <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
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

      <Container
        component="main"
        maxWidth="lg"
        sx={{ py: page === "home" && !user ? 0 : 5 }}
      >
        {showPage()}
      </Container>
    </Box>
  );
}

export default App;
