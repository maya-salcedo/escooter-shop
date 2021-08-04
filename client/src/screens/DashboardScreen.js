import React, { useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import Chart from 'react-google-charts';
import { summaryOrder } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

const TitleWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
`;

const SummaryWrapper = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  > li {
    border: 0.1rem #c0c0c0 solid;
    margin: 2rem;
    border-radius: 0.5rem;
    flex: 1 1 20rem;
  }
`;

const SummaryTitleWrapper = styled.div`
  font-size: 2rem;
  padding: 1rem;
  background-color: ${(props) => props.theme.main};
`;

const themePink = {
  main: '#f0e0e0',
};

const themeGreen = {
  main: '#e0f0e0',
};

const themePurple = {
  main: '#e0e0f0',
};

const SummaryBodyWrapper = styled.div`
  font-size: 4rem;
  padding: 1rem;
  text-align: center;
`;

const DashboardScreen = () => {
  const orderSummary = useSelector((state) => state.orderSummary);
  const { loading, summary, error } = orderSummary;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(summaryOrder());
  }, [dispatch]);
  return (
    <div>
      <TitleWrapper>
        <h1>Dashboard</h1>
      </TitleWrapper>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <SummaryWrapper>
            <li>
              <ThemeProvider theme={themePink}>
                <SummaryTitleWrapper>
                  <span>
                    <i className="fa fa-users" /> Users
                  </span>
                </SummaryTitleWrapper>
              </ThemeProvider>
              <SummaryBodyWrapper>
                {summary.users[0].numUsers}
              </SummaryBodyWrapper>
            </li>
            <li>
              <SummaryTitleWrapper theme={themeGreen}>
                <span>
                  <i className="fa fa-shopping-cart" /> Orders
                </span>
              </SummaryTitleWrapper>
              <SummaryBodyWrapper>
                {summary.orders[0] ? summary.orders[0].numOrders : 0}
              </SummaryBodyWrapper>
            </li>
            <li>
              <SummaryTitleWrapper theme={themePurple}>
                <span>
                  <i className="fa fa-money" /> Sales
                </span>
              </SummaryTitleWrapper>
              <SummaryBodyWrapper>
                {summary.orders[0]
                  ? summary.orders[0].totalSales.toFixed(2)
                  : 0}
              </SummaryBodyWrapper>
            </li>
          </SummaryWrapper>
          <div>
            <div>
              <h2>Sales</h2>
              {summary.dailyOrders.length === 0 ? (
                <MessageBox>No sale</MessageBox>
              ) : (
                <Chart
                  width="100%"
                  height="400px"
                  chartType="AreaChart"
                  loader={<div>Loading Chart</div>}
                  data={[
                    ['Date', 'Sales'],
                    ...summary.dailyOrders.map((x) => [x._id, x.sales]),
                  ]}
                ></Chart>
              )}
            </div>
            <div>
              <h2>Categories</h2>
              {summary.productCategories.length === 0 ? (
                <MessageBox>No Category</MessageBox>
              ) : (
                <Chart
                  width="100%"
                  height="400px"
                  chartType="PieChart"
                  loader={<div>Loading Chart</div>}
                  data={[
                    ['Category', 'Products'],
                    ...summary.productCategories.map((x) => [x._id, x.count]),
                  ]}
                ></Chart>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardScreen;
