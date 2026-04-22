# AICA Application Plan

**Subtitle:** Complete App Structure, Pages, API Plan, and Delivery Phases  
**Prepared for:** The AICA project  
**Date:** 2026-04-17

## 1. Product Goal

AICA helps users choose a suitable faculty, study direction, or new career path based on their interests, strengths, goals, preferences, and prior experience.

The system is not a raw prediction engine. It is an intelligent guidance platform that:

- collects user context
- matches it with structured pathway data
- uses AI to explain results clearly

## 2. Main User Types

### General User

A student, graduate, or career changer who wants guidance.

### Admin

A person who manages pathway data, content, and system quality.

## 3. Core Product Modules

### Authentication Module

Handles sign up, login, password reset, session management, and profile access.

### Profile Module

Stores user identity, interests, strengths, goals, preferences, education background, and experience.

### Assessment Module

Collects guided answers through onboarding and structured questionnaires.

### Matching Engine

Applies profile-based rules and scoring to connect users with relevant faculties and career paths.

### AI Guidance Module

Uses an external AI API for guidance, explanation, and roadmap generation.

### Pathway Knowledge Base

Contains structured data for faculties, majors, careers, skills, courses, and learning routes.

### Roadmap Module

Creates a practical next-step plan for the selected path.

### Admin Module

Allows admins to manage pathways, categories, and system content.

## 4. High-Level App Structure

### Frontend

- `/auth`: Login, register, forgot password
- `/onboarding`: First-time user flow and guided assessment
- `/dashboard`: Main user home after login
- `/explore`: Browse faculties, fields, and career paths
- `/recommendations`: See generated matches
- `/pathways/:id`: Detailed page for one academic or career path
- `/compare`: Compare selected options side by side
- `/roadmap`: View personalized action plan
- `/advisor`: AI conversation page for guidance and questions
- `/profile`: Manage personal data and preferences
- `/settings`: Account and privacy settings
- `/admin`: Admin dashboard and content management

### Backend

- `/auth`: User authentication endpoints
- `/users`: User profile, preferences, saved items
- `/assessment`: Questionnaire data and answers
- `/pathways`: Faculties, careers, skills, categories
- `/recommendations`: Matching logic and recommendation generation
- `/roadmaps`: Personalized action plans
- `/advisor`: AI prompt orchestration and conversation history
- `/admin`: Pathway management and moderation

## 5. Main Pages

### 1. Landing Page

**Purpose:** Introduce AICA, explain the platform clearly, and give visitors a fast understanding of the product value.

**Main sections**

- Hero section with value proposition and a clear message about academic and career alignment
- Short explanation of how AICA works, from profile input to recommendation and roadmap
- Who the app is for, including students, graduates, and career changers
- Example outcomes that show realistic guidance results and next steps
- Call to action for sign up or try demo so users can enter the flow immediately

**Main actions**

- Create account and begin using the platform
- Sign in and return to the user workspace
- Start assessment and move into the onboarding flow

### 2. Register / Login Page

**Purpose:** User account access for secure entry, registration, and recovery actions.

**Main sections**

- Register form for account creation with the required user details
- Login form for existing users to access their workspace
- Forgot password option for account recovery without leaving the flow

**Main actions**

- Create account and move to onboarding
- Log in and continue to the dashboard
- Reset password and recover access securely

### 3. Welcome / Onboarding Page

**Purpose:** Introduce the process before collecting user data and set expectations clearly.

**Main sections**

- What AICA will ask, including interests, strengths, goals, and preferences
- What the user will get, such as recommendations, explanations, and a roadmap
- Estimated time so the user understands the effort before starting
- Privacy note that explains how user input is handled inside the system

**Main actions**

- Start onboarding and begin entering structured guidance inputs
- Skip and finish later if the user cannot complete the process in one session

### 4. User Assessment Page

**Purpose:** Collect structured inputs that the matching workflow can use reliably.

**Main sections**

- Interests that help identify academic and career direction
- Strengths that show where the user is naturally more capable
- Soft skills that influence fit for certain learning and work environments
- Preferred work style, such as independent, collaborative, creative, or structured work
- Learning preferences that influence how the roadmap should be shaped
- Career goals that define the intended direction and outcomes
- Previous study or work experience that adds context to recommendations
- Optional short reflective answers that improve explanation quality

**Main actions**

- Save progress asynchronously so the user can return later
- Move next and continue the guided multi-step process
- Submit assessment asynchronously and send inputs to the matching workflow

**Rule:** This page should be multi-step, not one long form.

### 5. Dashboard Page

**Purpose:** Main control center after assessment where users review status and next actions.

**Main sections**

- Profile completion status so users know whether more input is needed
- Latest recommendations with fast access to the strongest matches
- Saved pathways for later comparison and decision-making
- Roadmap summary that shows current direction and next milestones
- Recent AI guidance so users can continue previous conversations
- Suggested next actions that keep the workflow moving forward

**Main actions**

- View recommendations and inspect the top options
- Continue roadmap and work on the next planned steps
- Edit profile and improve guidance quality
- Ask AI advisor and request explanation or refinement

### 6. Recommendations Page

**Purpose:** Show the best matched faculties and career directions in a readable and explainable format.

**Main sections**

- Top matched options ranked by alignment with the user profile
- Why each option fits, based on profile-pathway matching logic
- Confidence or fit explanation written in a simple and understandable way
- Tags like skills, learning type, and growth path for quick scanning
- Filters by category so users can narrow the list efficiently

**Main actions**

- Open details and inspect one pathway more deeply
- Save option for later review
- Compare options and reduce uncertainty between close matches
- Generate roadmap asynchronously for the selected direction
- Ask AI about an option and request extra explanation

### 7. Pathway Detail Page

**Purpose:** Show one faculty or career path in depth so the user can make an informed decision.

**Main sections**

- Overview that explains the path in clear practical language
- Who this path fits based on interests, strengths, and goals
- Required strengths that support success in this path
- Key skills that should be developed over time
- Possible learning route from starting point to stronger readiness
- Career opportunities connected to the pathway
- Challenges and expectations so the user sees a realistic picture
- Related options that may also fit the same profile

**Main actions**

- Save pathway and keep it in the shortlist
- Compare with another option before deciding
- Generate roadmap asynchronously from this selected path
- Ask AI for explanation using the page context

### 8. Compare Page

**Purpose:** Help users decide between two or more options through structured comparison.

**Main sections**

- Option summary with the core identity of each path
- Strength fit showing how well each option matches the user profile
- Skill match showing which current skills already support the option
- Learning effort indicating the likely difficulty and commitment level
- Career outcomes that show realistic future directions
- Growth opportunities connected to each path over time

**Main actions**

- Select best fit after comparison
- Save comparison so it can be reviewed later
- Open detailed page and inspect one compared option more deeply

### 9. Roadmap Page

**Purpose:** Show a step-by-step plan for the selected direction in a practical format.

**Main sections**

- Short-term steps that the user can start immediately
- Medium-term steps that build capability and direction
- Skills to build based on the chosen path
- Suggested short courses that support targeted growth
- Projects or practice ideas that create real evidence of progress
- Possible internships or opportunities connected to the roadmap
- Review checkpoints that help measure progress over time

**Main actions**

- Mark step complete and track progress visually
- Edit roadmap when goals or conditions change
- Export roadmap for external use or sharing
- Ask AI for a revised version asynchronously when the plan needs refinement

### 10. AI Advisor Page

**Purpose:** Conversational guidance that helps users clarify choices and understand recommendations.

**Main sections**

- Chat interface for direct user-advisor interaction
- Suggested prompts that guide users toward useful questions
- Recommendation context so the conversation stays grounded in app data
- Conversation history that preserves continuity across sessions

**Main actions**

- Ask follow-up questions and clarify uncertainty
- Request simpler explanation when recommendations feel too complex
- Request comparison between two or more options inside the chat
- Request roadmap update asynchronously from the advisor workspace

**Important rule:** The AI should answer only within supported app context and pathway data, not as an unrestricted chatbot.

### 11. Profile Page

**Purpose:** Let the user manage personal information and guidance preferences in one place.

**Main sections**

- Basic information used for account identity and display
- Interests and strengths used by the matching workflow
- Goals and preferences that shape recommendations and roadmap direction
- Education and experience that provide background context
- Saved options that the user may want to revisit later

**Main actions**

- Edit profile and keep guidance inputs current
- Update goals when the user direction changes
- Retake assessment and refresh the recommendation base

### 12. Settings Page

**Purpose:** Account and system preferences for security, privacy, and personalization.

**Main sections**

- Password and security controls for account protection
- Notification settings for product updates and reminders
- Privacy settings that control user data handling
- Language preferences for a better user experience
- Data deletion request for account removal and user control

**Main actions**

- Update settings and save preference changes
- Delete account if the user requests full removal
- Log out and end the current session securely

### 13. Admin Dashboard

**Purpose:** Manage the system from an operational and quality perspective.

**Main sections**

- System overview with high-level operational status
- User statistics that help understand product usage
- Pathway records that show the current knowledge base state
- Recommendation activity that helps monitor system behavior
- AI usage monitoring for response volume and quality control

**Main actions**

- Open admin tools for management tasks
- Review content and check data quality
- Monitor quality and identify issues quickly

### 14. Admin Pathway Management Page

**Purpose:** Manage faculties, career paths, and structured data inside the knowledge base.

**Main sections**

- Pathway list showing all managed academic and career entries
- Categories used for organization and filtering
- Required skills linked to each pathway
- Descriptions that explain each pathway clearly
- Related paths that connect similar options

**Main actions**

- Create pathway and add a new record to the system
- Edit pathway and update existing information
- Archive pathway without deleting historical records
- Link related pathways to improve exploration and recommendation quality

### 15. Admin Content and Prompt Management Page

**Purpose:** Keep system outputs consistent by managing prompts and generation rules.

**Main sections**

- Prompt templates that guide AI output behavior
- Pathway explanation templates for consistent recommendation language
- Roadmap rules that shape the action-plan structure
- Safety instructions that constrain unsupported or risky output

**Main actions**

- Edit prompt templates and adjust system behavior
- Preview output before publishing prompt changes
- Save changes and apply the updated content rules

## 6. Suggested User Flow

1. User lands on homepage.
2. User creates account.
3. User completes onboarding and assessment.
4. System stores profile.
5. Matching engine generates candidate pathways.
6. AI module explains the top matches.
7. User opens recommendations.
8. User compares options.
9. User chooses one direction.
10. System generates roadmap.
11. User returns later to track progress and ask follow-up questions.

## 7. Data Structure

### User

- Name
- email
- password hash
- role
- createdAt

### UserProfile

- UserId
- interests
- strengths
- soft skills
- preferences
- goals
- prior experience
- education background

### AssessmentResponse

- UserId
- questionId
- answer
- completedAt

### Pathway

- Title
- type
- category
- description
- required strengths
- key skills
- learning style
- opportunities
- related pathways

### Recommendation

- UserId
- pathwayId
- fit score
- reasons
- createdAt

### Roadmap

- UserId
- selected pathway
- steps
- milestones
- status

### AdvisorConversation

- UserId
- messages
- context
- createdAt

### SavedPathway

- UserId
- pathwayId
- savedAt

## 8. Matching Logic

The system should stay simple and explainable.

1. Collect structured profile data.
2. Map profile fields to pathway attributes.
3. Apply profile-based scoring rules.
4. Rank the most relevant pathways.
5. Send structured results to the AI API.
6. Generate readable explanation, comparison, and roadmap.

This is better than introducing heavy algorithm language that the app does not actually use.

## 9. API Plan

- `POST /auth/register`: Create account, validate input, register the user, and return the initial account state
- `POST /auth/login`: Log in, validate credentials, and return the authenticated session context
- `GET /users/me`: Get current user and return the active account profile summary
- `PUT /users/me/profile`: Update profile and persist the user guidance inputs
- `POST /assessment/submit`: Save onboarding answers and store structured assessment responses
- `GET /pathways`: List pathways and return the available academic and career options
- `GET /pathways/:id`: Get one pathway and return its detailed structured record
- `POST /recommendations/generate`: Generate user recommendations based on profile data and pathway matching
- `GET /recommendations/me`: Get saved recommendations and return the current user recommendation history
- `POST /roadmaps/generate`: Create roadmap from the selected pathway and return the generated plan
- `GET /roadmaps/me`: Get roadmap and return the current user roadmap data
- `POST /advisor/chat`: Send question to AI guidance module and return an advisor response based on supported context
- `GET /admin/pathways`: Admin list endpoint that returns managed pathway records for review
- `POST /admin/pathways`: Create pathway and insert a new admin-managed pathway record
- `PUT /admin/pathways/:id`: Update pathway and persist changes to an existing pathway record

All listed endpoints are marked as asynchronous in the original plan.

## 10. MVP Scope

For the first complete version, build:

- Landing page
- Auth pages
- Onboarding flow
- Dashboard
- Recommendations page
- Pathway detail page
- Roadmap page
- AI advisor page
- Profile page
- Basic admin pathway management

Leave advanced analytics, institutions portal, and complex reporting for later.

## 11. Quality Rules

- Recommendations must be explainable
- AI responses must be grounded in stored pathway data
- The system should never give unsupported career advice outside its knowledge base
- Every recommendation should show why it was suggested
- The roadmap should be editable, not fixed

## 12. Delivery Phases

### Phase 1

Planning, pathway data model, wireframes, database design.

### Phase 2

Auth, profile, onboarding, assessment.

### Phase 3

Pathway knowledge base and matching workflow.

### Phase 4

AI explanation, comparison, and roadmap generation.

### Phase 5

Dashboard, saved items, profile improvements.

### Phase 6

Admin tools, testing, refinement, deployment.
