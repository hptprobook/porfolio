import { Box, Card, CardActions, CardContent, CardMedia, TextField, Typography, Button as MuiButton } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';

interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
  image: string;
}

export default function PostComponent() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [newPost, setNewPost] = useState({ title: '', body: '', image: '' });
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  useEffect(() => {
    axios.get('http://localhost:3000/posts').then((res) => setPosts(res.data));
  }, []);

  useEffect(() => {
    if (editingPost) {
      setNewPost({ title: editingPost.title, body: editingPost.body, image: editingPost.image });
    }
  }, [editingPost]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPost({ ...newPost, [e.target.name]: e.target.value.trim() });
  };

  const handleSavePost = () => {
    const method = editingPost ? 'put' : 'post';
    const url = editingPost ? `http://localhost:3000/posts/${editingPost.id}` : 'http://localhost:3000/posts';

    axios[method](url, {
      ...newPost,
      userId: 1,
    })
      .then((res) => {
        if (editingPost) {
          setPosts(posts.map((post) => (post.id === editingPost.id ? res.data : post)));
        } else {
          setPosts([...posts, res.data]);
        }
        setNewPost({ title: '', body: '', image: '' });
        setEditingPost(null);
      })
      .catch((err) => console.error(err));
  };

  const handleEditPost = (post: Post) => {
    setEditingPost(post);
  };

  const handleDeletePost = (id: number) => {
    axios
      .delete(`http://localhost:3000/posts/${id}`)
      .then(() => {
        const updatedPosts = posts.filter((post) => post.id !== id);
        setPosts(updatedPosts);
      })
      .catch((err) => console.error(err));
  };

  const totalPages = Math.ceil(posts.length / postsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  return (
    <Box sx={{ display: 'flex' }}>
      <Box sx={{ ml: 20 }}>
        {currentPosts
          .filter(
            (p) => p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.body.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((p) => (
            <Card key={p.id} sx={{ maxWidth: 345, mt: 2 }}>
              <CardMedia component="img" height="140" image={p.image} alt={p.title} />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {p.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {p.body}
                </Typography>
              </CardContent>
              <CardActions>
                <MuiButton size="small" onClick={() => handleEditPost(p)}>
                  Edit
                </MuiButton>
                <MuiButton size="small" onClick={() => handleDeletePost(p.id)}>
                  Delete
                </MuiButton>
              </CardActions>
            </Card>
          ))}
        <Box
          sx={{
            p: 2,
          }}
        >
          <MuiButton onClick={() => handlePageChange(1)} disabled={currentPage === 1}>
            <FirstPageIcon />
          </MuiButton>
          <MuiButton onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
            <ArrowLeftIcon />
          </MuiButton>
          {Array.from({ length: totalPages }, (_, i) => (
            <MuiButton key={i + 1} onClick={() => handlePageChange(i + 1)} disabled={currentPage === i + 1}>
              {i + 1}
            </MuiButton>
          ))}
          <MuiButton onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
            <ArrowRightIcon />
          </MuiButton>
          <MuiButton onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages}>
            <LastPageIcon />
          </MuiButton>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          ml: 2,
          mt: 2,
        }}
      >
        <TextField label="Title" variant="outlined" name="title" value={newPost.title} onChange={handleChange} />
        <TextField label="Body" variant="outlined" name="body" value={newPost.body} onChange={handleChange} />
        <TextField label="Image URL" variant="outlined" name="image" value={newPost.image} onChange={handleChange} />
        <MuiButton variant="contained" onClick={handleSavePost}>
          Save
        </MuiButton>
      </Box>
      <Box
        sx={{
          ml: 2,
          mt: 2,
        }}
      >
        <TextField label="Search..." variant="outlined" name="image" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
      </Box>
    </Box>
  );
}
