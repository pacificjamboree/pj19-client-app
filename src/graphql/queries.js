import gql from 'graphql-tag';

const GET_VIEWER_USERNAME = gql`
  query {
    viewer {
      username
      roles
    }
  }
`;

const GET_NAVBAR_VISIBILITY_STATE = gql`
  query getNavbarVisibilityState {
    navbarVisible @client
  }
`;

const UPDATE_NAVBAR_VISIBILITY_STATE = gql`
  mutation updateNavbarVisibilityState($visible: Boolean!) {
    updateNavbarVisibilityState(visible: $visible) @client {
      navbarVisible
    }
  }
`;

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    createLoginToken(input: { username: $username, password: $password }) {
      token
      viewer {
        username
        roles
      }
    }
  }
`;

const GET_LOGIN_STATE = gql`
  query getLoginState {
    loggedIn @client
  }
`;

const UPDATE_LOGIN_STATE = gql`
  mutation updateLoggedInState($state: Boolean!) {
    updateLoggedInState(loggedIn: $state) @client {
      loggedIn
    }
  }
`;

const GET_ADVENTURE_LIST = gql`
  query adventures($workflowState: WorkflowState) {
    adventures(filters: { workflowState: [$workflowState] }) {
      adventureCode
      id
      _id
      name
      themeName
      description
      fee
      premiumAdventure
      periodsRequired
      location
      capacityPerPeriod
    }
  }
`;

const GET_ADVENTURE_BY_ID = gql`
  query adventureById($id: String!) {
    adventure(search: { searchField: id, value: $id }) {
      adventureCode
      id
      _id
      name
      themeName
      description
      fee
      premiumAdventure
      periodsRequired
      location
      capacityPerPeriod
      periodsOffered
      pdrPlan
      pdrDo
      pdrReview
      pdrSafetyTips
    }
  }
`;

const UPDATE_ADVENTURE_BY_ID = gql`
  mutation updateAdventureLalala($id: ID!, $adventure: AdventureUpdate) {
    updateAdventure(input: { id: $id, Adventure: $adventure }) {
      Adventure {
        adventureCode
        id
        _id
        name
        themeName
        description
        fee
        premiumAdventure
        periodsRequired
        location
        capacityPerPeriod
        periodsOffered
        pdrPlan
        pdrDo
        pdrReview
        pdrSafetyTips
      }
    }
  }
`;

export {
  GET_VIEWER_USERNAME,
  LOGIN_MUTATION,
  GET_LOGIN_STATE,
  UPDATE_LOGIN_STATE,
  GET_NAVBAR_VISIBILITY_STATE,
  UPDATE_NAVBAR_VISIBILITY_STATE,
  GET_ADVENTURE_LIST,
  GET_ADVENTURE_BY_ID,
  UPDATE_ADVENTURE_BY_ID,
};
