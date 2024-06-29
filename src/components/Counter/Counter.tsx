import { useState, useEffect, useRef } from 'react';
import Button from '../Button/Button';
import { RxReset } from 'react-icons/rx';
import clickSound1 from '../../assets/click_sound.mp3';
import clickSound2 from '../../assets/reset_sound.mp3';

const Counter = () => {
    const [count, setCount] = useState<number>(() => {
        const storedCount = localStorage.getItem('storedCount');
        return storedCount !== null ? JSON.parse(storedCount) : 0;
    });

    const clickAudio = useRef(new Audio(clickSound1));
    const resetAudio = useRef(new Audio(clickSound2));

    useEffect(() => {
        localStorage.setItem('storedCount', JSON.stringify(count));
    }, [count]);

    useEffect(() => {
        clickAudio.current.preload = 'auto';
        resetAudio.current.preload = 'auto';
        // play and pause to ensure sound loads from the start
        clickAudio.current.play().then(() => clickAudio.current.pause());
        resetAudio.current.play().then(() => resetAudio.current.pause());
    }, []);

    const handleIncrement = () => {
        // reset the audio on new clicks
        clickAudio.current.currentTime = 0;
        clickAudio.current.play();
        setCount((prevCount) => prevCount + 1);
    };
    const handleDecrement = () => {
        // reset the audio on new clicks
        clickAudio.current.currentTime = 0;
        clickAudio.current.play();
        setCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
    };
    const resetCount = () => {
        // reset the audio on new clicks
        resetAudio.current.currentTime = 0;
        resetAudio.current.play();
        setCount(0);
    };

    return (
        <>
            <div className="flex flex-col justify-between items-center h-screen bg-lime-300">
                <h1 className="text-center text-4xl font-medium text-lime-700 my-8">
                    FANCY COUNTER
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
