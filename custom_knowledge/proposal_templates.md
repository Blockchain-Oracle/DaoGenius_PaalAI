# DAO Proposal Templates

## Standard Proposal Format

```
# [PID-XXX] Proposal Title

## Summary
A brief 2-3 sentence overview of what the proposal aims to accomplish.

## Background
Context and information necessary to understand why this proposal is being made.

## Specification
Detailed description of what is being proposed, including specific parameters, changes, or actions.

## Benefits
Expected positive outcomes if the proposal is approved.

## Risks
Potential negative consequences or challenges that might arise.

## Budget
Financial requirements, if applicable:
- Total requested: XXX tokens
- Breakdown of allocation
- Payment schedule

## Timeline
Key milestones and deadlines for implementation.

## Success Metrics
How the community will measure whether this proposal was successful.

## Vote Options
- Approve: Support the proposal as specified
- Reject: Do not support the proposal
- Abstain: Formally register no position
```

## Proposal Types

### 1. Resource Allocation Proposal

**Purpose:** Request funds or resources from the DAO treasury.

**Additional Sections:**
- **Recipient Address:** The wallet/contract to receive funds
- **Vesting/Milestone Conditions:** Any conditions for release of funds
- **Previous Contributions:** Relevant work/contributions by the recipient
- **Alternatives Considered:** Other approaches that were evaluated

**Example:**
```
# [PID-123] Community Education Series Funding

## Summary
This proposal requests 5,000 TOKENS to fund a 10-part educational series on blockchain fundamentals for the community, delivered over 3 months.

## Background
Our community surveys indicate 45% of new members struggle with fundamental blockchain concepts, creating barriers to participation.

## Specification
Series of 10 workshops:
- 5 live sessions with expert instructors (1,000 TOKENS per session)
- Production of permanent educational materials for the community wiki
- All content will be licensed under Creative Commons

## Benefits
- Increased community knowledge and participation
- Permanent educational resources
- Lower barriers to entry for new members

## Risks
- Potential low attendance
- Content quality might vary
- May need additional follow-up series

## Budget
Total requested: 5,000 TOKENS
- 3,000 TOKENS: Expert instructor compensation
- 1,500 TOKENS: Content production and editing
- 500 TOKENS: Promotional activities

Payment schedule:
- 2,000 TOKENS upon approval
- 3,000 TOKENS upon completion

## Recipient Address
0x1234...5678

## Timeline
- Weeks 1-2: Curriculum development
- Weeks 3-10: Bi-weekly workshops
- Weeks 11-12: Content finalization and publication

## Success Metrics
- Minimum 100 participants per session
- 80%+ satisfaction rating in post-series survey
- 30% increase in governance participation from new members
```

### 2. Protocol Parameter Change

**Purpose:** Modify technical parameters of the protocol.

**Additional Sections:**
- **Current Value:** The existing parameter setting
- **Proposed Value:** The new parameter setting
- **Technical Implementation:** How the change will be executed
- **Reversion Plan:** Process to revert if negative outcomes occur

**Example:**
```
# [PID-456] Increase Voting Period Duration

## Summary
This proposal suggests increasing the standard voting period from 3 days to 5 days to improve participation rates and decision quality.

## Background
Analysis of the last 20 governance votes shows that 35% of voting activity occurs in the final 24 hours, suggesting time pressure affects participation.

## Specification
- Current voting period: 72 hours (3 days)
- Proposed voting period: 120 hours (5 days)
- Change to be implemented via governance parameter update in the TimelockController contract

## Current Value
votingPeriod = 72 hours (259,200 seconds)

## Proposed Value
votingPeriod = 120 hours (432,000 seconds)

## Technical Implementation
Call setVotingPeriod(432000) on the GovernorContract at 0xABC...123

## Benefits
- Higher participation rates (projected 15-25% increase)
- More time for community discussion during active votes
- Better accommodation of global time zones

## Risks
- Longer time to finality for decisions
- Potential voter fatigue if too many concurrent proposals
- Slight increase in operational overhead

## Reversion Plan
If negative consequences arise, a follow-up proposal can revert to the original value with the same implementation method.

## Timeline
- Implementation: Immediate upon approval
- Evaluation period: 3 months (covering approximately 15 proposal cycles)

## Success Metrics
- 15%+ increase in voting participation rate
- Reduced last-minute voting concentration (target: <20% in final 24 hours)
- Positive community feedback on governance experience
```

### 3. Governance Process Change

**Purpose:** Modify how the DAO makes decisions.

**Additional Sections:**
- **Current Process:** Existing governance procedure
- **Proposed Process:** New governance procedure
- **Transition Plan:** How to move from current to proposed process
- **Governance Simulation:** Test results if applicable

**Example:**
```
# [PID-789] Implement Two-Stage Governance Process

## Summary
This proposal introduces a two-stage governance process with a preliminary temperature check before formal voting to improve proposal quality and community alignment.

## Background
Several recent contentious proposals could have benefited from more structured discussion before formal voting, as evidenced by high levels of post-vote criticism.

## Current Process
Single-stage process where proposals move directly to binding votes after the submission threshold is met.

## Proposed Process
Two-stage process:
1. Temperature Check (3 days)
   - Non-binding poll to gauge community sentiment
   - 20% quorum requirement
   - Proposals must achieve 50% approval to advance

2. Formal Vote (5 days)
   - Binding vote on finalized proposal
   - 30% quorum requirement
   - 66% approval threshold for passage

## Specification
Implementation requires:
- Creation of TemperatureCheckModule contract
- Integration with existing GovernorContract
- UI updates to governance portal
- Updated documentation

## Transition Plan
- Month 1: Implementation and testing
- Month 2: Run parallel processes (old system binding, new system advisory)
- Month 3: Full transition to new system

## Benefits
- Higher quality proposals reaching formal vote
- More structured discussion period
- Reduced governance fatigue from low-quality proposals
- Better community alignment on complex issues

## Risks
- Longer total governance process (8 days vs. 3 days)
- Potential confusion during transition period
- Additional technical complexity

## Governance Simulation
Retroactive analysis of last 10 proposals showed:
- 3 would have been refined before formal voting
- 2 would have been abandoned after temperature check
- Estimated 30% reduction in governance overhead

## Timeline
- Week 1-2: Contract development and testing
- Week 3-4: UI updates and documentation
- Week 5-8: Parallel process period
- Week 9: Full transition

## Success Metrics
- 25% reduction in failed proposals
- 15% increase in proposal quality (based on community ratings)
- More diverse participation in governance
```

### 4. Strategic Partnership Proposal

**Purpose:** Establish formal collaboration with external projects/organizations.

**Additional Sections:**
- **Partner Information:** Background on the proposed partner
- **Partnership Terms:** Specific agreements and commitments
- **Due Diligence:** Assessment of the partner's reputation/capabilities
- **Exit Conditions:** How the partnership can be terminated if needed

**Example:**
```
# [PID-101] Strategic Partnership with ChainAnalytics DAO

## Summary
This proposal establishes a strategic partnership between our DAO and ChainAnalytics DAO to share research resources, co-develop analytics tools, and expand our data capabilities.

## Background
Our DAO currently lacks sophisticated data analytics capabilities, while ChainAnalytics DAO has expertise in this area but seeks to expand its use cases and community reach.

## Partner Information
ChainAnalytics DAO:
- Founded: 2023
- Members: ~1,200
- Treasury: $2.3M
- Focus: On-chain data analytics and visualization tools
- Governance: Reputation-based with token oversight

## Partnership Terms
1. Technology Exchange:
   - We receive: Access to their analytics suite and custom dashboard
   - They receive: Integration with our protocol and use case showcase

2. Co-Development:
   - Joint development of 2 new analytics modules
   - Shared ownership of resulting intellectual property
   - Equal resource commitment (estimated 2,000 TOKENS each)

3. Community Integration:
   - Monthly joint community calls
   - Cross-promotion of governance proposals
   - Shared educational content

## Due Diligence
- Technical audit of their analytics platform completed by SecurityAudit LLC
- Treasury verification through on-chain analysis
- 5 reference checks with current partners
- Core team background verification

## Specification
Implementation phases:
1. Technical integration (1 month)
2. Joint development kickoff (month 2)
3. Community integration activities (ongoing)

## Benefits
- Access to advanced analytics without building in-house
- Expanded community reach and expertise
- Cost-sharing for new development
- Potential for increased protocol usage

## Risks
- Potential misalignment of incentives over time
- Technical integration challenges
- Governance coordination complexity
- Reputation association risks

## Budget
Total requested: 2,000 TOKENS
- 1,500 TOKENS: Co-development resources
- 500 TOKENS: Integration and coordination

## Exit Conditions
Either party may terminate the partnership with:
- 30-day notice period
- Completion of any in-progress joint deliverables
- Appropriate attribution for completed work
- Continued license to use jointly developed technology

## Timeline
- Weeks 1-4: Technical integration and setup
- Weeks 5-12: Co-development phase
- Week 13 onward: Ongoing collaboration and maintenance

## Success Metrics
- Full integration of analytics suite within 6 weeks
- Two jointly developed modules within 3 months
- 20% increase in data-informed governance decisions
- 15% growth in cross-community participation
```

## Formatting Guidelines

### Title Convention
- **PID Format:** PID-[sequential number]
- **Title:** Brief, specific, action-oriented

### Writing Style
- Use clear, concise language
- Be specific rather than general
- Include concrete numbers and parameters
- Use bullet points for clarity
- Avoid technical jargon unless necessary

### Supporting Materials
- Link to relevant discussions
- Include visualizations where helpful
- Attach technical specifications as separate documents
- Reference precedents or similar proposals 