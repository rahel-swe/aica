# AICA Contribution Guide

## Purpose
AICA is an academic and career guidance app. The product flow is simple:
user profile -> pathway matching -> AI explanation -> roadmap.

The system is not meant to be a complex prediction engine. It should stay explainable, practical, and easy to extend.

## How To Think About The App
When working on AICA, always keep these priorities in mind:
- collect better user inputs
- improve pathway matching clarity
- make recommendation screens easier to understand
- keep AI grounded in pathway data
- turn decisions into practical roadmap steps

If a feature does not support guidance, comparison, recommendation, roadmap, or profile quality, it is probably not core.

## Frontend Flow
The frontend is organized around the real user journey.

`/`
Landing page.
Explains what AICA is and moves the user to sign in or sign up.

`/auth/sign-in`
User login.
Used to enter the workspace.

`/auth/sign-up`
User registration.
Used to create an account and start onboarding.

`/app/dashboard`
Main workspace home.
Shows current status, key recommendations, roadmap progress, and next actions.

`/app/onboarding`
Input collection stage.
This is where profile quality is built.

`/app/explore`
Pathway browsing.
Used to inspect available academic and career options before or after recommendations.

`/app/recommendations`
Best-fit results.
Should explain why options fit, not only list them.

`/app/pathways/:id`
Pathway detail.
Shows one option in depth: fit, skills, opportunities, and related paths.

`/app/advisor`
AI guidance workspace.
Used for follow-up questions, comparison help, and recommendation explanation.

`/app/roadmap`
Action plan view.
Turns a selected direction into short-term and medium-term steps.

`/app/profile`
User data management.
Used to update interests, strengths, goals, and experience.

`/app/settings`
Account preferences.
Used for privacy, notifications, and account-level controls.

## Backend Flow
The backend should follow the same product logic.

`/api/users`
Profile and current user data.
Used to read or update the main user guidance profile.

`/api/assessment`
Onboarding answers.
Used to save structured input from the assessment flow.

`/api/pathways`
Pathway catalog.
Used to fetch academic and career options.

`/api/recommendations`
Matching results.
Used to generate and return recommendation data.

`/api/roadmaps`
Roadmap generation and retrieval.
Used after a direction is selected.

`/api/advisor`
AI guidance endpoint.
Must stay grounded in supported app context.

`/api/admin`
Admin management.
Used to manage pathway records and related system content.

## How Team Members Should Work
Before building anything, decide which layer the task belongs to:
- profile input
- pathway data
- recommendation logic
- AI explanation
- roadmap output
- admin management

Then check whether the change improves one of these:
- recommendation quality
- explanation clarity
- user decision confidence
- maintainability of the codebase

## Working Rules
- keep naming clear and product-specific
- prefer small reusable components
- do not add routes that do not match the AICA plan
- do not turn AI into an unrestricted chatbot
- do not add complexity unless it improves guidance quality
- keep frontend and backend structure aligned

## Safe Next Steps
Good next work items are:
- connect frontend pages to real backend data
- replace placeholder cards with real state and API calls
- add validation for profile and assessment payloads
- connect advisor responses to pathway context
- generate editable roadmap records from recommendation results
