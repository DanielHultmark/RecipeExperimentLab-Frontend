import {
  Box,
  Button,
  Chip,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import carbonaraImage from "../../assets/carbonara.jpg";

export default function LandingPage({ onNavigate }) {
  return (
    <Box
      sx={{
        minHeight: { xs: "auto", md: "calc(100dvh - 64px)" },
        height: { md: "calc(100dvh - 64px)" },
        display: "flex",
        alignItems: "center",
        overflow: { md: "hidden" },
        py: { xs: 4, md: 3 },
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: { xs: 5, md: 8 },
            alignItems: "center",
          }}
        >
          <Stack spacing={3}>
            <Chip
              icon={<RestaurantMenuIcon />}
              label="Recipe Experiments Lab"
              color="success"
              sx={{
                width: "fit-content",
                fontWeight: 700,
                borderRadius: 3,
              }}
            />

            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontWeight: 800,
                color: "#1F4D36",
                fontSize: { xs: "2.7rem", md: "4.5rem" },
                lineHeight: 1.05,
              }}
            >
              Skapa, testa och spara dina bästa recept.
            </Typography>

            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ maxWidth: 520, lineHeight: 1.7 }}
            >
              Samla dina receptexperiment på ett ställe. Håll koll på
              ingredienser, betyg och recensioner – från första idé till ny
              favorit.
            </Typography>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              sx={{ alignItems: { xs: "stretch", sm: "center" } }}
            >
              <Button
                variant="contained"
                size="large"
                endIcon={<ArrowForwardIcon />}
                onClick={() => onNavigate("recipes")}
                sx={{
                  bgcolor: "#2E6B4A",
                  px: 3,
                  py: 1.5,
                  borderRadius: 3,
                  fontWeight: 700,
                  "&:hover": { bgcolor: "#1F4D36" },
                }}
              >
                Logga In och skapa
              </Button>

              <Button
                variant="outlined"
                size="large"
                onClick={() => onNavigate("register")}
                sx={{
                  color: "#2E6B4A",
                  borderColor: "#2E6B4A",
                  px: 3,
                  py: 1.5,
                  borderRadius: 3,
                  fontWeight: 700,
                  "&:hover": {
                    borderColor: "#1F4D36",
                    bgcolor: "#E8F2EA",
                  },
                }}
              >
                Skapa konto
              </Button>
            </Stack>
          </Stack>

          <Box
            component="img"
            src={carbonaraImage}
            alt="Krämig pasta carbonara"
            sx={{
              width: "100%", 
              height: {
                xs: 300,
                sm: 380,
                md: "clamp(360px, 58vh, 520px)"
              },
              minHeight: 0,
              objectFit: "cover",
              borderRadius: 6,
              boxShadow: "0 20px 45px rgba(31, 77, 54, 0.22)",
            }}
          />
        </Box>
      </Container>
    </Box>
  );
}