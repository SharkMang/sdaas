export const isValidEmail = (email) => /\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6}/.test(email);
export const isValidTodo = (str) => (str && (str.search(/[^A-Za-z\s]/) == -1));