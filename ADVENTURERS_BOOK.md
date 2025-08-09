# Adventurer's Book Feature

The Adventurer's Book is an enhanced feature for managing adventurer attributes, progression, and mentor relationships within the OpenAI Node.js SDK.

## Overview

This feature provides a comprehensive system to track and manage:

- **Adventurer Levels**: Core progression tracking
- **Proficiencies**: Skill-specific advancement
- **Experience Points (XP)**: Fine-grained progression control
- **Universal Avatar Level**: Overarching level combining multiple aspects
- **Mentor Guidance**: Mentor assignment and session tracking

## Quick Start

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: 'your-api-key', // This is the default and can be omitted
});

// Create a new adventurer
const adventurer = await client.adventurers.create({
  name: 'Aragorn',
  proficiencies: ['swordsmanship', 'leadership'],
  level: 1,
});

console.log(adventurer);
```

## Core Concepts

### Adventurer

An adventurer represents the main entity with attributes for tracking progression:

```typescript
interface Adventurer {
  id: string;
  name: string;
  level: number;
  experience_points: number;
  experience_to_next_level: number;
  proficiencies: Array<Proficiency>;
  universal_avatar_level: number;
  mentor?: MentorAssignment;
  created_at: number;
  updated_at: number;
  object: 'adventurer';
}
```

### Proficiencies

Skills that can be developed independently:

```typescript
interface Proficiency {
  skill: string;
  level: number;
  experience_points: number;
  experience_to_next_level: number;
}
```

### Mentor System

Mentors can guide adventurers through assignments and guidance sessions:

```typescript
interface MentorAssignment {
  mentor_id: string;
  mentor_name: string;
  specialties: Array<string>;
  assigned_at: number;
  sessions_completed: number;
}
```

## API Methods

### Creating Adventurers

```typescript
const adventurer = await client.adventurers.create({
  name: 'Legolas',
  proficiencies: ['archery', 'stealth'],
  level: 2,
  experience_points: 150,
});
```

### Retrieving Adventurers

```typescript
const adventurer = await client.adventurers.retrieve('adv_123');
```

### Updating Adventurers

```typescript
const updatedAdventurer = await client.adventurers.update('adv_123', {
  level: 5,
  experience_points: 2500,
});
```

### Managing Experience Points

Add experience points with automatic level progression:

```typescript
const result = await client.adventurers.addExperience('adv_123', {
  experience_points: 500,
  target_proficiencies: ['archery', 'stealth'],
  reason: 'Completed stealth mission',
});

if (result.level_up_occurred) {
  console.log(\`Leveled up to \${result.new_level}!\`);
}
```

### Mentor Assignment

```typescript
const assignment = await client.adventurers.assignMentor('adv_123', {
  mentor_id: 'mentor_456',
});
```

### Recording Guidance Sessions

```typescript
const session = await client.adventurers.recordGuidanceSession('adv_123', {
  session_type: 'training',
  duration_minutes: 60,
  notes: 'Worked on advanced archery techniques',
  skills_focused: ['archery'],
  experience_points: 100,
});
```

### Listing All Adventurers

```typescript
const list = await client.adventurers.list();
console.log(\`Total adventurers: \${list.total}\`);
```

### Deleting Adventurers

```typescript
const result = await client.adventurers.delete('adv_123');
console.log(\`Deleted: \${result.deleted}\`);
```

## Session Types

The guidance session system supports different types of mentoring:

- `'training'`: Skill-focused practice sessions
- `'mentoring'`: General guidance and advice
- `'mission'`: Guided real-world application
- `'assessment'`: Evaluation and feedback sessions

## Advanced Usage

### Complex Experience Distribution

```typescript
const result = await client.adventurers.addExperience('adv_123', {
  experience_points: 1000,
  target_proficiencies: ['magic', 'wisdom', 'leadership'],
  reason: 'Completed epic quest: The Ring Bearer\'s Journey',
});
```

### Comprehensive Status Tracking

```typescript
const adventurer = await client.adventurers.retrieve('adv_123');

// Check overall progress
console.log(\`Universal Level: \${adventurer.universal_avatar_level}\`);

// Review individual proficiencies
adventurer.proficiencies.forEach(prof => {
  console.log(\`\${prof.skill}: Level \${prof.level} (\${prof.experience_points} XP)\`);
});

// Mentor relationship status
if (adventurer.mentor) {
  console.log(\`Mentor: \${adventurer.mentor.mentor_name}\`);
  console.log(\`Sessions: \${adventurer.mentor.sessions_completed}\`);
}
```

## TypeScript Types

All interfaces and types are fully exported for TypeScript users:

```typescript
import type {
  Adventurer,
  Proficiency,
  MentorAssignment,
  GuidanceSession,
  AdventurerCreateParams,
  AddExperienceParams,
  // ... other types
} from 'openai';
```

## Error Handling

The adventurers resource follows the same error handling patterns as other OpenAI SDK resources:

```typescript
try {
  const adventurer = await client.adventurers.create({
    name: 'Gandalf',
    proficiencies: ['wisdom', 'magic'],
  });
} catch (error) {
  if (error instanceof OpenAI.APIError) {
    console.error('API Error:', error.message);
  }
}
```

## Examples

See the complete example in `examples/adventurers-book.ts` for a full demonstration of the Adventurer's Book features.

## Extensibility

The system is designed to be modular and extensible. Future enhancements might include:

- Achievement systems
- Guild/party management
- Equipment tracking
- Quest chains
- Skill trees
- Regional progression tracking

## Support

This feature integrates seamlessly with the existing OpenAI SDK architecture and follows the same patterns for consistency and reliability.