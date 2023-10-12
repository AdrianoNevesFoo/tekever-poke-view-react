import ShowPokes from "../components/ShowPokes";
import { Col, Row, Typography } from "antd";
import { Link } from "react-router-dom";

export default function Favorites() {
  // get favorite pokes form storage and parse to array of objects
  const myFavorites = JSON.parse(localStorage.getItem("favorites"));
  const { Title } = Typography;

  return (
    <div>
      {/* link going back to home page */}
      <Link to="/">Back to home</Link>
      <center>
        <Title>My Favorite Pokes</Title>
      </center>
      {/* map each poke in the list to a ShowPoke element with name and image */}
      <Row align="middle" gutter={[10, 10]}>
        {myFavorites?.map(({ name, url }) => (
          <Col xs={24} sm={12} md={6}>
            <ShowPokes key={`poke_${name}`} name={name} url={url} />
          </Col>
        ))}
      </Row>
    </div>
  );
}
