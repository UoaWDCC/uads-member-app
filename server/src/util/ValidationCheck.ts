// import { components } from '../interface/api';
// Maybe try implement the components method later because I couldn't get it to work Sadge :(
// function checkValidUrl(SocialHandle: components['schemas']['Socials']): boolean {
function checkValidUrl(url: string): boolean {
  const regex = new RegExp(
    /https?:\/\/(www.)?[-a-zA-Z0-9@:%._+~#=]{1,256}.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/
  );

  if (url == '' || regex.test(url)) {
    return true;
  }
  return false;
}

export { checkValidUrl };
