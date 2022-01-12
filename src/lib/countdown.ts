//https://www.npmjs.com/package/react-countdown
interface ICountDonwOptions {
    date?: number;
    onTick?: Function
    onStart?: Function;
    onPause?: Function;
    onComplete?: Function;
    intervalDelay?: number;
}

export class CountDown {
    private _options: ICountDonwOptions

    private _lastTimer: number = -1;
    private _tickTimer = -1;

    private _animationFrameId: number;
    constructor(options: ICountDonwOptions) {
        this._options = Object.assign({
            intervalDelay: 1000,
            date: Date.now() + 3600 * 1000
        }, options);
    }

    private _updateOption(options: ICountDonwOptions) {
        this._options = Object.assign(this._options, options);
    }

    start(options?: ICountDonwOptions) {
        options && this._updateOption(options);
        this._update();
    }

    stop() {
        cancelAnimationFrame(this._animationFrameId);
        this._lastTimer = -1;
        this._tickTimer = -1;
    }

    private _update = () => {
        const { intervalDelay, onTick, onComplete, date } = this._options;
        if (this._lastTimer != -1) {
            const delta = Date.now() - this._lastTimer;
            this._tickTimer += delta;
        } else {
            onTick && onTick(date - Date.now());
        }
        this._lastTimer = Date.now();

        if (this._tickTimer > intervalDelay) {
            this._tickTimer = 0;
            onTick && onTick(date - Date.now());
        }

        if (Date.now() > date) {
            onTick && onTick(0);
            onComplete && onComplete();
            cancelAnimationFrame(this._animationFrameId)
        } else {
            this._animationFrameId = requestAnimationFrame(this._update);
        }
    }
}