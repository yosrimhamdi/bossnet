export default (bucket, path) => {
  return `${process.env.MEDIA_PROVIDER_URL}${bucket}/${path}`;
};
