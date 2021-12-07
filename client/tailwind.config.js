module.exports = {
    purge: [
        "./src/**/*.{vue,js,ts,jsx,tsx}"
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                "primary": "var(--primary-cl)",
                "primary-dark": "var(--primary-dark-cl)",
                "primary-light": "var(--primary-light-cl)",
                "dark": "var(--dark-cl)"
            }
        }
    },
    variants: {
        extend: {},
    },
    plugins: [],
}