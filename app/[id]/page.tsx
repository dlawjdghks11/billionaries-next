import axios from "axios";
import { URL } from "../page";

interface Props {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

interface Detail {
  id: string;
  state: string;
  city: string;
  name: string;
  country: string;
  position: number;
  industries: string[];
  financialAssets: [[Object], [Object], [Object], [Object], [Object], [Object]];
  thumbnail: string;
  squareImage: string;
  bio: string[];
  about: string[];
  netWorth: number;
}

const getDetail = async (id: string) => {
  const res = await axios.get<Detail>(`${URL}/person/${id}`);

  return res.data;
};

const DetailPage = async ({ params }: Props) => {
  const id = params.id;
  const data = await getDetail(id);

  console.log(data);
  return <div>{data.name}</div>;
};

export default DetailPage;
