import React from 'react';
import { Container, Divider, Header } from 'semantic-ui-react';
import { Link } from '@reach/router';

const FAQ = () => (
  <Container text>
    <Header as="h1">Frequently Asked Questions</Header>
    <p id="top">
      Have a question about PJ Adventure? The answer <em>might</em> be here!
    </p>

    <Divider />

    <Header as="h2">What is Adventure?</Header>
    <p>
      Adventures are the scheduled activities that Patrols take part in during
      your week at PJ. Adventures take place both on-site at Camp Barnard and
      off-site at various locations in the Greater Victoria area. Most
      Adventures are a half-day; however, there are some that are shorter, some
      that are a full-day, and one that is overnight.
    </p>

    <Divider />

    <Header as="h2">What Adventures are available?</Header>
    <p>
      The <Link to="/adventures">Adventures</Link> page lists all of the
      confirmed Adventures at PJ 2019.
    </p>

    <Divider />

    <Header as="h2">How are Adventures assigned to patrols?</Header>
    <p>
      Patrols will be asked to complete an Adventure Selection form soon. The
      Adventure Selection form will allow you to rank the Adventures in order of
      preference, where “1” is the activity you want the most, on down the list.
      When we create your schedule we will attempt to give you Adventures in
      order of your ranking. Adventure schedules will only be provided to
      patrols that have paid all PJ fees. Schedules will be assigned in order of
      when your fees were fully-paid.
    </p>

    <Divider />

    <Header as="h2">When can we select our Adventures?</Header>
    <p>
      The Adventure team is working as hard as possible to get the list of
      Adventures finalized and to let you start selecting your Adventures. We
      had wanted this to happen in January. While Patrol registrations filled up
      very quickly, we are still low on Offer of Service registration. OOS are
      the volunteers who run the Jamboree. Without OOS volunteering their time
      to come to PJ, we won’t have the staffing needed to run our planned
      Adventures. Please spread the word to your Venturers, Rovers, and Scouters
      from other sections that PJ needs their help! We are doing our best to
      open Adventure selection to you as soon as possible. Patrol scouters will
      be notified when their patrols can start selecting their Adventures.
    </p>

    <Divider />

    <Header as="h2">What are “Premium Adventures”?</Header>
    <p>
      Some Adventures are designated as “premium” adventures, meaning that you
      may receive, at most, one of these activities. These Adventures will be
      clearly noted on the final Adventure list and on the selection form.{' '}
      <strong>
        Your Patrol may receive one Group A Adventure on your final schedule;
        this is not guaranteed. Patrols may receive an additional Group A
        activity if space permits.
      </strong>
    </p>

    <Divider />

    <Header as="h2">How do we get to off-site Adventures?</Header>
    <p>
      Transportation to off-site Adventures is provided by PJ. Patrols will be
      bussed from Camp Barnard to off-site Adventure locations. Bus schedules
      will be posted at your Subcamp. Some busses will leave very early in the
      morning.
    </p>

    <Divider />

    <Header as="h2">
      Our troop is sending multiple patrols. Can they have the same schedule?{' '}
    </Header>
    <p>
      Adventure schedules are done on a per-patrol basis. We do not have the
      ability to give multiple patrols the same schedule.
    </p>

    <Divider />

    <Header as="h2">Are there extra fees for Adventures?</Header>
    <p>
      For the most part, no. The Kraken SCUBA Adventure will have a
      per-participant fee to help cover the extra costs of this activity. On
      Bigfoot's Excellent Adventure (Explore Victoria), any activities or
      excusions that your Patrol chooses to embark upon during your time in
      Victoria is at your own cost.
    </p>

    <Divider />

    <Header as="h2">Can we change our schedule at the Jamboree?</Header>
    <p>
      Adventure changes will be availble during the Jamboree. Schedule changes
      will not be made before the Jamboree beings except in exceptional
      cicrumstances. Please see the <Link to="/guide">Adventure Guide</Link> for
      more information about Adventure changes.
    </p>

    <Divider />

    <Header as="h2">
      I have questions not covered here. Who do I talk to?
    </Header>
    <p>
      Please visit the <Link to="/contact">Contact page</Link> to send us your
      questions.
    </p>
  </Container>
);

export default FAQ;
