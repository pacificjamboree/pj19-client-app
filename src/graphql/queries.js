import gql from 'graphql-tag';
import { OFFERS_OF_SERVICE_FRAGMENT } from './fragments';

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

const GET_DASHBOARD_VIEWER = gql`
  query getFullViewer {
    viewer {
      id
      username
      roles
      OfferOfService {
        ...OffersOfServiceFragment
        managesAdventures {
          id
          _id
          adventureCode
          fullName
        }
      }
      PatrolScouter {
        id
        email
        Patrols {
          id
          _id
          groupName
          patrolName
          patrolNumber
          fullyPaid
          finalPaymentDate
          numberOfScouts
          numberOfScouters
          totalUnitSize
          subcamp
          adventureSelection {
            id
            wantScuba
            wantExtraFreePeriod
            selectionOrder {
              id
              fullName
            }
            workflowState
          }
        }
      }
    }
  }
  ${OFFERS_OF_SERVICE_FRAGMENT}
`;

const GET_FLASH_MESSAGES = gql`
  query {
    messages @client {
      id
      kind
      message
      error
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

const SEND_PASSWORD_RESET_EMAIL_MUTATION = gql`
  mutation sendPasswordResetEmail($username: String!) {
    sendPasswordResetEmail(input: { username: $username }) {
      status
      error
    }
  }
`;

const RESET_PASSWORD_MUTATION = gql`
  mutation resetPassword($passwordResetToken: String!, $password: String!) {
    resetPassword(
      input: { passwordResetToken: $passwordResetToken, password: $password }
    ) {
      status
    }
  }
`;

const GET_ADVENTURE_TABLE = gql`
  query adventures($workflowState: WorkflowState) {
    adventures(filters: { workflowState: [$workflowState] }) {
      id
      adventureCode
      name
      themeName
      fullName
      fee
      premiumAdventure
      periodsRequired
      location
      capacityPerPeriod
      hidden
      oosRequired
      adultOOSRequired
      oosAssignedCount
      adultOOSAssignedCount
      ManagersConnection {
        edges {
          node {
            oosNumber
            fullName
          }
        }
      }
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
      fullName
      description
      fee
      premiumAdventure
      periodsRequired
      location
      capacityPerPeriod
      hidden
      OffersOfServiceConnection {
        edges {
          node {
            id
          }
        }
      }
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
      fullName
      description
      oosDescription
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
      oosRequired
      adultOOSRequired
    }
  }
`;

const CREATE_ADVENTURE = gql`
  mutation createAdventure($adventure: AdventureDraft) {
    createAdventure(input: { Adventure: $adventure }) {
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
        oosRequired
        adultOOSRequired
      }
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
        oosDescription
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
        oosRequired
        adultOOSRequired
      }
    }
  }
`;

const OFFERS_OF_SERVICE_FOR_ADVENTURE = gql`
  query oosForAdventure($adventureId: String!) {
    offersOfServiceForAdventure(
      search: { searchField: id, value: $adventureId }
    ) {
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
      isAdventureManager
      user {
        id
      }
      welcomeEmailSentAt
      assignmentEmailSentAt
      workflowState
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

const ASSIGN_MANAGER_TO_ADVENTURE = gql`
  mutation assignManagerToAdventure($adventureId: ID!, $oosId: ID!) {
    assignManagerToAdventure(
      input: { adventureId: $adventureId, oosId: $oosId }
    ) {
      Adventure {
        id
      }
    }
  }
`;
const REMOVE_MANAGER_FROM_ADVENTURE = gql`
  mutation removeManagerFromAdventure($adventureId: ID!, $oosId: ID!) {
    removeManagerFromAdventure(
      input: { adventureId: $adventureId, oosId: $oosId }
    ) {
      Adventure {
        id
      }
    }
  }
`;

const CREATE_USER = gql`
  mutation createUser(
    $username: String!
    $oosId: ID
    $patrolScouterId: ID
    $admin: Boolean
    $workflowState: WorkflowState
  ) {
    createUser(
      input: {
        User: {
          username: $username
          oosId: $oosId
          patrolScouterId: $patrolScouterId
          admin: $admin
          workflowState: $workflowState
        }
      }
    ) {
      User {
        id
        username
      }
    }
  }
`;

const ADMIN_DASHBOARD = gql`
  query {
    offerOfServiceCount {
      required
      adultRequired
      allocated
      adultAllocated
      assigned
      unassigned
    }

    patrolStats {
      numberOfPatrols
      totalScouts
      totalScouters
      patrolsWithThreeScouters
      totalParticipants
      totalAdventureParticipants
    }

    patrolAdventureSelectionStats {
      defined
      draft
      saved
      total
      wantExtraFreePeriod
    }
  }
`;

const ADVENTURE_MANAGER_DASHBOARD = gql`
  query adventureManagerDashboard($adventureId: String!) {
    adventure(search: { searchField: id, value: $adventureId }) {
      oosRequired
      oosAssignedCount
    }
  }
`;

export {
  GET_VIEWER_USERNAME,
  LOGIN_MUTATION,
  GET_LOGIN_STATE,
  UPDATE_LOGIN_STATE,
  SEND_PASSWORD_RESET_EMAIL_MUTATION,
  RESET_PASSWORD_MUTATION,
  GET_FLASH_MESSAGES,
  GET_ADVENTURE_LIST,
  GET_ADVENTURE_TABLE,
  GET_ADVENTURE_BY_ID,
  CREATE_ADVENTURE,
  UPDATE_ADVENTURE_BY_ID,
  GET_LOGGED_IN_VIEWER,
  GET_DASHBOARD_VIEWER,
  OFFERS_OF_SERVICE_FOR_ADVENTURE,
  GET_OFFERS_OF_SERVICE,
  GET_OFFER_OF_SERVICE_BY_OOS_NUMBER,
  UPDATE_OFFER_OF_SERVICE_BY_ID,
  OOS_EDIT_QUERY_WITH_ADVENTURE_NAMES,
  BATCH_IMPORT_OOS_MUTATION,
  SEND_OOS_WELCOME_EMAILS_BULK,
  SEND_OOS_WELCOME_EMAIL,
  SEND_OOS_ASSIGNMENT_EMAIL,
  ASSIGN_MANAGER_TO_ADVENTURE,
  REMOVE_MANAGER_FROM_ADVENTURE,
  CREATE_USER,
  ADMIN_DASHBOARD,
  ADVENTURE_MANAGER_DASHBOARD,
};
