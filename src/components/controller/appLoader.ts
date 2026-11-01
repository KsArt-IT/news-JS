import Loader from './loader';

function _getEnv(name: string, value: string | undefined): string {
    if (!value) throw new Error(`Env file error, missing ${name} parameter`);
    return value;
}

class AppLoader extends Loader {
    constructor() {
        const url: string = _getEnv('API_URL', process.env.API_URL);
        const apiKey: string = _getEnv('API_KEY', process.env.API_KEY);

        super(url, {
            apiKey,
        });
    }
}

export default AppLoader;
