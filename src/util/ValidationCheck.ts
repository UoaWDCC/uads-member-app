import { components } from '../interface/api'

function checkValidUrl(SocialHandle: components['schemas']['Socials']): boolean {
  if (SocialHandle == null) {
    return true;
  }

  const regex = new RegExp(
    /https?:\/\/(www.)?[-a-zA-Z0-9@:%._+~#=]{1,256}.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/
  );

  if (SocialHandle.url == '' || regex.test(SocialHandle.url)) {
    return true;
  }
  return false;
}

export { checkValidUrl };
