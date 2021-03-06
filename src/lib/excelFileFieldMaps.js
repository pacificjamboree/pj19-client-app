// The OOS and Unit Excel files use the raw field labels from the
// online forms as their header rows. This maps those values to their
// database equivalents

export const oosFieldMap = {
  'OOS Number': 'oosNumber',
  'Last Name (As listed in myscouts)': 'lastName',
  'First Name (As listed in myscouts)': 'firstName',
  "Alternate First Name (ie. If myscouts has you as 'Colin James' but you go by 'Jim')":
    'preferredName',
  'Email Address2': 'email',
  'Email Address': 'email',
  'Youth Y/N': 'isYouth',
  'Youth (18 and under) Please provide a parent/guardian Email Address':
    'parentEmail',
  'Were you recruited for a Role at PJ19?': 'prerecruited',
  'Please enter the name of person who recruited you if applicable?':
    'prerecruitedBy',
  'Main Phone: (can be same as Cell Phone)': 'phone1',
  'Cell Phone: (can be same as Main Phone)': 'phone2',
  'Please enter any Certification or special skills you have that you feel might be relevent or helpful. Such as Life Guard, First Aid, Food Safe, Diving, Climbing wall practitioner, etc?':
    'specialSkills',
  'Please briefly tell us about any experience with previous Jamborees or similar events. Enter "None" if this is your first event - we will train you don\'t worry!':
    'previousExperience',
  'Please tell us any additional information you feel is necessary regarding your needs i.e.: the requirement for charging CPAP, use of mobility devices etc.':
    'additionalInformation',
};

export const patrolFieldMap = {
  'Unit Number': 'patrolNumber',
  'Sub Camp': 'subcamp',
  'Contact Scouter Email ID': 'email',
  'Contact Scouter First Name': 'firstName',
  'Contact Scouter Last Name': 'lastName',
  'Phone Number': 'phone',
  'Group Name as it appears in myscouts i.e. 1St Greenfield Scouts':
    'groupName',
  'You have the option to assign a unique name to this patrol – could be the same as your Group name or it could be ‘Spicy Taco Patrol’, be as creative as you like.  This will be important for Groups registering more than one patrol (non mandatory field).  If you leave this field blank your patrol name will be the same as your Group name.':
    'patrolName',
  Scouts: 'numberOfScouts',
  Scouters: 'numberOfScouters',
};

export const paymentFieldMap = {
  'Unit Number': 'patrolNumber',
  'Date Final Payment Received': 'finalPaymentDate',
};
