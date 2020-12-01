const Header = ({ sortByOptions, activeSortByOptionId, onClickOption }) => {
  return (
    <header>
      <PageHeader
        className="site-page-header-responsive"
        onBack={() => window.history.back()}
        title="Creatella"
        subTitle="E-commerce challenge"
        extra={[
          <SortBy
            options={sortByOptions}
            activeOpionId={activeSortByOptionId}
            onClickOption={onClickOption}
          />,
        ]}
      />
    </header>
  );
};
