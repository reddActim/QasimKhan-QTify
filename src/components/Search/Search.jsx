import React from "react";
import styles from "./Search.module.css";
import { ReactComponent as SearchIcon } from "../../assets/search-icon.svg";
import { styled } from "@mui/system";
import { truncate } from "../../helpers/helpers";
import { useNavigate } from "react-router-dom";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

const StyledAutocomplete = styled(Autocomplete)(({ theme }) => ({
  "& .MuiInputBase-root": {
    color: "white",
    backgroundColor: "var(--color-black)",
    border: "1px solid var(--color-primary)",
    borderRadius: "10px",
    paddingRight: "40px",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
  "& .MuiInputBase-input": {
    padding: "10px 14px",
  },
  "& .MuiAutocomplete-listbox": {
    backgroundColor: "var(--color-black)",
    color: "white",
    maxHeight: "500px",
    overflowY: "auto",
    border: "1px solid var(--color-primary)",
    borderRadius: "0px 0px 10px 10px",
  },
  "& .Mui-focused": {
    backgroundColor: "#4a8df6",
    color: "white",
  },
  "& li:active": {
    backgroundColor: "#2977f5",
    color: "white",
  },
}));

function Search({ searchData, placeholder }) {
  const navigate = useNavigate();

  const handleSubmit = (event, value) => {
    event.preventDefault();
    if (value) {
      navigate(`/album/${value.slug}`);
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <form
        className={styles.wrapper}
        onSubmit={(e) => {
          e.preventDefault(); // prevent default form submission
        }}
      >
        <StyledAutocomplete
          options={Array.isArray(searchData) ? searchData : []}
          getOptionLabel={(option) => option.title}
          onChange={(event, value) => handleSubmit(event, value)}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder={placeholder}
              className={styles.search}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <button className={styles.searchButton} type="submit">
                    <SearchIcon />
                  </button>
                ),
              }}
            />
          )}
          renderOption={(props, option) => {
            const artists = option.songs.reduce((acc, song) => {
              acc.push(...song.artists);
              return acc;
            }, []);
            return (
              <li {...props} className={styles.listElement}>
                <div>
                  <p className={styles.albumTitle}>{option.title}</p>
                  <p className={styles.albumArtists}>
                    {truncate(artists.join(", "), 40)}
                  </p>
                </div>
              </li>
            );
          }}
        />
      </form>
    </div>
  );
}

export default Search;
