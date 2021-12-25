export default function ({ $axios, redirect }, inject) {
    const api = $axios.create({
        baseURL: process.env.apiEndpoint
    });
    api.onRequest(config => {
        console.log('Making request to ' + config.url)
    });
    inject('api', api)
    $axios.onError(error => {
        const code = parseInt(error.response && error.response.status)
        if (code === 404) {
            redirect('/404')
        }
    })
}