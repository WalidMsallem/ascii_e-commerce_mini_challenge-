const Product = React.memo(
  ({ product: { size, price, face, date }, incrementNextAdNumber }) => {
    useEffect(() => {
      incrementNextAdNumber();
    }, []);

    return (
      <Col>
        <Card
          bordered={false}
          className="gutter-row"
          hoverable
          style={{ width: 405, margin: "5px 25px" }}
          cover={
            <div className="product__face" style={{ fontSize: size }}>
              <div className="product__face__content">{face}</div>
            </div>
          }
        >
          <div className="product__container" >
            <Meta
              title={
                <Fragment>
                  <div className="sz-18">{renderSize(size)}</div>
                  <div>{renderPrice(price)}</div>
                </Fragment>
              }
              description={
                <Tooltip
                  placement="right"
                  title={renderFullDate(date)}
                  color="volcano"
                >
                  {renderHumanizedDate(date)}
                </Tooltip>
              }
            />
          </div>
        </Card>
      </Col>
    );
  }
);
