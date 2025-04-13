# DAO Governance Models

## Common Governance Structures

### Token-Based Governance

Token-based governance assigns voting power proportional to the number of governance tokens held. This is the most common DAO governance model.

**Key Characteristics:**
- One token equals one vote
- Voting power directly proportional to token holdings
- Decision-making weighted toward larger token holders
- Often combined with delegation mechanisms

**Examples:** Uniswap, Compound, MakerDAO

**Strengths:**
- Simple to implement and understand
- Aligns voting power with economic stake
- Works well with existing blockchain infrastructure

**Weaknesses:**
- Plutocratic tendency (wealth concentration = power concentration)
- Vulnerable to whale dominance
- May reduce participation from smaller stakeholders

### Quadratic Voting

Quadratic voting assigns voting power equal to the square root of tokens committed to a vote, making each additional vote more "expensive" than the last.

**Key Characteristics:**
- Voting power = square root of tokens committed
- Diminishing returns on voting power as token commitment increases
- Designed to balance influence between large and small stakeholders

**Examples:** Gitcoin, Optimism

**Strengths:**
- Reduces plutocratic tendencies
- Encourages broader participation
- Allows expression of preference intensity

**Weaknesses:**
- Vulnerable to Sybil attacks (identity splitting)
- More complex to implement
- Can be difficult for users to understand

### Reputation-Based Governance

Reputation-based governance assigns voting power based on contributions and participation rather than token holdings.

**Key Characteristics:**
- Voting power derived from non-transferable reputation scores
- Reputation earned through contributions and participation
- Often combined with rage-quit mechanisms (ability to exit with proportional assets)

**Examples:** DAOstack, Colony, Coordinape

**Strengths:**
- Rewards active participation and contribution
- Resistant to plutocratic control
- Aligns governance power with value creation

**Weaknesses:**
- Subjective reputation assessment
- Governance capture by long-term members
- Complex to implement fairly

### Holacratic/Role-Based Governance

Holacratic governance distributes authority through defined roles and circles (teams) rather than individuals.

**Key Characteristics:**
- Authority distributed by roles rather than individuals
- Nested circles (teams) with defined domains and responsibilities
- Governance processes for evolving roles and policies

**Examples:** Aragon, Gardens, Sobol

**Strengths:**
- Clear accountability and responsibility
- Scalable organization structure
- Reduces personality-based politics

**Weaknesses:**
- Complex to implement
- Learning curve for participants
- Can become bureaucratic

### Liquid Democracy

Liquid democracy combines direct democracy with representation by allowing token holders to vote directly or delegate their votes to experts.

**Key Characteristics:**
- Flexible delegation of voting power
- Ability to vote directly on specific issues
- Delegates can further delegate (transitive delegation)
- Delegation can be revoked at any time

**Examples:** Snapshot delegations, Aragon Voice

**Strengths:**
- Combines benefits of direct and representative democracy
- Enables expert input while preserving individual agency
- Adaptable to different participation levels

**Weaknesses:**
- Potential for delegate capture
- Complexity of delegation chains
- Reliance on delegates' continued trustworthiness

## Voting Mechanisms

### Simple Majority

**Description:** Proposals pass when more than 50% of cast votes are in favor.

**Best for:** Low-stakes decisions, operational matters

### Supermajority

**Description:** Proposals require a higher threshold (typically 66% or 75%) to pass.

**Best for:** High-impact decisions, constitutional changes, fund allocations

### Conviction Voting

**Description:** Voting power increases the longer tokens are committed to a proposal, rewarding long-term conviction.

**Best for:** Continuous funding decisions, prioritization of competing proposals

### Optimistic Approval

**Description:** Proposals automatically pass after a review period unless explicitly rejected.

**Best for:** Lower-risk decisions, reducing governance overhead

### Futarchy

**Description:** Decision-making based on prediction markets about which proposals will best achieve metrics.

**Best for:** Outcome-driven decisions where metrics can be clearly defined

## Quorum Requirements

### Fixed Quorum

**Description:** Requires a minimum percentage of all possible votes to participate.

**Example:** "At least 30% of all tokens must vote for a valid decision."

### Adaptive Quorum

**Description:** Quorum requirement adjusts based on proposal category or past participation.

**Example:** "Quorum starts at 15% and increases by 2% for each proposal category level."

### Relative Quorum

**Description:** Requires participation relative to recent governance activity rather than total supply.

**Example:** "Quorum is 80% of the average participation in the last 5 proposals."

## Common Governance Challenges

### Voter Apathy

**Signs:**
- Consistently low participation rates
- Same small group of addresses participating
- Declining participation over time

**Solutions:**
- Governance rewards/incentives
- Simplified voting interfaces
- Delegation options
- Education campaigns
- Limiting proposal frequency

### Plutocratic Capture

**Signs:**
- Small number of whales determining all outcomes
- Proposals consistently favoring large token holders
- Small holders disengaging from process

**Solutions:**
- Quadratic voting
- Proposal submission thresholds
- Rage-quit mechanisms
- Token lock-ups for long-term alignment

### Governance Attacks

**Types:**
- Last-minute vote swings
- Flash loan governance attacks
- Sybil attacks (identity splitting)
- Bribery/vote buying

**Solutions:**
- Snapshot-based voting
- Time-locks and delays
- Identity verification
- Voting weight vesting periods

### Proposal Overload

**Signs:**
- High frequency of proposals
- Declining participation per proposal
- Voter exhaustion and frustration

**Solutions:**
- Proposal batching
- Tiered governance systems
- Temporary delegates for specific domains
- Proposal submission costs/thresholds

## Governance Implementation Patterns

### Two-Phase Governance

1. **Social Phase:** Off-chain discussion, signaling, and consensus-building
2. **Execution Phase:** On-chain voting and implementation

### Multi-tiered Governance

1. **Working Groups:** Domain-specific proposals and decisions
2. **Council/Committee:** Mid-level oversight and coordination
3. **Token Holder DAO:** High-level decisions and oversight

### Governance Minimization

Progressive reduction of governance scope and intervention as systems mature and stabilize.

### Governance as Code

Implementation of governance rules directly in smart contracts for predictable, trustless execution. 