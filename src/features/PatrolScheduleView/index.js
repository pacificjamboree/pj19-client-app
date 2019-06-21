import React from 'react';
import { Button, Header, Icon, Loader } from 'semantic-ui-react';
import formatDate from 'date-fns/format';
import { Query } from 'react-apollo';
import { Link } from '@reach/router';
import gql from 'graphql-tag';

import styles from './style.module.css';
console.log(styles);
const DATE_FORMAT_START = 'dddd h:mm A';
const DATE_FORMAT_END = 'h:mm A';
const QUERY = gql`
  query getParol($id: String!) {
    patrol(search: { searchField: id, value: $id }) {
      id
      _id
      patrolNumber
      schedule {
        periods {
          id
          _id
          startAt
          endAt
          adventure {
            location
            adventureCode
            fullName
          }
        }
      }
    }
  }
`;

const formatLocation = location =>
  location === 'onsite' ? (
    'On-Site'
  ) : (
    <span>
      <Icon name="bus" />
      Off-Site – 
      <strong>Consult Bus Schedule for Departure Time and Bus Number</strong>
    </span>
  );

const PatrolScheduleView = ({ id }) => {
  return (
    <Query query={QUERY} variables={{ id }}>
      {({ error, loading, data }) => {
        if (error) {
          console.log(error);
          return <p>Error</p>;
        }
        if (loading)
          return <Loader active label="Loading Adventure Selection" />;

        const entries = data.patrol.schedule.periods.map(p => (
          <PeriodDetail key={p.id} period={p} />
        ));
        return (
          <>
            <Header as="h1">
              Adventure Schedule - Patrol {data.patrol.patrolNumber}
            </Header>
            <a
              href={`${process.env.REACT_APP_PATROL_SCHEDULE_URL_BASE}/${
                data.patrol._id
              }.pdf`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ marginBottom: '1em', display: 'block' }}
            >
              <Button icon labelPosition="left" color="blue">
                <Icon name="file pdf" />
                Print Schedule
              </Button>
            </a>
            <p>
              Adventure Schedule Changes can be made at Adventure Headquarters
              before 8pm. No same-day adventure additions can be made. If you
              plan to drop out of an activity, please let us know either in
              person at Adventure Headquarters, or through your Subcamp, so that
              we can make your space available to other Patrols, and so that
              we're not looking for you.
            </p>
            <p>
              For off-site activities, the times noted{' '}
              <strong>
                are not your bus departure times. You must consult the bus
                schedules posted in your Subcamp, and at the Adventure Bussing
                area for your bus departure times.
              </strong>{' '}
              You must arrive at your bus at least 15 minutes prior to the
              posted departure time. Busses will not be held for late units.
            </p>
            <p>
              Please consult the Trail Card for each Adventure. They contain
              important information about how to prepare for each Adventure.
            </p>

            <p>
              Note that some activites (e.g. Escape Room and Robotics) appear to
              occur at the same times and overlap. These two activities are
              offered together; Patrols will be split amongst the two and rotate
              through both.
            </p>
            <div className={styles.periodDetail}>{entries}</div>
          </>
        );
      }}
    </Query>
  );
};

const PeriodDetail = ({ period }) => {
  return (
    <div>
      <Header as="h2">
        {formatDate(period.startAt, DATE_FORMAT_START)} -{' '}
        {formatDate(period.endAt, DATE_FORMAT_END)}
      </Header>
      <Header as="h3">
        <Link to={`/adventures/${period.adventure.adventureCode}`}>
          {period.adventure.fullName}
        </Link>
      </Header>
      <p>{formatLocation(period.adventure.location)}</p>
      {/* <a
        href={`${process.env.REACT_APP_TRAIL_CARD_URL_BASE}/${
          period.adventure.adventureCode
        }.pdf`}
      >
        <Button icon labelPosition="left" color="blue" size="mini">
          <Icon name="file pdf" />
          Trail Card
        </Button>
      </a> */}
    </div>
  );
};

export default PatrolScheduleView;
