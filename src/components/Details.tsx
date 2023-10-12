import { useEffect, useState } from "react";
import { Typography, Row, Col, Image, Space, Card, Flex, Button } from "antd";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";

export default function Details() {
  const { Title, Text } = Typography;
  // state containing the fetched details of the poke
  const [details, setDetails] = useState();
  // get search params from router
  const [params] = useSearchParams();
  //get values from search params
  const name = params.get("name");
  const url = params.get("url");

  const addToStorage = () => {
    //get favorited list
    const favorites: any[] =
      JSON.parse(localStorage.getItem("favorites")) ?? [];
    if (favorites.length > 0) {
      //do not add if poke already favorited
      if (favorites.find((favorited) => favorited.name === name)) {
        alert("Already favorited");
        return;
      }
    }
    // add new poke to favorites
    favorites.push({
      name,
      url,
    });
    // set localStorage with new favorites value
    localStorage.setItem("favorites", JSON.stringify(favorites));
  };
  // fetch details for the poke at first render
  useEffect(() => {
    const fetchDetails = async () => {
      const { data } = await axios.get(url);
      setDetails({
        img: data?.sprites?.front_default,
        height: data?.height,
        weight: data?.weight,
        base_experience: data?.base_experience,
        abilities: data?.abilities?.map(({ ability: { name } }) => name),
        moves: data?.moves?.map(({ move: { name } }) => name),
        types: data?.types?.map(({ type: { name } }) => name),
      });
    };
    fetchDetails();
  }, []);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {/* link back to home page */}
        <Link to="/">Back to Home</Link>
        {/* butto to add poke to favorites */}
        <Button onClick={addToStorage}>Favorite</Button>
      </div>

      <center>
        <Title>
          Pokémon Details <br /> {name}
        </Title>
      </center>
      {/* poke base info */}
      <Row align="middle" gutter={[20, 20]}>
        <Col span={12}>
          <Image
            style={{ margin: "0 auto" }}
            preview={false}
            src={details?.img}
          />
        </Col>

        <Col span={12}>
          <Row>
            <Text>Height: {details?.height}</Text>
          </Row>
          <Row>
            <Text>Weight: {details?.weight}</Text>
          </Row>
          <Row>
            <Text>Experience: {details?.base_experience}</Text>
          </Row>
        </Col>
      </Row>
      <Row>
        {/* poke abilities  */}
        <Col span={12}>
          <Card title={<Title>Abilities: </Title>}>
            <Flex wrap="wrap" gap="small">
              {details?.abilities?.map((name) => (
                <div style={{ width: "25%" }}>{name}</div>
              ))}
            </Flex>
          </Card>
        </Col>
        {/* poke types */}
        <Col span={12}>
          <Card title={<Title>Types: </Title>}>
            <Flex wrap="wrap" gap="small">
              {details?.types?.map((name) => (
                <div style={{ width: "25%" }}>{name}</div>
              ))}
            </Flex>
          </Card>
        </Col>
      </Row>
      {/* poke moves */}
      <Card title={<Title>Moves: </Title>}>
        <Flex wrap="wrap" gap="small">
          {details?.moves?.map((name) => (
            <div style={{ width: "12%" }}>{name}</div>
          ))}
        </Flex>
      </Card>
    </div>
  );
}
