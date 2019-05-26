import React from 'react';
import PaginationStyles from './styles/PaginationStyles';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Error from './ErrorMessage';
import { perPage } from '../config';
import Head from 'next/head';
import Link from 'next/link';
const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    itemsConnection {
      aggregate {
        count
      }
    }
  }
`;

const Pagination = props => {
  return (
    <Query query={PAGINATION_QUERY}>
      {({ error, loading, data }) => {
        if (error) return <Error error={error} />;
        if (loading) return <p>Loading...</p>;
        const count = data.itemsConnection.aggregate.count;
        const pages = Math.ceil(count / perPage);
        return (
          <PaginationStyles>
            <Head>
              <title>
                Sick fits! - Page {props.page} of {pages}
              </title>
            </Head>
            <Link
              prefetch={true}
              href={{ pathname: 'items', query: { page: props.page - 1 } }}
            >
              <a className='prev' aria-disabled={props.page <= 1}>
                &lsaquo; Previous
              </a>
            </Link>

            <p>
              Page {props.page} of {pages}
            </p>
            <p>{count} Items Total</p>
            <Link
              prefetch={true}
              href={{ pathname: 'items', query: { page: props.page + 1 } }}
            >
              <a className='prev' aria-disabled={props.page >= pages}>
                Next &rsaquo;
              </a>
            </Link>
          </PaginationStyles>
        );
      }}
    </Query>
  );
};

export default Pagination;
