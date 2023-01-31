import { userService } from "services";
import { Nav } from "components";

// import { Link } from "components";

export default Home;

function Home() {
  return (
    <>
      <Nav />
      <div className="p-4">
        <div className="container">
          <h1>Hi {JSON.parse(localStorage.getItem("user")).email}!</h1>
          <p>You&apos;re logged in!</p>
        </div>
      </div>
    </>
  );
}
