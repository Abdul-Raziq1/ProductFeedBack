import util from "./service";

async function detailsLoader({ params }) {
    const suggestion = await util.getSuggestionWithId(params.id);
    return suggestion;
}

async function editLoader({ params }) {
    const suggestion = await util.getSuggestionWithId(params.id);
    return suggestion;
}

async function urlLoader({ params }) {
    return `${params.id}`
}

export const loaders = {
    detailsLoader,
    editLoader,
    urlLoader
}
