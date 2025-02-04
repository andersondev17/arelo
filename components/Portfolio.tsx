'use client';

import AnimatedTitle from "./ui/AnimatedTitle";


const Portfolio: React.FC = () => {

    return (
        <div id="about" className="min-h-screen w-screen">
            <div className="relative mb-8 mt-36 flex flex-col items-center gap-5">
                <p className="font-general text-sm uppercase md:text-[10px]">
                ⚡
                </p>

                <AnimatedTitle
                    title="P<b>o</b>rtafolio <br />"
                    containerClass="mt-5 !text-black text-center"
                />

                <div className="about-subtext">
                    <p>Coming Soon</p>
                    <p className="text-gray-500">
                        ⚡⚡⚡⚡⚡
                    </p>
                </div>
            </div>


        </div>
    );
};

export default Portfolio;