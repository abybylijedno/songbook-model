import latinize from 'latinize';
export const slugify = (text) => {
    let slug = text.trim().toLowerCase();
    slug = latinize(slug);
    slug = slug.replace(/[^a-z0-9]+/g, '-');
    slug = slug.replace(/-{2,}/g, '-');
    slug = slug.replace(/^-|-$/g, '');
    return slug;
};
//# sourceMappingURL=utils.js.map