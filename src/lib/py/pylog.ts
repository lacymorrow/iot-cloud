const pylog = async (text: string) => {
  try {
    // Response is json {message: string}
    await window.pywebview?.api?.log(text);
    return true;
  } catch (error) {
    console.error('Logging error');
    return false;
  }
};

export default pylog;
