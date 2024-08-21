import { Route, Routes } from "react-router";
import routes from "./routes";
import { Layout } from "./components";

function App() {
  return (
    <Layout>
      <Routes>
          {routes.map(({ id, path, Element }) => (
            <Route key={`routeId_${id}`} path={path} element={Element} />
          ))}
      </Routes>
    </Layout>
  );
}

export default App;
