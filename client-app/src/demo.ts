let data = 42;

export interface ICar{
    color: string;
    model: string;
    topSpeed?: number;
}

const car1: ICar = {
    color: 'Blue',
    model: 'BMW'
}

const car2: ICar =
{
    color: 'Red',
    model: 'Mercedes',
    topSpeed: 100
} 
const multiply = (x: number,y: number) => 
{
     x*y;
}
export const cars = [car1,car2];