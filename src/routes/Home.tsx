import { Col, Pagination, Row } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ShowPokes from "../components/ShowPokes";

export default function Home() {
  //controlled states for pagination and fetching the poke api
  const [total, setTotal] = useState();
  const [pokes, setPokes] = useState<any>();
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(20);

  // fetch new pokes on page changes
  useEffect(() => {
    const fetchPokes = async () => {
      const { data } = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${
          (currentPage - 1) * limit
        }`
      );
      setPokes(data?.results);
      setTotal(data?.count);
    };
    fetchPokes();
  }, [limit, currentPage]);

  return (
    <div width="100%">
      {/* link to favorites page */}
      <Link to="/favorites">My Favorites</Link>
      
      {/* map each poke in the list to a ShowPoke element with name and image */}
      <Row align="middle" gutter={[10, 10]}>
        {pokes?.map(({ name, url }) => (
          <Col xs={24} sm={12} md={6}>
            <ShowPokes key={`poke_${name}`} name={name} url={url} />
          </Col>
        ))}
      </Row>
      {/* visual component for pagination from antd lib */}
      <Pagination
        showSizeChanger
        total={total}
        current={currentPage}
        defaultCurrent={1}
        defaultPageSize={20}
        onChange={(page) => setCurrentPage(page)}
        onShowSizeChange={(current) => setLimit(current)}
      />
    </div>
  );
}
