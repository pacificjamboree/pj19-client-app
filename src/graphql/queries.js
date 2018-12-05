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
            isYouth
          }
        }
      }
    }
  }
`;

const OOS_EDIT_QUERY_WITH_ADVENTURE_NAMES = gql`
  query oosEditQueryWithAdventureNames($oosNumber: String!) {
    adventures {
      _id
      name
    }
    offerOfService(search: { searchField: oosNumber, value: $oosNumber }) {
      id
      _id
      oosNumber
      firstName
      lastName
      preferredName
      fullName
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
        _id
      }
    }
  }
`;

const GET_OFFER_OF_SERVICE_BY_OOS_NUMBER = gql`
  query oosById($oosNumber: String!) {
    offerOfService(search: { searchField: oosNumber, value: $oosNumber }) {
      id
      _id
      oosNumber
      firstName
      lastName
      preferredName
      fullName
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

const UPDATE_OFFER_OF_SERVICE_BY_ID = gql`
  mutation updateOfferOfService(
    $id: ID!
    $offerOfService: OfferOfServiceUpdate!
  ) {
    updateOfferOfService(input: { id: $id, OfferOfService: $offerOfService }) {
      OfferOfService {
        id
        _id
        oosNumber
        firstName
        lastName
        preferredName
        fullName
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
  }
`;

const BATCH_IMPORT_OOS_MUTATION = gql`
  mutation batchImportOffersOfService($data: [OfferOfServiceDraft!]!) {
    batchImportOffersOfService(input: { OffersOfService: $data }) {
      offersOfService {
        id
        _id
        oosNumber
        firstName
        lastName
        preferredName
        fullName
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
        importId
      }
    }
  }
`;

const SEND_OOS_WELCOME_EMAIL = gql`
  mutation sendOfferOfServiceWelcomeEmail($id: ID!) {
    sendOfferOfServiceWelcomeEmail(input: { id: $id }) {
      status
    }
  }
`;

const SEND_OOS_ASSIGNMENT_EMAIL = gql`
  mutation sendOfferOfServiceWelcomeEmail($id: ID!) {
    sendOfferOfServiceAssignmentEmail(input: { id: $id }) {
      status
    }
  }
`;

const SEND_OOS_WELCOME_EMAILS_BULK = gql`
  mutation sendOfferOfServiceWelcomeMessagesBulk($ids: [ID!]!) {
    sendOfferOfServiceWelcomeMessagesBulk(input: { ids: $ids }) {
      status
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
  GET_OFFERS_OF_SERVICE,
  GET_OFFER_OF_SERVICE_BY_OOS_NUMBER,
  UPDATE_OFFER_OF_SERVICE_BY_ID,
  OOS_EDIT_QUERY_WITH_ADVENTURE_NAMES,
  BATCH_IMPORT_OOS_MUTATION,
  SEND_OOS_WELCOME_EMAILS_BULK,
  SEND_OOS_WELCOME_EMAIL,
  SEND_OOS_ASSIGNMENT_EMAIL,
};
