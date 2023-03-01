/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.SITE_URL || 'https://amabilia-meble.pl',
    exclude: ["/404", "/checkout"],
    generateRobotsTxt: true,
    robotsTxtOptions: {
        policies: [
            {
                userAgent: "*",
                disallow: ["/404"],
            },
            { userAgent: "*", allow: "/" },
        ],
        additionalSitemaps: [
            'https://amabilia-meble.pl/server-sitemap.xml',
        ],
    },

}