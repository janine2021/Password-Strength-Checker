export interface Password {
    password: string;
}

export interface PasswordStrength {
    score: number;
    guessTimeSeconds: number;
    guessTimeString: string;
    warning: string;
    suggestions: string[];
}
