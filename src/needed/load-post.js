export const loadPosts = async () => {
    const postResponse = fetch('https://jsonplaceholder.typicode.com/posts')
      const photoResponse = fetch('https://jsonplaceholder.typicode.com/photos')

      const [posts, photos] = await Promise.all([postResponse, photoResponse])

      const postJson  = await posts.json()
      const photoJson = await photos.json()

      //Função zip, pois o número de fotos é superior ao de posts;
      //O parâmetro post é o objeto com atributos de um post
      const postAndPhotos = postJson.map((post, index) => {
        return { ...post, cover: photoJson[index].url}

      })

      return postAndPhotos
}