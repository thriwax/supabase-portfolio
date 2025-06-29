'use client'

import Card from "./Card"

const CardsBanner = () => {
    return (
        <div className="flex justify-between items-center py-[5rem]">
            <Card color={'bg-violet-300'} title={'01'} text={'Front-End'} />
            <Card color={'bg-orange-300'} title={'02'} text={'Back-End'} />
            <Card color={'bg-sky-300'} title={'03'} text={'UI'} />
        </div>
    )
}

export default CardsBanner;