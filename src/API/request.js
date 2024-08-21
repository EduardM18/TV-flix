//API TOKEN//
const TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2N2E3ZjYxZDRiZjQwNjhhNDRlNGI3Nzk3M2IyNGQ1NCIsInN1YiI6IjY1YzBkZDA5YmE0ODAyMDE4MjZlYTRiNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.M2Je0XhXUoeDN6u_i5ZENKQErmUY0susUWyJWPJN-uk';
//options//
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${TOKEN}`
    }
};
//request function//
async function request(url){
    const response =  await fetch(url, options);
    try{
        let data = response.json();
        return data;
    }
    catch(error){
        console.log(error);
        // console.error('error:' + error.status_message);
        return error.status_message;
    };
}

export default request;