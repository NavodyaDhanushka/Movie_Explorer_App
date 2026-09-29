import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";

export default function FilterBar({ genres, filters, onChange }) {
    const set = (key) => (e) => onChange({ ...filters, [key]: e.target.value });

    return (
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", my: 2 }}>
            <FormControl size="small" sx={{ minWidth: 150 }}>
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
                label="Year"
                type="number"
                value={filters.year}
                onChange={set("year")}
                sx={{ width: 110 }}
            />

            <FormControl size="small" sx={{ minWidth: 150 }}>
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