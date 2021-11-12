// MODULES
const action = require('../actions/contactsAction');

const contactsHandler = (connection, reqUrl, method) => {
    let value = {};

    // GET PATH LAST ELEMENT
    const getPathLast = (url) => {
        let pathArr = url.pathname.split('/');

        pathArr = pathArr.filter((item) => item);

        return pathArr[pathArr.length - 1] ?? false;
    };

    if (getPathLast(reqUrl) === 'contacts') {
        switch (method) {
            case 'GET': {
                if (reqUrl.query.id) {
                    value = action.getContacts(connection, reqUrl.query.id);
                } else {
                    value = action.getContacts(connection, false);
                }
                break;
            }
            case 'POST': {
                if (reqUrl.query.name && reqUrl.query.phone) {
                    value = action.createContact(connection, { ...reqUrl.query });
                } else {
                    value.message = 'Name And Phone Number Is Required';
                    value.isError = true;
                }

                break;
            }

            case 'PUT': {
                if (reqUrl.query.name && reqUrl.query.phone && reqUrl.query.id) {
                    value = action.updateContact(connection, reqUrl.query.id, { ...reqUrl.query });
                } else {
                    value.message = 'Name & Phone & Id Number Is Required';
                    value.isError = true;
                }

                break;
            }

            case 'DELETE': {
                if (reqUrl.query.id) {
                    value = action.deleteContact(connection, reqUrl.query.id);
                } else {
                    value.message = 'Id Number Is Required';
                    value.isError = true;
                }

                break;
            }

            default:
                value.message = 'Wrong Method';
                value.isError = true;

                break;
        }
    } else {
        value.message = 'Error 404 : Not Found';
        value.isError = true;
    }
    return value;
};

module.exports = contactsHandler;
