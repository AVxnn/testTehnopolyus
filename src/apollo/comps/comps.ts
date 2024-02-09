import gql from "graphql-tag";

export const ALL_ITEMS = gql`
  query MyQuery {
    comps {
      count
      date
      pc
      status
      time_end
      time_start
      zone
    }
  }
`;

export const SEARCH_ITEMS = gql`
  query GetItems(
    $searchTerm: String
    $sortByPrice: order_by
    $sortByComputer: order_by
  ) {
    comps(
      where: { status: { _regex: $searchTerm } }
      order_by: { count: $sortByPrice, pc: $sortByComputer }
    ) {
      count
      date
      pc
      status
      time_end
      time_start
      zone
    }
  }
`;
