import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Outlet,
} from "react-router-dom";
import { useState } from "react";
import Post from "./Post";
import ProtectedRoute from "./ProtectedRoute";
import PostLists from "./PostList";
import Login from "./Login";
import NewPost from "./NewPost";
import Stats from "./Stats";
import ManagePosts from "./ManagePosts";
import EditPost from "./EditPost";

function Posts() {
  return (
    <div className="p-5">
      <h2 className="text-xl font-semibold mb-4">Blog</h2>
      <Outlet />
    </div>
  );
}

function Home() {
  return (
    <div className="p-5">
      <h2 className="text-xl font-semibold mb-2">Home View</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adip.</p>
    </div>
  );
}

function About() {
  return (
    <div className="p-5">
      <h2 className="text-xl font-semibold mb-2">About View</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adip.</p>
    </div>
  );
}

function NoMatch() {
  return (
    <div className="p-5">
      <h2 className="text-xl font-semibold mb-2">404: Page Not Found</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adip.</p>
    </div>
  );
}

function AppLayout() {
  const [user, setUser] = useState(null);

  // 2️⃣ little helper to clear it
  const logOut = () => setUser(null);

  return (
    <>
      <Router>
        <nav style={{ margin: 10 }}>
          <Link to="/" style={{ padding: 5 }}>
            {" "}
            Home{" "}
          </Link>
          <Link to="/posts" style={{ padding: 5 }}>
            {" "}
            Posts{" "}
          </Link>
          <Link to="/about" style={{ padding: 5 }}>
            {" "}
            About{" "}
          </Link>
          <span> | </span>
          {user && (
            <Link to="/stats" style={{ padding: 5 }}>
              {" "}
              Stats
            </Link>
          )}
          {user && (
            <Link to="/manageposts" style={{ padding: 5 }}>
              {" "}
              Manage Posts
            </Link>
          )}
          {!user && (
            <Link to="/login" style={{ padding: 5 }}>
              {" "}
              Login
            </Link>
          )}
          {user && (
            <span onClick={logOut} style={{ padding: 5, cursor: "pointer" }}>
              {" "}
              Logout{" "}
            </span>
          )}
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<Posts />}>
            <Route index element={<PostLists />} />
            <Route path=":slug" element={<Post />} />
          </Route>{" "}
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login onLogin={setUser} />} />
          <Route
            path="/stats"
            element={
              <ProtectedRoute user={user}>
                <Stats />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit/:slug"
            element={
              <ProtectedRoute user={user}>
                <EditPost />
              </ProtectedRoute>
            }
          />
          <Route
            path="/newpost"
            element={
              <ProtectedRoute user={user}>
                <NewPost />
              </ProtectedRoute>
            }
          />
          <Route
            path="/manageposts"
            element={
              <ProtectedRoute user={user}>
                <ManagePosts />
              </ProtectedRoute>
            }
          />

          
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </Router>
    </>
  );
}

export default AppLayout;
