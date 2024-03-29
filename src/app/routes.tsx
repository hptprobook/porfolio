import { Route, Routes } from 'react-router-dom';
import withRouter from '../hooks/withRouter';
import { Home } from '../pages/home';
import { Portfolio } from '../pages/portfolio';
import { ContactUs } from '../pages/contact';
import { About } from '../pages/about';
import { Socialicons } from '../components/SocialIcons';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Post from '../pages/posts';
import PostDetail from '../pages/posts/id';
import Login from '../pages/auth/Login';

const AnimatedRoutes = withRouter(({ location }) => (
  <TransitionGroup>
    <CSSTransition
      key={location.key}
      timeout={{
        enter: 400,
        exit: 400,
      }}
      classNames="page"
      unmountOnExit
    >
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="*" element={<Home />} />
        <Route path="/post" element={<Post />} />
        <Route path="/post/:id" element={<PostDetail />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </CSSTransition>
  </TransitionGroup>
));

function AppRoutes() {
  return (
    <div className="s_c">
      <AnimatedRoutes />
      <Socialicons />
    </div>
  );
}

export default AppRoutes;
