#!/usr/bin/env -S npm run tsn -- --transpileOnly

/**
 * Adventurer's Book Example
 * 
 * This example demonstrates how to use the Adventurer's Book feature
 * to manage adventurer attributes, progression, and mentor relationships.
 */

import OpenAI from 'openai';

const client = new OpenAI();

async function main() {
  console.log('🏰 Adventurer\'s Book Example\n');

  try {
    // Create a new adventurer
    console.log('1. Creating a new adventurer...');
    const adventurer = await client.adventurers.create({
      name: 'Aragorn, Son of Arathorn',
      proficiencies: ['swordsmanship', 'leadership', 'tracking'],
      level: 1,
      experience_points: 0,
    });
    
    console.log(`   ✅ Created adventurer: ${adventurer.name}`);
    console.log(`   📊 Level: ${adventurer.level}, XP: ${adventurer.experience_points}`);
    console.log(`   🎯 Proficiencies: ${adventurer.proficiencies.map(p => p.skill).join(', ')}`);
    console.log(`   ⭐ Universal Avatar Level: ${adventurer.universal_avatar_level}\n`);

    // Add experience points from a quest
    console.log('2. Adding experience from completing a quest...');
    const xpResult = await client.adventurers.addExperience(adventurer.id, {
      experience_points: 750,
      target_proficiencies: ['swordsmanship', 'leadership'],
      reason: 'Defeated orc chieftain and led fellowship to safety',
    });

    console.log(`   🎉 Experience added! Level up: ${xpResult.level_up_occurred ? 'YES' : 'NO'}`);
    if (xpResult.level_up_occurred) {
      console.log(`   📈 New level: ${xpResult.new_level}`);
    }
    console.log(`   💪 Affected proficiencies: ${xpResult.affected_proficiencies.join(', ')}\n`);

    // Assign a mentor
    console.log('3. Assigning a mentor...');
    const mentorAssignment = await client.adventurers.assignMentor(adventurer.id, {
      mentor_id: 'mentor_gandalf_the_grey',
    });

    console.log(`   🧙 Assigned mentor: ${mentorAssignment.mentor_name}`);
    console.log(`   📚 Specialties: ${mentorAssignment.specialties.join(', ')}`);
    console.log(`   📅 Sessions completed: ${mentorAssignment.sessions_completed}\n`);

    // Record a guidance session
    console.log('4. Recording a training session with mentor...');
    const session = await client.adventurers.recordGuidanceSession(adventurer.id, {
      session_type: 'training',
      duration_minutes: 90,
      notes: 'Advanced sword techniques and battle strategy. Focused on Anduril combat forms.',
      skills_focused: ['swordsmanship', 'leadership'],
      experience_points: 150,
    });

    console.log(`   ⚔️  Session recorded: ${session.session_type}`);
    console.log(`   ⏱️  Duration: ${session.duration_minutes} minutes`);
    console.log(`   📝 Notes: ${session.notes}`);
    console.log(`   🎯 Skills focused: ${session.skills_focused.join(', ')}`);
    console.log(`   ✨ XP gained: ${session.experience_gained}\n`);

    // Get updated adventurer status
    console.log('5. Checking final adventurer status...');
    const updatedAdventurer = await client.adventurers.retrieve(adventurer.id);
    
    console.log(`   👤 Name: ${updatedAdventurer.name}`);
    console.log(`   📊 Level: ${updatedAdventurer.level}`);
    console.log(`   💫 Experience: ${updatedAdventurer.experience_points} XP`);
    console.log(`   📈 Next level in: ${updatedAdventurer.experience_to_next_level} XP`);
    console.log(`   ⭐ Universal Avatar Level: ${updatedAdventurer.universal_avatar_level}`);
    
    if (updatedAdventurer.mentor) {
      console.log(`   🧙 Mentor: ${updatedAdventurer.mentor.mentor_name}`);
      console.log(`   📚 Sessions completed: ${updatedAdventurer.mentor.sessions_completed}`);
    }

    console.log('\n🎯 Proficiency Details:');
    updatedAdventurer.proficiencies.forEach(prof => {
      console.log(`   • ${prof.skill}: Level ${prof.level} (${prof.experience_points} XP, need ${prof.experience_to_next_level} more)`);
    });

    // List all adventurers
    console.log('\n6. Listing all adventurers...');
    const adventurersList = await client.adventurers.list();
    console.log(`   📜 Total adventurers: ${adventurersList.total}`);

    console.log('\n✨ Adventurer\'s Book example completed successfully!');

  } catch (error) {
    console.error('Error:', error);
  }
}

main();