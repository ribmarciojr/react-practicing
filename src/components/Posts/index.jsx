import './styles.css'

import { PostCard } from '../PostCard';

export const Posts = ({posts}) => {

    return (<div className="posts">
        {posts.map( posts => ( 
            <PostCard 
            key= {posts.id}
            cover = {posts.cover}
            title = {posts.title}
            body = {posts.body}
            id = {posts.id}
            />
            ))}
         
    </div>)
    
    
}