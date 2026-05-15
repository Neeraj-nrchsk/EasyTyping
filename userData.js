// ========================================
// userData.js – Central Data Manager
// Version 1.0
// ========================================

export const UserData = {
    // ---------- Profile ----------
    name: 'Typist',
    xp: 0,
    level: 1,
    streak: 0,
    bestWPM: 0,
    averageAccuracy: 100,
    totalSessions: 0,
    completedLessons: [],
    unlockedLessons: [1],
    practiceHistory: [],
    gameHistory: [],
    achievements: [],

    // ---------- Settings ----------
    settings: {
        sound: true,
        theme: 'dark',
        focusMode: false,
        keyboardLayout: 'qwerty'
    },

    // ---------- Methods ----------
    save() {
        localStorage.setItem('easytyping-user', JSON.stringify(this));
    },

    load() {
        const saved = localStorage.getItem('easytyping-user');
        if (saved) {
            const parsed = JSON.parse(saved);
            Object.assign(this, parsed);
        }
        return this;
    },

    addXP(amount) {
        this.xp += amount;
        this.level = Math.floor(1 + this.xp / 500);
        this.save();
    },

    recordPractice(session) {
        this.practiceHistory.push({ date: new Date().toISOString(), ...session });
        this.totalSessions++;
        if (session.wpm > this.bestWPM) this.bestWPM = session.wpm;
        const accuracies = this.practiceHistory.map(s => s.accuracy);
        this.averageAccuracy = Math.round(accuracies.reduce((a, b) => a + b, 0) / accuracies.length);
        this.save();
    },

    recordGame(gameData) {
        this.gameHistory.push({ date: new Date().toISOString(), ...gameData });
        this.addXP(gameData.xp || 0);
        this.save();
    },

    unlockLesson(id) {
        if (!this.unlockedLessons.includes(id)) {
            this.unlockedLessons.push(id);
            this.save();
        }
    },

    completeSubLesson(lessonId, subLessonId) {
        const key = `${lessonId}-${subLessonId}`;
        if (!this.completedLessons.some(c => c.key === key)) {
            this.completedLessons.push({ key, lessonId, subLessonId, date: new Date().toISOString() });
            this.save();
        }
    },

    checkAchievement(id) {
        return this.achievements.some(a => a.id === id);
    },

    unlockAchievement(id) {
        if (!this.checkAchievement(id)) {
            this.achievements.push({ id, unlockedAt: new Date().toISOString() });
            this.save();
            return true;
        }
        return false;
    }
};

// Auto‑load on import
UserData.load();