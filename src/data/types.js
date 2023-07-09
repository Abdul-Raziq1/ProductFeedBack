// Sort Types
export const MOST_UPVOTES = "Most Upvotes"
export const LEAST_UPVOTES = "Least Upvotes"
export const MOST_COMMENTS = "Most Comments"
export const LEAST_COMMENTS = "Least Comments"

// Filter Types
export const ALL = "All"
export const ENHANCEMENT = "Enhancement"
export const UI = "UI"
export const UX = "UX"
export const BUG = "Bug"
export const FEATURE = "Feature"

// Status
export const PLANNED = "Planned"
export const IN_PROGRESS = "In-Progress"
export const LIVE = "Live"
export const SUGGESTION = "Suggestion"


// Buttons
export const ADD_FEEDBACK = "Add Feedback"

// Server url
export const currentUser = "http://localhost:3000/currentUser";
export const productRequests = "http://localhost:3000/productRequests";

// Character limit
export const INITIAL_CHARS = 250

// Select options
export const categoryOptions = [
    { value: FEATURE, label: FEATURE },
    { value: UI, label: UI },
    { value: UX, label: UX },
    { value: ENHANCEMENT, label: ENHANCEMENT },
    { value: BUG, label: BUG },
];

export const statusOptions = [
    { value: SUGGESTION, label: SUGGESTION },
    { value: PLANNED, label: PLANNED },
    { value: IN_PROGRESS, label: IN_PROGRESS },
    { value: LIVE, label: LIVE },
];
