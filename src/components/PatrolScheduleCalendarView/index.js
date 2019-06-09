import React from 'react';
import BigCalendar from 'react-big-calendar';
import TimeGrid from 'react-big-calendar/lib/TimeGrid';
import addDays from 'date-fns/add_days';
import eachDay from 'date-fns/each_day';
import moment from 'moment';
import { Icon } from 'semantic-ui-react';

const localizer = BigCalendar.momentLocalizer(moment);

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
  const { location } = event.adventure;
  const backgroundColor = location === 'onsite' ? '#00b5ad' : '#5700b5';
  const borderColor = location === 'onsite' ? '#1f9c96' : '#5c1f9c';
  const style = {
    backgroundColor,
    borderColor,
    cursor: 'unset',
  };
  return { style };
};

const MyCalendar = ({ schedule }) => {
  return (
    <BigCalendar
      localizer={localizer}
      events={schedule.periods}
      startAccessor={event => new Date(event.startAt)}
      endAccessor={event => new Date(event.endAt)}
      titleAccessor={event => {
        return (
          <>
            {event.adventure.premiumAdventure && (
              <Icon name="star" color="yellow" />
            )}
            <span>{event.adventure.fullName}</span>
          </>
        );
      }}
      eventPropGetter={eventStyleGetter}
      defaultDate={new Date(2019, 6, 7)}
      min={new Date(2019, 6, 7, 7, 0)}
      max={new Date(2019, 6, 7, 18, 0)}
      defaultView={BigCalendar.Views.WEEK}
      toolbar={false}
      views={{ month: false, week: MyWeek, day: false, agenda: false }}
    />
  );
};

export default MyCalendar;
