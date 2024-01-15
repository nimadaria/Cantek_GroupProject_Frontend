import { Routes } from "react-router";
import { Navigate, Route } from "react-router-dom";
import ForumMainPage from "./pages/ForumMainPage";
import UserRegisterPage from "./pages/UserRegisterPage";

const App = () => {
  return (
    <div className="flex overflow-x-hidden">
      <Routes>
        <Route path="/" element={<Navigate replace to="/topic/latest" />} />

        <Route path="/register" element={<UserRegisterPage />} />

        <Route path="/topic/:topicId" element={<ForumMainPage />} />
        <Route
          path="/topic/:topicId/thread/:thread"
          element={<ForumMainPage />}
        />
        <Route
          path="/topic/:topicId/thread/:thread/page/:pageNumber"
          element={<ForumMainPage />}
        />
      </Routes>
    </div>
  );
};

export default App;
