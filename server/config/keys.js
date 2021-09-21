dbPassword =
    "mongodb+srv://taekyeong:" +
    encodeURIComponent("abcd1234") +
    "@cluster0.ixcuj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

module.exports = {
    mongoURI: dbPassword,
};
