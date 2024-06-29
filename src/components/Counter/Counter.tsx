import { useState, useEffect, useRef } from 'react';
import Button from '../Button/Button';
import { RxReset } from 'react-icons/rx';
import clickSoundUpFile from '../../assets/click_sound_up.mp3';
import clickSoundDownFile from '../../assets/click_sound_down.mp3';
import clickSoundResetFile from '../../../src/assets/click_sound_reset.mp3';
import EditField from '../EditField/EditField';

const Counter = () => {
    const randomColours = () => {
        const colourPairs = [
            { bg: 'bg-red-300', el: 'bg-red-900', text: 'text-red-600' },
            {
                bg: 'bg-yellow-300',
                el: 'bg-yellow-900',
                text: 'text-yellow-600',
            },
            { bg: 'bg-green-300', el: 'bg-green-900', text: 'text-green-600' },
            { bg: 'bg-blue-300', el: 'bg-blue-900', text: 'text-blue-600' },
            {
                bg: 'bg-indigo-300',
                el: 'bg-indigo-900',
                text: 'text-indigo-600',
            },
            {
                bg: 'bg-purple-300',
                el: 'bg-purple-900',
                text: 'text-purple-600',
            },
            { bg: 'bg-pink-300', el: 'bg-pink-900', text: 'text-pink-600' },
        ];

        const randomPair =
            colourPairs[Math.floor(Math.random() * colourPairs.length)];
        return randomPair;
    };

    const [count, setCount] = useState<number>(() => {
        const storedCount = localStorage.getItem('storedCount');
        return storedCount !== null ? JSON.parse(storedCount) : 0;
    });
    const [colours, setColours] = useState(randomColours());

    const clickSoundUp = useRef<HTMLAudioElement>(new Audio(clickSoundUpFile));
    const clickSoundDown = useRef<HTMLAudioElement>(
        new Audio(clickSoundDownFile)
    );
    const clickSoundReset = useRef<HTMLAudioElement>(
        new Audio(clickSoundResetFile)
    );

    const dynamicCountSize = () => {
        switch (true) {
            case count > 999999:
                return '5rem';
            case count > 99999:
                return '6rem';
            case count > 999:
                return '10rem';
            default:
                return '13rem';
        }
    };

    useEffect(() => {
        setColours(randomColours());
    }, []);

    useEffect(() => {
        localStorage.setItem('storedCount', JSON.stringify(count));
    }, [count]);

    useEffect(() => {
        const sounds = [
            clickSoundUp.current,
            clickSoundDown.current,
            clickSoundReset.current,
        ];
        sounds.forEach((sound) => {
            sound.preload = 'auto';
        });
    }, []);

    const handleIncrement = () => {
        clickSoundUp.current.currentTime = 0;
        clickSoundUp.current.play().catch((error) => {
            console.log(error);
        });
        setCount((prevCount) => prevCount + 1);
    };

    const handleDecrement = () => {
        clickSoundDown.current.currentTime = 0;
        clickSoundDown.current.play().catch((error) => {
            console.log(error);
        });
        setCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
    };

    const resetCount = () => {
        if (confirm('Are you sure you want to reset your counter?')) {
            clickSoundReset.current.currentTime = 0;
            clickSoundReset.current.play().catch((error) => {
                console.log(error);
            });
            setCount(0);
        }
    };

    return (
        <>
            <div
                className={`flex flex-col justify-between items-center min-h-screen overflow-hidden ${colours.bg}`}
            >
                <h1
                    className={`text-center text-4xl font-medium my-8 ${colours.text}`}
                >
                    <EditField className="break-words" />
                </h1>
                <div className="flex flex-col items-center justify-center flex-grow">
                    <div
                        style={{ fontSize: `${dynamicCountSize()}` }}
                        className={`font-medium ${colours.text}`}
                    >
                        {count.toLocaleString()}
                    </div>
                </div>
                <div className="flex flex-col items-center w-full">
                    <Button
                        className="flex items-center justify-center w-16 h-16 mb-4 p-4"
                        action={resetCount}
                    >
                        <RxReset className={`!text-6xl ${colours.text}`} />
                    </Button>
                    <div className="flex items-center justify-center gap-3 my-8 w-full h-auto px-4">
                        <div className="w-full sm:w-1/2 lg:w-1/4">
                            <Button
                                disabled={count < 1 ? true : false}
                                className={`w-full h-24 font-thin !text-6xl p-4 ${colours.el} ${colours.text} font-semibold rounded-md`}
                                action={handleDecrement}
                            >
                                <span className="flex items-center justify-center mb-1">
                                    -
                                </span>
                            </Button>
                        </div>
                        <div className="w-full sm:w-1/2 lg:w-1/4">
                            <Button
                                className={`${colours.el} ${colours.text} w-full h-24 font-thin !text-6xl p-4 font-semibold rounded-md`}
                                action={handleIncrement}
                            >
                                <span className="flex items-center justify-center mb-1">
                                    +
                                </span>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Counter;
