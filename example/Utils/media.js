import config from '../config';

export default {
    getPath: file => {
        if (file.indexOf('http') !== -1) {
            return file;
        }

        return `${config.api.media}/${file}`
    },
    getFile: file => file.replace(`${config.api.media}/`, "")
}