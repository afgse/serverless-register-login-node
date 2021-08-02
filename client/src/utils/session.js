module.exports = {

    userBeginSession: ( u , t) => { 
        sessionStorage.setItem('user', JSON.stringify(u));
        sessionStorage.setItem('token', t);
    },

    userResetSession: ( ) => {
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('token');
    }
}