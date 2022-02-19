import { MEDIA_PROVIDER_URL } from "../config";

export default (bucket, path) => {
  return `${MEDIA_PROVIDER_URL}${bucket}/${path}`;
};
