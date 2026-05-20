export const APP_NAME = 'TaskFlow'

export const STATUS_OPTIONS = ['In Progress', 'Completed', 'Hold']

export const STATUS_FILTERS = ['All', ...STATUS_OPTIONS]

export const TASK_STORAGE_KEY = 'taskflow.tasks.v3'

export const AUTH_STORAGE_KEY = 'taskflow.user'

export const DEMO_TASKS = [
	{ id: 2, name: 'Finalize Q3 budget tables', status: 'In Progress', assignedTo: 'Manan' },
	{ id: 3, name: 'Prepare board meeting agenda', status: 'In Progress', assignedTo: 'Unassigned' },
	{ id: 4, name: 'Review enterprise security policy updates', status: 'In Progress', assignedTo: 'Unassigned' },
	{ id: 5, name: 'Complete vendor contract redlines', status: 'In Progress', assignedTo: 'Unassigned' },
	{ id: 6, name: 'Coordinate customer onboarding handoff', status: 'In Progress', assignedTo: 'Unassigned' },
	{ id: 7, name: 'Document release risk mitigation plan', status: 'In Progress', assignedTo: 'Unassigned' },
	{ id: 8, name: 'Validate finance dashboard metrics', status: 'In Progress', assignedTo: 'Unassigned' },
	{ id: 9, name: 'Publish regional sales performance summary', status: 'In Progress', assignedTo: 'Unassigned' },
	{ id: 10, name: 'Complete design approval checklist', status: 'Completed', assignedTo: 'Manan' },
	{ id: 11, name: 'Close release readiness review', status: 'Completed', assignedTo: 'Manan' },
	{ id: 12, name: 'Share team standup action items', status: 'Completed', assignedTo: 'Manan' },
	{ id: 13, name: 'Submit sprint progress update', status: 'Completed', assignedTo: 'Manan' },
	{ id: 14, name: 'Prepare executive status report', status: 'Completed', assignedTo: 'Manan' },
	{ id: 15, name: 'Refine onboarding communication template', status: 'Completed', assignedTo: 'Manan' },
	{ id: 16, name: 'Compile stakeholder feedback notes', status: 'Completed', assignedTo: 'Manan' },
	{ id: 17, name: 'Archive completed project artifacts', status: 'Completed', assignedTo: 'Manan' },
	{ id: 18, name: 'Update client roadmap milestones', status: 'Completed', assignedTo: 'Manan' },
	{ id: 19, name: 'Plan next quarter delivery timeline', status: 'Completed', assignedTo: 'Manan' },
	{ id: 20, name: 'Review cross-team handoff checklist', status: 'Completed', assignedTo: 'Manan' },
	{ id: 21, name: 'Back up compliance documentation', status: 'In Progress', assignedTo: 'Unassigned' },
]