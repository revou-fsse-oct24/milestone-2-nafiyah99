import React from 'react';
import { useRouter } from 'next/router';

const DetailProductPage = () => {
  const { query } = useRouter();
  return (
    <>
      <div>Product Page</div>
      {query.product && query.product.length >= 2 && (
        <>
          <div>DetailProductPage</div>
          <p>
            product: {query.product[0]} / {query.product[1]}{' '}
          </p>
        </>
      )}
    </>
  );
};

export default DetailProductPage;
