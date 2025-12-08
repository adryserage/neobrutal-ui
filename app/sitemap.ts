import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://neobrutal-ui.vercel.app'
    const currentDate = new Date()

    // Core pages
    const routes = [
        '',
        '/docs',
        '/docs/installation',
        '/docs/theming',
        '/docs/components',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: currentDate,
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
    }))

    // Component pages
    const components = [
        'accordion',
        'alert',
        'avatar',
        'badge',
        'breadcrumb',
        'button',
        'card',
        'checkbox',
        'dialog',
        'input',
        'label',
        'pagination',
        'popover',
        'progress',
        'radio-group',
        'select',
        'skeleton',
        'slider',
        'switch',
        'tabs',
        'textarea',
        'toast',
        'tooltip',
    ]

    const componentRoutes = components.map((component) => ({
        url: `${baseUrl}/docs/components/${component}`,
        lastModified: currentDate,
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }))

    return [...routes, ...componentRoutes]
}
