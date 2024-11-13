function tryParseInt(strNum){
    let isNum = (/^\d*$/).test(strNum) && strNum;
    return isNum;
}

function defParseInt(strNum, defaultNum) {
    return tryParseInt(strNum) ? parseInt(strNum) : defaultNum;
}

export {tryParseInt, defParseInt}