import React from 'react'
import { ICar } from './demo'

interface IProps
{
    car: ICar
}

//rafc
export const CarItem: React.FC<IProps> = ({car}) => 
{
    return (
        <div>
            <h1>{car.color}</h1>
        </div>
    )
}
