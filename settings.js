// ========================================
// settings.js – Unified Settings Controller
// Version 1.0
// ========================================

import { UserData } from './userData.js';

export function toggleSound() {
    UserData.settings.sound = !UserData.settings.sound;
    UserData.save();
    document.dispatchEvent(new Event('settingsChanged'));
}

export function toggleTheme() {
    UserData.settings.theme = UserData.settings.theme === 'dark' ? 'light' : 'dark';
    UserData.save();
    applyTheme();
    document.dispatchEvent(new Event('settingsChanged'));
}

export function toggleFocusMode() {
    UserData.settings.focusMode = !UserData.settings.focusMode;
    UserData.save();
    applyFocusMode();
    document.dispatchEvent(new Event('settingsChanged'));
}

export function applyTheme() {
    document.body.classList.toggle('light-theme', UserData.settings.theme === 'light');
}

export function applyFocusMode() {
    document.body.classList.toggle('focus-mode', UserData.settings.focusMode);
}

// Auto‑apply on load
applyTheme();
applyFocusMode();