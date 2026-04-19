Example structure:

Tech
Software Engineering
Data Science
Cybersecurity
DevOps

Health
Medicine
Nursing
Pharmacy

Business
Marketing
Finance
Product

Arts
Design
Media
Writing

🧠 How AI should generate careers (strict format)

You MUST force structure like this:

{
"title": "Frontend Engineer",
"domain": "Software Engineering",
"level": "entry",
"summary": "...",

"requiredSkills": [
{ "name": "HTML", "importance": 5 },
{ "name": "CSS", "importance": 5 },
{ "name": "JavaScript", "importance": 5 }
],

"optionalSkills": [
"TypeScript",
"React"
],

"interestTags": ["design", "building interfaces", "web apps"],
"constraintTags": ["low-math"],
"relatedCareers": ["UI Designer", "Backend Engineer"]
}

Should AI-generated careers go into “constant data”?

Yes — but only AFTER approval.

So your DB becomes:

3-layer data system:

1. AI drafts
   temporary
   messy allowed
2. reviewed careers
   clean
   verified
3. published careers (production truth)
   used for matching
   stable
   versioned

// look this too

Clean version

The system should work like this:

Frontend sends raw answers
Backend converts them into normalized features
Backend scores user features against normalized career features

So the layers are:

Layer 1: raw input

This is what comes from the UI.

It can be:

text answers
selected options
multiple choice values
checkbox values

Example:

{
"interests": ["design", "apps", "problem solving"],
"likes": ["clear structure", "working alone sometimes"],
"dislikes": ["heavy math", "public speaking"],
"strengths": ["visual thinking", "writing"],
"goal": "find a career in tech",
"education_level": "high_school"
}

This layer is allowed to be messy.

Layer 2: normalized features

This layer is created by backend logic.

Not frontend.

The backend converts raw values into a controlled vocabulary your system understands.

Example:

{
"interest_tags": ["design", "software", "creative"],
"skill_tags": ["visual-thinking", "writing"],
"constraint_tags": ["low-public-speaking", "low-heavy-math"],
"goal_tags": ["tech-career"],
"level": "entry"
}

Those tags are not random. They come from a mapping layer like:

"design" → design
"building apps" → software
"problem solving" → analytical
"heavy math" → low-heavy-math

So yes, the backend structures this.

Where the matching score comes from

The score happens after normalization.

That means:

user raw input comes in
backend normalizes it
backend compares normalized user features with normalized career features
backend calculates score

So the score does not come from raw answers directly.

It comes from:

user feature tags
career feature tags
weights
penalties
rules
Important: careers also need normalized data

Your career records should also have structured tags.

Example:

{
"id": "frontend-engineer",
"title": "Frontend Engineer",
"interest_tags": ["design", "software", "visual"],
"skill_tags": ["html", "css", "javascript", "ui-thinking"],
"constraint_tags": ["low-heavy-math"],
"level": "entry"
}

Then scoring becomes clean.

The matching layer

This is the actual score layer.

Example idea:

interest match = 30%
skill match = 50%
constraint fit = 20%

Simple logic:

function scoreCareer(user: UserFeatures, career: CareerFeatures): number {
const interestMatch = overlap(user.interest_tags, career.interest_tags);
const skillMatch = overlap(user.skill_tags, career.skill_tags);
const constraintMatch = overlap(user.constraint_tags, career.constraint_tags);

return (
interestMatch _ 0.3 +
skillMatch _ 0.5 +
constraintMatch \* 0.2
);
}

The score is based on normalized arrays, not free text.

The real pipeline
Frontend raw answers
→ Backend normalization
→ Career retrieval
→ Scoring
→ Ranking
→ AI explanation
Why the hyphens looked inconsistent

Because I mixed two different forms:

Raw values

These are natural words:

design
building apps
problem solving
Canonical backend tags

These are fixed system labels:

design
software
visual-thinking
low-heavy-math

The backend should always convert raw input into canonical tags.

Best practice

Do this:

frontend collects raw or semi-structured answers
backend owns normalization
backend owns scoring
backend stores both raw and normalized if needed
AI only explains results, does not decide the score
Super simple mental model

Raw input = messy human language
Normalized features = system language
Score = comparison between system language values

Example in one flow

User says:

I like designing apps and I hate heavy math.

Backend turns that into:

{
"interest_tags": ["design", "software"],
"constraint_tags": ["low-heavy-math"]
}

Career has:

{
"interest_tags": ["design", "software", "visual"],
"constraint_tags": ["low-heavy-math"]
}
