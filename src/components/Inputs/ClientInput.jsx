import React, { useState } from "react";

import { Controller, useForm } from "react-hook-form";

import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

import { STACK_SELECTION_OPTIONS } from "../../constants/stackSelections";

const icon = <CheckBoxOutlineBlankIcon fontSize='small' />;
const checkedIcon = <CheckBoxIcon fontSize='small' />;

const ClientInput = () => {
  const [value, setValue] = useState([]);

  const {
    register,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();
  const formSubmitHandler = (data) => {
    console.log(data);
    console.log(value);
  };
  const autoCompleteFilterHandler = (options, params) => {
    const filter = createFilterOptions();
    const filtered = filter(options, params);
    return [{ name: "انتخاب همه", all: true }, ...filtered];
  };

  const autoCompleteChangeHandler = (event, newValue) => {
    if (newValue.find((option) => option.all))
      return setValue(
        value.length === STACK_SELECTION_OPTIONS.length
          ? []
          : STACK_SELECTION_OPTIONS
      );

    setValue(newValue);
    console.log(value);
  };
  return (
    <form onSubmit={handleSubmit(formSubmitHandler)}>
      <Controller
        name='clientName'
        control={control}
       
        render={({
          field: { onChange, value },
          fieldState: { error, invalid },
          formState: { errors },
        }) => {
          return (
            <TextField
              value={value}
              onChange={onChange}
              error={!!error}
              helperText={invalid && error?.message ? error?.message : null}
              required
              variant='outlined'
              type='text'
              label='نام مشتری'
            />
          );
        }}
      />
      <Controller
        name='clientName'
        control={control}
        render={(field) => {
          return (
            <Autocomplete
              sx={{ direction: "rtl", width: "20%" }}
              multiple
              limitTags={2}
              value={value}
              filterOptions={autoCompleteFilterHandler}
              onChange={autoCompleteChangeHandler}
              options={STACK_SELECTION_OPTIONS}
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
                        ? !!(value.length === STACK_SELECTION_OPTIONS.length)
                        : selected
                    }
                  />
                  {option.name}
                </li>
              )}
              style={{ width: 500 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label='حوزه تخصصی'
                  variant='outlined'
                  placeholder='تخصص'
                />
              )}
            />
          );
        }}
      />
      {/* <Controller
        name='clientName'
        control={control}
        render={(field) => {
          return <TextField variant='outlined' type='text' label='نام مشتری' />;
        }}
      />
      <Controller
        name='clientName'
        control={control}
        render={(field) => {
          return <TextField variant='outlined' type='text' label='نام مشتری' />;
        }}
      /> */}
      <input type='submit' />
    </form>
  );
};

export default ClientInput;
