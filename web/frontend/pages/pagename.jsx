import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast, Toaster } from "react-hot-toast";
import { TbCopy } from "react-icons/tb";
import "../assets/styles.css";
import Loader from "../components/Loader/Loader";


export default function PageName() {
  const { t } = useTranslation();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [isRevealed, setIsRevealed] = useState({
    token: false,
    shop: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("api/data");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        console.log(result, "result");
        setLoading(false);
        setData(result?.data);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCopy = async (item) => {
    const copyToText = item;

    try {
      await navigator.clipboard.writeText(copyToText);
      toast.success("Text copied to clipboard!");
    } catch (err) {}
  };

  const toggleReveal = (type) => {
    setIsRevealed((prevState) => ({
      ...prevState,
      [type]: !prevState[type],
    }));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="wrapper">
          <div class="container">
            <div className="section">
              <h3>Admin API access token</h3>
              <p>Use your access token to request data from the Admin API.</p>
              <div className="token-box">
                <div className="token">
                  {isRevealed.token
                    ? data?.accessToken
                    : "******************************"}
                </div>
<div className="copyBox">
                
                <a
                  href="#"
                  className="button"
                  onClick={() => toggleReveal("token")}
                >
                  {isRevealed.token ? "Hide token" : "Reveal token"}
                </a>
                <span   onClick={() => handleCopy(data?.accessToken)}>
                  <TbCopy  fontSize={18}/>
                </span>
              </div>
              </div>
            </div>

            <div className="section">
            <h3>Scopes</h3>
              <div className="token-box">
                <div className="token">{data?.scope}</div>
              </div>
            </div>

            <div class="section">
              <h3>Keep your access tokens secure</h3>
              <p>
                Only share them with developers that you trust to safely access
                your data.
              </p>
            </div>
            <div className="section">
              <h3>Shop URL</h3>
              <div className="token-box">
                <div className="token">
                  {isRevealed.shop
                    ? data?.shop
                    : "******************************"}
                </div>
                <div className="copyBox">
                
                <a
                  href="#"
                  className="button"
                  onClick={() => toggleReveal("shop")}
                >
                  {isRevealed.shop ? "Hide shop" : "Reveal shop URL"}
                </a>
                <span   onClick={() => handleCopy(data?.shop)}>
                  <TbCopy fontSize={18}/>
                </span>
                </div>
              </div>
            </div>
          </div>

          <Toaster position="top-center" />
        </div>
      )}
    </>
  );
}
