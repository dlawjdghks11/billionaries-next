import axios from "axios";
import styles from "../../styles/detail.module.css";
import { URL } from "../../lib/constants";

interface Detail {
  id: string;
  state: string;
  city: string;
  name: string;
  country: string;
  position: number;
  industries: string[];
  financialAssets: {
    companyName: string;
    currencyCode: string;
    currentPrice: number;
    exchange: string;
    exchangeRate: number;
    interactive: boolean;
    numberOfShares: number;
    sharePrice: number;
    ticker: string;
  }[];
  thumbnail: string;
  squareImage: string;
  bio: string[];
  about: string[];
  netWorth: number;
}

const getDetail = async (id: string) => {
  const res = await axios.get<Detail>(`${URL}/person/${id}`);
  console.log(res.data.financialAssets);

  return res.data;
};

const DetailPage = async ({ params }) => {
  const data = await getDetail(params.id);

  return (
    <div className={styles.container}>
      <img className={styles.img} src={data.squareImage} alt="photo" />
      <div className={styles.title}>{data.name}</div>
      <div className={styles.description}>
        {Math.floor(data.netWorth / 1000)} billion
      </div>
      <div className={styles.description}>
        {" "}
        lassName={styles.description}Country: {data.country}
      </div>
      <div className={styles.description}>
        Industry: {data.industries.join(", ")}
      </div>
      <p className={styles.bio}>{data.bio}</p>
      <div className={styles.title}>Financial Assets</div>
      <div className={styles.cardConatiner}>
        {data.financialAssets.map((asset) => (
          <div className={styles.tickerCard}>
            <div>Tickers: {asset.ticker}</div>
            <div>Shares: {asset.numberOfShares}</div>
            {asset.currentPrice && (
              <div>Exercise Price: $ {asset.currentPrice} </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailPage;
