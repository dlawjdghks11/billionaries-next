import axios from "axios";
import Link from "next/link";
import styles from "../styles/home.module.css";
import { URL } from "../lib/constants";

interface BillionariesList {
  id: string;
  name: string;
  squareImage: string;
  netWorth: number;
  industries: string[];
}

const Home = async () => {
  const res = await axios.get<BillionariesList[]>(URL);

  return (
    <div className={styles.container}>
      {res.data.map((list) => (
        <Link key={list.id} href={`/${list.id}`}>
          <div className={styles.card}>
            <div
              className={styles.bgImg}
              style={{ backgroundImage: `url(${list.squareImage})` }}
            />
            <span className={styles.name}>{list.name}</span>
            <div>
              <span>{Math.floor(list.netWorth / 1000)} Billion / </span>
              <span>{list.industries.join(", ")}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Home;
