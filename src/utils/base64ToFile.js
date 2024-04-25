export const decodedFile = (string, edit, fileName) => {
  const byteCharacters = atob(string.split(",")[1]);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: "application/pdf" });
  if (edit)
    return new File([blob], fileName, {
      type: "application/pdf;",
      lastModified: Date.now(),
    });

  return URL.createObjectURL(blob);
};
