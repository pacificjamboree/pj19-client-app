import React from 'react';
import { Header, Loader } from 'semantic-ui-react';
import { Query } from 'react-apollo';
import { Bar, BarChart, Label, Tooltip, XAxis, YAxis } from 'recharts';
import gql from 'graphql-tag';

const GET_STATS = gql`
  query {
    patrolAdventureSelectionStats {
      defined
      draft
      saved
      total
      wantExtraFreePeriod
      selectionRankings {
        adventure {
          id
          fullName
          adventureCode
        }
        rankings
      }
    }
  }
`;

const ordinalSuffixOf = i => {
  // https://stackoverflow.com/questions/13627308/add-st-nd-rd-and-th-ordinal-suffix-to-a-number
  const j = i % 10,
    k = i % 100;
  if (j === 1 && k !== 11) {
    return i + 'st';
  }
  if (j === 2 && k !== 12) {
    return i + 'nd';
  }
  if (j === 3 && k != 13) {
    return i + 'rd';
  }
  return i + 'th';
};

const RankingsChart = ({ data }) => {
  const barData = data.rankings.map((count, i) => ({
    rank: i + 1,
    count,
  }));
  return (
    <>
      <Header as="h2">{data.adventure.fullName}</Header>
      <BarChart
        barCategoryGap="20%"
        width={730}
        height={250}
        data={barData}
        margin={{ top: 15, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis dataKey="rank">
          <Label position="insideBottom" offset={0}>
            Rank
          </Label>
        </XAxis>
        <YAxis
          label={{ value: 'Patrols', angle: -90, position: 'insideLeft' }}
        />
        <Tooltip />
        <Bar dataKey="count" fill="#00b5ad" />
      </BarChart>
    </>
  );
};

const PatrolAdventureSelectionStats = () => (
  <>
    <Header as="h1">Patrol Adventure Selection Stats</Header>
    <Query query={GET_STATS}>
      {({ data, loading, error }) => {
        if (loading) return <Loader active />;
        if (error) return <p>Error</p>;
        if (data) {
          const { selectionRankings } = data.patrolAdventureSelectionStats;
          return selectionRankings.map(d => (
            <RankingsChart key={d.adventure.id} data={d} />
          ));
        }
      }}
    </Query>
  </>
);

export default PatrolAdventureSelectionStats;
