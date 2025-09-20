import latinize from 'latinize'

export const slugify = (text: string): string => {
    let slug = text.trim().toLowerCase();
    slug = latinize(slug);
    slug = slug.replace(/[^a-z0-9]+/g, '-');
    slug = slug.replace(/-{2,}/g, '-');
    slug = slug.replace(/^-|-$/g, '');
    return slug;
}
