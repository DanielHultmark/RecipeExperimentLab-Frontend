import { useEffect, useState } from "react";
import { Alert, Box, CircularProgress, MenuItem, Paper, Select, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { adminService } from "../../services/AdminService";

export default function AdminPage() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminService.getUsers().then(setUsers).catch(() => setError("Kunde inte hämta användare. Kontrollera att du är admin.")).finally(() => setLoading(false));
  }, []);

  async function changeRole(user, role) {
    setError(""); setMessage("");
    try {
      await adminService.updateRole(user.id, role);
      setUsers(current => current.map(item => item.id === user.id ? { ...item, roles: [role] } : item));
      setMessage(`Rollen för ${user.fullName} uppdaterades.`);
    } catch (requestError) {
      setError(requestError.response?.data || "Kunde inte uppdatera användarrollen.");
    }
  }

  if (loading) return <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}><CircularProgress /></Box>;
  return <Paper sx={{ p: 3, overflowX: "auto" }}>
    <Typography variant="h4" sx={{ mb: 1 }}>Administratör</Typography>
    <Typography color="text.secondary" sx={{ mb: 3 }}>Hantera användare och roller.</Typography>
    {error && <Alert severity="error" sx={{ mb: 2 }}>{typeof error === "string" ? error : "Något gick fel."}</Alert>}
    {message && <Alert severity="success" sx={{ mb: 2 }}>{message}</Alert>}
    <Table><TableHead><TableRow><TableCell>Namn</TableCell><TableCell>E-post</TableCell><TableCell>Roll</TableCell></TableRow></TableHead>
      <TableBody>{users.map(user => <TableRow key={user.id}><TableCell>{user.fullName}</TableCell><TableCell>{user.email}</TableCell><TableCell>
        <Select size="small" value={user.roles?.[0] ?? "User"} onChange={event => changeRole(user, event.target.value)}>
          <MenuItem value="User">User</MenuItem><MenuItem value="Admin">Admin</MenuItem>
        </Select>
      </TableCell></TableRow>)}</TableBody>
    </Table>
  </Paper>;
}
