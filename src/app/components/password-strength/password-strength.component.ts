import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { PasswordStrength, Password } from '../../models/password-strength.model';
import { PasswordStrengthService } from '../../services/password-strength.service';
import { PasswordScore } from '../../enums/password-score.enum';

@Component({
    selector: 'app-password-strength',
    templateUrl: './password-strength.component.html',
    styleUrls: ['./password-strength.component.scss']
})
export class PasswordStrengthComponent implements OnInit {

    formPasswordStrength: FormGroup = new FormGroup({
        password: new FormControl('', [])
    });

    hide: boolean = true;

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

    // @ViewChild('passwordInput') passwordInput: ElementRef = {} as ElementRef;
    // isChecking: boolean;

    constructor(private passwordStrengthService: PasswordStrengthService) {
        // this.isChecking = false;
    }

    onKey(value: string) {
        this.passwordStrengthService.getPasswordStrength({ 'password': value }).subscribe((res) => {
            console.log('getPasswordStrength', res);
            this.passwordStrength = res;
            this.scoreString = PasswordScore[res.score];
            this.setStrengthMeter(res);
            // this.isChecking = false;
        }, (err) => {
            // this.isChecking = false;
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

    ngOnInit(): void {
    }

    // ngAfterViewInit() {

    //     // Another approach is I used fromEvent of rxjs instead of taking keyup event and calling http service right away

    //     fromEvent(this.passwordInput.nativeElement, 'keyup').pipe(
    //         map((event: any) => {
    //             return event.target.value;
    //         })
    //         , filter(res => res.length > 2) // Fire event only when input's length is more than 2
    //         , debounceTime(500) // I used this to improve request performance by giving the request a breather through delaying emitted value 
    //         , distinctUntilChanged() // Avoid sending same requestafter delaying emit
    //     ).subscribe((passwordFieldInput: string) => {
    //         this.isChecking = true;
    //         this.passwordStrengthService.getPasswordStrength({ 'password': passwordFieldInput }).subscribe((res) => {
    //             console.log('getPasswordStrength', res);
    //             this.passwordStrength = res;
    //             this.setStrengthMeter(res);
    //             this.isChecking = false;
    //         }, (err) => {
    //             this.isChecking = false;
    //             console.log('error', err);
    //         });

    //     });
    // }

}
