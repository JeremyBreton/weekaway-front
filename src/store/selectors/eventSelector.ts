/* eslint-disable import/prefer-default-export */
/* eslint-disable arrow-body-style */

import { Event } from '../../@types/Event';

export function findEventId(events: Event[], searchedEventId: number) {
  const oneEvent = events.find((testedEventId) => {
    return testedEventId.eventId === searchedEventId;
  });
  console.log('searchedEventId', searchedEventId);
  console.log('oneEvent dans selector', oneEvent);
  return oneEvent;
}
