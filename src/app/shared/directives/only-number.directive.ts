import {
    Directive,
    ElementRef,
    forwardRef,
    HostListener,
    Renderer2,
    StaticProvider,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export const CUSTOM_INPUT_DATE_PICKER_CONTROL_VALUE_ACCESSOR: StaticProvider = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => OnlyNumberDirective),
    multi: true,
};

@Directive({
    selector: '[onlyNumber]',
    providers: [CUSTOM_INPUT_DATE_PICKER_CONTROL_VALUE_ACCESSOR],
})
export class OnlyNumberDirective implements ControlValueAccessor {
    public onChange: any = () => {
        return;
    }

    // tslint:disable-next-line:no-any
    public onTouched: any = () => {
        return;
    }
    private value: number = 1;

    constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

    @HostListener('input', ['$event.target.value'])
    onInputChange(value: string) {
        const filteredValue: number = filterValue(value);
        this.updateTextInput(filteredValue, this.value !== filteredValue);
    }

    @HostListener('blur')
    onBlur() {
        this.onTouched();
    }

    private updateTextInput(value: number, propagateChange: boolean) {
        console.log(value);
        if (Number(value) > 100) {
            value = 100;
        }
        this.renderer.setProperty(this.elementRef.nativeElement, 'value', value);
        if (propagateChange) {
            this.onChange(value);
        }
        this.value = value;
    }

    // ControlValueAccessor Interface
    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.renderer.setProperty(
            this.elementRef.nativeElement,
            'disabled',
            isDisabled
        );
    }

    writeValue(value: any): void {
        value = value ? String(value) : '';
        this.updateTextInput(value, false);
    }
}

function filterValue(value: any): number {
    return Number(value.replace(/[^0-9]*/g, ''));
}
