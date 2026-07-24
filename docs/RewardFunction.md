# CampusFlow AI — Reward Function Specification (`Reward v2`)

## Penalty & Bonus Formulation
$$ \text{Total Reward} = R_{\text{hard}} + R_{\text{soft}} + R_{\text{pref}} $$

1. **Hard Constraints ($R_{\text{hard}}$)**:
   - **Faculty Double-Booking Clash**: `-1,000 pts` per overlapping session.
   - **Room Double-Booking Clash**: `-1,000 pts` per double-booked room instance.
   - **Lab Assignment Violation**: `-500 pts` if lab course is scheduled in a standard classroom.

2. **Soft Constraints ($R_{\text{soft}}$)**:
   - **Lunch Protection**: `+40 pts` for keeping 1:00 PM - 2:00 PM open.
   - **Faculty Preferences**: `+50 pts` per satisfied morning/afternoon preference.
