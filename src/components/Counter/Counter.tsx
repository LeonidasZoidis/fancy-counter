import { useState } from 'react';
import Button from '../Button/Button';
import { RxReset } from 'react-icons/rx';

const Counter = () => {
    const [count, setCount] = useState<number>(0);

    const handleIncrement = () => {
        setCount((prevCount) => prevCount + 1);
    };
    const handleDecrement = () => {
        setCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
    };
    const resetCount = () => {
        setCount(0);
    };

    return (
        <>
            <div className="flex flex-col justify-between items-center h-screen bg-lime-300">
                <h1 className="text-center text-4xl font-medium text-lime-700 my-8">
                    FANCY COUNTER
                </h1>
                <div className="flex flex-col items-center justify-center flex-grow">
                    <div className="text-9xl font-medium text-lime-900">
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
                    <div className="flex gap-3 my-8 w-full h-auto">
                        <div className="w-1/2">
                            <Button
                                disabled={count < 1 ? true : false}
                                className="w-full h-24 font-thin !text-6xl text-yellow-400 !bg-lime-700"
                                action={handleDecrement}
                            >
                                -
                            </Button>
                        </div>
                        <div className="w-1/2">
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
