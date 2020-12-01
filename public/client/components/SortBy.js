const SortBy = ({ options, activeOpionId, onClickOption }) => {
  const menu = (
    <div className="sort-by__options" key="qqq">
      {Object.entries(options).map(([id, value]) => (
        <Fragment key={id}>
          <input
            type="button"
            className="sort-by__button"
            value={value || "Unset sort"}
            onClick={() => {
              onClickOption(id);
            }}
          />
        </Fragment>
      ))}
    </div>
  );
  return (
    <div className="sort-by">
      <Dropdown overlay={menu} placement="bottomCenter">
        <Button>{`Sort by ${options[activeOpionId] || ""} ▾`}</Button>
      </Dropdown>
    </div>
  );
};
