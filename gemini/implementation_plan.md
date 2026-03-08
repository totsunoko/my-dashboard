# Plan - Unify Card Sizes

The goal is to make all dashboard cards (including the fused Weather & Clock and Calendar & Schedule cards) the same size by ensuring they all occupy exactly one grid column.

## Proposed Changes

### [CSS] [style.css](file:///home/totsu/my-dashboard/css/style.css)
- **Grid Layout**: Change `.fused-card` to `grid-column: span 1`.
- **Weather & Clock**:
    - Adjust `.fused-main-info` to use `flex-direction: column` and center alignment to fit the narrower width.
    - Adjust `.fused-forecast-section` to `grid-template-columns: 1fr` to stack hourly and daily forecasts.
- **Calendar & Schedule**:
    - Ensure it fits well within the standard card dimensions (it already spans 1, but might need padding adjustments).
- **Styling Consistency**:
    - Standardize background gradients and borders across all cards to look "unified".

## Verification Plan
- **Pre-visual Check**: Review CSS rules to ensure no overflow occurs in the narrower cards.
- **Manual Verification**: The user will need to refresh their browser to confirm the new layout looks balanced.
