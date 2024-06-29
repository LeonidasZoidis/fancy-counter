import { useState, useEffect, useRef } from 'react';
import Button from '../Button/Button';
import { RxReset } from 'react-icons/rx';
import clickSoundUpFile from '../../assets/click_sound_up.mp3';
import clickSoundDownFile from '../../assets/click_sound_down.mp3';
import clickSoundResetFile from '../../../src/assets/click_sound_reset.mp3';
import EditField from '../EditField/EditField';

const Counter = () => {
    const [count, setCount] = useState<number>(() => {
        const storedCount = localStorage.getItem('storedCount');
        return storedCount !== null ? JSON.parse(storedCount) : 0;
    });

    const clickSoundUp = useRef<HTMLAudioElement>(new Audio(clickSoundUpFile));
    const clickSoundDown = useRef<HTMLAudioElement>(
        new Audio(clickSoundDownFile)
    );
    const clickSoundReset = useRef<HTMLAudioElement>(
        new Audio(clickSoundResetFile)
    );

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
        }, []);
    }, []);

    const handleIncrement = () => {
        // reset the audio on new clicks
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
        if (confirm('Are you sure you want to rest your counter?')) {
            clickSoundReset.current.currentTime = 0;
            clickSoundReset.current.play().catch((error) => {
                console.log(error);
            });

            setCount(0);
        }
    };

    return (
        <>
            <div className="flex flex-col justify-between items-center h-screen bg-lime-300">
                <h1 className="text-center text-4xl font-medium text-lime-700 my-8">
                    <EditField />
                </h1>
                <div className="flex flex-col items-center justify-center flex-grow">
                    <div
                        style={{ fontSize: '15rem' }}
                        className="font-medium text-lime-900"
                    >
                        {count}
                    </div>
                </div>
                <div className="flex flex-col items-center w-full">
                    <Button
                        className="flex items-center justify-center w-16 h-16 mb-4"
                        variant="text"
                        action={resetCount}
                    >
                        <RxReset className="!text-6xl text-lime-600" />
                    </Button>
                    <div className="flex items-center justify-center gap-3 my-8 w-full h-auto">
                        <div className="w-full sm:w-1/2 lg:w-1/4">
                            <Button
                                disabled={count < 1 ? true : false}
                                className="w-full h-24 font-thin !text-6xl text-yellow-400 !bg-lime-700"
                                action={handleDecrement}
                            >
                                -
                            </Button>
                        </div>
                        <div className="w-full sm:w-1/2 lg:w-1/4">
                            <Button
                                className="w-full h-24 font-thin !text-6xl text-yellow-400 !bg-lime-900"
                                action={handleIncrement}
                            >
                                +
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Counter;
