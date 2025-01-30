export default {
    SUCCESS: 'The operation has been successfully completed',
    SOMETHING_WENT_WRONG: 'Something went wrong',
    TOO_MUCH_REQUEST: 'Too much request',
    NOT_FOUND: (entity: string) => {
        return `${entity} not found`;
    }
};
