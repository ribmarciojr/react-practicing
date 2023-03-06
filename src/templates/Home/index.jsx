import { Component } from 'react';

import '../../styles/global-styles.css';

import { loadPosts } from '../../needed/load-post'

import { Posts } from '../../components/Posts';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input'

export class Home extends Component{
    state = {
      posts: [],
      allPosts:  [],
      page: 0,
      postsPerPage: 3,
      searchValue : '',
    }

    
    async componentDidMount(){
      await this.loadPosts()
    }

    loadPosts = async () => {
      const {posts, postsPerPage} = this.state
      const postAndPhotos = await loadPosts()

      this.setState({ 
        posts: postAndPhotos.slice(posts, postsPerPage),
        allPosts: postAndPhotos, 
      })
    }

    loadMorePosts = () => {
      const {page, postsPerPage, posts, allPosts} = this.state
      
      const nextPage = page + postsPerPage
      const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage)

      posts.push(...nextPosts)
     
      this.setState({posts, page: nextPage})
    }

    handleChange = (event) => {
      const { value } = event.target
      this.setState({searchValue : value})
    }


    render() {
      const { posts, page, postsPerPage, allPosts, searchValue } = this.state

      const noMorePosts = page + postsPerPage >= allPosts.length

      const filteredPosts = !!searchValue ? allPosts.filter(
        (post) => {
          return post.title.toLowerCase().includes(
            searchValue.toLowerCase()) 
        }     
      ) : posts 
      console.log(filteredPosts)

      return (
          <section className="container">
          
            {!!searchValue && (
                <h1>Search Value = {searchValue}</h1>
              )}         
              <div className='searcher'>
                <Input 
                  onChange= {this.handleChange}
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
                  onClick = {this.loadMorePosts} 
                  disabled = {noMorePosts}
                />
              )}
              

            </div>
            
          </section>
          );
    }
}



