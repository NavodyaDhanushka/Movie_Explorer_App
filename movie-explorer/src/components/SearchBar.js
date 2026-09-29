import { useEffect, useState } from "react";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

// Debounced search: waits 500ms after typing stops before calling onSearch
export default function SearchBar({ initialValue, onSearch }) {
    const [text, setText] = useState(initialValue);

    useEffect(() => {
        const t = setTimeout(() => onSearch(text.trim()), 500);
        return () => clearTimeout(t);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [text]);

    return (
        <TextField
            fullWidth
            placeholder="Search for a movie..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                ),
            }}
        />
    );
}