export default (bucket, path) => {
    return `${process.env.mediaProviderUrl}${bucket}/${path}`
}