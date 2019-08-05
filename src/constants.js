//export const API_URL = 'https://pmanager-api.herokuapp.com/problems/';
export const API_URL = 'http://localhost:3000/problems/'
export const QUESTION_SAVE = 'internal/question/save';
export const QUESTION_UPDATE = 'internal/question/update';
export const QUESTION_ADD = 'internal/question/add';
export const QUESTION_DELETE = 'internal/question/delete';
export const QUESTIONS_GET_ALL = 'internal/question/getAll';
export const QUESTION_SELECT = 'internal/question/select';
export const ERROR_INFO = 'internal/error/info';


//error messages
export const ERROR_MESSAGES = {
    emptyDescription: "Description required!",
    emptyTitle: "Title is required",
    noOption: "Atleast one option should be there in question!",
    emptyOption: "Option value can not be empty!",
    noAnswer: "Answer is not provided"
}