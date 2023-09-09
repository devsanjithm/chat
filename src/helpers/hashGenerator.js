import crypto from "node:crypto"

export default function hashGenerator(value){
    const hash = crypto.createHash('md5');
    hash.update(value);
    const hashValue = hash.digest('hex');
    console.log('Hash value is: ' + hashValue);
    return hashValue
}


