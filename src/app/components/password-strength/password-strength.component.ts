import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { PasswordStrength, Password } from '../../models/password-strength.model';
import { PasswordStrengthService } from '../../services/password-strength.service';
import { PasswordScore } from '../../enums/password-score.enum';

@Component({
    selector: 'app-password-strength',
    templateUrl: './password-strength.component.html',
    styleUrls: ['./password-strength.component.scss']
})
export class PasswordStrengthComponent {

    formPasswordStrength: FormGroup = new FormGroup({
        password: new FormControl('', [])
    });

    strengthMeter: {
        color: ThemePalette;
        mode: ProgressBarMode;
        value: number;
    } = {
            color: 'primary',
            mode: 'determinate',
            value: 0
        }

    passwordStrength: PasswordStrength = {
        score: 0,
        guessTimeSeconds: 0,
        guessTimeString: '',
        warning: '',
        suggestions: []
    };

    scoreString: string = PasswordScore[0];
    hide: boolean = true;

    constructor(private passwordStrengthService: PasswordStrengthService) {    }

    onKey(value: string) {
        this.passwordStrengthService.getPasswordStrength({ 'password': value }).subscribe((res) => {
            this.passwordStrength = res;
            this.scoreString = PasswordScore[res.score];
            this.setStrengthMeter(res);
        }, (err) => {
            console.log('error', err);
        });
    }

    setStrengthMeter(strength: PasswordStrength) {
        if (strength.score) {
            switch (strength.score) {
                case 0:
                    this.strengthMeter.color = 'warn';
                    this.strengthMeter.value = 40;
                    break;
                case 1:
                    this.strengthMeter.color = 'warn';
                    this.strengthMeter.value = 40;
                    break;
                case 2:
                    this.strengthMeter.color = 'primary';
                    this.strengthMeter.value = 60;
                    break;
                case 3:
                    this.strengthMeter.color = 'primary';
                    this.strengthMeter.value = 80;
                    break;
                case 4:
                    this.strengthMeter.color = 'primary';
                    this.strengthMeter.value = 100;
                    break;
                default:
                    break;
            }
        } else {
            this.strengthMeter = {
                color: 'primary',
                mode: 'determinate',
                value: 0
            }
        }
    }
}
