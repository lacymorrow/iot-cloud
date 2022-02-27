const pylog = async (text: string | number) => {
  console.log(text);

  try {
    // Response is json {message: string}
    await window.pywebview?.api?.log(text);
    return true;
  } catch (error) {
    console.error(`Logging error ${error}`);
    return false;
  }
};

export default pylog;
