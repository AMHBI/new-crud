import React, { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const icon = <CheckBoxOutlineBlankIcon fontSize='small' />;
const checkedIcon = <CheckBoxIcon fontSize='small' />;

const MultiSelectAutoComplete = ({
  selectOptions = [],
  label,
  value,
  setSelectValue,
  error,
  name
}) => {
  const filterHandler = (options, params) => {
    const filter = createFilterOptions();
    const filtered = filter(options, params);
    return [{ name: "انتخاب همه", all: true }, ...filtered];
  };
  const changeHandler = (event, newValue) => {
    if (newValue.find((option) => option?.all))
      return setSelectValue(
        value?.length === selectOptions?.length ? [] : selectOptions
      );

    setSelectValue(newValue);
  };
  return (
    <Autocomplete
      sx={{ width: "30%" }}
      multiple
      
      limitTags={2}
      value={value}
      filterOptions={filterHandler}
      onChange={changeHandler}
      options={selectOptions}
      disableCloseOnSelect
      getOptionLabel={(option) => option.name}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={
              option.all
                ? !!(value?.length === selectOptions?.length)
                : selected
            }
          />
          {option.name}
        </li>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          error={!!error}
          label={label}
          name={name}
          variant='outlined'
          placeholder={label}
        />
      )}
      isOptionEqualToValue={(option, value) => option.name == value.name}
    />
  );
};

export default MultiSelectAutoComplete;
