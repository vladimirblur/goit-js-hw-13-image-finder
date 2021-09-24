import { info,success, error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

const notify = function (typeNotify, textNotify) {
    if (typeNotify === 'error') {
        error({
            text: textNotify,
            delay: 2000,
        });
        return;
    }

    if (typeNotify === 'success') {
        success({
            text: textNotify,
            delay: 2000,
        });
        return;
    }

    if (typeNotify === 'info') {
        info({
            text: textNotify,
            delay: 2000,
        });
        return;
    }
};

export { notify };
