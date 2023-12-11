const published = import('./published.json');
const saved = import('./saved.json');
const template = import('./template.json');


module.exports = () => ({
    published: published,
    saved: saved,
    template: template
});