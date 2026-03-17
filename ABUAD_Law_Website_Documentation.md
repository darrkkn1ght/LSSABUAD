**ABUAD LAW DEPARTMENT**

**Law Students Association Website**

Afe Babalola University, Ado-Ekiti

**COMPLETE PROJECT DOCUMENTATION PACKAGE**

Prepared by: Web Development Agency

Version: 1.0 \| Classification: Confidential

Date: 16 March 2026

**Document 1: Project Brief**

**1.1 Project Overview**

The ABUAD Law Students Association Website is a purpose-built, publicly
accessible digital platform commissioned by the Afe Babalola University
(ABUAD) Faculty of Law and its affiliated Law Students Association. The
platform will serve as the official online presence of the law community
at ABUAD, providing a single authoritative digital destination where
students, faculty, prospective students, and visitors can access
structured, up-to-date information about the department.

The site is not a transactional platform and does not require user
accounts for visitors. It is content-driven, curated, and managed
entirely through a secure administrative dashboard accessible only to
designated association executives and department administrators. All
content updates --- from executive profiles and lecturer directories to
announcements, timetables, newsletters, and gallery uploads --- are
handled through this dashboard without the need for any technical
knowledge on the part of the administrator.

**1.2 Project Purpose & Objectives**

The primary purpose of this project is to solve the following problems
faced by the ABUAD Law community:

-   Absence of a central, authoritative source of information for law
    students and faculty

-   Information about department structure, lecturers, and association
    leadership is scattered or difficult to access

-   Announcements and notices are communicated informally, leading to
    students missing critical updates

-   No structured or professional mechanism for sharing department
    timetables, newsletters, or association activities

-   No formal channel for informing students about payment procedures
    for association dues

The specific objectives the platform is designed to achieve are:

1.  Establish a professional, modern digital identity for the ABUAD Law
    Department and Law Students Association

2.  Provide students with easy, always-available access to information
    about department leadership and structure

3.  Enable the association to publish announcements, newsletters,
    timetables, and gallery updates in real time via an admin dashboard

4.  Present structured payment instructions for association dues through
    Quickteller, bank transfer, and cash payment channels

5.  Showcase the department through gallery media, newsletters, and
    information pages in a way that builds credibility with prospective
    students and the wider academic community

**1.3 Project Scope**

This project covers the design, development, testing, and deployment of
a fully responsive, publicly accessible website with an integrated
content management system (CMS-style admin dashboard). The scope
includes:

-   Design and development of all public-facing website pages

-   Design and development of a secure admin dashboard for content
    management

-   Integration of file upload capabilities for gallery images,
    newsletters, and timetable documents

-   Implementation of all stated content sections: executives,
    lecturers, announcements, timetable, gallery, newsletter, department
    info, and payment instructions

-   Mobile-first responsive design optimized for smartphones, tablets,
    and desktops

-   Hosting setup, domain configuration, and deployment pipeline

The following items are explicitly OUT of scope for this project:

-   Any form of online payment processing or payment gateway integration

-   User registration, login, or authenticated sessions for the general
    public

-   Student portal functionality (e.g., grades, assignments, LMS
    features)

-   Integration with ABUAD existing student information systems

-   Email newsletter delivery or mailing list management

**1.4 Stakeholders**

  ------------------------------------------------------------------------
  **Stakeholder**    **Role**           **Involvement**
  ------------------ ------------------ ----------------------------------
  ABUAD Law Students Primary Client /   Defines requirements, approves
  Association        Owner              deliverables, manages content via
                                        admin dashboard

  Association        Admin Users        Day-to-day content management
  Executives                            through the dashboard
  (President, VP,                       
  etc.)                                 

  ABUAD Faculty of   Secondary          Reviews and approves platform
  Law (Head of       Stakeholder        representation of faculty
  Department)                           information

  Law Students       Primary End Users  Consume content: announcements,
  (ABUAD)                               timetables, profiles, etc.

  Prospective        Secondary End      Browse department info, gallery,
  Students / General Users              and department overview
  Public                                

  Web Development    Developer /        Designs, builds, tests, and
  Agency             Delivery Team      deploys the platform
  ------------------------------------------------------------------------

**1.5 Target Audience**

**Primary Audience**

Current law students at ABUAD represent the core audience of the
platform. These are students enrolled in the undergraduate and
postgraduate law programmes who need convenient access to:

-   Names, photos, and bios of their elected student association
    executives

-   Information about their lecturers and course instructors

-   Academic timetables for the current semester

-   Announcements from the association and faculty

-   Instructions for paying association dues

-   Gallery images from association events and departmental activities

**Secondary Audience**

Prospective students considering ABUAD for their legal education
represent a valuable secondary audience. These users are likely to
evaluate the department based on the professionalism and richness of the
website, making design quality and content depth important signals of
institutional credibility. Alumni, parents, legal professionals, and
members of the public may also visit the platform.

**1.6 Success Criteria**

The project will be considered successfully delivered when the following
conditions are met:

  -----------------------------------------------------------------------------
  **\#**   **Success Criterion**     **Measurement**
  -------- ------------------------- ------------------------------------------
  1        All 10+ public-facing     QA checklist sign-off on all pages
           pages are fully built and 
           functional                

  2        Admin dashboard allows    Admin user acceptance testing passed
           content management for    
           all content types without 
           developer involvement     

  3        Platform is fully         Cross-device testing on real devices and
           responsive across mobile, BrowserStack
           tablet, and desktop       

  4        Page load time under 3    Lighthouse performance score ≥ 85
           seconds on a standard 4G  
           connection                

  5        All defined pages pass    Axe or similar accessibility audit
           WCAG 2.1 AA accessibility 
           checks                    

  6        Admin users are able to   Usability testing with 2 non-technical
           complete all CRUD         admin users
           operations without        
           training beyond a         
           30-minute walkthrough     

  7        Platform is deployed and  Live URL with HTTPS verified
           accessible on the         
           intended domain with SSL  

  8        Client sign-off on        Formal written approval from client
           design, content, and      representative
           functionality             
  -----------------------------------------------------------------------------

**1.7 Project Constraints**

-   Payments must not be processed on the platform; only instructions
    displayed

-   No student login or user account system for the public-facing site

-   The platform must be maintainable by non-technical administrators
    with basic computer literacy

-   All content updates must be achievable through the admin dashboard
    alone, with no code changes required

-   Design must align with the professional and formal tone appropriate
    for a university law department

**Document 2: Product Requirements Document (PRD)**

**2.1 Product Vision**

The ABUAD Law Association website will be the definitive digital hub for
the law community at Afe Babalola University --- a platform that
projects professionalism, enables seamless content management by
non-technical administrators, and serves every category of visitor with
the information they need. It is a content-first, publicly accessible
website with a private admin layer.

**2.2 System Overview**

The system is composed of two distinct layers:

-   Public Website: A static-experience, multi-page frontend accessible
    to all visitors without any authentication requirement. Renders
    dynamic content fetched from the backend database/API.

-   Admin Dashboard: A password-protected, role-controlled backend
    interface through which authorized administrators manage all site
    content.

**2.3 Functional Requirements --- Public Website**

**FR-01: Homepage**

-   Display a hero banner with the association name, tagline, and a
    featured call-to-action

-   Include a \"Quick Links\" section providing navigation to key areas:
    Announcements, Timetable, Executives, Lecturers, Gallery, and
    Payment Instructions

-   Display the 3 most recent announcements with title, excerpt, date,
    and a \"Read More\" link

-   Display a brief department overview/welcome section

-   Display the current executive team preview (photos and names of top
    4--6 executives)

-   Show a gallery highlight strip featuring 4--6 recent photos

**FR-02: Executives Page**

-   List all current association executives in a card-based grid layout

-   Each executive card must display: full name, portfolio/title,
    profile photo, and an optional short bio

-   Cards must be ordered by hierarchy (President first, then other
    officers)

-   Page must include a section header and brief introductory paragraph
    about the executive team

**FR-03: Lecturers / Faculty Directory Page**

-   Display all department lecturers in a structured directory

-   Each lecturer entry must include: full name, academic title/rank,
    profile photo, areas of specialization, and an optional short bio

-   Support filtering or grouping by area of law (e.g., Public Law,
    Commercial Law, Criminal Law)

-   Must include a search input for finding lecturers by name

**FR-04: Announcements Page**

-   Display a paginated list of all announcements in
    reverse-chronological order

-   Each announcement list item must show: title, date posted, category
    tag (e.g., Academic, Social, Urgent), and a truncated excerpt

-   Clicking an announcement opens a full-detail view showing: title,
    full body text, date, category, and any attached files (PDFs)

-   Support for pinned/featured announcements that always appear at the
    top

-   Display category filter tabs (All / Academic / Social / Urgent /
    General)

**FR-05: Academic Timetable Page**

-   Display the current semester academic timetable

-   Timetable must be viewable directly on the page in a structured
    table (days vs. time slots)

-   A downloadable PDF version of the timetable must be available via a
    prominent download button

-   Optionally support level/year filtering (100 Level, 200 Level, etc.)

-   Display the last-updated date and the academic session (e.g.,
    \"2024/2025 First Semester\")

**FR-06: Gallery Page**

-   Display a responsive photo grid showing uploaded gallery images

-   Support categorization by event or year (e.g., \"2024 Moot Court
    Competition\", \"2023 Matriculation\")

-   Clicking an image opens a full-screen lightbox view with navigation
    arrows

-   Each photo may include an optional caption and date

-   Gallery must lazy-load images for performance

**FR-07: Newsletter Archive Page**

-   List all published newsletters in reverse-chronological order

-   Each newsletter entry displays: title, edition number or date, a
    brief description, and a download link

-   Newsletters are distributed as downloadable PDF files

-   Support for a featured/latest newsletter highlighted at the top

**FR-08: About / Department Information Page**

-   Contain rich static content describing the ABUAD Faculty of Law:
    history, mission, vision, and values

-   Include information about the Law Students Association: its mandate,
    constitution link (PDF), and contact information

-   Display information about programmes offered (LL.B, BL, LL.M if
    applicable)

-   Include accreditation status and notable achievements

**FR-09: Payment Instructions Page**

-   Display clear, step-by-step instructions for paying association dues
    through three channels: Quickteller, bank transfer, and cash

-   Each channel must be presented as a distinct, clearly labeled
    section

-   Quickteller section: include the biller name, billing
    code/shortcode, and step-by-step instructions

-   Bank Transfer section: include account name, account number, bank
    name, and steps with a note about sending proof of payment

-   Cash section: include where, when, and to whom cash payments should
    be made

-   Display the current dues amount with a note on the payment deadline

-   This page must be easily updatable from the admin dashboard without
    developer involvement

**FR-10: Contact Page**

-   Display the department and association contact information: email,
    phone numbers, office address

-   Include a simple read-only embedded map showing the law faculty
    building on ABUAD campus

-   Include social media handles or links (if applicable)

**2.4 Functional Requirements --- Admin Dashboard**

**FR-AD-01: Authentication**

-   Admin users must log in via email and password

-   Session tokens must expire after a defined period of inactivity
    (e.g., 2 hours)

-   Failed login attempts must be rate-limited (e.g., lock after 5
    failed attempts for 15 minutes)

-   Password reset via email must be supported

**FR-AD-02: Executive Management**

-   Add new executive with: full name, portfolio title, profile photo
    (image upload), bio text, and display order

-   Edit any field of an existing executive profile

-   Delete an executive record

-   Reorder executives using drag-and-drop or numeric ordering field

**FR-AD-03: Lecturer Management**

-   Add new lecturer with: full name, academic rank/title, profile
    photo, areas of specialization, and bio

-   Edit any field of an existing lecturer profile

-   Delete a lecturer record

-   Assign lecturer to one or more subject areas for filtering

**FR-AD-04: Announcement Management**

-   Create new announcement with: title, full body (rich text editor),
    category, date, and optional PDF attachment

-   Edit existing announcements

-   Delete announcements

-   Toggle \"pinned\" status on an announcement

-   Publish or save as draft before publishing

**FR-AD-05: Timetable Management**

-   Upload a new timetable PDF to replace the current one

-   Edit structured timetable data directly in the dashboard (input into
    a table grid by day and time)

-   Specify current academic session label (e.g., \"2024/2025 First
    Semester\")

-   Set the last-updated timestamp automatically on save

**FR-AD-06: Gallery Management**

-   Upload single or multiple images at once

-   Add caption and date to each uploaded image

-   Assign image to a gallery category (create/manage categories)

-   Delete images

-   Reorder images within a category

**FR-AD-07: Newsletter Management**

-   Upload newsletter as a PDF file

-   Add title, edition/date, and brief description

-   Mark a newsletter as featured

-   Delete newsletters

**FR-AD-08: Department Information Management**

-   Edit the About page content using a rich text editor

-   Update the mission, vision, history, and programme information

-   Upload/replace documents (e.g., constitution PDF)

**FR-AD-09: Payment Instruction Management**

-   Update all three payment channels (Quickteller, bank transfer, cash)
    through structured form fields

-   Update the dues amount and payment deadline

-   Changes are reflected immediately on the public-facing payment page
    upon save

**2.5 Non-Functional Requirements**

  -------------------------------------------------------------------------
  **Category**     **Requirement**        **Acceptance Threshold**
  ---------------- ---------------------- ---------------------------------
  Performance      Page load time on 4G   Under 3 seconds (Lighthouse ≥ 85)

  Performance      Image optimization     All uploaded images
                                          auto-compressed; WebP format
                                          served where supported

  Reliability      Uptime                 99.5% monthly uptime SLA

  Security         HTTPS                  TLS/SSL certificate on all pages

  Security         Admin auth             JWT or session-based auth; rate
                                          limiting on login; CSRF
                                          protection

  Security         File uploads           Whitelist of allowed file types
                                          (JPG, PNG, PDF only); file size
                                          limits enforced

  Accessibility    WCAG compliance        WCAG 2.1 Level AA

  Responsiveness   Device support         Mobile (320px+), tablet (768px+),
                                          desktop (1024px+)

  SEO              Meta tags              Title, description, og:image tags
                                          on all public pages

  Scalability      Content volume         Support up to 500 gallery images,
                                          100 announcements, 50
                                          executives/lecturers without
                                          degradation
  -------------------------------------------------------------------------

**2.6 Non-Features (Explicit Exclusions)**

The following features are explicitly excluded from this project and
must not be built or implied in the UX:

-   Online payment processing --- no payment gateway, no Paystack, no
    Flutterwave, no card forms

-   Student login, registration, or portal --- no authenticated access
    for the public

-   Discussion boards, comments sections, or community features

-   Email newsletter subscription or delivery system

-   Integration with ABUAD Student Information Systems or academic
    portals

-   E-learning, course content, or academic resource downloads beyond
    timetables and newsletters

-   Real-time chat or messaging features

-   Multiple admin roles with different permission levels in the initial
    version (all admins have full access)

**Document 3: Site Map**

**3.1 Overview**

The site map defines the complete navigational architecture of the ABUAD
Law Association Website. The structure is organized into a flat
two-level hierarchy for the public website, supplemented by a separate
admin dashboard domain. The architecture prioritizes discoverability and
direct access to the most frequently needed content sections.

**3.2 Public Website Structure**

  ---------------------------------------------------------------------------------
  **Level**   **Page Name**      **URL Path**           **Description**
  ----------- ------------------ ---------------------- ---------------------------
  L1          Home               /                      Landing page with overview,
                                                        quick links, recent
                                                        announcements, executive
                                                        preview, gallery strip

  L1          About              /about                 Department history,
                                                        mission, vision,
                                                        programmes, accreditation,
                                                        association overview

  L1          Executives         /executives            Grid of current association
                                                        executive profiles with
                                                        photos and portfolios

  L1          Lecturers          /lecturers             Searchable directory of
                                                        department lecturers with
                                                        profiles and
                                                        specializations

  L1          Announcements      /announcements         Paginated list of all
                                                        published announcements
                                                        with category filters

  L2          Announcement       /announcements/:id     Full content view of a
              Detail                                    single announcement,
                                                        including attachments

  L1          Timetable          /timetable             Current academic timetable
                                                        grid with PDF download
                                                        option

  L1          Gallery            /gallery               Photo grid organized by
                                                        event category with
                                                        lightbox viewer

  L1          Newsletter         /newsletter            Downloadable PDF newsletter
                                                        archive listed in reverse
                                                        chronological order

  L1          Pay Dues           /pay-dues              Structured payment
                                                        instructions for
                                                        Quickteller, bank transfer,
                                                        and cash

  L1          Contact            /contact               Contact details, address,
                                                        and embedded map
  ---------------------------------------------------------------------------------

**3.3 Admin Dashboard Structure**

  ---------------------------------------------------------------------------------
  **Level**   **Page Name**      **URL Path**           **Description**
  ----------- ------------------ ---------------------- ---------------------------
  L1          Admin Login        /admin/login           Secure login portal for
                                                        administrators

  L1          Dashboard Home     /admin                 Overview with content
                                                        stats, quick actions, and
                                                        recent activity

  L2          Manage Executives  /admin/executives      List, add, edit, delete,
                                                        and reorder executive
                                                        profiles

  L2          Manage Lecturers   /admin/lecturers       List, add, edit, delete
                                                        lecturer profiles

  L2          Manage             /admin/announcements   List, create, edit, pin,
              Announcements                             publish/draft, and delete
                                                        announcements

  L2          Manage Timetable   /admin/timetable       Upload timetable PDF and/or
                                                        edit structured timetable
                                                        data

  L2          Manage Gallery     /admin/gallery         Upload, caption,
                                                        categorize, and delete
                                                        gallery photos

  L2          Manage Newsletters /admin/newsletters     Upload, describe, feature,
                                                        and delete newsletters

  L2          Manage Department  /admin/about           Rich text editor for About
              Info                                      page content management

  L2          Manage Payment     /admin/payment         Structured form for
              Info                                      updating all three payment
                                                        instruction channels

  L2          Admin Settings     /admin/settings        Change admin password;
                                                        manage admin user accounts
  ---------------------------------------------------------------------------------

**3.4 Navigation Structure (Header Nav)**

The primary navigation bar will contain the following links, visible on
all public pages:

-   Home

-   About

-   Executives

-   Lecturers

-   Announcements

-   Timetable

-   Gallery

-   Newsletter

-   Pay Dues (visually highlighted as a CTA button)

-   Contact

On mobile devices, the navigation collapses into a hamburger menu. The
\"Pay Dues\" link is rendered as a gold-colored button in the desktop
nav to draw attention to its importance.

**Document 4: User Flow Document**

**4.1 Overview**

This document describes the primary user journeys for both the public
visitor and the admin user. Each flow is described as a step-by-step
path through the system, identifying entry points, decision points, and
outcomes. These flows inform navigation design, page layout priorities,
and content placement decisions.

**4.2 Public User Flows**

**Flow 1: Student Checks for New Announcements**

6.  Student opens the website on their mobile browser

7.  Lands on the Homepage --- sees the \"Recent Announcements\" section
    near the top

8.  Reads the three latest announcement previews (title, date, excerpt)

9.  Clicks \"View All Announcements\" or a specific announcement title

10. Arrives on the Announcements page --- sees a full paginated list
    with category filter tabs

11. Selects a category filter (e.g., \"Urgent\") to narrow results

12. Clicks an announcement to open the detail view

13. Reads the full announcement body; downloads any attached PDF if
    present

14. Uses browser back button or site navigation to continue browsing

**Flow 2: Student Pays Association Dues**

15. Student is informed of dues payment (via announcement or word of
    mouth)

16. Visits the website --- sees \"Pay Dues\" button in the navigation
    bar

17. Clicks \"Pay Dues\" --- arrives on the Payment Instructions page

18. Reviews the stated dues amount and payment deadline at the top

19. Selects their preferred payment method (Quickteller, bank transfer,
    or cash)

20. Follows the detailed, step-by-step instructions displayed for their
    chosen method

21. For bank transfer: notes the account name, number, and bank name,
    then makes the transfer

22. If instructed, sends proof of payment via WhatsApp or email as
    directed on the page

23. Task complete --- student does not submit anything on the website
    itself

**Flow 3: Student Checks the Semester Timetable**

24. Student navigates to the website

25. Clicks \"Timetable\" in the navigation bar

26. Arrives on the Timetable page --- sees the session label (e.g.,
    \"2024/2025 First Semester\") and last-updated date

27. Reviews the timetable grid displayed on-screen (days as columns,
    times as rows)

28. Optionally selects their level/year filter if multi-level timetable
    view is available

29. Clicks the \"Download PDF\" button to save the timetable to their
    device

30. Task complete

**Flow 4: Prospective Student / Visitor Explores the Department**

31. Visitor arrives via search engine result or direct link

32. Lands on the Homepage --- reads the hero banner and department
    welcome message

33. Scrolls through the homepage: reads about the association, sees
    executive previews, views gallery strip

34. Clicks \"About\" in the navigation

35. Reads the department history, mission, vision, programmes offered,
    and accreditation details

36. Navigates to \"Lecturers\" to review the academic faculty

37. Navigates to \"Gallery\" to view photos from departmental activities

38. Navigates to \"Contact\" to find department contact details

39. Visitor may bookmark the site or share the URL

**Flow 5: Student Views Executive Profiles**

40. Student navigates to the \"Executives\" page from the navigation bar

41. Views the grid of executive cards ordered by hierarchy

42. Each card shows the executive\'s photo, name, and portfolio title

43. Student can click a card or expand a view to read the full bio if
    available

44. Student finds the information they need (e.g., identifying who the
    Financial Secretary is)

**4.3 Admin User Flows**

**Flow A: Admin Posts a New Announcement**

45. Admin navigates to /admin/login

46. Enters email and password, clicks \"Login\"

47. Authentication succeeds --- admin is redirected to the dashboard
    home

48. Clicks \"Announcements\" in the admin sidebar

49. Clicks the \"New Announcement\" button

50. Fills in the form: title, body (using rich text editor), category,
    publication date

51. Optionally attaches a PDF file (e.g., event flyer)

52. Toggles \"Pin to top\" if the announcement is urgent

53. Clicks \"Publish\" --- announcement appears immediately on the
    public site

54. Admin is redirected to the announcements list with a success
    notification

**Flow B: Admin Updates the Timetable**

55. Admin logs into the dashboard

56. Navigates to \"Timetable\" in the sidebar

57. Views the current timetable PDF and/or structured data

58. Clicks \"Upload New PDF\" --- selects the new timetable PDF from
    their device

59. Updates the \"Academic Session\" label field to reflect the new
    semester

60. Clicks \"Save\" --- the public-facing timetable page is updated with
    the new file and label

61. The last-updated date is automatically set to the current date and
    time

**Flow C: Admin Uploads New Gallery Photos**

62. Admin logs into the dashboard

63. Navigates to \"Gallery\"

64. Clicks \"Upload Photos\" --- a multi-file selection dialog opens

65. Admin selects multiple photos from their device

66. For each photo (or in batch), admin adds a caption and
    selects/creates a category

67. Clicks \"Upload All\" --- photos are compressed, stored, and added
    to the public gallery

68. Admin can reorder or delete photos from the gallery management view

**Document 5: Wireframe Blueprint**

**5.1 Purpose**

The Wireframe Blueprint defines the structural layout of each major
page. It describes the arrangement, hierarchy, and content zones of each
page without specifying visual design. These descriptions serve as the
structural specification from which the UI designer creates visual
mockups and the developer builds page templates.

**5.2 Homepage Wireframe**

**Zone 1: Navigation Bar (Sticky)**

-   Left: Logo mark + \"ABUAD Law Association\" wordmark

-   Right: Horizontal nav links --- Home, About, Executives, Lecturers,
    Announcements, Timetable, Gallery, Newsletter, Contact

-   Far right: \"Pay Dues\" button (distinct styling --- gold/outlined)

-   Mobile: Hamburger icon collapses nav into vertical drawer

**Zone 2: Hero Section**

-   Full-width background image (law library, courtroom, or campus
    building)

-   Overlay with association name in large type: \"ABUAD Law Students
    Association\"

-   Tagline: e.g., \"Upholding Justice, Building Future Leaders\"

-   Two CTAs: \"Meet Our Executives\" (primary) and \"View
    Announcements\" (secondary)

**Zone 3: Quick Links Bar**

-   Horizontal row of 5--6 icon-and-label tiles: Announcements,
    Timetable, Executives, Gallery, Pay Dues, Newsletter

-   Renders as a 2x3 grid on mobile

**Zone 4: Recent Announcements**

-   Section heading: \"Recent Announcements\"

-   3 announcement preview cards in a row (1 column on mobile)

-   Each card: category badge, title, date, 2-line excerpt, \"Read
    More\" link

-   \"View All Announcements\" CTA button below the cards

**Zone 5: Executive Preview Strip**

-   Section heading: \"Our Executives\"

-   Row of 4--6 executive cards: circular photo, name, portfolio title

-   \"Meet the Full Team\" button linking to /executives

**Zone 6: Gallery Strip**

-   Section heading: \"Gallery\"

-   6 thumbnail photos in a horizontal scroll or grid (masonry on
    desktop)

-   \"View Full Gallery\" link

**Zone 7: About Teaser**

-   Left: Brief paragraph about the law department and association

-   Right: Small feature image

-   \"Learn More About Us\" button

**Zone 8: Footer**

-   Three columns: Quick Links \| Contact Info \| Social Media /
    Copyright

-   Copyright text: \"© 2025 ABUAD Law Students Association. All rights
    reserved.\"

**5.3 Executives Page Wireframe**

-   Full-width page header banner: \"Meet Our Executives\" with a
    subtitle

-   Brief introductory paragraph about the current executive set
    (editable from admin)

-   Grid of executive cards --- 4 per row on desktop, 2 on tablet, 1 on
    mobile

-   Each card: profile photo (square, rounded corners), full name,
    portfolio title, short bio excerpt

-   Click/expand interaction: clicking a card opens a modal or expanded
    card with full bio

**5.4 Lecturers Page Wireframe**

-   Page header: \"Faculty & Lecturers\"

-   Search bar at top: \"Search by name or area of specialization\...\"

-   Subject area filter pills/tabs: All \| Public Law \| Private Law \|
    Criminal Law \| Commercial Law \| etc.

-   Grid of lecturer cards --- 3 per row on desktop, 2 on tablet, 1 on
    mobile

-   Each card: profile photo, academic rank + name, area(s) of
    specialization, brief bio

**5.5 Announcements Page Wireframe**

-   Page header: \"Announcements\"

-   Category filter tabs row: All \| Academic \| Social \| Urgent \|
    General

-   Pinned announcements section (if any): visually distinct yellow/gold
    strip at the top

-   List of announcement cards, reverse-chronological

-   Each card: category badge (color-coded), title, date, 2-line
    excerpt, \"Read More\" arrow link

-   Pagination controls at the bottom: Previous \| 1 \| 2 \| 3 \| Next

**5.6 Timetable Page Wireframe**

-   Page header: \"Academic Timetable\" with session label and
    last-updated date below

-   Prominent \"Download PDF\" button top-right of the timetable area

-   Level selector (dropdown or tabs): All Levels \| 100L \| 200L \|
    300L \| 400L \| 500L

-   Timetable rendered as an HTML table: rows = time slots, columns =
    days of the week

-   Each cell: course code, course title, and venue

-   Color-coding for different course categories (optional, admin can
    set class colors)

**5.7 Gallery Page Wireframe**

-   Page header: \"Gallery\"

-   Category filter pills: All \| \[Event Category Names\]

-   Masonry/grid layout of photo thumbnails --- variable heights for
    visual interest

-   Hover state on each photo shows caption overlay

-   Click opens a lightbox with full-resolution image, caption, date,
    and prev/next arrows

-   Lazy loading --- images load as user scrolls down

**5.8 Pay Dues Page Wireframe**

-   Page header: \"Pay Your Association Dues\"

-   Prominent info box at the top: current dues amount, payment
    deadline, and a note about contacting the Financial Secretary

-   Three distinct, equal-width or stacked card sections: \[1\]
    Quickteller \| \[2\] Bank Transfer \| \[3\] Cash Payment

-   Each section has: icon/logo for the payment channel, section title,
    step-by-step numbered instructions, and any relevant
    account/reference details

-   A visual divider (horizontal rule) between sections

-   Footer note: \"After payment, send proof to \[contact details\]\"

**5.9 Admin Dashboard Wireframe**

**Dashboard Layout**

-   Left sidebar (collapsible): Logo, nav links for each content type,
    Settings, Logout

-   Top bar: Page title, admin username, notifications badge

-   Main content area: varies by section

**Dashboard Home**

-   Stats cards row: Total Announcements, Total Lecturers, Total
    Executives, Total Gallery Photos

-   Recent Activity feed: last 5 content changes with admin name and
    timestamp

-   Quick Action buttons: \"+ New Announcement\", \"+ Upload Photo\",
    \"+ Upload Newsletter\"

**Content List Pages (e.g., Announcements List)**

-   Table with columns: Title \| Category \| Date \| Status
    (Published/Draft) \| Pinned \| Actions (Edit, Delete)

-   \"+ New\" button top-right

-   Search field above the table

**Content Create/Edit Pages**

-   Form with labeled fields

-   Rich text editor for body fields

-   File/image upload zones with drag-and-drop

-   \"Save as Draft\" and \"Publish\" buttons

-   \"Cancel\" and \"Delete\" actions clearly separated to avoid
    accidents

**Document 6: Design System Document**

**6.1 Design Philosophy**

The ABUAD Law Association website must project authority, credibility,
and professionalism --- qualities intrinsic to the legal profession. The
visual language should feel formal yet accessible, dignified yet
dynamic. It should be comparable in visual quality to law firm websites
and top Nigerian university department portals, while reflecting the
youth and energy of a student-run association.

The design is NOT to be playful, overly colorful, or informal. Every
visual decision should reinforce trustworthiness, clarity, and
institutional prestige.

**6.2 Color Palette**

  --------------------------------------------------------------------------
  **Color Name**     **Hex Code**    **Usage**        **Notes**
  ------------------ --------------- ---------------- ----------------------
  Deep Navy          #1B2A4A         Primary brand    Conveys authority and
                                     color; headers,  trust
                                     navigation       
                                     background, CTA  
                                     buttons          

  Judicial Gold      #C9A84C         Accent color;    References legal
                                     highlighted      tradition and
                                     CTAs, dividers,  excellence
                                     badges, hover    
                                     states           

  Charcoal Text      #333333         Primary body     High readability on
                                     text             white backgrounds

  Secondary Gray     #666666         Secondary/meta   
                                     text;            
                                     timestamps,      
                                     labels, captions 

  Light Gray         #CCCCCC         Borders,         
                                     dividers, table  
                                     lines            

  Background Light   #F5F7FA         Page and section Slightly off-white for
                                     backgrounds;     reduced eye strain
                                     card backgrounds 

  White              #FFFFFF         Card             
                                     backgrounds,     
                                     modal            
                                     backgrounds, nav 
                                     bar on scroll    

  Error Red          #C0392B         Error states,    
                                     urgent           
                                     announcement     
                                     badges           

  Success Green      #27AE60         Success states,  
                                     confirmation     
                                     messages in      
                                     dashboard        
  --------------------------------------------------------------------------

**6.3 Typography**

**Typeface Selection**

Two typefaces are selected to balance professionalism with readability:

-   Primary Heading Font: Playfair Display (Google Fonts) --- A serif
    font traditionally associated with law, publishing, and academic
    institutions. Used for H1, H2, and major display text.

-   Body & UI Font: Inter (Google Fonts) --- A highly legible, modern
    sans-serif used for body text, navigation, labels, buttons,
    captions, and all UI text. Inter was designed specifically for
    screen readability.

  ----------------------------------------------------------------------------
  **Element**     **Typeface**   **Size**     **Weight**   **Usage**
  --------------- -------------- ------------ ------------ -------------------
  H1 --- Page     Playfair       40--48px     700 Bold     Hero headings,
  Title           Display                                  major page titles

  H2 --- Section  Playfair       28--32px     600 SemiBold Section titles on
  Heading         Display                                  public pages

  H3 ---          Inter          20--22px     600 SemiBold Card titles,
  Sub-heading                                              sub-section headers

  Body --- Large  Inter          18px         400 Regular  Intro paragraphs,
                                                           about content

  Body --- Base   Inter          16px         400 Regular  Standard body text
                                                           throughout

  Caption / Meta  Inter          13--14px     400 Regular  Dates, photo
                                                           captions, metadata

  Label / UI      Inter          14px         500 Medium   Navigation,
                                                           buttons, form
                                                           labels, badges

  Admin UI        Inter          14--15px     400 / 500    All admin dashboard
                                                           text
  ----------------------------------------------------------------------------

**6.4 Spacing System**

An 8px base spacing system is used throughout the platform to ensure
visual consistency. All padding, margins, and gaps must be multiples of
8px.

  ------------------------------------------------------------------------
  **Token Name**     **Value**       **Usage**
  ------------------ --------------- -------------------------------------
  space-xs           4px             Tight inline spacing; icon-to-text
                                     gaps

  space-sm           8px             Small internal padding; badge padding

  space-md           16px            Default padding within cards and form
                                     fields

  space-lg           24px            Card padding; section internal
                                     spacing

  space-xl           32px            Gap between cards in a grid; section
                                     padding top/bottom

  space-2xl          48px            Section spacing on desktop; hero
                                     padding

  space-3xl          64px            Major section separations; page
                                     top/bottom padding

  space-4xl          96px            Hero section vertical padding
  ------------------------------------------------------------------------

**6.5 Layout Grid**

-   Maximum container width: 1280px, centered, with 24px horizontal
    padding on desktop

-   Column grid: 12-column system (standard Bootstrap/CSS Grid pattern)

-   Gutter: 24px between columns

-   Breakpoints: Mobile 320--767px \| Tablet 768--1023px \| Desktop
    1024px+

**6.6 UI Component Specifications**

**Buttons**

-   Primary Button: Navy fill (#1B2A4A), white text, Inter 14px Medium,
    border-radius: 4px, padding: 12px 24px, hover: darken 10%

-   Secondary Button: Gold fill (#C9A84C), dark text, same sizing as
    primary

-   Outline Button: Transparent fill, navy border 2px, navy text, hover:
    navy fill with white text

-   Danger Button (admin only): Red fill (#C0392B), white text

**Cards**

-   Background: White (#FFFFFF)

-   Border: 1px solid #E8E8E8

-   Border-radius: 8px

-   Box shadow: 0 2px 8px rgba(0,0,0,0.08)

-   Hover state: shadow elevates to 0 4px 16px rgba(0,0,0,0.12), subtle
    upward translate 2px

-   Padding: 24px internal

**Navigation Bar**

-   Desktop: White background, navy text links, gold underline on
    active/hover state

-   On scroll past hero: nav gains slight shadow and stays sticky at top

-   Mobile: Full-screen drawer overlay with large nav links

**Badges / Category Pills**

-   Rounded pill shape, 6px border-radius

-   Urgent: Red background (#C0392B), white text

-   Academic: Navy background (#1B2A4A), white text

-   Social: Teal/green tone, white text

-   General: Light gray background, dark gray text

**Forms (Admin)**

-   Input fields: 1px gray border, 8px border-radius, 12px internal
    padding, focus state: navy border 2px

-   Labels: Inter 14px Medium, charcoal color, 8px below label spacing

-   Error state: red border, red error message below the field

-   Rich text editor: TipTap or Quill with a clean, minimal toolbar

**6.7 Iconography**

-   Icon library: Heroicons or Lucide Icons (open source, clean,
    consistent stroke weight)

-   Icon size: 20px for inline/UI icons, 32px for feature icons in cards

-   Color: Inherits context color (e.g., navy in nav, white in buttons,
    gray in body text)

**6.8 Photography & Image Guidelines**

-   Hero images: High-resolution, preferably featuring the ABUAD campus,
    law library, or moot court setting

-   Profile photos: Square crop, minimum 400x400px upload, displayed as
    circles on executive cards

-   Gallery images: No minimum resolution, but system auto-optimizes;
    captions are mandatory

-   Avoid: Blurry, low-contrast, or informal photos on formal pages
    (executives, lecturers)

-   All images must be served in WebP format where browser support
    exists, with JPEG fallback

**6.9 Brand Tone & Voice**

The platform communicates with a tone that is:

-   Authoritative but approachable --- confident and clear without being
    cold or bureaucratic

-   Professional and formal --- appropriate for a law community

-   Student-inclusive --- announcements and social content can be more
    casual and energetic

-   Clear and direct --- information is presented without ambiguity; no
    unnecessary filler content

**Document 7: Content Structure Document**

**7.1 Overview**

This document defines the data model for each content type managed on
the platform. It specifies the fields, data types, validation rules, and
display behavior for each content entity. These definitions serve as the
basis for database schema design, admin form creation, and frontend
rendering templates.

**7.2 Executive Profile Content Model**

  ---------------------------------------------------------------------------
  **Field**         **Type**     **Required /       **Description**
                                 Constraints**      
  ----------------- ------------ ------------------ -------------------------
  id                UUID         Auto-generated     Unique identifier

  full_name         String       Required, max 100  Executive\'s full name as
                                 chars              it should appear publicly

  portfolio_title   String       Required, max 80   e.g., \"President\",
                                 chars              \"Financial Secretary\"

  profile_photo     Image URL    Required, JPG/PNG, Square crop recommended;
                                 min 300x300px      stored in cloud storage

  bio               Text         Optional, max 600  Short biography or
                                 chars              message from the
                                                    executive

  display_order     Integer      Required, unique,  Controls sort order;
                                 default 999        President = 1

  academic_level    String       Optional, max 20   e.g., \"400 Level\",
                                 chars              \"500 Level\"

  created_at        DateTime     Auto-generated     Record creation timestamp

  updated_at        DateTime     Auto-updated       Last modification
                                                    timestamp
  ---------------------------------------------------------------------------

**7.3 Lecturer Profile Content Model**

  --------------------------------------------------------------------------
  **Field**        **Type**     **Required /       **Description**
                                Constraints**      
  ---------------- ------------ ------------------ -------------------------
  id               UUID         Auto-generated     Unique identifier

  full_name        String       Required, max 120  Full name with titles
                                chars              (e.g., \"Prof. Adaeze
                                                   Nwosu\")

  academic_rank    String       Required           e.g., \"Professor\",
                                                   \"Senior Lecturer\",
                                                   \"Lecturer I\"

  profile_photo    Image URL    Optional, JPG/PNG  Professional headshot

  specialization   Array of     Required, min 1    e.g., \[\"Criminal Law\",
                   strings      item               \"Human Rights Law\"\]

  bio              Text         Optional, max 800  Academic biography or
                                chars              research interests

  email            String       Optional, valid    Institutional email for
                                email format       display (optional)

  is_active        Boolean      Default: true      Set to false to hide
                                                   without deleting

  created_at       DateTime     Auto-generated     

  updated_at       DateTime     Auto-updated       
  --------------------------------------------------------------------------

**7.4 Announcement Content Model**

  --------------------------------------------------------------------------
  **Field**        **Type**     **Required /       **Description**
                                Constraints**      
  ---------------- ------------ ------------------ -------------------------
  id               UUID         Auto-generated     Unique identifier

  title            String       Required, max 200  Short, clear announcement
                                chars              headline

  body             Rich Text    Required, no       Full announcement
                   (HTML)       min/max            content; supports bold,
                                                   lists, links

  category         Enum         Required           One of: Academic \|
                                                   Social \| Urgent \|
                                                   General

  status           Enum         Required, default  One of: draft \|
                                \"draft\"          published

  is_pinned        Boolean      Default: false     If true, displayed at top
                                                   of announcements list

  attachment_url   File URL     Optional, PDF      Downloadable PDF
                                only, max 10MB     attachment (e.g., event
                                                   flyer)

  published_at     DateTime     Required when      Can be set to a future
                                status=published   date for scheduled
                                                   publishing

  created_by       Admin user   Auto-set on        Reference to admin who
                   ID           creation           created the record

  created_at       DateTime     Auto-generated     

  updated_at       DateTime     Auto-updated       
  --------------------------------------------------------------------------

**7.5 Gallery Image Content Model**

  -------------------------------------------------------------------------
  **Field**       **Type**     **Required /       **Description**
                               Constraints**      
  --------------- ------------ ------------------ -------------------------
  id              UUID         Auto-generated     Unique identifier

  image_url       Image URL    Required,          Full URL to stored image
                               JPG/PNG/WebP       (original)

  thumbnail_url   Image URL    Auto-generated on  Compressed thumbnail for
                               upload             grid display

  caption         String       Optional, max 200  Descriptive caption for
                               chars              the photo

  category_id     UUID (FK)    Required           References
                                                  gallery_category table

  event_date      Date         Optional           Date of the event
                                                  pictured

  display_order   Integer      Default: auto      Sort order within a
                                                  category

  uploaded_by     Admin user   Auto-set           Reference to admin who
                  ID                              uploaded

  created_at      DateTime     Auto-generated     
  -------------------------------------------------------------------------

**7.6 Newsletter Content Model**

  -------------------------------------------------------------------------
  **Field**       **Type**     **Required /       **Description**
                               Constraints**      
  --------------- ------------ ------------------ -------------------------
  id              UUID         Auto-generated     

  title           String       Required, max 200  e.g., \"The Lexicon ---
                               chars              Issue 4, 2024\"

  description     Text         Optional, max 400  Brief summary of
                               chars              newsletter contents

  edition_label   String       Optional, max 50   e.g., \"Vol. 2, Issue 4\"
                               chars              or \"January 2025\"

  pdf_url         File URL     Required, PDF only Downloadable PDF file

  is_featured     Boolean      Default: false     Highlights this as the
                                                  latest/featured edition

  published_at    Date         Required           Publication date for
                                                  display

  created_at      DateTime     Auto-generated     
  -------------------------------------------------------------------------

**7.7 Payment Instruction Content Model**

The payment instruction content is stored as structured JSON rather than
free-form text, allowing the admin to update specific fields without
risk of breaking the page layout.

  ----------------------------------------------------------------------------
  **Field**                  **Type**     **Description**
  -------------------------- ------------ ------------------------------------
  dues_amount                Number       The current dues amount in NGN
                                          (e.g., 5000)

  payment_deadline           Date         Deadline for payment for current
                                          session

  payment_note               Text         Optional general note or instruction
                                          (max 400 chars)

  quickteller_biller_name    String       Name as it appears on Quickteller

  quickteller_billing_code   String       USSD/shortcode for Quickteller
                                          payment

  quickteller_steps          Array of     Step-by-step instructions list
                             strings      

  bank_account_name          String       Account name for bank transfer

  bank_account_number        String       Account number (10 digits)

  bank_name                  String       Bank name (e.g., \"First Bank\")

  bank_transfer_steps        Array of     Step-by-step instructions list
                             strings      

  proof_of_payment_contact   String       WhatsApp/email to send proof of
                                          payment

  cash_payment_location      String       Where to make cash payment

  cash_payment_officer       String       Person/role to pay (e.g.,
                                          \"Financial Secretary\")

  cash_payment_schedule      String       When cash payments are accepted

  updated_at                 DateTime     Auto-updated on save
  ----------------------------------------------------------------------------

**Document 8: Technical Architecture Document**

**8.1 Architecture Overview**

The platform follows a decoupled (headless) architecture pattern with a
clearly defined separation between the frontend presentation layer and
the backend data/API layer. This approach enables independent
development and deployment of both layers, ensures scalability, and
allows the admin dashboard to share the same backend API used by the
public frontend.

  ------------------------------------------------------------------------
  **Layer**          **Technology**         **Responsibility**
  ------------------ ---------------------- ------------------------------
  Public Frontend    Next.js 14 (React)     Server-side rendered and
                                            statically generated public
                                            pages

  Admin Dashboard    Next.js 14 (React)     Client-side rendered admin CMS
  Frontend                                  interface

  Backend API        Node.js + Express.js   RESTful API serving both
                                            frontend and admin dashboard

  Database           PostgreSQL             Primary relational data store
                                            for all content

  File/Media Storage Cloudinary             Image uploads, PDF storage,
                                            optimization, CDN delivery

  Authentication     JWT (JSON Web Tokens)  Stateless auth for admin users
                                            only

  Hosting ---        Vercel                 Edge-optimized Next.js
  Frontend                                  deployment with CDN

  Hosting ---        Railway or Render      Managed Node.js server hosting
  Backend                                   with auto-deploy

  Database Hosting   Supabase or Neon       Managed PostgreSQL with
                                            connection pooling

  DNS / Domain       Namecheap or           Domain registration and DNS
                     Cloudflare             management

  SSL Certificate    Let\'s Encrypt via     Automatic HTTPS on all
                     Vercel/Cloudflare      endpoints
  ------------------------------------------------------------------------

**8.2 Frontend Architecture --- Public Website**

**Framework: Next.js 14 with App Router**

Next.js is selected because it provides the optimal combination of
static generation (for performance) and server-side rendering (for
dynamic content like announcements). The public website will use:

-   Static Site Generation (SSG) for pages with infrequently changing
    content (About, Executives, Lecturers) --- these are pre-rendered at
    build time and served as static HTML for maximum performance

-   Incremental Static Regeneration (ISR) for pages like Announcements
    and Gallery --- these pages revalidate and regenerate every 60--300
    seconds without a full redeployment

-   Server Components for data fetching directly in page components,
    reducing client-side JavaScript bundle sizes

-   Client Components only where interactivity is required (gallery
    lightbox, search filter, mobile nav drawer)

**Key Frontend Dependencies**

-   React 18 --- UI component library

-   Tailwind CSS --- Utility-first CSS framework for styling consistency
    and rapid development

-   TanStack Query --- Data fetching and client-side caching for the
    admin dashboard

-   React Hook Form + Zod --- Form state management and schema-based
    validation in admin

-   Tiptap --- Rich text editor for announcement and about page content
    editing

-   yet-another-react-lightbox --- Accessible, performant lightbox for
    the gallery

-   next/image --- Automatic image optimization, WebP conversion, and
    lazy loading

-   SWR --- Client-side data fetching with revalidation for
    real-time-feeling updates

**8.3 Backend Architecture**

**Framework: Node.js + Express.js**

The backend is a RESTful API built with Node.js and Express.js. It
handles all data operations, authentication, file uploads (via
Cloudinary integration), and serves structured JSON responses to both
the public frontend and the admin dashboard. The backend is stateless
and designed for easy horizontal scaling.

**API Design Conventions**

-   All API routes are prefixed with /api/v1/

-   Public endpoints (no auth required): GET /api/v1/executives, GET
    /api/v1/lecturers, GET /api/v1/announcements, GET /api/v1/gallery,
    GET /api/v1/newsletters, GET /api/v1/timetable, GET
    /api/v1/payment-info

-   Protected admin endpoints (JWT required): All POST, PUT, PATCH,
    DELETE routes under /api/v1/admin/

-   Responses use standard HTTP status codes (200, 201, 400, 401, 403,
    404, 500)

-   All responses return a consistent JSON envelope: { success: boolean,
    data: any, message: string, pagination?: object }

**Key Backend Dependencies**

-   express --- Web framework

-   pg / prisma --- PostgreSQL client and ORM for type-safe database
    queries

-   jsonwebtoken --- JWT generation and verification

-   bcryptjs --- Password hashing

-   multer + cloudinary --- File upload middleware and cloud storage
    integration

-   express-rate-limit --- Rate limiting for login and API endpoints

-   helmet --- HTTP security headers middleware

-   cors --- CORS configuration for cross-origin requests from frontend
    domains

-   joi or zod --- Request body validation

-   dotenv --- Environment variable management

**8.4 Database Schema**

**Tables Overview**

  -------------------------------------------------------------------------------
  **Table Name**             **Description**
  -------------------------- ----------------------------------------------------
  admins                     Admin user accounts: id, email, password_hash, name,
                             role, last_login, created_at

  executives                 Executive profiles: id, full_name, portfolio_title,
                             profile_photo_url, bio, display_order,
                             academic_level, created_at, updated_at

  lecturers                  Lecturer profiles: id, full_name, academic_rank,
                             profile_photo_url, bio, email, is_active,
                             created_at, updated_at

  lecturer_specializations   Junction: id, lecturer_id (FK), specialization_name

  announcements              Announcement records: id, title, body_html,
                             category, status, is_pinned, attachment_url,
                             published_at, created_by (FK admin), created_at,
                             updated_at

  gallery_categories         Gallery categories: id, name, slug, created_at

  gallery_images             Gallery images: id, image_url, thumbnail_url,
                             caption, category_id (FK), event_date,
                             display_order, uploaded_by (FK admin), created_at

  newsletters                Newsletter records: id, title, description,
                             edition_label, pdf_url, is_featured, published_at,
                             created_at

  timetable_slots            Structured timetable: id, level, day_of_week,
                             start_time, end_time, course_code, course_title,
                             venue, session_label

  timetable_pdf              Stores the current timetable PDF URL and session
                             metadata: id, pdf_url, session_label, updated_at

  payment_info               Single-row configuration table for payment
                             instructions (all fields per Document 7.7)

  site_settings              General site configuration: key-value pairs for site
                             title, contact info, social links, etc.
  -------------------------------------------------------------------------------

**8.5 File Storage Strategy**

All uploaded files (images and PDFs) are stored on Cloudinary, a
cloud-based media management service. This eliminates the need to manage
file storage on the server itself and provides automatic CDN delivery,
image optimization, and format conversion.

  --------------------------------------------------------------------------------------
  **File Type**      **Cloudinary Folder**            **Transformations Applied**
  ------------------ -------------------------------- ----------------------------------
  Executive profile  /abuad-law/executives/           Auto-crop to 400x400, WebP
  photos                                              conversion, quality 85

  Lecturer profile   /abuad-law/lecturers/            Auto-crop to 400x400, WebP
  photos                                              conversion, quality 85

  Gallery images     /abuad-law/gallery/              WebP conversion, quality 80,
                                                      lazy-load thumbnail generated

  Announcement PDFs  /abuad-law/announcements/pdfs/   No transformation; stored as-is

  Newsletter PDFs    /abuad-law/newsletters/          No transformation; stored as-is

  Timetable PDF      /abuad-law/timetable/            No transformation; single file
                                                      replaced on update
  --------------------------------------------------------------------------------------

**8.6 Authentication & Security**

-   Admin authentication uses JWT access tokens (15-minute expiry) plus
    refresh tokens (7-day expiry) stored in HttpOnly cookies

-   Passwords are hashed using bcrypt with a minimum cost factor of 12

-   Login endpoint is rate-limited to 5 attempts per 15 minutes per IP
    address

-   All admin API routes validate the JWT before processing any request

-   HTTPS is enforced on all endpoints; HTTP requests are redirected to
    HTTPS

-   CORS is configured to only accept requests from the approved
    frontend domain(s)

-   All file uploads are validated server-side: file type (whitelist),
    file size (max 10MB for images, 20MB for PDFs)

-   SQL injection is prevented through parameterized queries (enforced
    by Prisma ORM)

-   XSS is mitigated by sanitizing rich text HTML content on input
    (using DOMPurify server-side equivalent)

**8.7 Deployment Architecture**

-   Frontend (Vercel): Automatic deployment triggered on git push to
    main branch. Vercel handles CDN, SSL, and edge caching. Preview
    deployments generated for every pull request.

-   Backend (Railway/Render): Docker-containerized Node.js application.
    Auto-deploy on push to main. Environment variables managed through
    platform UI (never in code).

-   Database (Supabase/Neon): Managed PostgreSQL with automatic backups
    (daily). Connection pooling via PgBouncer. Migrations managed via
    Prisma Migrate.

-   CI/CD: GitHub Actions pipeline runs lint, type checks, and automated
    tests before deploying to production.

-   Monitoring: Uptime monitoring via BetterUptime or UptimeRobot. Error
    tracking via Sentry on both frontend and backend.

**Document 9: Admin Dashboard Specification**

**9.1 Purpose**

The Admin Dashboard is the central content management interface for the
ABUAD Law Association website. It allows authorized non-technical
administrators to create, read, update, and delete all content on the
platform without writing any code or requiring developer assistance. The
dashboard is designed for simplicity, speed, and reliability,
prioritizing common operations with minimal clicks.

**9.2 Access & Authentication**

-   The admin dashboard is accessible at /admin --- this URL must not be
    linked from the public website

-   Only users with valid admin accounts in the system can access any
    dashboard page

-   Unauthenticated access to any /admin/\* route redirects immediately
    to /admin/login

-   Admin accounts are created by the development team during system
    setup; self-registration is NOT available

-   The dashboard supports a single admin role in V1 (full access to all
    features)

-   Future versions may implement tiered roles (e.g., a \"Content
    Editor\" role that cannot delete or manage admin accounts)

**9.3 Dashboard Layout & Navigation**

**Left Sidebar**

A persistent collapsible sidebar provides primary navigation. On mobile,
it slides in as a drawer. Sidebar sections:

-   Dashboard (home icon) --- Overview stats and recent activity

-   Executives (person icon) --- Manage executive profiles

-   Lecturers (academic icon) --- Manage lecturer directory

-   Announcements (megaphone icon) --- Post and manage announcements

-   Timetable (calendar icon) --- Upload and edit timetable

-   Gallery (image icon) --- Upload and manage photos

-   Newsletters (document icon) --- Upload and manage newsletters

-   About / Dept Info (info icon) --- Edit department information page

-   Payment Info (bank icon) --- Update payment instructions

-   Settings (gear icon) --- Admin account settings

-   Logout (exit icon) --- Sign out of session

**Top Bar**

-   Current page breadcrumb title (e.g., \"Dashboard \> Announcements \>
    New Announcement\")

-   Admin\'s display name and role badge

-   Notification icon (future: for system alerts or failed uploads)

-   \"View Site\" external link --- opens the public website in a new
    tab

**9.4 Dashboard Home**

The dashboard home provides a bird\'s-eye view of the site\'s content
status and quick access to the most frequent actions.

**Stats Cards Row**

-   Total Published Announcements

-   Total Lecturers (Active)

-   Total Executives

-   Total Gallery Images

**Quick Actions Panel**

-   \+ New Announcement

-   \+ Upload Photos

-   \+ Upload Newsletter

-   Update Timetable

**Recent Activity Feed**

The last 10 content changes are shown in a timestamped log:

-   E.g., \"Admin posted announcement: \'MOOT COURT COMPETITION ---
    REGISTRATIONS OPEN\' --- 2 hours ago\"

-   E.g., \"Admin uploaded 6 new gallery photos to \'2024 Law Week\' ---
    1 day ago\"

**9.5 Executive Management Specification**

**Executive List View**

-   Table showing: Photo (thumbnail) \| Full Name \| Portfolio Title \|
    Display Order \| Actions (Edit, Delete)

-   Rows are displayed in current display_order

-   Drag-and-drop reordering OR up/down arrow controls for adjusting
    order

-   \"+ Add Executive\" button (top right)

**Add / Edit Executive Form**

**Fields:**

-   Full Name\* (text input)

-   Portfolio Title\* (text input, e.g., \"Director of Socials\")

-   Profile Photo\* (image upload with drag-and-drop zone; shows current
    photo if editing)

-   Short Bio (textarea, 600-char limit with counter)

-   Academic Level (text input, optional)

-   Display Order (number input; auto-suggested as next available
    number)

**Actions:**

-   \"Save Changes\" (Edit mode) / \"Add Executive\" (Create mode)

-   \"Cancel\" --- returns to list without saving

-   \"Delete Executive\" (red, in Edit mode only) --- requires
    confirmation modal: \"Are you sure you want to delete \[Name\]? This
    action cannot be undone.\"

**9.6 Lecturer Management Specification**

**Lecturer List View**

-   Table: Photo \| Name \| Rank \| Specializations \| Active Status \|
    Actions

-   Search input for filtering by name or specialization

-   Toggle \"Active/Hidden\" status without deleting the record

**Add / Edit Lecturer Form**

-   Full Name\* (text input)

-   Academic Rank/Title\* (dropdown: Professor \| Associate Professor \|
    Senior Lecturer \| Lecturer I \| Lecturer II \| Assistant Lecturer)

-   Profile Photo (image upload, optional)

-   Areas of Specialization\* (tag input --- type and press Enter to add
    multiple tags)

-   Bio (textarea, 800-char limit)

-   Email (text input, optional)

-   Active (toggle switch --- default ON)

**9.7 Announcement Management Specification**

**Announcement List View**

-   Table: Title \| Category \| Status \| Pinned \| Date \| Actions
    (Edit, Delete, Preview)

-   Status badges: Draft (gray), Published (green)

-   Pinned badge shown with a pin icon

-   Quick toggle: click to publish/unpublish without opening the full
    edit form

-   Search input for finding announcements by title

**Create / Edit Announcement Form**

-   Title\* (text input, 200-char limit)

-   Category\* (dropdown: Academic \| Social \| Urgent \| General)

-   Body\* (TipTap rich text editor --- supports headings, bold, italic,
    lists, links, and basic formatting. No code blocks or advanced
    formatting.)

-   Attachment (PDF upload zone, max 10MB, optional)

-   Pin to Top (checkbox toggle)

-   Publication Date\* (date-time picker; defaults to current date/time)

**Actions:**

-   \"Save as Draft\" --- saves without publishing; does not appear on
    public site

-   \"Publish\" --- publishes immediately or at the set scheduled date

-   \"Preview\" (edit mode) --- opens a new tab showing how the
    announcement will appear publicly

-   \"Delete\" (requires confirmation modal)

**9.8 Timetable Management Specification**

**Timetable View**

-   Shows current academic session label and last-updated timestamp

-   Current timetable PDF download link (for admin to verify current
    file)

-   Two tabs: \[1\] Upload PDF \| \[2\] Edit Table Data

**Tab 1 --- Upload PDF:**

-   PDF upload zone with drag-and-drop; replaces current timetable PDF
    on save

-   Session label field: text input (e.g., \"2024/2025 Second
    Semester\")

-   \"Save & Publish\" button --- updates the public timetable page
    immediately

**Tab 2 --- Edit Table Data:**

-   Grid editor with rows for time slots (6:00 AM to 9:00 PM, hourly)
    and columns for days (Monday--Friday + Saturday)

-   Each cell has inputs for: Course Code, Course Title, Venue

-   Level selector to manage multiple level timetables

-   \"Save All Changes\" button

**9.9 Gallery Management Specification**

**Gallery Overview**

-   Category tabs showing all existing gallery categories with photo
    count

-   \"+ New Category\" button to create a new event category

-   Photo grid within selected category with edit/delete overlays on
    hover

**Upload Photos**

-   Multi-file drag-and-drop upload zone

-   Selected files shown as previews before upload

-   For each photo: caption field and event_date picker

-   Category selector (apply to all or individually)

-   \"Upload All\" button --- uploads are processed and compressed
    asynchronously; progress indicator shown

**9.10 Newsletter Management Specification**

-   List view: Edition \| Title \| Date \| Featured \| Actions

-   \"+ Upload Newsletter\" button opens form: Title\*, Edition Label,
    Description (textarea), PDF upload\*, Publication Date\*, Featured
    toggle

-   \"Set as Featured\" action available from the list view for any
    newsletter

-   Delete with confirmation modal

**9.11 Settings Specification**

-   Change Password form: Current Password, New Password, Confirm New
    Password

-   Admin Account Management (V1): list of current admin email
    addresses; ability to add a new admin account (requires name and
    email; system sends password setup email)

-   Deactivate an admin account without deleting it

-   Future: social media links, site meta settings, contact information
    updates

**Document 10: Payment Instruction Page Specification**

**10.1 Purpose & Context**

The Payment Instructions Page exists to clearly and completely
communicate the process by which law students pay their association
dues. No payment is processed on this website. The platform serves
purely as an information and instruction delivery mechanism for three
independent payment channels. The goal is to reduce confusion, reduce
the administrative burden on the Financial Secretary, and increase dues
payment compliance by making the payment process clear and accessible at
all times.

The content on this page is fully managed through the admin dashboard
and can be updated at any time by an authorized administrator ---
without developer involvement. This is critical because bank account
details, payment amounts, deadlines, and Quickteller codes may change
from session to session.

**10.2 Page Header Section**

-   Page title: \"Pay Your Association Dues\" --- rendered in H1

-   Subtitle: \"Choose your preferred payment method and follow the
    steps below.\" --- rendered in body text

-   Dues Information Box (visually distinct, gold-outlined card):

-   ↳ \"Current Dues Amount: ₦\[dues_amount\]\" --- prominently
    displayed in large type

-   ↳ \"Payment Deadline: \[payment_deadline formatted as Month DD,
    YYYY\]\"

-   ↳ \"\[payment_note\]\" --- displayed if a note has been entered in
    the admin

-   ↳ A note: \"For assistance, contact the Financial Secretary.\" (with
    contact details if available)

**10.3 Payment Channel 1: Quickteller**

**UI Design Specification**

-   Section header: \"Pay via Quickteller\" with a Quickteller-style
    icon or bank icon

-   A brief introductory sentence: \"Quickteller allows you to pay
    directly from your mobile phone or any internet-connected device.\"

**Content Fields Displayed**

-   Biller Name: Displayed as a labeled copy-able field --- \"Biller
    Name: \[quickteller_biller_name\]\"

-   Billing Code / Shortcode: Displayed as a large, prominent labeled
    field --- \"Billing Code: \[quickteller_billing_code\]\"

-   Step-by-step numbered instructions list from the admin-configured
    quickteller_steps array

**Example Quickteller Instructions (Illustrative)**

69. Open the Quickteller app or visit www.quickteller.com

70. Click on \"Pay a Bill\" or \"Bills Payment\"

71. Search for or enter the Biller Name: \[ABUAD Law Students
    Association\]

72. Enter the Billing Code: \[provided code\]

73. Enter your name and student matriculation number as the reference

74. Enter the dues amount: ₦\[amount\]

75. Select your payment method (debit card, bank account, etc.) and
    confirm the payment

76. Save or screenshot your payment receipt for your records

**10.4 Payment Channel 2: Bank Transfer**

**UI Design Specification**

-   Section header: \"Pay via Bank Transfer\" with a bank/transfer icon

-   Brief intro: \"Transfer the dues amount directly to the
    association\'s bank account using any banking app or USSD.\"

**Content Fields Displayed**

-   Bank Account Details Box (visually highlighted panel --- white card,
    navy border):

-   ↳ Account Name: \[bank_account_name\] --- with a \"Copy\" icon
    button for easy copying

-   ↳ Account Number: \[bank_account_number\] --- with a \"Copy\" icon
    button

-   ↳ Bank: \[bank_name\]

-   Step-by-step numbered instructions from the bank_transfer_steps
    array

-   Proof of Payment Note: \"After completing your transfer, please send
    a screenshot of your transaction receipt to
    \[proof_of_payment_contact\] with your full name and matric
    number.\"

**Example Bank Transfer Instructions (Illustrative)**

77. Open your banking app or USSD code on your phone

78. Navigate to \"Transfer\" or \"Send Money\"

79. Select the bank: \[bank_name\]

80. Enter account number: \[account number\]

81. Confirm account name shows: \[account name\]

82. Enter amount: ₦\[dues amount\]

83. In the narration/description field, enter your full name and matric
    number

84. Confirm and complete the transfer

85. Take a screenshot of the success confirmation and send to
    \[WhatsApp/email contact\]

**10.5 Payment Channel 3: Cash Payment**

**UI Design Specification**

-   Section header: \"Pay with Cash\" with a cash/wallet icon

-   Brief intro: \"Prefer to pay cash? No problem. Bring the exact dues
    amount to any of the following scheduled collection points.\"

**Content Fields Displayed**

-   Payment Officer: \"Pay to: \[cash_payment_officer\]\" --- e.g.,
    \"The Financial Secretary or any designated Collection Officer\"

-   Location: \"Where: \[cash_payment_location\]\" --- e.g., \"Law
    Department Student Lounge, Room 101\"

-   Schedule: \"When: \[cash_payment_schedule\]\" --- e.g., \"Mondays
    and Wednesdays, 12:00 PM -- 2:00 PM during the payment window\"

-   Receipt notice: \"Ensure you collect a signed payment receipt as
    proof of payment.\"

**10.6 Page Footer Section**

-   A horizontal divider followed by a support note: \"If you have
    questions about your payment or encounter any issues, contact the
    Financial Secretary at \[email\] or via WhatsApp at \[number\].\"

-   Link to the contact page: \"Visit our Contact Page for more ways to
    reach us.\"

**10.7 Admin Update Behavior**

When an administrator updates payment information in the dashboard and
clicks \"Save Changes\":

86. The server validates all required fields (dues_amount, deadline, at
    least one complete channel)

87. The payment_info database record is updated (upsert --- creates if
    it does not exist)

88. The updated_at timestamp is set to the current server time

89. The public-facing page fetches from this data source and reflects
    changes immediately (or within the ISR revalidation window of 60
    seconds at most)

90. No cache-busting code deployment is required --- ISR handles
    revalidation automatically

**10.8 Validation & Safety Rules**

-   The dues_amount field accepts only positive numeric values in NGN
    (no text, no currency symbols in the input --- the system renders
    the ₦ symbol automatically)

-   Account numbers are stored and displayed as strings to preserve
    leading zeros and prevent numeric formatting

-   The admin is warned if the payment_deadline is in the past at the
    time of saving

-   All three payment channels can be independently present or hidden
    (if a channel is not configured, it does not appear on the public
    page)

-   The page always displays the updated_at timestamp in the admin view
    so admins know how recently the information was last verified

**10.9 Mobile Experience**

-   On mobile, the three payment channel sections stack vertically (one
    per screen width)

-   Account numbers and billing codes have a tap-to-copy button for
    one-touch copying to clipboard

-   A \"Copied!\" toast notification confirms the copy action

-   The dues amount and deadline box remains sticky at the top of the
    page on scroll on mobile, serving as a constant reference

**--- END OF DOCUMENTATION PACKAGE ---**

ABUAD Law Students Association Website \| Project Documentation v1.0

Prepared by Web Development Agency \| Confidential
