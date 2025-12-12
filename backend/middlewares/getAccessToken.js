const express = require("express");
const getAccessToken = express.Router();

getAccessToken.use(async (req, res, next) => {
    if (req.query && req.query.token) {
        req.token = req.query.token;
        req.tokenSource = 'query';
        return next();
    }
    
    const { authorization, cookie } = req.headers;
    
    if (authorization && authorization.includes(`Bearer`)) {
        const token = authorization.split(' ')[1];
        
        if (token && token !== 'null' && token !== 'undefined') {
            req.token = token;
            req.tokenSource = 'header';
            return next();
        }
    }

    if (cookie && cookie.includes(`access_token=`)) {
        try {
            const cookies = cookie.split(';').map(c => c.trim());
            const accessTokenCookie = cookies.find(c => c.startsWith('access_token='));
            
            if (accessTokenCookie) {
                const token = accessTokenCookie.split('=')[1];
                
                if (token && token !== 'null' && token !== 'undefined') {
                    req.token = token;
                    req.tokenSource = 'cookie';
                    return next();
                }
            }
        } catch (error) {
        }
    }

    if (req.body && req.body.token) {
        req.token = req.body.token;
        req.tokenSource = 'body';
        return next();
    }

    req.token = null;
    req.tokenSource = 'none';
    next();
});

module.exports = getAccessToken;