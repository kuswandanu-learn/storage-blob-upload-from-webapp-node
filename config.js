
const _module = {
    getStorageAccountName: () => {
        const matches = /AccountName=(.*?);/.exec(process.env.AZURE_STORAGE_CONNECTION_STRING);
        return matches[1];
    },
    getCognitiveServicesEndpoint: () => {
        return process.env.AZURE_COGNITIVE_SERVICES_ENDPOINT;
    },
    getCognitiveServicesKey: () => {
        return process.env.AZURE_COGNITIVE_SERVICES_KEY;
    }
};

module.exports = _module;