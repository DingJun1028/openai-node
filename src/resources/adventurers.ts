// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Adventurers extends APIResource {
  /**
   * Create a new adventurer with initial attributes.
   *
   * @example
   * ```ts
   * const adventurer = await client.adventurers.create({
   *   name: 'Aragorn',
   *   proficiencies: ['swordsmanship', 'leadership'],
   *   level: 1
   * });
   * ```
   */
  create(body: AdventurerCreateParams, options?: RequestOptions): APIPromise<Adventurer> {
    return this._client.post('/adventurers', { body, ...options });
  }

  /**
   * Retrieve an adventurer by their ID.
   */
  retrieve(adventurerId: string, options?: RequestOptions): APIPromise<Adventurer> {
    return this._client.get(path`/adventurers/${adventurerId}`, options);
  }

  /**
   * Update an adventurer's attributes.
   *
   * @example
   * ```ts
   * const updatedAdventurer = await client.adventurers.update('adv_123', {
   *   level: 5,
   *   experience_points: 2500
   * });
   * ```
   */
  update(
    adventurerId: string,
    body: AdventurerUpdateParams,
    options?: RequestOptions,
  ): APIPromise<Adventurer> {
    return this._client.patch(path`/adventurers/${adventurerId}`, { body, ...options });
  }

  /**
   * List all adventurers.
   */
  list(options?: RequestOptions): APIPromise<AdventurerListResponse> {
    return this._client.get('/adventurers', options);
  }

  /**
   * Delete an adventurer.
   */
  delete(adventurerId: string, options?: RequestOptions): APIPromise<AdventurerDeleteResponse> {
    return this._client.delete(path`/adventurers/${adventurerId}`, options);
  }

  /**
   * Add experience points to an adventurer, which may trigger level ups.
   *
   * @example
   * ```ts
   * const result = await client.adventurers.addExperience('adv_123', {
   *   experience_points: 500
   * });
   * ```
   */
  addExperience(
    adventurerId: string,
    body: AddExperienceParams,
    options?: RequestOptions,
  ): APIPromise<ExperienceUpdateResult> {
    return this._client.post(path`/adventurers/${adventurerId}/experience`, { body, ...options });
  }

  /**
   * Assign a mentor to an adventurer.
   *
   * @example
   * ```ts
   * const assignment = await client.adventurers.assignMentor('adv_123', {
   *   mentor_id: 'mentor_456'
   * });
   * ```
   */
  assignMentor(
    adventurerId: string,
    body: AssignMentorParams,
    options?: RequestOptions,
  ): APIPromise<MentorAssignment> {
    return this._client.post(path`/adventurers/${adventurerId}/mentor`, { body, ...options });
  }

  /**
   * Record a guidance session with a mentor.
   *
   * @example
   * ```ts
   * const session = await client.adventurers.recordGuidanceSession('adv_123', {
   *   session_type: 'training',
   *   duration_minutes: 60,
   *   notes: 'Worked on combat techniques'
   * });
   * ```
   */
  recordGuidanceSession(
    adventurerId: string,
    body: GuidanceSessionParams,
    options?: RequestOptions,
  ): APIPromise<GuidanceSession> {
    return this._client.post(path`/adventurers/${adventurerId}/guidance`, { body, ...options });
  }
}

/**
 * Represents an adventurer with their attributes and progression.
 */
export interface Adventurer {
  /**
   * The unique identifier for the adventurer.
   */
  id: string;

  /**
   * The adventurer's name.
   */
  name: string;

  /**
   * The current level of the adventurer.
   */
  level: number;

  /**
   * Current experience points.
   */
  experience_points: number;

  /**
   * Experience points required to reach the next level.
   */
  experience_to_next_level: number;

  /**
   * List of specific skill proficiencies.
   */
  proficiencies: Array<Proficiency>;

  /**
   * Universal Avatar Level combining multiple proficiencies.
   */
  universal_avatar_level: number;

  /**
   * Current mentor assignment, if any.
   */
  mentor?: MentorAssignment;

  /**
   * Timestamp when the adventurer was created.
   */
  created_at: number;

  /**
   * Timestamp when the adventurer was last updated.
   */
  updated_at: number;

  /**
   * The object type, always "adventurer".
   */
  object: 'adventurer';
}

/**
 * Represents a skill proficiency with its level and experience.
 */
export interface Proficiency {
  /**
   * The name/type of the proficiency.
   */
  skill: string;

  /**
   * The current level in this proficiency.
   */
  level: number;

  /**
   * Experience points in this specific proficiency.
   */
  experience_points: number;

  /**
   * Experience points needed to advance to the next level.
   */
  experience_to_next_level: number;
}

/**
 * Represents a mentor assignment to an adventurer.
 */
export interface MentorAssignment {
  /**
   * The unique identifier for the mentor.
   */
  mentor_id: string;

  /**
   * The mentor's name.
   */
  mentor_name: string;

  /**
   * Specialties or areas of expertise of the mentor.
   */
  specialties: Array<string>;

  /**
   * Timestamp when the mentor was assigned.
   */
  assigned_at: number;

  /**
   * Total number of guidance sessions completed.
   */
  sessions_completed: number;
}

/**
 * Represents a guidance session between an adventurer and mentor.
 */
export interface GuidanceSession {
  /**
   * The unique identifier for the session.
   */
  id: string;

  /**
   * Type of guidance session.
   */
  session_type: 'training' | 'mentoring' | 'mission' | 'assessment';

  /**
   * Duration of the session in minutes.
   */
  duration_minutes: number;

  /**
   * Notes or description of what was covered.
   */
  notes?: string;

  /**
   * Skills or proficiencies focused on during the session.
   */
  skills_focused: Array<string>;

  /**
   * Experience points gained from this session.
   */
  experience_gained: number;

  /**
   * Timestamp when the session was recorded.
   */
  recorded_at: number;

  /**
   * The object type, always "guidance_session".
   */
  object: 'guidance_session';
}

/**
 * Result of adding experience points to an adventurer.
 */
export interface ExperienceUpdateResult {
  /**
   * The updated adventurer data.
   */
  adventurer: Adventurer;

  /**
   * Whether a level up occurred.
   */
  level_up_occurred: boolean;

  /**
   * New level achieved (if level up occurred).
   */
  new_level?: number;

  /**
   * Proficiencies that were affected.
   */
  affected_proficiencies: Array<string>;
}

/**
 * Response when listing adventurers.
 */
export interface AdventurerListResponse {
  /**
   * List of adventurers.
   */
  data: Array<Adventurer>;

  /**
   * The object type, always "list".
   */
  object: 'list';

  /**
   * Total number of adventurers.
   */
  total: number;
}

/**
 * Response when deleting an adventurer.
 */
export interface AdventurerDeleteResponse {
  /**
   * The ID of the deleted adventurer.
   */
  id: string;

  /**
   * Whether the deletion was successful.
   */
  deleted: boolean;

  /**
   * The object type, always "adventurer".
   */
  object: 'adventurer';
}

/**
 * Parameters for creating a new adventurer.
 */
export interface AdventurerCreateParams {
  /**
   * The adventurer's name.
   */
  name: string;

  /**
   * Initial proficiencies (defaults to empty array).
   */
  proficiencies?: Array<string>;

  /**
   * Starting level (defaults to 1).
   */
  level?: number;

  /**
   * Starting experience points (defaults to 0).
   */
  experience_points?: number;
}

/**
 * Parameters for updating an adventurer.
 */
export interface AdventurerUpdateParams {
  /**
   * Update the adventurer's name.
   */
  name?: string;

  /**
   * Update the level.
   */
  level?: number;

  /**
   * Update experience points.
   */
  experience_points?: number;

  /**
   * Add or update proficiencies.
   */
  proficiencies?: Array<string>;
}

/**
 * Parameters for adding experience points.
 */
export interface AddExperienceParams {
  /**
   * Amount of experience points to add.
   */
  experience_points: number;

  /**
   * Specific proficiencies to distribute experience to.
   */
  target_proficiencies?: Array<string>;

  /**
   * Reason for the experience gain (e.g., "quest completion").
   */
  reason?: string;
}

/**
 * Parameters for assigning a mentor.
 */
export interface AssignMentorParams {
  /**
   * The mentor's unique identifier.
   */
  mentor_id: string;
}

/**
 * Parameters for recording a guidance session.
 */
export interface GuidanceSessionParams {
  /**
   * Type of guidance session.
   */
  session_type: 'training' | 'mentoring' | 'mission' | 'assessment';

  /**
   * Duration of the session in minutes.
   */
  duration_minutes: number;

  /**
   * Notes about the session.
   */
  notes?: string;

  /**
   * Skills that were the focus of the session.
   */
  skills_focused?: Array<string>;

  /**
   * Experience points to award for this session.
   */
  experience_points?: number;
}

export declare namespace Adventurers {
  export {
    type Adventurer as Adventurer,
    type Proficiency as Proficiency,
    type MentorAssignment as MentorAssignment,
    type GuidanceSession as GuidanceSession,
    type ExperienceUpdateResult as ExperienceUpdateResult,
    type AdventurerListResponse as AdventurerListResponse,
    type AdventurerDeleteResponse as AdventurerDeleteResponse,
    type AdventurerCreateParams as AdventurerCreateParams,
    type AdventurerUpdateParams as AdventurerUpdateParams,
    type AddExperienceParams as AddExperienceParams,
    type AssignMentorParams as AssignMentorParams,
    type GuidanceSessionParams as GuidanceSessionParams,
  };
}
