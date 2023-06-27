
const getURL = () => {

    var client_id = '514a1eaa6808469da67e93cdd0826546';
    var redirect_uri = 'http://localhost:3000/';
    var scope = 'user-read-private user-read-email';

    var url = 'https://accounts.spotify.com/authorize';
    url += '?response_type=token';
    url += '&client_id=' + encodeURIComponent(client_id);
    url += '&scope=' + encodeURIComponent(scope);
    url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
    
    window.location = url;
}

const buildAccessData = () => {
    const urlString = window.location.href.split('#')
    const queryString = urlString[1]

    const urlParams = new URLSearchParams(queryString)
    
    const accessData = {
        accessToken: urlParams.get('access_token'),
        tokenType: urlParams.get('token_type'),
        expiresIn: urlParams.get('expires_in')
    }

    return accessData;
}

export {getURL, buildAccessData};