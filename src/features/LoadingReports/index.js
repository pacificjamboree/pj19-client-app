import React, { Fragment, useState } from 'react';
import { Query } from 'react-apollo';
import { Button, Header, Loader, Table } from 'semantic-ui-react';
import gql from 'graphql-tag';

import format from 'date-fns/format';

import './style.css';
const ADVENTURE_LOADING_REPORT = gql`
  query adventureLoadingReportForDay($day: Int!) {
    adventureLoadingReportForDay(day: $day) {
      adventureCode
      fullName
      capacityPerPeriod
      adventurePeriods {
        startAt
        participantsAssigned {
          scouts
          scouters
          total
        }
        capacityOverride
        patrols {
          patrolNumber
          patrolName
          subcamp
          numberOfScouts
          numberOfScouters
        }
      }
    }
  }
`;

const AdventureLoadingDayButtons = ({ setDay }) => {
  const days = [7, 8, 9, 10, 11, 12];
  return (
    <div class="noprint">
      {days.map(day => {
        return (
          <Button
            key={`july${day}`}
            onClick={() => {
              setDay(day);
            }}
          >
            July {day}
          </Button>
        );
      })}
    </div>
  );
};

const Adventure = ({ adventure, day }) => {
  return (
    <div className="adventure">
      <Header as="h2">{adventure.fullName}</Header>
      {adventure.adventurePeriods
        .filter(p => new Date(p.startAt).getDate() === day)
        .map(period => {
          const totalAssigned = adventure.scoutOnly
            ? period.participantsAssigned.scouts
            : period.participantsAssigned.total;
          return (
            <Fragment key={period.id}>
              <Header as="h3">{format(period.startAt, 'dddd HH:mm')}</Header>
              <p>
                Capacity:{' '}
                {period.capacityOverride || adventure.capacityPerPeriod}
              </p>
              <p>Participants assigned: {totalAssigned}</p>
              <p>
                Space remaining: {adventure.capacityPerPeriod - totalAssigned}
              </p>
              <p>Patrols assigned: {period.patrols.length}</p>
              <Table celled>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Patrol Number</Table.HeaderCell>
                    <Table.HeaderCell>Patrol Name</Table.HeaderCell>
                    <Table.HeaderCell>Scouts</Table.HeaderCell>
                    <Table.HeaderCell>Scouters</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {period.patrols.map(patrol => (
                    <Table.Row key={patrol.id}>
                      <Table.Cell collapsing>{patrol.patrolNumber}</Table.Cell>
                      <Table.Cell collapsing>{patrol.patrolName}</Table.Cell>
                      <Table.Cell collapsing>
                        {patrol.numberOfScouts}
                      </Table.Cell>
                      <Table.Cell collapsing>2</Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </Fragment>
          );
        })}
    </div>
  );
};

const LoadingReports = () => {
  const [day, setDay] = useState();
  return (
    <>
      <Header className="noprint" as="h1">
        Loading Reports
      </Header>
      <AdventureLoadingDayButtons setDay={setDay} />
      {day && (
        <Query query={ADVENTURE_LOADING_REPORT} variables={{ day }}>
          {({ data, loading, error }) => {
            if (loading) {
              return (
                <Loader active content="Loading Adventures" size="small" />
              );
            }
            if (error) {
              console.error(error);
              return null;
            }
            console.log(data);
            return data.adventureLoadingReportForDay.map(adventure => (
              <Adventure
                key={adventure.adventureCode}
                adventure={adventure}
                day={day}
              />
            ));
          }}
        </Query>
      )}
    </>
  );
};

export default LoadingReports;
