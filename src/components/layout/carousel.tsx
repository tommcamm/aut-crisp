/* eslint-disable unicorn/prevent-abbreviations */
import type { FunctionComponent } from "../../common/types";
import { useState } from 'react';

const slides = [
    {
        url: 'https://images.unsplash.com/photo-1594581835488-0b95b8b0bacd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
        url: 'https://images.unsplash.com/photo-1487528278747-ba99ed528ebc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
        url: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
        url: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
];

export const Carousel = (): FunctionComponent=> {

    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const prevSlide = () :void => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const nextSlide = () :void => {
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    return (
        <div className='h-[780px] w-full m-auto py-0 px-4 relative group'>
            <div style={{ backgroundImage: `url(${slides[currentIndex]?.url ?? ''})` }} className='w-full h-full rounded-2xl bg-center bg-cover duration-500'></div>
            <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full text-white cursor-pointer'>
                <button type="button" onClick={prevSlide} className="inline-flex items-center justify-center w-10 h-10 rounded-full group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4"  />
            </div>
            <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full text-white cursor-pointer'>
                <button type="button" onClick={nextSlide} className="inline-flex items-center justify-center w-10 h-10 rounded-full group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4" />
            </div>
            <a href="/open-jobs" className="absolute w-[200px] h-20 top-[90%] left-[50%] -translate-x-[50%] translate-y-[-50%] text-2xl rounded-3xl bg-white/70 hover:bg-white text-black border-black font-bold flex justify-center items-center text-center">
                Find your dream job NOW</a>        
        </div>
    );
}