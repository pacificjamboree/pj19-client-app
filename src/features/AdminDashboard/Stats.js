import React from 'react';
import { Grid, Header, Table } from 'semantic-ui-react';
import Query from '../../components/Query';
import { ADMIN_DASHBOARD } from '../../graphql/queries';

import styles from './styles.module.css';

const Stats = () => {
  return (
    <Query query={ADMIN_DASHBOARD}>
      {({ data }) => {
        const {
          offerOfServiceCount,
          patrolStats,
          patrolAdventureSelectionStats,
        } = data;
        return (
          <>
            <Grid divided padded="vertically" stackable columns={2}>
              <Grid.Column>
                <Header as="h2">Offers of Service Stats</Header>
                <Table basic="very">
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell width={4} className={styles.label}>
                        Total Required
                      </Table.Cell>
                      <Table.Cell>{offerOfServiceCount.required}</Table.Cell>
                    </Table.Row>

                    <Table.Row>
                      <Table.Cell width={4} className={styles.label}>
                        Total Allocated
                      </Table.Cell>
                      <Table.Cell>{offerOfServiceCount.allocated}</Table.Cell>
                    </Table.Row>

                    <Table.Row>
                      <Table.Cell width={4} className={styles.label}>
                        Percent Staffed
                      </Table.Cell>
                      <Table.Cell>
                        {Math.floor(
                          (offerOfServiceCount.allocated /
                            offerOfServiceCount.required) *
                            100
                        )}
                        %
                      </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                      <Table.Cell width={4} className={styles.label}>
                        Assigned to Adventures
                      </Table.Cell>
                      <Table.Cell>{offerOfServiceCount.assigned}</Table.Cell>
                    </Table.Row>

                    <Table.Row>
                      <Table.Cell width={4} className={styles.label}>
                        Unassigned
                      </Table.Cell>
                      <Table.Cell>{offerOfServiceCount.unassigned}</Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
              </Grid.Column>

              <Grid.Column>
                <Header as="h2">Patrol Stats</Header>
                <Table basic="very">
                  <Table.Row>
                    <Table.Cell width={4} className={styles.label}>
                      Total Patrols
                    </Table.Cell>
                    <Table.Cell>{patrolStats.numberOfPatrols}</Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell width={4} className={styles.label}>
                      Patrols with Three Scouters
                    </Table.Cell>
                    <Table.Cell>
                      {patrolStats.patrolsWithThreeScouters}
                    </Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell width={4} className={styles.label}>
                      Total Scouts
                    </Table.Cell>
                    <Table.Cell>{patrolStats.totalScouts}</Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell width={4} className={styles.label}>
                      Total Scouters
                    </Table.Cell>
                    <Table.Cell>{patrolStats.totalScouters}</Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell width={4} className={styles.label}>
                      Total Adventure Participants
                    </Table.Cell>
                    <Table.Cell>
                      {patrolStats.totalAdventureParticipants}
                    </Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell width={4} className={styles.label}>
                      Total Overall Participants (incl 3rd Scouter)
                    </Table.Cell>
                    <Table.Cell>{patrolStats.totalParticipants}</Table.Cell>
                  </Table.Row>
                </Table>
              </Grid.Column>

              <Grid.Column>
                <Header as="h2">Patrol Adventure Selection Stats</Header>
                <Table basic="very">
                  <Table.Row>
                    <Table.Cell width={4} className={styles.label}>
                      Total Patrol Adventure Selections
                    </Table.Cell>
                    <Table.Cell>
                      {patrolAdventureSelectionStats.total}
                    </Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell width={4} className={styles.label}>
                      Not Started (defined)
                    </Table.Cell>
                    <Table.Cell>
                      {patrolAdventureSelectionStats.defined}
                    </Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell width={4} className={styles.label}>
                      Draft
                    </Table.Cell>
                    <Table.Cell>
                      {patrolAdventureSelectionStats.draft}
                    </Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell width={4} className={styles.label}>
                      Saved
                    </Table.Cell>
                    <Table.Cell>
                      {patrolAdventureSelectionStats.saved}
                    </Table.Cell>
                  </Table.Row>
                </Table>
              </Grid.Column>
            </Grid>
          </>
        );
      }}
    </Query>
  );
};

export default Stats;
