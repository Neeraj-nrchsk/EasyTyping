// ========================================
// achievements.js – Achievement System
// Version 1.0
// ========================================

import { UserData } from './userData.js';

const ACHIEVEMENTS = [
    { id: 'first_lesson',   title: 'First Step',      emoji: '📖', condition: () => UserData.completedLessons.length >= 1 },
    { id: 'speed_40',       title: 'Speed Demon',     emoji: '⚡', condition: () => UserData.bestWPM >= 40 },
    { id: 'speed_60',       title: 'Typing Ninja',    emoji: '🌪️', condition: () => UserData.bestWPM >= 60 },
    { id: 'speed_80',       title: 'Speed Master',    emoji: '🚀', condition: () => UserData.bestWPM >= 80 },
    { id: 'accuracy_98',    title: 'Accuracy King',   emoji: '🎯', condition: () => UserData.averageAccuracy >= 98 },
    { id: 'accuracy_100',   title: 'Perfect Typist',  emoji: '💯', condition: () => UserData.averageAccuracy >= 100 },
    { id: 'combo_10',       title: 'Combo Starter',   emoji: '🔥', condition: () => UserData.gameHistory.some(g => g.combo >= 10) },
    { id: 'combo_25',       title: 'Combo Expert',    emoji: '🔥🔥', condition: () => UserData.gameHistory.some(g => g.combo >= 25) },
    { id: 'combo_50',       title: 'Combo Master',    emoji: '👑', condition: () => UserData.gameHistory.some(g => g.combo >= 50) },
    { id: 'boss_killer',    title: 'Zombie Slayer',   emoji: '🧟', condition: () => UserData.gameHistory.some(g => g.kills >= 5) },
    { id: 'streak_3',       title: 'Starting Strong', emoji: '📅', condition: () => UserData.streak >= 3 },
    { id: 'streak_7',       title: 'Consistent',      emoji: '📅🔥', condition: () => UserData.streak >= 7 },
    { id: 'streak_14',      title: 'Dedicated',       emoji: '🏆', condition: () => UserData.streak >= 14 },
    { id: 'lessons_5',      title: 'Learner',         emoji: '📚', condition: () => UserData.completedLessons.length >= 5 },
    { id: 'lessons_10',     title: 'Dedicated',       emoji: '🎓', condition: () => UserData.completedLessons.length >= 10 },
    { id: 'lessons_25',     title: 'Course Almost Done', emoji: '📖🔥', condition: () => UserData.completedLessons.length >= 25 },
    { id: 'sessions_10',    title: 'Regular',         emoji: '⏱️', condition: () => UserData.totalSessions >= 10 },
    { id: 'sessions_50',    title: 'Veteran',         emoji: '🏅', condition: () => UserData.totalSessions >= 50 },
    { id: 'sessions_100',   title: 'Typing Legend',   emoji: '⭐', condition: () => UserData.totalSessions >= 100 },
];

export function checkAllAchievements() {
    let newAchievements = [];
    ACHIEVEMENTS.forEach(a => {
        if (!UserData.checkAchievement(a.id) && a.condition()) {
            UserData.unlockAchievement(a.id);
            newAchievements.push(a);
        }
    });
    // Dispatch event for each new achievement
    newAchievements.forEach(a => {
        const event = new CustomEvent('achievementUnlocked', { detail: a });
        document.dispatchEvent(event);
    });
    return newAchievements;
}

export function getAchievementById(id) {
    return ACHIEVEMENTS.find(a => a.id === id);
}

export function getAllAchievements() {
    return ACHIEVEMENTS;
}