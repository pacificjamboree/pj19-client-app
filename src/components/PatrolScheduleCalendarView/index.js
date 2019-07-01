import React from 'react';
import BigCalendar from 'react-big-calendar';
import TimeGrid from 'react-big-calendar/lib/TimeGrid';
import addDays from 'date-fns/add_days';
import eachDay from 'date-fns/each_day';
import moment from 'moment';
import { Mutation } from 'react-apollo';
import { Button, Icon } from 'semantic-ui-react';
import gql from 'graphql-tag';

import styles from './style.module.css';

const REMOVE_PERIOD = gql`
  mutation removePeriodFromPatrolSchedule(
    $adventurePeriodId: ID!
    $patrolId: ID!
  ) {
    removeAdventurePeriodFromPatrolSchedule(
      input: { patrolId: $patrolId, adventurePeriodId: $adventurePeriodId }
    ) {
      patrol {
        id
        schedule {
          periods {
            id
          }
        }
      }
    }
  }
`;

const localizer = BigCalendar.momentLocalizer(moment);

const HIDE_DELETE_BUTTON_FOR = [
  'free1',
  'stem_ar_vr',
  'stem_moon',
  'stem_escape_room',
  'stem_spheros',
];

class MyWeek extends React.Component {
  render() {
    let { date } = this.props;
    let range = MyWeek.range(date);

    return <TimeGrid {...this.props} range={range} eventOffset={15} />;
  }
}

MyWeek.range = date => eachDay(date, addDays(date, 5));

MyWeek.navigate = (date, action) => {
  switch (action) {
    case BigCalendar.Navigate.PREVIOUS:
      return addDays(date, -5);

    case BigCalendar.Navigate.NEXT:
      return addDays(date, 5, 'day');

    default:
      return date;
  }
};

MyWeek.title = date => {
  return `Adventure Schedule`;
};

const eventStyleGetter = event => {
  const { adventureCode, location } = event.adventure;
  let backgroundColor;
  if (adventureCode === 'free' || adventureCode === 'free1') {
    backgroundColor = 'green';
  } else if (location === 'onsite') {
    backgroundColor = '#00b5ad';
  } else {
    backgroundColor = '#5700b5';
  }

  const borderColor = location === 'onsite' ? '#1f9c96' : '#5c1f9c';
  const style = {
    backgroundColor,
    borderColor,
    cursor: 'unset',
  };
  return { style };
};

const MyCalendar = ({ patrol }) => {
  const { schedule } = patrol;

  return (
    <>
      <BigCalendar
        localizer={localizer}
        events={schedule.periods}
        startAccessor={event => new Date(event.startAt)}
        endAccessor={event => new Date(event.endAt)}
        titleAccessor={event => {
          return (
            <div className={styles.eventDetails}>
              <div className={styles.eventTitle}>
                {event.adventure.premiumAdventure && (
                  <Icon name="star" color="yellow" />
                )}
                <span style={{ fontSize: '0.9em' }}>
                  {event.adventure.name}
                </span>
              </div>
              <div className={styles.eventControls}>
                {!HIDE_DELETE_BUTTON_FOR.includes(
                  event.adventure.adventureCode
                ) && (
                  <Mutation
                    mutation={REMOVE_PERIOD}
                    variables={{
                      adventurePeriodId: event.id,
                      patrolId: patrol.id,
                    }}
                  >
                    {(mutationFn, { data, error }) => {
                      return (
                        <Button
                          circular
                          compact
                          icon
                          onClick={() => {
                            if (
                              window.confirm(
                                "Are you sure you want to remove this adventure from the patrol's schedule?"
                              )
                            ) {
                              mutationFn();
                            }
                          }}
                        >
                          <Icon name="trash alternate outline" />
                        </Button>
                      );
                    }}
                  </Mutation>
                )}
              </div>
            </div>
          );
        }}
        eventPropGetter={eventStyleGetter}
        defaultDate={new Date(2019, 6, 7)}
        min={new Date(2019, 6, 7, 8, 0)}
        max={new Date(2019, 6, 7, 17, 30)}
        defaultView={BigCalendar.Views.WEEK}
        toolbar={false}
        views={{ month: false, week: MyWeek, day: false, agenda: false }}
      />
    </>
  );
};

export default MyCalendar;
