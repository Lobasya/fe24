import React, { useState, useContext } from "react";
import api from "../../api";
import {useSelector} from '../../store/context';

const Albums = ({albums}) => {
    const [photos, setPhotos] = useState([]);
    const [isLoader, setIsLoader] = useState(false);

    const handleGetPhotos = async (albumId) => {
        setIsLoader(true)
        try {
           const {data} = await api.getPhotosByAlbumId(albumId)
           setPhotos(data);
        } catch (e){

        } finally {
            setIsLoader(false)
        }
    }

    if (isLoader) {
        <p>Loading photos...</p>
    }


    return (
        <div>
            {photos.length ? (
                <>
                <button onClick={() => setPhotos([])}>Back to album</button>
                    {
                        photos.map(photo => {
                            return (
                                <div>
                                    <img src="https://i.pinimg.com/originals/19/d5/38/19d5381d626273b5774a32faf6b1f77a.png" alt=""/>
                                    <p>{photo.title}</p>
                                </div>
                            )
                        })
                    }
                </>
            ) : (
                albums.map(album => {
                    return (
                        <div onClick={() => handleGetPhotos(album.id)}>
                            <p>{album.title}</p>
                        </div>
                    )
                })
            )}
        </div>
    )
    
}

const Posts = ({posts}) => {
    return posts.map(post => {
        return (
            <div>
                <h6>Title: {post.title}</h6>
                <p>{post.body}</p>
            </div>
        )
    })
}

const Info = () => {
    const [isPosts, setIsPosts] = useState(true);
    const {user, isLoader, albums, posts} = useSelector(state => state.infoData)

    if (!user && !isLoader) {
        return <p>No user info</p>
    }

    return isLoader ? <p>Loading info...</p> : (
        <div className="info">
            <h1>{user.name}</h1>
            <div>
                <button 
                    onClick={() => setIsPosts(false)}
                    disabled={!isPosts}
                >
                    Albums
                </button>
                <button disabled={isPosts} onClick={() => setIsPosts(true)}>Posts</button>
            </div>
            {isPosts ? <Posts posts={posts}/> : <Albums albums={albums}/>}
        </div>
    )
}

export default Info;