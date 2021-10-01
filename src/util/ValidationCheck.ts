function checkValidUrl(url: string): boolean {
  const regex = new RegExp(
    /https?:\/\/(www.)?[-a-zA-Z0-9@:%._+~#=]{1,256}.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/
  );
  if (regex.test(url) || url == '') {
    return true;
  }
  return false;
}

export { checkValidUrl };
