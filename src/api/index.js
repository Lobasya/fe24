import axios from 'axios';


class Fetch {
    constructor(){
        this.axios = axios.create({
            baseUrl: 'https://jsonplaceholder.typicode.com',
        })
    }

    getUsers(){
        return this.axios.get('https://jsonplaceholder.typicode.com/users');
    }

    getPostsByUserId(userId){
        return this.axios.get(`https://jsonplaceholder.typicode.com/users/${userId}/posts`);
    }
    
    getAlbumsByUserId(userId){
        return this.axios.get(`https://jsonplaceholder.typicode.com/users/${userId}/albums`);
    }

    getPhotosByAlbumId(albumId){
        return this.axios.get(`https://jsonplaceholder.typicode.com/albums/${albumId}/photos`);
    }
}

export default new Fetch();