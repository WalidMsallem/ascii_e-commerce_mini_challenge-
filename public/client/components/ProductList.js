const ProductList = React.memo(({ products, onFetchMore }) => {
  const [randomizedAdNumbers, setRandomizedAdNumbers] = useState([]);
  const [mapAdNumbersToIndexes, setMapAdNumbersToIndexes] = useState({});
  const [nextAdNumber, setNextAdNumber] = useState(-1);

  const incrementNextAdNumber = () => {
    const index = mapAdNumbersToIndexes[nextAdNumber];

    const nextIndex = (index + 1) % randomizedAdNumbers.length;
    setNextAdNumber(randomizedAdNumbers[nextIndex]);
  };

  const initializeRandomAdNumbers = () => {
    const randomizedAdNumbersFromLocalStorage = (() => {
      try {
        return JSON.parse(
          window.localStorage.getItem("randomizedAdNumbers") || "[]"
        );
      } catch (err) {
        // in case parsing local storage failed
        return [];
      }
    })();

    const newRandomizedAdNumbers =
      randomizedAdNumbersFromLocalStorage.length !== 0
        ? randomizedAdNumbersFromLocalStorage
        : createRandomizedAdNumbers(1000);

    const nextAdNumberFromLocalStorage = (() => {
      try {
        return JSON.parse(window.localStorage.getItem("nextAdNumber") || "-1");
      } catch (err) {
        // in case parsing local storage failed
        return -1;
      }
    })();

    const newNextAdNumber =
      nextAdNumberFromLocalStorage !== -1
        ? nextAdNumberFromLocalStorage
        : newRandomizedAdNumbers[0];

    setNextAdNumber(newNextAdNumber);

    setRandomizedAdNumbers(newRandomizedAdNumbers);

    const createMapAdNumbersToIndexes = (adNumbers) => {
      const map = {};
      Object.entries(adNumbers).forEach(([adIndex, adNumber]) => {
        map[adNumber] = Number(adIndex);
      });
      return map;
    };
    setMapAdNumbersToIndexes(
      createMapAdNumbersToIndexes(newRandomizedAdNumbers)
    );
  };

  useEffect(initializeRandomAdNumbers, []);

  const saveRandomizedAdNumbers = () => {
    window.localStorage.setItem(
      "randomizedAdNumbers",
      JSON.stringify(randomizedAdNumbers)
    );
  };

  useEffect(saveRandomizedAdNumbers, [randomizedAdNumbers]);

  const saveNextAdNumberToLocalStorage = () => {
    window.localStorage.setItem("nextAdNumber", JSON.stringify(nextAdNumber));
  };

  useEffect(saveNextAdNumberToLocalStorage, [nextAdNumber]);

  const handleScroll = () => {
    if (checkScroll(FETCH_SCROLL_THRESHOLD, null)) {
      onFetchMore();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Row className="product-list">
      {products.map((product, i) => {
        const shouldShowAd = i !== 0 && i % 20 == 0;
        return (
          <Fragment key={i}>
            {shouldShowAd && nextAdNumber > -1 && (
              <Card
                bordered={false}
                className="gutter-row"
                hoverable
                style={{ width: 405, margin: "5px 25px" }}
                cover={
                  <div className="ads_img_cont">
                    <img
                      src={`http://localhost:3000/ads/?r=${nextAdNumber}`}
                      className="ads_img"
                    />
                  </div>
                }
              >
                <div className="product__container ads_content">
                  <Meta
                    title="Check it out"
                    description="Please take a word from our sponsors"
                  />
                </div>
              </Card>
            )}
            <Product
              key={product.id}
              product={product}
              shouldShowAd={shouldShowAd}
              adNumber={nextAdNumber}
              incrementNextAdNumber={() => {
                if (shouldShowAd) {
                  incrementNextAdNumber();
                }
              }}
            />
          </Fragment>
        );
      })}
    </Row>
  );
});
