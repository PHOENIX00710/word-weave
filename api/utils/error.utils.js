export const errorHandler = (statusCode, message) => {
    let newError = new Error(message);
    newError.statusCode=statusCode
    return newError;
}
