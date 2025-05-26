export const dynamic = "force-static";

export default function manifest() {
    return {
        name: 'Atap\'s Kitchen',
        short_name: 'Atap\'s Kitchen',
        description: 'Atap\'s Kitchen',
        start_url: '/atapos',
        display: 'standalone',
        background_color: '#fff',
        theme_color: '#fff',
        icons: [
            {
                src: "/atapos/android-chrome-192x192.png",
                sizes: "192x192",
                type: "image/png"
            },
            {
                src: "/atapos/android-chrome-512x512.png",
                sizes: "512x512",
                type: "image/png"
            },
        ],
    }
}
