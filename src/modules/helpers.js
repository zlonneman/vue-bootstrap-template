

const uuid = () => {
    let crypto = window.crypto || window.msCrypto;
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

const getKeyByValue = (object, value) => {
    return Object.keys(object).find(key => object[key] === value);
};

const userRoleEnum = {
    // 'Unknown'             : 0,
    'SmartSales Admin'    : 1,
    'Sales Administrator' : 2,
    'Sales Manager'       : 3,
    'Sales Rep'           : 4,
};

const validatorMsgMapBase = {
    'required'           : 'Required',
    'email'              : 'Must be a valid Email',
    'hasUppercase'       : 'Must have an uppercase letter',
    'hasDigit'           : 'Must have a digit',
    'hasNonAlphanumeric' : 'Must have non-alphanumeric character',
};

const deepCopyObject = (obj) => {
    return JSON.parse(JSON.stringify(obj))
};



export {
    uuid,
    getKeyByValue,
    userRoleEnum,
    validatorMsgMapBase,
    deepCopyObject,
};
