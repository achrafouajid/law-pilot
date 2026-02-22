You are a senior full-stack engineer building a production-grade legal case management web application using:
Frontend: Next.js (App Router, TypeScript)
Backend: Supabase (PostgreSQL, Auth, Storage, Edge Functions)
Auth: Supabase OAuth + optional MFA
Hosting: Vercel (frontend) + Supabase (backend)
Notifications: Email + SMS + in-app
Security: Encrypted in transit (TLS) + encrypted at rest
This is NOT a prototype. Build it scalable, secure, and cleanly architected.
1️⃣ Core Product Requirements
This app allows clients to:
Upload required documents for their legal case
Track case milestones via a visual timeline
Receive automated deadline reminders
Request lawyer review
Subscribe to premium access or pay-per-review
Lawyers and admins can:
Review documents
Approve or reject with feedback
Track case progress
Access reporting analytics
2️⃣ UX FLOW (CRITICAL)
🔹 Public Flow (No Login Required Initially)
User lands on homepage.
User selects case type.
Dynamic checklist renders immediately.
User uploads documents seamlessly.
Before final submission → user is prompted to:
Login or sign up via OAuth
Verify email
After authentication → documents are officially submitted.
⚠️ Important:
Documents uploaded before login must be temporarily stored and linked to session ID. Once authenticated, they are attached to the user record.
3️⃣ Application Architecture
A. Authentication
Use Supabase Auth:
OAuth providers (Google, Microsoft)
Email/password
Optional MFA (TOTP)
Enable:
Row Level Security (RLS)
Role-based access (user, lawyer, admin)
4️⃣ Dashboard & Timeline (UX/UI Requirements)
User Dashboard
Must include:
Case summary card
Progress percentage
Timeline visualization (horizontal or vertical)
Milestone cards:
Title
Due date
Required documents
Status badge
Timeline logic:
Automatically marks overdue milestones
Triggers reminders
Document Checklist Screen
Dynamic checklist based on case type.
Each item:
Document name
Upload button
Status icon
Validation status
Progress bar at top
Allow:
Drag & drop upload
Multiple files
Replace file
Delete file
Storage:
Supabase Storage bucket
Private bucket
Signed URLs for temporary access
5️⃣ Notification System
Trigger alerts:
X days before milestone deadline
When document is reviewed
When subscription is expiring
Channels:
Email (Supabase + Resend or SendGrid)
SMS (Twilio)
In-app notification center
Implement:
Background job via Supabase Edge Functions
Scheduled cron task
6️⃣ Lawyer Review Module
Lawyer Dashboard:
Review queue (documents pending review)
Filter by case type
Sort by upload date
SLA indicator (response time counter)
Review workflow:
Lawyer opens document
Preview file (PDF/image viewer)
Approve OR reject
Provide structured feedback
Status updates instantly
Client notified
Track:
Review turnaround time
Average SLA per lawyer
7️⃣ Monetization Layer
Implement:
Option A: Monthly subscription (Stripe integration)
Option B: Pay-per-review model
Features gated by subscription:
Timeline access
Lawyer review requests
Advanced tracking
Deadline reminders
Use:
Stripe checkout
Webhooks
Store subscription state in DB
Middleware to protect premium routes
8️⃣ Reporting & Analytics Module
Admin dashboard includes:
Total active cases
Average review time
Drop-off points
Most common missing documents
Revenue metrics
Use:
Aggregated SQL views
Server-side analytics queries
Charts via Recharts
9️⃣ Security Requirements
Must implement:
RLS policies
File type validation
File size limits
Virus scanning (if possible via edge function)
Signed URLs
Input validation
CSRF protection
Rate limiting
Encrypted storage
Strict access policies for lawyer/admin
🔟 Scalability Strategy
Design for:
10k+ concurrent users
Horizontal scaling (Vercel + Supabase)
Efficient DB indexing
Background job queues
Caching layer (Redis optional)
Avoid:
N+1 queries
Client-side heavy logic
Unindexed queries
1️⃣1️⃣ Implementation Breakdown
Phase 1 – Core Infrastructure
Supabase setup
Schema + RLS
Auth system
Storage buckets
Phase 2 – Core UX
Public upload flow
Login integration
User dashboard
Checklist logic
Phase 3 – Timeline + Notifications
Milestone engine
Deadline scheduler
Notification system
Phase 4 – Lawyer Review
Review queue
Feedback flow
SLA tracking
Phase 5 – Monetization
Stripe integration
Webhooks
Access control
Phase 6 – Admin Reporting
Analytics dashboard
Metrics tracking
1️⃣2️⃣ Technical Constraints
Use TypeScript strictly
Use Server Actions where possible
Keep business logic server-side
Use modular architecture
Use clean folder structure
Write reusable UI components
Implement loading states & error boundaries
1️⃣3️⃣ Accessibility Requirements
WCAG AA compliance
Keyboard navigation
ARIA labels
Screen reader support
High contrast UI
Clear file upload instructions
1️⃣4️⃣ Final Deliverables
Fully structured project architecture
DB schema SQL
RLS policies
API routes
Edge functions
Stripe integration
UI component structure
Deployment instructions
Environment variable list
Do NOT generate placeholders.
Write complete working code.
Structure everything modularly.
Prioritize security and scalability. respect this front end rules This skill guides creation of distinctive, production-grade frontend interfaces that avoid generic "AI slop" aesthetics. Implement real working code with exceptional attention to aesthetic details and creative choices.
The user provides frontend requirements: a component, page, application, or interface to build. They may include context about the purpose, audience, or technical constraints.
Design Thinking
Before coding, understand the context and commit to a BOLD aesthetic direction:
Purpose: What problem does this interface solve? Who uses it?
Tone: Pick an extreme: brutally minimal, maximalist chaos, retro-futuristic, organic/natural, luxury/refined, playful/toy-like, editorial/magazine, brutalist/raw, art deco/geometric, soft/pastel, industrial/utilitarian, etc. There are so many flavors to choose from. Use these for inspiration but design one that is true to the aesthetic direction.
Constraints: Technical requirements (framework, performance, accessibility).
Differentiation: What makes this UNFORGETTABLE? What's the one thing someone will remember?
CRITICAL: Choose a clear conceptual direction and execute it with precision. Bold maximalism and refined minimalism both work - the key is intentionality, not intensity.
Then implement working code (HTML/CSS/JS, React, Vue, etc.) that is:
Production-grade and functional
Visually striking and memorable
Cohesive with a clear aesthetic point-of-view
Meticulously refined in every detail
Frontend Aesthetics Guidelines
Focus on:
Typography: Choose fonts that are beautiful, unique, and interesting. Avoid generic fonts like Arial and Inter; opt instead for distinctive choices that elevate the frontend's aesthetics; unexpected, characterful font choices. Pair a distinctive display font with a refined body font.
Color & Theme: Commit to a cohesive aesthetic. Use CSS variables for consistency. Dominant colors with sharp accents outperform timid, evenly-distributed palettes.
Motion: Use animations for effects and micro-interactions. Prioritize CSS-only solutions for HTML. Use Motion library for React when available. Focus on high-impact moments: one well-orchestrated page load with staggered reveals (animation-delay) creates more delight than scattered micro-interactions. Use scroll-triggering and hover states that surprise.
Spatial Composition: Unexpected layouts. Asymmetry. Overlap. Diagonal flow. Grid-breaking elements. Generous negative space OR controlled density.
Backgrounds & Visual Details: Create atmosphere and depth rather than defaulting to solid colors. Add contextual effects and textures that match the overall aesthetic. Apply creative forms like gradient meshes, noise textures, geometric patterns, layered transparencies, dramatic shadows, decorative borders, custom cursors, and grain overlays.
NEVER use generic AI-generated aesthetics like overused font families (Inter, Roboto, Arial, system fonts), cliched color schemes (particularly purple gradients on white backgrounds), predictable layouts and component patterns, and cookie-cutter design that lacks context-specific character.
Interpret creatively and make unexpected choices that feel genuinely designed for the context. No design should be the same. Vary between light and dark themes, different fonts, different aesthetics. NEVER converge on common choices (Space Grotesk, for example) across generations.
IMPORTANT: Match implementation complexity to the aesthetic vision. Maximalist designs need elaborate code with extensive animations and effects. Minimalist or refined designs need restraint, precision, and careful attention to spacing, typography, and subtle details. Elegance comes from executing the vision well.
Remember: Claude is capable of extraordinary creative work. Don't hold back, show what can truly be created when thinking outside the box and committing fully to a distinctive vision.