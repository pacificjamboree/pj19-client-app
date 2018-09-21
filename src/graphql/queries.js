import gql from 'graphql-tag';

const GET_VIEWER_USERNAME = gql`
  query {
    viewer {
      username
      roles
    }
  }
`;

const GET_LOGGED_IN_VIEWER = gql`
  query getLoginState {
    loggedIn @client
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
  mutation updateAdventure($id: ID!, $adventure: AdventureUpdate) {
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

const OFFERS_OF_SERVICE_FOR_ADVENTURE = gql`
  query oosForAdventure($id: String!) {
    adventure(search: { searchField: id, value: $id }) {
      OffersOfServiceConnection {
        edges {
          node {
            id
            _id
            oosNumber
            fullName
            email
          }
        }
      }
    }
  }
`;

const GET_OFFER_OF_SERVICE_BY_ID = gql`
  query oosById($id: String!) {
    offerOfService(search: { searchField: id, value: $id }) {
const GET_OFFERS_OF_SERVICE = gql`
  query getOffersOfService {
    offersOfService {
      id
      _id
      oosNumber
      firstName
      lastName
      preferredName
      fullName
      birthdate
      isYouth
      email
      parentEmail
      phone1
      phone2
      prerecruited
      prerecruitedBy
      additionalInformation
      previousExperience
      specialSkills
      assigned
      assignment {
        name
        id
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
  GET_LOGGED_IN_VIEWER,
  OFFERS_OF_SERVICE_FOR_ADVENTURE,
  GET_OFFER_OF_SERVICE_BY_ID,
  GET_OFFERS_OF_SERVICE,
};
