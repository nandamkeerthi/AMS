const INCIDENT_DETAIL_TYPE_MAP = {
  system: 'created',
  status: 'resolution_started',
  comment: 'comment',
  ai: 'ai_analysis',
  assignment: 'assigned',
};

/**
 * Normalize incident detail timeline events for the shared IncidentTimeline component.
 * @param {Array} events
 */
export function normalizeIncidentTimelineEvents(events = []) {
  return events.map((event) => ({
    id: event.id,
    type: INCIDENT_DETAIL_TYPE_MAP[event.type] || 'comment',
    description: event.action || event.description,
    author: event.author,
    timestamp: event.timestamp,
  }));
}
