import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";

export default function FilterBar({ genres, filters, onChange }) {
    const set = (key) => (e) => onChange({ ...filters, [key]: e.target.value });

    return (
        <Box
            sx={{
                display: "grid",
                gap: 2,
                my: 2,
                // Mobile: Genre on its own row, Year + Rating side by side
                gridTemplateColumns: { xs: "1fr 1fr", sm: "repeat(3, 180px)" },
            }}
        >
            <FormControl size="small" fullWidth sx={{ gridColumn: { xs: "1 / -1", sm: "auto" } }}>
                <InputLabel>Genre</InputLabel>
                <Select label="Genre" value={filters.genre} onChange={set("genre")}>
                    <MenuItem value="">All</MenuItem>
                    {genres.map((g) => (
                        <MenuItem key={g.id} value={g.id}>{g.name}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            <TextField
                size="small"
                fullWidth
                label="Year"
                type="number"
                value={filters.year}
                onChange={set("year")}
            />

            <FormControl size="small" fullWidth>
                <InputLabel>Min rating</InputLabel>
                <Select label="Min rating" value={filters.rating} onChange={set("rating")}>
                    {[0, 5, 6, 7, 8].map((r) => (
                        <MenuItem key={r} value={r}>{r === 0 ? "Any" : `${r}+`}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
}