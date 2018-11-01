import gql from 'graphql-tag';

const OFFERS_OF_SERVICE_FRAGMENT = gql`
  fragment OffersOfServiceFragment on OfferOfService {
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
    # assignment {
    #   name
    #   id
    # }
  }
`;

const ADVENTURE_NAME_ID_FRAGMENT = gql`
  fragment AdventureNameIdFragment on Adventure {
    _id
    name
  }
`;

export { OFFERS_OF_SERVICE_FRAGMENT, ADVENTURE_NAME_ID_FRAGMENT };
