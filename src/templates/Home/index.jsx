import { useEffect, useState, useCallback} from 'react';

import '../../styles/global-styles.css';

import { loadPosts } from '../../needed/load-post'

import { Posts } from '../../components/Posts';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input'

export const Home = () => {
  const [posts, setPosts] = useState([])
  const [allPosts, setAllPosts] = useState([])
  const [page, setPage] = useState(0)
  const [postsPerPage] = useState(2)
  const [searchValue, setSearchValue] = useState('')

  const noMorePosts = page + postsPerPage >= allPosts.length

      const filteredPosts = !!searchValue ? allPosts.filter(
        (post) => {
          return post.title.toLowerCase().includes(
            searchValue.toLowerCase()) 
        }     
      ) : posts 

  const handleLoadPosts = useCallback( async (page, postsPerPage) => {
        
        const postAndPhotos = await loadPosts()

        setPosts(postAndPhotos.slice(page, postsPerPage))
        setAllPosts(postAndPhotos)
      }, [])
  
  useEffect(() => {
    handleLoadPosts(0, postsPerPage)

  }, [handleLoadPosts, postsPerPage])

  const loadMorePosts = () => {
        const nextPage = page + postsPerPage
        const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage)
  
        posts.push(...nextPosts)
        
        setPosts(posts)
        setPage(nextPage)
      }
  
  const handleChange = (event) => {
        const { value } = event.target
        
        setSearchValue(value)
      }

  return (
    <section className="container">
    
      {!!searchValue && (
          <h1>Search Value = {searchValue}</h1>
        )}         
        <div className='searcher'>
          <Input 
            onChange= {handleChange}
            value= {searchValue}
          />
        </div>
   

      {filteredPosts.length === 0 && 
        <div className="not-found-container">
          <p className="not-found">Not Found</p>
        </div>
        
      } 
      <Posts posts={filteredPosts} />


      <div className="button-container" >
        {!searchValue && (
          <Button 
            text="Load More Posts" 
            onClick = {loadMorePosts} 
            disabled = {noMorePosts}
          />
        )}
      </div>
    </section>
    );
} 



