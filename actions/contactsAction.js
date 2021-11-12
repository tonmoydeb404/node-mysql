const getContacts = (connection, id) => {
    const sqlQuery = `SELECT * FROM \`contacts\` ${id ? `WHERE id = ${id}` : ''}`;
    const value = {};

    try {
        const results = connection.query(sqlQuery);

        value.results = results;
        value.isError = false;
    } catch (err) {
        console.log(err);
        value.message = 'Error In Getting Contacts';
        value.error = err;
        value.isError = true;
    }

    return value;
};

const deleteContact = (connection, id) => {
    const sqlQuery = `DELETE FROM \`contacts\` WHERE id = ${id}`;
    const value = {};

    try {
        const results = connection.query(sqlQuery);
        value.results = results;
        value.table = getContacts(connection, false);
        value.isError = false;
    } catch (err) {
        console.log(err);
        value.message = 'Error In Deleting Contact';
        value.error = err;
        value.isError = true;
    }
    return value;
};

const updateContact = (connection, id, data) => {
    const sqlQuery = `UPDATE \`contacts\` SET \`name\` = '${data.name}', \`phone\` = '${data.phone}' WHERE id = '${id}'`;
    const value = {};

    try {
        const results = connection.query(sqlQuery);
        value.results = results;
        value.table = getContacts(connection, false);
        value.isError = false;
    } catch (err) {
        console.log(err);
        value.message = 'Error In Updating Contact';
        value.error = err;
        value.isError = true;
    }

    return value;
};

const createContact = (connection, data) => {
    const sqlQuery = `INSERT INTO \`contacts\` (\`name\`, \`phone\`) VALUES ('${data.name}','${data.phone}')`;
    const value = {};

    try {
        const results = connection.query(sqlQuery);
        value.results = results;
        value.table = getContacts(connection, false);
        value.isError = false;
    } catch (err) {
        console.log(err);
        value.message = 'Error In Creating Contact';
        value.error = err;
        value.isError = true;
    }

    return value;
};

// EXPORT MODULE
module.exports = {
    getContacts,
    deleteContact,
    updateContact,
    createContact,
};
