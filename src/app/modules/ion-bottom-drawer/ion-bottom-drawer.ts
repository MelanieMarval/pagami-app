import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    Renderer2,
    SimpleChanges,
    ViewChild
} from '@angular/core';
import { DomController, IonContent, Platform } from '@ionic/angular';
import * as Hammer from 'hammerjs';

import { DrawerState } from './drawer-state';

@Component({
    selector: 'ion-bottom-drawer',
    templateUrl: 'ion-bottom-drawer.html',
    styleUrls: ['./ion-bottom-drawer.scss']
})
export class IonBottomDrawerComponent implements AfterViewInit, OnChanges {

    @ViewChild('ionContent', { static: false}) private ionContent: IonContent;

    @Input() dockedHeight = 50;

    @Input() shouldBounce = true;

    @Input() disableDrag = false;

    @Input() distanceTop = 0;

    @Input() transition = '0.25s ease-in-out';

    @Input() state: DrawerState = DrawerState.Bottom;

    @Input() minimumHeight = 0;

    @Input() bottomHeightChange: EventEmitter<number>;

    @Output() stateChange: EventEmitter<DrawerState> = new EventEmitter<DrawerState>();

    @Output() scrollContent: EventEmitter<number> = new EventEmitter<number>();

    @Output() hideBottomSheet: EventEmitter<boolean> = new EventEmitter<boolean>();

    @Output() drawerPositionChange: EventEmitter<number> = new EventEmitter<number>();

    @Output() disableScrollContent: EventEmitter<boolean> = new EventEmitter<boolean>();

    diasbleScroll = true;

    private _lastDeltaY = 0;

    currentDistanceTop = 0;

    currentIonContentPosition = 0;

    private _startPositionTop: number;
    private readonly _BOUNCE_DELTA = 30;

    private contentPosition = 0;

    constructor(
        private _element: ElementRef,
        private _renderer: Renderer2,
        private _domCtrl: DomController,
        private _platform: Platform
    ) {
    }

    ngAfterViewInit() {
        this._renderer.setStyle(this._element.nativeElement.querySelector('.ion-bottom-drawer-scrollable-content :first-child'),
            'touch-action', 'none');
        this._setDrawerState(this.state);

        const hammer = new Hammer(this._element.nativeElement);
        hammer.get('pan').set({enable: true, direction: Hammer.DIRECTION_VERTICAL});
        hammer.on('pan panstart panend', (ev: any) => {
            this._setDrawerCurrentTopPosition(this._element.nativeElement.getBoundingClientRect().top);
            // console.log(ev.type)
            if (ev.type === 'panstart') {
                console.log('pan start')
                this.currentIonContentPosition = this.contentPosition;
                this._lastDeltaY = 0;
            }
            const scrollY = -1 * (ev.deltaY - this._lastDeltaY);
            this._lastDeltaY = ev.deltaY;
            if (this.disableDrag) {
                return;
            }
            if (ev.direction === Hammer.DIRECTION_DOWN) {
                if (this._element.nativeElement.getBoundingClientRect().top === this.distanceTop) {
                    //if (this.state === DrawerState.Top) {
                        // if (this.contentPosition === 0) {
                        //     this.ionContent.scrollToPoint(undefined, 135, 200);
                        // }
                    //} else {
                        // console.log('scroll content');
                        // console.log(scrollY);
                        this.currentIonContentPosition += scrollY;
                        this.ionContent.scrollToPoint(undefined, this.currentIonContentPosition)
                            .then(() => { this.setupContentTopPosition(this.currentIonContentPosition); });
                    //}
                }
            } else if (ev.direction === Hammer.DIRECTION_UP) {
                //console.log('Hammer.DIRECTION_UP');
                if (this._element.nativeElement.getBoundingClientRect().top === this.distanceTop) {
                    //console.log('this._element.nativeElement.getBoundingClientRect().top === this.distanceTop');
                    if (this.state === DrawerState.Top) {
                        //console.log('scroll to x x')
                        //console.log(this.contentPosition)
                        if (this.diasbleScroll) {
                            this.currentIonContentPosition += scrollY;
                            this.ionContent.scrollToPoint(undefined, this.currentIonContentPosition)
                                .then(() => { this.setupContentTopPosition(this.currentIonContentPosition); });
                        }
                    } else {
                        //console.log(this.state)
                        // console.log('scroll content');
                        // console.log(scrollY);
                        this.currentIonContentPosition += scrollY;
                        this.ionContent.scrollToPoint(undefined, this.currentIonContentPosition)
                            .then(() => { this.setupContentTopPosition(this.currentIonContentPosition); });
                    }
                }
            }
            // if (this.contentPosition > 1 || (this.contentPosition === 1 && ev.direction === Hammer.DIRECTION_UP)) {
            //     return;
            // }
            switch (ev.type) {
                case 'panstart':
                    this._handlePanStart();
                    break;
                case 'panend':
                    // console.log('pan end');
                    this._handlePanEnd(ev);
                    if (this._element.nativeElement.getBoundingClientRect().top === this.distanceTop
                        && this.state === DrawerState.Top && this.currentIonContentPosition > 0) {
                        // this.disableDrag = true;, TODO
                    }
                    break;
                default:
                    if (ev.direction === Hammer.DIRECTION_DOWN && this.contentPosition > 1) {
                        return;
                    }
                    this._handlePan(ev);
            }
        });
        this.bottomHeightChange.subscribe(height => {
            this.changeBottomHeight(height);
        });
    }

    private _setDrawerCurrentTopPosition(y: number) {
        this.currentDistanceTop = y;
        this.drawerPositionChange.emit(this.currentDistanceTop);
    }

    ngOnChanges(changes: SimpleChanges) {
        if (!changes.state) {
            return;
        }

        this._setDrawerState(changes.state.currentValue);
    }

    private _setDrawerState(state: DrawerState) {
        this._renderer.setStyle(this._element.nativeElement, 'transition', this.transition);
        switch (state) {
            case DrawerState.Bottom:
                this._setTranslateY('calc(100vh - ' + this.minimumHeight + 'px)');
                this._setDrawerCurrentTopPosition(this._platform.height() - this.dockedHeight);
                break;
            case DrawerState.Docked:
                this._setTranslateY((this._platform.height() - this.dockedHeight) + 'px');
                this._setDrawerCurrentTopPosition(this._platform.height() - this.dockedHeight);
                break;
            default:
                this._setTranslateY(this.distanceTop + 'px');
                this._setDrawerCurrentTopPosition(this.distanceTop);
        }
    }

    private _handlePanStart() {
        this._startPositionTop = this._element.nativeElement.getBoundingClientRect().top;
    }

    private _handlePanEnd(ev) {
        if (this.shouldBounce && ev.isFinal) {
            this._renderer.setStyle(this._element.nativeElement, 'transition', this.transition);

            switch (this.state) {
                case DrawerState.Docked:
                    this._handleDockedPanEnd(ev);
                    break;
                case DrawerState.Top:
                    this._handleTopPanEnd(ev);
                    break;
                default:
                    this._handleBottomPanEnd(ev);
            }
        }
        if (this.state !== DrawerState.Top && this.contentPosition !== 0) {
            this.ionContent.scrollToPoint(undefined, 0);
        }
        if (this.state === DrawerState.Top && this.contentPosition > 0) {
            console.log('active scroll content');
            this.diasbleScroll = false;
            this.disableScrollContent.emit(false);
        }
        this.stateChange.emit(this.state);
    }

    private _handleTopPanEnd(ev) {
        if (ev.deltaY > this._BOUNCE_DELTA) {
            this.state = DrawerState.Docked;
        } else {
            this._setTranslateY(this.distanceTop + 'px');
        }
    }

    private _handleDockedPanEnd(ev) {
        const absDeltaY = Math.abs(ev.deltaY);
        if (absDeltaY > this._BOUNCE_DELTA && ev.deltaY < 0) {
            this.state = DrawerState.Top;
        } else if (absDeltaY > this._BOUNCE_DELTA && ev.deltaY > 0) {
            this.state = DrawerState.Bottom;
        } else {
            this._setTranslateY((this._platform.height() - this.dockedHeight) + 'px');
        }
    }

    private _handleBottomPanEnd(ev) {
        if (-ev.deltaY > this._BOUNCE_DELTA) {
            this.state = DrawerState.Docked;
        } else {
            this._setTranslateY('calc(100vh - ' + this.minimumHeight + 'px)');
        }
    }

    private _handlePan(ev) {
        const pointerY = ev.center.y;
        this._renderer.setStyle(this._element.nativeElement, 'transition', 'none');
        if (pointerY > 0 && pointerY < this._platform.height()) {
            if (ev.additionalEvent === 'panup' || ev.additionalEvent === 'pandown') {
                const newTop = this._startPositionTop + ev.deltaY;
                if (newTop >= this.distanceTop) {
                    this._setTranslateY(newTop + 'px');
                } else if (newTop < this.distanceTop) {
                    this._setTranslateY(this.distanceTop + 'px');
                }
                if (newTop > this._platform.height() - this.minimumHeight) {
                    this._setTranslateY((this._platform.height() - this.minimumHeight) + 'px');
                    if (this.state === DrawerState.Bottom && ev.additionalEvent === 'pandown') {
                        this.minimumHeight = 0;
                        this._setTranslateY(newTop + 'px');
                        this.hideBottomSheet.emit(true);
                    }
                }
            }
        }
    }

    private _setTranslateY(value) {
        this._domCtrl.write(() => {
            this._renderer.setStyle(this._element.nativeElement, 'transform', 'translateY(' + value + ')');
        });
    }

    onScrollContent($event: CustomEvent) {
        this.setupContentTopPosition($event.detail.scrollTop);
    }

    setupContentTopPosition(position: number) {
        if (position < 0) { position = 0; }
        this.contentPosition = position;
        this.scrollContent.emit(this.contentPosition);
        if (position === 0) {
            console.log('disable scroll')
            this.diasbleScroll = true;
            this.disableScrollContent.emit(true);
        }
    }

    changeBottomHeight(height) {
        this.ionContent.scrollToPoint(undefined, 0, 300);
        this.minimumHeight = height;
        this._setTranslateY('calc(100vh - ' + this.minimumHeight + 'px)');
        this.state = DrawerState.Bottom;
        this.stateChange.emit(this.state);
    }

    onScrollContentEnd() {
        if (this._element.nativeElement.getBoundingClientRect().top !== this.distanceTop) {
            this.ionContent.scrollToPoint(undefined, 0);
        }
    }
}
