import { useEffect, useState } from "react";
import { Typography, Card, Image } from "antd";
import axios from "axios";
import { Link } from "react-router-dom"

export default function ShowPokes({
  name,
  url,
}: {
  name: string;
  url: string;
}) {
  const { Text } = Typography;
  // state for the url sprite of the poke
  const [spriteUrl, setSpriteUrl] = useState();

  // fetch poke image from link and set to state
  useEffect(() => {
    const fetchImg = async () => {
      const { data } = await axios.get(url);
      setSpriteUrl(data?.sprites?.front_default);
    };
    fetchImg();
  }, []);
  return (
    // card containing name and image
    <Card style={{ margin: "0" }}>
      <center>
        <Text>{name}</Text>
      </center>
      <Image preview={false} width="100%" alt={name} src={spriteUrl} />
      <center>
        {/* link to details page passing url and name params*/}
        <Link to={`/details?url=${url}&name=${name}`}>Details</Link>
      </center>
    </Card>
  );
}
