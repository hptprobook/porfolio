import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

interface PostType {
  title: string;
  description: string;
  image: string; // Assuming this is a URL to the image
  body: string;
}

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState<PostType | null>(null);
  console.log('🚀 ~ PostDetail ~ post:', post);

  useEffect(() => {
    axios.get(`http://localhost:3000/posts/${id}`).then((res) => setPost(res.data));
  }, [id]);

  return (
    <Box
      sx={{
        width: '500px',
        height: '80vh',
        m: 'auto',
      }}
    >
      {post ? (
        <>
          <Typography variant="h4" component="h1" gutterBottom>
            {post.title}
          </Typography>
          <Box
            component="img"
            sx={{
              width: '100%',
              borderRadius: '4px',
            }}
            src={post.image}
            alt={post.title}
          />
          <Typography variant="subtitle1" color="textSecondary" gutterBottom>
            {post.description}
          </Typography>
          <Typography variant="body1">{post.body}</Typography>
        </>
      ) : (
        <Typography>Loading...</Typography>
      )}
      <Link to={'/post'}>Back</Link>
    </Box>
  );
}
