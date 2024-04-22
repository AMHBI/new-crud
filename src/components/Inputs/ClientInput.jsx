import React, { useEffect, useState } from "react";

import { Controller, useForm } from "react-hook-form";

import {
  CREATE_CLIENT,
  EDIT_CLIENT,
  PUBLISH_CLIENT,
} from "../../graphql/mutations";
import { useMutation } from "@apollo/client";

import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

import { STACK_SELECTION_OPTIONS } from "../../constants/stackSelections";
import MultiSelectAutoComplete from "./MultiSelectAutoComplete";
import MultiFileUpload from "./MultiFileUpload";
import { GET_CLIENTS } from "../../graphql/queries";

const ClientInput = ({ setIsEditing, isEditing, editRowData }) => {
  const [selectValue, setSelectValue] = useState([]);
  const [files, setFiles] = useState([]);
  const [serverFiles, setServerFiles] = useState([]);

  const {
    register,
    control,
    handleSubmit,
    getValues,
    setValue,
    reset,
    formState: { isSubmitting, isSubmitSuccessful },
  } = useForm();

  const [
    createClient,
    {
      data: createClientData,
      error: createClientError,
      loading: createClientLoading,
    },
  ] = useMutation(CREATE_CLIENT);

  const [
    editClient,
    {
      data: editClientData,
      error: editClientError,
      loading: editClientLoading,
    },
  ] = useMutation(EDIT_CLIENT);

  const [
    publishClient,
    {
      data: publishClientData,
      error: publishClientError,
      loading: publishClientLoading,
    },
  ] = useMutation(PUBLISH_CLIENT, { refetchQueries: [GET_CLIENTS] });

  useEffect(() => {
    if (createClientData)
      publishClient({ variables: { id: createClientData.createClient.id } });
  }, [createClientData]);

  const formSubmitHandler = async (data) => {
    const [name, sections, date] = getValues(["clientName", "section", "date"]);

    await createClient({
      variables: {
        name,
        date: JSON.stringify(date),
        files: JSON.stringify(serverFiles),
        sections: JSON.stringify(sections),
      },
    });
    await publishClient({
      variables: {
        id: createClientData?.createClient?.id,
      },
    });
    reset();
    setSelectValue([]);
    console.log("Client Input Form Submit Data : ", data);
  };
  console.log("editRowData", editRowData);
  useEffect(() => {
    if (isEditing) {
      setValue("clientName", editRowData.name);
      setSelectValue(JSON.parse(editRowData.sections));
      setValue("date", new Date(+editRowData.date));
      // setValue("files",editRowData.name)
    }
  }, [isEditing]);
  const editHandler = () => {
    const [name, sections, date] = getValues(["clientName", "section", "date"]);
console.log(date);
    editClient({
      variables: {
        id: +editRowData.id,
        name,
        date: JSON.stringify(date),
        sections: JSON.stringify(sections),
        files: JSON.stringify(serverFiles),
      },
      refetchQueries: [GET_CLIENTS],
    });
    setIsEditing(false);
  };
  console.log("CR Loading :", createClientLoading);
  useEffect(() => {
    setValue("section", selectValue);
  }, [selectValue]);

  useEffect(() => {
    setValue("files", serverFiles);
  }, [serverFiles]);

  return (
    <>
      <form onSubmit={isEditing ? null : handleSubmit(formSubmitHandler)}>
        <Box
          sx={{
            display: "flex",
            direction: "rtl",
            flexDirection: "row-reverse",
          }}>
          <Controller
            name='clientName'
            control={control}
            defaultValue={""}
            render={({
              field: { name, value, onChange },
              fieldState: { error, invalid },
              formState: { errors },
            }) => {
              return (
                <TextField
                  value={value}
                  onChange={onChange}
                  name={name}
                  error={!!error}
                  helperText={invalid && error?.message ? error?.message : null}
                  variant='outlined'
                  type='text'
                  label='نام مشتری'
                />
              );
            }}
          />
          <Controller
            name='section'
            control={control}
            defaultValue={""}
            // rules={{ required: true }}
            render={({
              field: { name, value, onChange },
              fieldState: { error },
            }) => {
              return (
                <MultiSelectAutoComplete
                  onChange={onChange}
                  selectOptions={STACK_SELECTION_OPTIONS}
                  // onChange={(ev) =>  onChange(ev => ev.target.value)}
                  label='حوزه تخصصی'
                  name={name}
                  value={selectValue}
                  // error={!!error}
                  setSelectValue={setSelectValue}
                />
              );
            }}
          />
          <Controller
            control={control}
            name='date'
            rules={{ required: true }}
            render={({
              field: { name, value, onChange },
              fieldState: { invalid, isDirty },
              formState: { errors },
            }) => (
              <>
                <DatePicker
                  value={value || ""}
                  placeholder='تاریخ'
                  onChange={(date) => {
                    onChange(date?.isValid ? date.toUnix() * 1000 : "");
                  }}
                  format='YYYY/MM/DD'
                  calendar={persian}
                  locale={persian_fa}
                  calendarPosition='bottom-right'
                />
                {errors && errors[name] && errors[name].type === "required" && (
                  <span>انتخاب تاریخ الزامی است</span>
                )}
              </>
            )}
          />

          <Controller
            name='files'
            control={control}
            render={(field) => {
              return (
                <MultiFileUpload
                  files={files}
                  setFiles={setFiles}
                  serverFiles={serverFiles}
                  setServerFiles={setServerFiles}
                />
              );
            }}
          />

          {isEditing ? (
            <Button disabled={!!isSubmitting} onClick={editHandler}>
              {isSubmitting ? "درحال ارسال..." : "ویرایش اطلاعات"}
            </Button>
          ) : (
            <Button disabled={!!isSubmitting} type='submit'>
              {isSubmitting ? "درحال ارسال..." : "ارسال اطلاعات"}
            </Button>
          )}
        </Box>
      </form>
    </>
  );
};

export default ClientInput;
