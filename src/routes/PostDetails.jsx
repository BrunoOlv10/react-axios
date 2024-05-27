import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import './PostDetails.css'

function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(`Fetching post with ID: ${id}`); // teste

    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log(data); // teste
        setPost(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erro ao buscar o post:', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!post) {
    return <div>Post não encontrado</div>;
  }

  return (
    <div className='details-container'>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      <Link to="/" className="btn">Voltar</Link>
    </div>
  );
}

export default PostDetails;
