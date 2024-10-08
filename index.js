import { Cite, plugins } from "@citation-js/core";
import "@citation-js/plugin-csl";
import "@citation-js/plugin-bibtex";



export default function citex(bib, template, locales) {
    const templateName = "custom1";

    let config = plugins.config.get("@csl");
    config.templates.add(templateName, template);
    config.locales.add("zh-CN", locales);

    let cite = new Cite(bib);
    let data = cite.format('data', {
        format: "object",
        template: templateName,
    })

    let citations = {}

    for (let value of data) {
        citations[value.id] = {
            bibliography: cite.format('bibliography', {
                template: templateName,
                entry: value.id,
            }).trim(),
            author: value.author,
            language: value.language || "en-US",
        }
    }
    return citations
}
