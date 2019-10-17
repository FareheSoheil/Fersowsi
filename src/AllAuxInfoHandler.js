import { fetchWithTimeOut } from './fetchWithTimeout';
import { SERVER } from './constants';

const allAuxInfoHandler = () => {
  const url = `${SERVER}`;
  let infos = {
    AgeGroup: [],
  };
  this.setState({
    isLoading: true,
  });
  const credentials = {
    productId: this.state.id,
  };
  const options = {
    method: 'POST',
    body: JSON.stringify(credentials),
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const that = this;
  fetchWithTimeOut(
    `${SERVER}/getUserDetails`,
    options,
    response => {
      that.setState({
        product: response.product,
        isLoading: false,
      });
    },
    error => {
      console.log(error);
    },
  );
};
